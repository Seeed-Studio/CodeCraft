#include <string.h>
#include "WiFly.h"
#include "Debug.h"

WiFly *WiFly::instance;

WiFly::WiFly(Stream *serial)
{
    instance = this;
    this->serial = serial;

    setTimeout(DEFAULT_WAIT_RESPONSE_TIME);

    command_mode = false;
    associated = false;
    error_count = 0;
}

WiFly::WiFly(Stream &serial)
{
    instance = this;
    this->serial = &serial;

    setTimeout(DEFAULT_WAIT_RESPONSE_TIME);

    command_mode = false;
    associated = false;
}

int WiFly::available()
{
    return serial->available();
}

int WiFly::read()
{
    return serial->read();
}

int WiFly::peek()
{
    return serial->peek();
}

void WiFly::flush()
{
    return serial->flush();
}

size_t WiFly::write(uint8_t c)
{
    return serial->write(c);
}

size_t WiFly::write(const uint8_t *buffer, size_t size)
{
    return serial->write(buffer, size);
}

boolean WiFly::reset()
{
    return sendCommand("factory R\r", "Defaults");
}

boolean WiFly::save()
{
    // return "Storing in config"
    return sendCommand("save\r", "ring");
}

boolean WiFly::reboot()
{
    sendCommand("reboot\r");
    command_mode = false;
    return true;
}

boolean WiFly::init()
{
    boolean result = true;

#if 0
    // set time
    result = result & sendCommand("set c t 20\r", "AOK");

    // set size
    result = result & sendCommand("set c s 128\r", "AOK");

    // red led on when tcp connection active
    result = result & sendCommand("set s i 0x40\r", "AOK");

    // no string sent to the tcp client
    result = result & sendCommand("set c r 0\r", "AOK");

    // tcp protocol
    result = result & sendCommand("set i p 2\r", "AOK");

    // tcp retry
    result = result & sendCommand("set i f 0x7\r", "AOK");
    //no echo
    result = result & sendCommand("set u m 1\r", "AOK");
    // no auto join
    result = result & sendCommand("set w j 0\r", "AOK");

    // DHCP on
    result = result & sendCommand("set i d 1\r", "AOK");
#endif

    return result;
}

boolean WiFly::staticIP(const char *ip, const char *mask, const char *gateway)
{
    boolean result = true;
    char cmd[MAX_CMD_LEN];

    result = sendCommand("set i d 0\r", "AOK");

    snprintf(cmd, MAX_CMD_LEN, "set i a %s\r", ip);
    result = result & sendCommand(cmd, "AOK");

    snprintf(cmd, MAX_CMD_LEN, "set i n %s\r", mask);
    result = result & sendCommand(cmd, "AOK");

    snprintf(cmd, MAX_CMD_LEN, "set i g %s\r", gateway);
    result = result & sendCommand(cmd, "AOK");

    return result;
}

boolean WiFly::join(const char *ssid)
{
    char cmd[MAX_CMD_LEN];

    snprintf(cmd, sizeof(cmd), "join %s\r", ssid);

    return sendCommand(cmd, "ssociated");
}

boolean WiFly::join(const char *ssid, const char *phrase, int auth)
{
    char cmd[MAX_CMD_LEN];

    // ssid
    snprintf(cmd, MAX_CMD_LEN, "set w s %s\r", ssid);
    sendCommand(cmd, "OK");

    //auth
    snprintf(cmd, MAX_CMD_LEN, "set w a %d\r", auth);
    sendCommand(cmd, "OK");

    //key
    if (auth != WIFLY_AUTH_OPEN) {
        if (auth == WIFLY_AUTH_WEP)
            snprintf(cmd, MAX_CMD_LEN, "set w k %s\r", phrase);
        else
            snprintf(cmd, MAX_CMD_LEN, "set w p %s\r", phrase);

        sendCommand(cmd, "OK");
    }

    //join the network, it may needs 30 seconds!
	int joinCounter = 0;
	while(joinCounter++ < 3){
		if(sendCommand("join\r", "Associated",DEFAULT_WAIT_RESPONSE_TIME*10)) {
			break;
		}
		delay(DEFAULT_WAIT_RESPONSE_TIME);
	}
	if(joinCounter >=4){
		return false;
	}

    clear();

    associated = true;
    return true;
}

boolean WiFly::isAssociated()
{
    // show net
    // return "Assoc=OK"
    return sendCommand("show n\r", "soc=O");
}

boolean WiFly::isAssociated(const char *ssid)
{
    // show net
    if (!sendCommand("show n\r", ssid)) {
        return false;
    }

    return find("soc=O");
}

boolean WiFly::leave()
{
    if (sendCommand("leave\r", "DeAuth")) {
        associated = false;
        return true;
    }
    return false;
}

