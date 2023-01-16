/**
*****************************************************************************************
*     Copyright (C) 2020  Seeed Technology Co.,Ltd. All rights reserved.
*****************************************************************************************
   * @file      ble_client.h
   * @brief     
   * @author    Hongtai.Liu
   * @date      2020-08-21
   * @version   v1.0
   **************************************************************************************
   * @attention
   * <h2><center>&copy; COPYRIGHT 2020 Seeed Technology Co.,Ltd</center></h2>
   **************************************************************************************
  */
#ifndef _BLE_CLIENT_H_
#define _BLE_CLIENT_H_

#ifdef __cplusplus
extern "C"
{
#endif /* __cplusplus */

/* Add Includes here */
#include "bt_flags.h"
#include "profile_client.h"
#include "ble_common.h"

  /** @brief  Discovery result type.*/
  typedef enum
  {
    BLE_CLIENT_ALL_PRIMARY_SRV_DISCOV, //!<Response type for BLE_CLIENT_all_primary_srv_discovery
    BLE_CLIENT_BY_UUID128_SRV_DISCOV,  //!<Response type for BLE_CLIENT_by_uuid128_srv_discovery
    BLE_CLIENT_BY_UUID_SRV_DISCOV,     //!<Response type for BLE_CLIENT_by_uuid_srv_discovery
    BLE_CLIENT_ALL_CHAR_DISCOV,        //!<Response type for BLE_CLIENT_all_char_discovery
    BLE_CLIENT_BY_UUID_CHAR_DISCOV,    //!<Response type for BLE_CLIENT_by_uuid_char_discovery
    BLE_CLIENT_BY_UUID128_CHAR_DISCOV, //!<Response type for BLE_CLIENT_by_uuid128_char_discovery
    BLE_CLIENT_ALL_CHAR_DESC_DISCOV,   //!<Response type for BLE_CLIENT_all_char_descriptor_discovery
  } T_BLE_CLIENT_DISCOV_TYPE;

  /** @brief  Discovery result element.*/
  typedef union {
    T_GATT_SERVICE_ELEM16 srv_uuid16_disc_data;
    T_GATT_SERVICE_ELEM128 srv_uuid128_disc_data;
    T_GATT_SERVICE_BY_UUID_ELEM srv_disc_data;
    T_GATT_CHARACT_ELEM16 char_uuid16_disc_data;
    T_GATT_CHARACT_ELEM128 char_uuid128_disc_data;
    T_GATT_CHARACT_DESC_ELEM16 char_desc_uuid16_disc_data;
    T_GATT_CHARACT_DESC_ELEM128 char_desc_uuid128_disc_data;
  } T_BLE_CLIENT_DISCOV_RESULT_DATA;

  /** @brief BLE client callback type */
  typedef enum
  {
    BLE_CLIENT_CB_TYPE_DISCOVERY_STATE,  //!< Discovery procedure state, done or pending.
    BLE_CLIENT_CB_TYPE_DISCOVERY_RESULT, //!< Discovery procedure state, done or pending.
    BLE_CLIENT_CB_TYPE_READ_RESULT,      //!< Read request's result data, responsed from server.
    BLE_CLIENT_CB_TYPE_WRITE_RESULT,
    BLE_CLIENT_CB_TYPE_NOTIF_IND,
    BLE_CLIENT_CB_TYPE_DISCONNECT_RESULT, //!< Invalid callback type, no practical usage.
    BLE_CLIENT_CB_TYPE_INVALID            //!< Invalid callback type, no practical usage.
  } T_BLE_CLIENT_CB_TYPE;

  /** @brief BLE client discovery result */

  typedef struct
  {
    T_DISCOVERY_STATE state;
  } T_BLE_CLIENT_DISCOVERY_STATE;

  typedef struct
  {
    T_DISCOVERY_RESULT_TYPE discov_type;
    T_BLE_CLIENT_DISCOV_RESULT_DATA result;
  } T_BLE_CLIENT_DISCOVERY_RESULT;

  /** @brief BLE client discovery result */
  typedef struct
  {
    uint8_t conn_id;
  } T_BLE_CLIENT_DISCONNECT_RESULT;

  /** @brief BLE client read data, used to inform app read response data */
  typedef struct
  {
    uint16_t cause;
    uint16_t handle;
    uint16_t value_size;
    uint8_t *p_value;
  } T_BLE_CLIENT_READ_RESULT;

  /** @brief BLE client write result, used to inform app write response data */
  typedef struct
  {
    uint16_t cause;
    uint16_t handle;
    T_GATT_WRITE_TYPE type;
  } T_BLE_CLIENT_WRITE_RESULT;

  /** @brief BLE client notification/indication*/
  typedef struct
  {
    bool notify;
    uint16_t handle;
    uint16_t value_size;
    uint8_t *p_value;
  } T_BLE_CLIENT_NOTIF_IND;

  /** @brief BLE client callback content */
  typedef union {
    T_BLE_CLIENT_DISCOVERY_STATE discov_state;
    T_BLE_CLIENT_DISCOVERY_RESULT discov_result;
    T_BLE_CLIENT_READ_RESULT read_result;
    T_BLE_CLIENT_WRITE_RESULT write_result;
    T_BLE_CLIENT_NOTIF_IND notif_ind;
    T_BLE_CLIENT_DISCONNECT_RESULT disconn_result;
  } T_BLE_CLIENT_CB_CONTENT;

  /** @brief BLE client callback data */
  typedef struct
  {
    uint8_t app_id;
    T_BLE_CLIENT_CB_TYPE cb_type;
    T_BLE_CLIENT_CB_CONTENT cb_content;
  } T_BLE_CLIENT_CB_DATA;

#ifdef __cplusplus
}
#endif

#endif