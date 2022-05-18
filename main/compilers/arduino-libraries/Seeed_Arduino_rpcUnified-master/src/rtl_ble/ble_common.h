
/**
*****************************************************************************************
*     Copyright (C) 2020  Seeed Technology Co.,Ltd. All rights reserved.
*****************************************************************************************
   * @file      ble_common.h
   * @brief     This file is used to config ble functions.
   * @author    Hongtai.Liu
   * @date      2020-08-10
   * @version   v1.0
   **************************************************************************************
   * @attention
   * <h2><center>&copy; COPYRIGHT 2020 Seeed Technology Co.,Ltd</center></h2>
   **************************************************************************************
  */

#ifndef _PRC_BLE_COMMON_H_
#define _PRC_BLE_COMMON_H_

#include "bt_flags.h"
#include "gap.h"
#include "gap_msg.h"
#include "gap_conn_le.h"

/*============================================================================*
 *                              Constants
 *============================================================================*/

/** @brief  Config client LE link number */
#define BLE_LE_MAX_LINKS 1

/** @brief  Config client app number*/
#define BLE_CLIENT_MAX_APPS 1

/** @brief  Config server app number*/
#define BLE_SERVER_MAX_APPS 5

/** @brief  Config the discovery table number of gcs_client */

/** @brief  Config set physical: 0-Not built in, 1-built in*/
#define F_BT_LE_5_0_SET_PHY_SUPPORT 1

/** @brief  Config server LE link number */
#define BLE_SERVER_MAX_LINKS 1

/** @brief Default scan interval (units of 0.625ms, 0x520=820ms) */
#define DEFAULT_SCAN_INTERVAL 0x520

/** @brief Default scan window (units of 0.625ms, 0x520=820ms) */
#define DEFAULT_SCAN_WINDOW 0x520

/** @brief  Default minimum advertising interval when device is discoverable (units of 625us, 160=100ms) */
#define DEFAULT_ADVERTISING_INTERVAL_MIN 320

/** @brief  Default maximum advertising interval */
#define DEFAULT_ADVERTISING_INTERVAL_MAX 400

/** @brief For GAP le scan complete evernt */
#define GAP_MSG_LE_SCAN_CMPL     0x34

/**
 * @brief  Application Link control block defination.
 */
typedef struct
{
  T_GAP_CONN_STATE conn_state;      /**< Connection state. */
  T_GAP_REMOTE_ADDR_TYPE bd_type;   /**< remote BD type*/
  uint8_t bd_addr[GAP_BD_ADDR_LEN]; /**< remote BD */
} T_APP_LINK;

#endif /* _RPC_BLE_FLAGS_H_ */
