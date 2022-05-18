/* Provide SSL/TLS functions to ESP32 with Arduino IDE
 * by Evandro Copercini - 2017 - Apache 2.0 License
 */

#ifndef ARD_SSL_H
#define ARD_SSL_H
#include "rtl_wifi/wifi_unified.h"
#include "rpc_mbedtls/platform.h"
#include "rpc_mbedtls/net.h"
#include "rpc_mbedtls/debug.h"
#include "rpc_mbedtls/ssl.h"
#include "rpc_mbedtls/entropy.h"
#include "rpc_mbedtls/ctr_drbg.h"
#include "rpc_mbedtls/error.h"

typedef struct sslclient_context {
    int socket;
    mbedtls_ssl_context ssl_ctx;
    mbedtls_ssl_config ssl_conf;

    mbedtls_ctr_drbg_context drbg_ctx;
    mbedtls_entropy_context entropy_ctx;

    mbedtls_x509_crt ca_cert;
    mbedtls_x509_crt client_cert;
    mbedtls_pk_context client_key;

    unsigned long handshake_timeout;
} sslclient_context;

sslclient_context* ssl_client_create(void);
void ssl_client_destroy(sslclient_context *ssl_client);
void ssl_init(sslclient_context *ssl_client);
void ssl_set_socket(sslclient_context *ssl_client, int socket);
void ssl_set_timeout(sslclient_context *ssl_client, unsigned long handshake_timeout);
int ssl_get_socket(sslclient_context *ssl_client);
unsigned long ssl_get_timeout(sslclient_context *ssl_client);
int start_ssl_client(sslclient_context *ssl_client, const char *host, uint32_t port, int timeout, const char *rootCABuff, const char *cli_cert, const char *cli_key, const char *pskIdent, const char *psKey);
void stop_ssl_socket(sslclient_context *ssl_client, const char *rootCABuff, const char *cli_cert, const char *cli_key);
int data_to_read(sslclient_context *ssl_client);
int send_ssl_data(sslclient_context *ssl_client, const uint8_t *data, uint16_t len);
int get_ssl_receive(sslclient_context *ssl_client, uint8_t *data, int length);
bool verify_ssl_fingerprint(sslclient_context *ssl_client, const char* fp, const char* domain_name);
bool verify_ssl_dn(sslclient_context *ssl_client, const char* domain_name);
void ssl_strerror(int errnum, char *buffer, size_t buflen);

#endif