boolean WiFly::connect(const char *host, uint16_t port, int timeout)
{
    char cmd[MAX_CMD_LEN];	
	timeout = DEFAULT_WAIT_RESPONSE_TIME*5;
#if 0
    snprintf(cmd, sizeof(cmd), "set d n %s\r", host);
    sendCommand(cmd, "OK");
    snprintf(cmd, sizeof(cmd), "set i r %d\r", port);
    sendCommand(cmd, "OK");
    sendCommand("set i p 2\r", "OK");
    sendCommand("set i h 0\r", "OK");
    sendCommand("set c r 0\r", "OK");
    if (!sendCommand("open\r", "*OPEN*", timeout)) {
#else
    snprintf(cmd, sizeof(cmd), "open %s %d\r", host, port);
    if (!sendCommand(cmd, "*OPEN*", timeout)) {
#endif

        command_mode = false;
        sendCommand("close\r");
        clear();
        return false;
    }

    command_mode = false;
    return true;
}

boolean WiFly::connect(int timeout)
{
    if (!sendCommand("open\r", "*OPEN*", timeout)) {
        command_mode = false;
        sendCommand("close\r");
        clear();
        return false;
    }

    command_mode = false;
    return true;
}

int WiFly::send(const uint8_t *data, int len, int timeout)
{
    int write_bytes = 0;
    boolean write_error = false;
    unsigned long start_millis;

    if (data == NULL) {
        return 0;
    }
    while (write_bytes < len) {
        if (write(data[write_bytes]) == 1) {
            write_bytes++;
            write_error = false;
        } else {         // failed to write, set timeout
            if (write_error) {
                if ((millis() - start_millis) > timeout) {
                    DBG("Send data. Timeout!\r\n");
                    break;
                }
            } else {
                write_error = true;
                start_millis = millis();
            }
        }
    }

    return write_bytes;
}

int WiFly::send(const char *data, int timeout)
{
    send((uint8_t *)data, strlen(data), timeout);
}

boolean WiFly::ask(const char *q, const char *a, int timeout)
{
    unsigned long start;
    unsigned long end;
    int q_len = strlen(q);
    send((uint8_t *)q, q_len, timeout);

    if (a != NULL) {
        setTimeout(timeout);
        start = millis();
        boolean found = find((char *)a);
        if (!found) {
            end = millis();
            if ((end - start) < timeout) {
                DBG("\r\n");
                DBG(q);
                DBG("\r\nTry to find: ");
                DBG(a);
                DBG("\r\nTimeout: ");
                DBG(timeout);
                DBG("\r\nStart time: ");
                DBG(start);
                DBG("\r\nEnd time: ");
                DBG(end);
                DBG("\r\n***** Probably not enough memory *****\r\n");
            } else {
                DBG("Time out! ");
            }

            return false;
        }
    }

    return true;
}

boolean WiFly::sendCommand(const char *cmd, const char *ack, int timeout)
{
    DBG("CMD: ");
    DBG(cmd);
    DBG("\r\n");
    clear();

    commandMode();

    if (!ask(cmd, ack, timeout)) {
        DBG("Failed to run: ");
        DBG(cmd);
        DBG("\r\n");
        error_count++;
        return false;
    }
    error_count = 0;
    return true;
}

boolean WiFly::commandMode()
{
    if (command_mode && (error_count < 2)) {
        return true;
    }

    if (!ask("$$$", "CMD")) {
        if (!ask("\r", "ERR")) {
            DBG("Failed to enter command mode\r\n");
            return false;
        }
    }
    command_mode = true;
    return true;
}

boolean WiFly::dataMode()
{
    if (command_mode) {
        if (!ask("exit\r", "EXIT")) {
            if (ask("\r", "ERR")) {
                DBG("Failed to enter data mode\r\n");
                return false;
            }
        }
        command_mode = false;
    }
    return true;
}

void WiFly::clear()
{
    char r;
    while (receive((uint8_t *)&r, 1, 10) == 1) {
    }
}

float WiFly::version()
{
    if (!sendCommand("ver\r", "Ver")) {
        return -1;
    }

    char buf[48];
    int read_bytes;
    read_bytes = receive((uint8_t *)buf, 48 - 1);
    buf[read_bytes] = '\0';
    
    char *ptr = buf;
    while (*ptr < '0' || *ptr > '9') {
        ptr++;
    }

    float version;
    version = atof(ptr);
    if (version == 0) {
        ptr = strchr(ptr, '<');
        if (ptr != NULL) {
            version = atof(ptr + 1);
        }
    }

    return version;
}



int WiFly::receive(uint8_t *buf, int len, int timeout)
{
    int read_bytes = 0;
    int ret;
    unsigned long end_millis;

    while (read_bytes < len) {
        end_millis = millis() + timeout;
        do {
            ret = read();
            if (ret >= 0) {
                break;
            }
        } while (millis() < end_millis);

        if (ret < 0) {
            return read_bytes;
        }
        buf[read_bytes] = (char)ret;
        read_bytes++;
    }

    return read_bytes;
}
