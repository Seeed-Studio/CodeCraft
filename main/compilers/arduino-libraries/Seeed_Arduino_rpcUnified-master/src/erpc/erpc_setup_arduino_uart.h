/*
 * Copyright (c) 2020 SeeedStudio.
 * All rights reserved.
 *
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

#ifndef _ERPC_SETUP_ARDUIO_UART_H_
#define _ERPC_SETUP_ARDUIO_UART_H_

#include "erpc_transport_setup.h"
#include "Arduino.h"

////////////////////////////////////////////////////////////////////////////////
// API
////////////////////////////////////////////////////////////////////////////////

#include <stdint.h>

erpc_transport_t  erpc_transport_uart_init(HardwareSerial *port, unsigned long baudrate = 115200);

void erpc_transport_uart_deinit(void);


#endif // _ERPC_SETUP_ARDUIO_UART_H_
