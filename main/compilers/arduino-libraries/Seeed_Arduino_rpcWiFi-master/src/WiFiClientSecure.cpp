/*
  WiFiClientSecure.cpp - Client Secure class for ESP32
  Copyright (c) 2016 Hristo Gochkov  All right reserved.
  Additions Copyright (C) 2017 Evandro Luis Copercini.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

#include "WiFiClientSecure.h"
#include <lwip/sockets.h>
#include <lwip/netdb.h>
#include <errno.h>

#define WIFI_CLIENT_SECURE_KEEPALIVE_TIMEOUT (500)

#undef connect
#undef write
#undef read

class WiFiClientSecureRxBuffer
{
private:
    size_t _size;
    uint8_t *_buffer;
    size_t _pos;
    size_t _fill;
    sslclient_context *_sslclient;
    bool _failed;

    size_t r_available()
    {
        if (_sslclient == NULL)
        {
            return 0;
        }
        int res = fillBuffer();
        if (res < 0)
        {
            _failed = true;
            return 0;
        }
        return _fill - _pos;
    }

    size_t fillBuffer()
    {
        if (!_buffer)
        {
            _buffer = (uint8_t *)malloc(_size);
            if (!_buffer)
            {
                log_e("Not enough memory to allocate buffer");
                _failed = true;
                return 0;
            }
        }
        if (_fill && _pos == _fill)
        {
            _fill = 0;
            _pos = 0;
        }
        if (!_buffer || _size <= _fill)
        {
            return 0;
        }
        int res = get_ssl_receive(_sslclient, _buffer + _fill, _size - _fill);
        if (res < 0)
        {
            // if(errno != MBEDTLS_ERR_SSL_WANT_READ && errno != MBEDTLS_ERR_SSL_WANT_WRITE) {
            //     _failed = true;
            // }
            return 0;
        }
        _fill += res;
        return res;
    }

public:
    WiFiClientSecureRxBuffer(sslclient_context *sslclient, size_t size = 1024)
        : _size(size), _buffer(NULL), _pos(0), _fill(0), _sslclient(sslclient), _failed(false)
    {
        //_buffer = (uint8_t *)malloc(_size);
    }

    ~WiFiClientSecureRxBuffer()
    {
        free(_buffer);
    }

    bool failed()
    {
        return _failed;
    }

    int read(uint8_t *dst, size_t len)
    {
        if (!dst || !len || (_pos == _fill && !fillBuffer()))
        {
            return -1;
        }
        size_t a = _fill - _pos;
        if (len <= a || ((len - a) <= (_size - _fill) && fillBuffer() >= (len - a)))
        {
            if (len == 1)
            {
                *dst = _buffer[_pos];
            }
            else
            {
                memcpy(dst, _buffer + _pos, len);
            }
            _pos += len;
            return len;
        }
        size_t left = len;
        size_t toRead = a;
        uint8_t *buf = dst;
        memcpy(buf, _buffer + _pos, toRead);
        _pos += toRead;
        left -= toRead;
        buf += toRead;
        while (left)
        {
            if (!fillBuffer())
            {
                return len - left;
            }
            a = _fill - _pos;
            toRead = (a > left) ? left : a;
            memcpy(buf, _buffer + _pos, toRead);
            _pos += toRead;
            left -= toRead;
            buf += toRead;
        }
        return len;
    }

    int peek()
    {
        if (_pos == _fill && !fillBuffer())
        {
            return -1;
        }
        return _buffer[_pos];
    }

    size_t available()
    {
        if (_fill - _pos > 0)
            return _fill - _pos;
        else
            return r_available();
    }
};

WiFiClientSecure::WiFiClientSecure()
{
    _connected = false;
    _CA_cert = NULL;
    _cert = NULL;
    _private_key = NULL;
    _pskIdent = NULL;
    _psKey = NULL;
    next = NULL;
}

WiFiClientSecure::WiFiClientSecure(int sock)
{
    _connected = false;

    if (sock >= 0)
    {
        _connected = true;
    }
    _socket = sock;
    _CA_cert = NULL;
    _cert = NULL;
    _private_key = NULL;
    _pskIdent = NULL;
    _psKey = NULL;
    next = NULL;
}

WiFiClientSecure::~WiFiClientSecure()
{
    stop();
}

WiFiClientSecure &WiFiClientSecure::operator=(const WiFiClientSecure &other)
{
    stop();
    _socket = other._socket;
    _connected = other._connected;
    return *this;
}

void WiFiClientSecure::stop()
{
    if (_socket >= 0)
    {
        close(_socket);
        _socket = -1;
        _connected = false;
    }
    if (sslclient != NULL)
    {
        stop_ssl_socket(sslclient, _CA_cert, _cert, _private_key);
        ssl_client_destroy(sslclient);
        _rxBuffer.reset();
        _rxBuffer = NULL;
        sslclient = NULL;
    }
}

int WiFiClientSecure::connect(IPAddress ip, uint16_t port)
{
    if (_pskIdent && _psKey)
        return connect(ip, port, _pskIdent, _psKey);
    return connect(ip, port, _CA_cert, _cert, _private_key);
}

int WiFiClientSecure::connect(IPAddress ip, uint16_t port, int32_t timeout)
{
    _timeout = timeout;
    return connect(ip, port);
}

int WiFiClientSecure::connect(const char *host, uint16_t port)
{
    if (_pskIdent && _psKey)
        return connect(host, port, _pskIdent, _psKey);
    return connect(host, port, _CA_cert, _cert, _private_key);
}

int WiFiClientSecure::connect(const char *host, uint16_t port, int32_t timeout)
{
    _timeout = timeout;
    return connect(host, port);
}

int WiFiClientSecure::connect(IPAddress ip, uint16_t port, const char *_CA_cert, const char *_cert, const char *_private_key)
{
    return connect(ip.toString().c_str(), port, _CA_cert, _cert, _private_key);
}

int WiFiClientSecure::connect(const char *host, uint16_t port, const char *_CA_cert, const char *_cert, const char *_private_key)
{
    if (sslclient == NULL)
    {
        sslclient = ssl_client_create();
        _rxBuffer.reset(new WiFiClientSecureRxBuffer(sslclient));
        if (sslclient == NULL)
        {
            log_e("ssl_client_create: error");
            stop();
            return 0;
        }
        ssl_init(sslclient);
    }
    if (_timeout > 0)
    {
        ssl_set_timeout(sslclient, _timeout);
    }
    int ret = start_ssl_client(sslclient, host, port, _timeout, _CA_cert, _cert, _private_key, NULL, NULL);
    _lastError = ret;
    if (ret < 0)
    {
        log_e("start_ssl_client: %d", ret);
        stop();
        return 0;
    }
    _socket = ssl_get_socket(sslclient);
    _connected = true;
    return 1;
}

int WiFiClientSecure::connect(IPAddress ip, uint16_t port, const char *pskIdent, const char *psKey)
{
    return connect(ip.toString().c_str(), port, _pskIdent, _psKey);
}

int WiFiClientSecure::connect(const char *host, uint16_t port, const char *pskIdent, const char *psKey)
{
    log_v("start_ssl_client with PSK");
    if (sslclient == NULL)
    {
        sslclient = ssl_client_create();
        _rxBuffer.reset(new WiFiClientSecureRxBuffer(sslclient));
        if (sslclient == NULL)
        {
            log_e("ssl_client_create: error");
            stop();
            return 0;
        }
        ssl_init(sslclient);
    }
    if (_timeout > 0)
    {
        ssl_set_socket(sslclient, _timeout);
    }
    int ret = start_ssl_client(sslclient, host, port, _timeout, NULL, NULL, NULL, _pskIdent, _psKey);
    _lastError = ret;
    if (ret < 0)
    {
        log_e("start_ssl_client: %d", ret);
        stop();
        return 0;
    }
    _socket = ssl_get_socket(sslclient);

    _connected = true;
    return 1;
}

int WiFiClientSecure::peek()
{
    int res = _rxBuffer->peek();
    if (_rxBuffer->failed())
    {
        log_e("fail on fd %d, errno: %d, \"%s\"", fd(), errno, strerror(errno));
        stop();
    }
    return res;
}

size_t WiFiClientSecure::write(uint8_t data)
{
    return write(&data, 1);
}

int WiFiClientSecure::read()
{
    uint8_t data = -1;
    int res = read(&data, 1);
    if (res < 0)
    {
        return res;
    }
    return data;
}

size_t WiFiClientSecure::write(const uint8_t *buf, size_t size)
{
    if (!_connected)
    {
        return 0;
    }
    int res = send_ssl_data(sslclient, buf, size);
    if (res < 0)
    {
        stop();
        res = 0;
    }
    return res;
}

int WiFiClientSecure::read(uint8_t *buf, size_t size)
{
    int res = -1;
    res = _rxBuffer->read(buf, size);
    if (_rxBuffer->failed())
    {
        log_e("fail on fd %d, errno: %d, \"%s\"", fd(), errno, strerror(errno));
        stop();
    }
    return res;
}

int WiFiClientSecure::available()
{
    if (!_rxBuffer)
    {
        return 0;
    }
    int res = _rxBuffer->available();
    if (_rxBuffer->failed())
    {
        log_e("fail on fd %d, errno: %d, \"%s\"", _socket, errno, strerror(errno));
        stop();
    }
    return res;
}

uint8_t WiFiClientSecure::connected()
{

    uint32_t interval = millis() - conn_staus;
    if (_connected && interval > WIFI_CLIENT_SECURE_KEEPALIVE_TIMEOUT)
    {
        uint8_t dummy;
        int res = recv(fd(), &dummy, 0, MSG_DONTWAIT);
        // avoid unused var warning by gcc
        (void)res;
        switch (errno)
        {
        case EWOULDBLOCK:
        case ENOENT: //caused by vfs
            conn_staus = millis();
            _connected = true;
            break;
        case ENOTCONN:
        case EPIPE:
        case ECONNRESET:
        case ECONNREFUSED:
        case ECONNABORTED:
            _connected = false;
            log_d("Disconnected: RES: %d, ERR: %d", res, errno);
            break;
        default:
            log_i("Unexpected: RES: %d, ERR: %d", res, errno);
            conn_staus = millis();
            _connected = true;
            break;
        }
    }

    return _connected;
}

void WiFiClientSecure::setCACert(const char *rootCA)
{
    _CA_cert = rootCA;
}

void WiFiClientSecure::setCertificate(const char *client_ca)
{
    _cert = client_ca;
}

void WiFiClientSecure::setPrivateKey(const char *private_key)
{
    _private_key = private_key;
}

void WiFiClientSecure::setPreSharedKey(const char *pskIdent, const char *psKey)
{
    _pskIdent = pskIdent;
    _psKey = psKey;
}

bool WiFiClientSecure::verify(const char *fp, const char *domain_name)
{
    if (!sslclient)
        return false;

    return verify_ssl_fingerprint(sslclient, fp, domain_name);
}

char *WiFiClientSecure::_streamLoad(Stream &stream, size_t size)
{
    char *dest = (char *)malloc(size + 1);
    if (!dest)
    {
        return nullptr;
    }
    if (size != stream.readBytes(dest, size))
    {
        free(dest);
        dest = nullptr;
        return nullptr;
    }
    dest[size] = '\0';
    return dest;
}

bool WiFiClientSecure::loadCACert(Stream &stream, size_t size)
{
    char *dest = _streamLoad(stream, size);
    bool ret = false;
    if (dest)
    {
        setCACert(dest);
        ret = true;
    }
    return ret;
}

bool WiFiClientSecure::loadCertificate(Stream &stream, size_t size)
{
    char *dest = _streamLoad(stream, size);
    bool ret = false;
    if (dest)
    {
        setCertificate(dest);
        ret = true;
    }
    return ret;
}

bool WiFiClientSecure::loadPrivateKey(Stream &stream, size_t size)
{
    char *dest = _streamLoad(stream, size);
    bool ret = false;
    if (dest)
    {
        setPrivateKey(dest);
        ret = true;
    }
    return ret;
}

int WiFiClientSecure::lastError(char *buf, const size_t size)
{
    if (!_lastError)
    {
        return 0;
    }
    char error_buf[100];
    ssl_strerror(_lastError, error_buf, 100);
    snprintf(buf, size, "%s", error_buf);
    return _lastError;
}

void WiFiClientSecure::setHandshakeTimeout(unsigned long handshake_timeout)
{
    ssl_set_timeout(sslclient, handshake_timeout * 1000);
}

int WiFiClientSecure::fd() const
{
    return _socket;
}
