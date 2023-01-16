/*
    The MIT License (MIT)
    Copyright (C) 2019  Seeed Technology Co.,Ltd.
*/
#ifndef _ESP_LIB_UNIFIED_H__
#define _ESP_LIB_UNIFIED_H__

#include <Arduino.h>

#include "sdkconfig.h"
#include "esp_err.h"
#include "esp_event_loop.h"
#include "esp_smartconfig.h"
#include "esp_system.h"
#include "esp_err.h"
#include "esp_hal_log.h"

#define xTaskCreateUniversal(t,n,s,a,p,h,cid) xTaskCreate(t,n,s,a,p,h);

#endif//_ESP_LIB_UNIFIED_H__
