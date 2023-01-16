/* Provide SSL/TLS functions to ESP32 with Arduino IDE
*
* Adapted from the ssl_client1 example of mbedtls.
*
* Original Copyright (C) 2006-2015, ARM Limited, All Rights Reserved, Apache 2.0 License.
* Additions Copyright (C) 2017 Evandro Luis Copercini, Apache 2.0 License.
*/
#define TAG "TLS API"
#include "rpc_wifi_api_utils.h"

#include "Arduino.h"
#include "rtl_wifi/wifi_unified.h"
#include "ssl_client.h"

sslclient_context *ssl_client_create(void)
{
    RPC_FUN_RETURN_0(wifi_ssl_client_create, sslclient_context *);
}
void ssl_client_destroy(sslclient_context *ssl_client)
{
    RPC_FUN_RETURN_VOID_1(wifi_ssl_client_destroy, (uint32_t)ssl_client);
}

void ssl_init(sslclient_context *ssl_client)
{
    RPC_FUN_RETURN_VOID_1(wifi_ssl_init, (uint32_t)ssl_client);
}

void ssl_set_socket(sslclient_context *ssl_client, int socket)
{
    RPC_FUN_RETURN_VOID_2(wifi_ssl_set_socket, (uint32_t)ssl_client, socket);
}
void ssl_set_timeout(sslclient_context *ssl_client, unsigned long handshake_timeout)
{
    RPC_FUN_RETURN_VOID_2(wifi_ssl_set_timeout, (uint32_t)ssl_client, (uint32_t)handshake_timeout);
}

int ssl_get_socket(sslclient_context *ssl_client)
{
    RPC_FUN_RETURN_1(wifi_ssl_get_socket, (uint32_t)ssl_client, int);
}

unsigned long ssl_get_timeout(sslclient_context *ssl_client)
{
    RPC_FUN_RETURN_1(wifi_ssl_get_timeout, (uint32_t)ssl_client, unsigned long);
}

int start_ssl_client(sslclient_context *ssl_client, const char *host, uint32_t port, int timeout, const char *rootCABuff, const char *cli_cert, const char *cli_key, const char *pskIdent, const char *psKey)
{
    FUNC_ENTRY;
    if(rootCABuff != NULL)
    {
        rpc_wifi_ssl_set_rootCA((uint32_t)ssl_client, rootCABuff);
    }
     if(cli_cert != NULL)
    {
        rpc_wifi_ssl_set_cliCert((uint32_t)ssl_client, cli_cert);
    }
     if(cli_key != NULL)
    {
        rpc_wifi_ssl_set_cliKey((uint32_t)ssl_client, cli_key);
    }
     if(pskIdent != NULL)
    {
        rpc_wifi_ssl_set_pskIdent((uint32_t)ssl_client, pskIdent);
    }
    if(psKey != NULL)
    {
        rpc_wifi_ssl_set_psKey((uint32_t)ssl_client, psKey);
    }
    int ret = rpc_wifi_start_ssl_client((uint32_t)ssl_client, host, port, timeout);
    FUNC_EXIT_RC(ret);
}

void stop_ssl_socket(sslclient_context *ssl_client, const char *rootCABuff, const char *cli_cert, const char *cli_key)
{
    (void)rootCABuff;
    (void)cli_cert;
    (void)cli_key;
    RPC_FUN_RETURN_VOID_1(wifi_stop_ssl_socket, (uint32_t)ssl_client);
}

int data_to_read(sslclient_context *ssl_client)
{
    RPC_FUN_RETURN_1(wifi_data_to_read, (uint32_t)ssl_client, int);
}

int send_ssl_data(sslclient_context *ssl_client, const uint8_t *data, uint16_t len)
{
    FUNC_ENTRY;
    binary_t b_data;
    if (data == NULL || len == 0)
    {
        return -1;
    }
    else
    {
        b_data.data = (uint8_t *)data;
        b_data.dataLength = len;
    }
    int ret = rpc_wifi_send_ssl_data((uint32_t)ssl_client, &b_data, len);
    FUNC_EXIT_RC(ret);
}

int get_ssl_receive(sslclient_context *ssl_client, uint8_t *data, int length)
{
    FUNC_ENTRY;
    binary_t b_data;
    if (data == NULL)
    {
        return -1;
    }
    else
    {
        b_data.data = data;
        b_data.dataLength = length;
    }
    int ret = rpc_wifi_get_ssl_receive((uint32_t)ssl_client, &b_data, length);
    if (ret > 0)
        memcpy(data, b_data.data, b_data.dataLength);
    if (b_data.data != NULL)
    {
        erpc_free(b_data.data);
    }
    FUNC_EXIT_RC(ret);
}

// Verifies certificate provided by the peer to match specified SHA256 fingerprint
bool verify_ssl_fingerprint(sslclient_context *ssl_client, const char *fp, const char *domain_name)
{
    RPC_FUN_RETURN_3(wifi_verify_ssl_fingerprint, (uint32_t)ssl_client, fp, domain_name, bool);
}

// Checks if peer certificate has specified domain in CN or SANs
bool verify_ssl_dn(sslclient_context *ssl_client, const char *domain_name)
{
    RPC_FUN_RETURN_2(wifi_verify_ssl_dn, (uint32_t)ssl_client, domain_name, bool);
}

void ssl_strerror(int errnum, char *buffer, size_t buflen)
{
    FUNC_ENTRY;

    if (buffer == NULL || buflen == 0)
    {
        FUNC_EXIT;
        return;
    }

    binary_t b_buffer;
    rpc_wifi_ssl_strerror(errnum, &b_buffer, buflen);
    memcpy(buffer, b_buffer.data, buflen);
    if (b_buffer.data != NULL)
    {
        erpc_free(b_buffer.data);
    }
    FUNC_EXIT;
}
