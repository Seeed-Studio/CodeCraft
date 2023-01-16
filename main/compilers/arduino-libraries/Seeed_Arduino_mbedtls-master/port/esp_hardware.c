#if !defined(MBEDTLS_CONFIG_FILE)
#include "mbedtls/config.h"
#else
#include MBEDTLS_CONFIG_FILE
#endif

#include "Arduino.h"
#include <sys/types.h>
#include <stdlib.h>
#include <stdio.h>
#include <esp_system.h>

#include "mbedtls/entropy_poll.h"

#ifndef MBEDTLS_ENTROPY_HARDWARE_ALT
#error "MBEDTLS_ENTROPY_HARDWARE_ALT should always be set in ESP-IDF"
#endif

int mbedtls_hardware_poll( void *data,
                           unsigned char *output, size_t len, size_t *olen )
{
    static int srand_set;
    size_t i;

    // prevent warning
    data = data;

    if (!srand_set) {
        srand_set = 1;
        srand(micros());
    }
    for (i = 0; i < len; i++) {
        output[i] = rand() % 0x100;
    }
    *olen = len;
    return 0;
}


