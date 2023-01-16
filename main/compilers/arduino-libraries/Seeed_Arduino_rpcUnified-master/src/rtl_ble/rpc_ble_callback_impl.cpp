#define TAG "BLE CALLBACK"
#include "Arduino.h"
#include "ble_unified.h"
#include "erpc/erpc_shim_unified.h"
#include "erpc/erpc_port.h"
#include "rpc_unified_log.h"


P_FUN_LE_APP_CB _ble_gap_callback = NULL;
P_FUN_HABDLE_GAP_MSG _handle_gap_msg = NULL;
P_FUN_GENERAL_APP_CB _ble_gattc_callback = NULL;
P_FUN_SERVER_GENERAL_CB _ble_gatts_callback = NULL;

RPC_T_APP_RESULT rpc_ble_handle_gap_msg(const binary_t *gap_msg)
{
    FUNC_ENTRY;
    RPC_T_APP_RESULT result = RPC_APP_RESULT_SUCCESS;

    if (_handle_gap_msg)
    {
        _handle_gap_msg((T_IO_MSG *)gap_msg->data);
    }
    FUNC_EXIT;
    return result;
}

RPC_T_APP_RESULT rpc_ble_gap_callback(uint8_t cb_type, const binary_t *cb_data)
{
    FUNC_ENTRY;
    RPC_T_APP_RESULT result = RPC_APP_RESULT_SUCCESS;

    T_LE_CB_DATA *p_cb_data = (T_LE_CB_DATA *)malloc(sizeof(T_LE_CB_DATA));

    switch (cb_type)
    {
    case GAP_MSG_LE_MODIFY_WHITE_LIST:
    {
        p_cb_data->p_le_modify_white_list_rsp = (T_LE_MODIFY_WHITE_LIST_RSP *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_CONN_UPDATE_IND:
    {
        p_cb_data->p_le_conn_update_ind = (T_LE_CONN_UPDATE_IND *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_PHY_UPDATE_INFO:
    {
        p_cb_data->p_le_phy_update_info = (T_LE_PHY_UPDATE_INFO *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_REMOTE_FEATS_INFO:
    {
        p_cb_data->p_le_remote_feats_info = (T_LE_REMOTE_FEATS_INFO *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_SCAN_INFO:
    {
        p_cb_data->p_le_scan_info = (T_LE_SCAN_INFO *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_ADV_UPDATE_PARAM:
    {
        p_cb_data->p_le_adv_update_param_rsp = (T_LE_ADV_UPDATE_PARAM_RSP *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_CREATE_CONN_IND:
    {
        p_cb_data->p_le_create_conn_ind = (T_LE_CREATE_CONN_IND *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_SET_RAND_ADDR:
    {
        p_cb_data->p_le_set_rand_addr_rsp = (T_LE_SET_RAND_ADDR_RSP *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_SET_HOST_CHANN_CLASSIF:
    {
        p_cb_data->p_le_set_host_chann_classif_rsp = (T_LE_SET_HOST_CHANN_CLASSIF_RSP *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_READ_RSSI:
    {
        p_cb_data->p_le_read_rssi_rsp = (T_LE_READ_RSSI_RSP *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_SET_DATA_LEN:
    {
        p_cb_data->p_le_set_data_len_rsp = (T_LE_SET_DATA_LEN_RSP *)cb_data->data;
        break;
    }
    case GAP_MSG_LE_DATA_LEN_CHANGE_INFO:
    {
        p_cb_data->p_le_data_len_change_info = (T_LE_DATA_LEN_CHANGE_INFO *)cb_data->data;
        break;
    }
    default:
    {
        break;
    }
    }

    if (_ble_gap_callback != NULL)
        result = (RPC_T_APP_RESULT)_ble_gap_callback(cb_type, p_cb_data);

    free(p_cb_data);
    FUNC_EXIT;
    return result;
}

RPC_T_APP_RESULT rpc_ble_gattc_callback(uint8_t client_id, uint8_t conn_id, const binary_t *cb_data, const binary_t *read_or_notify_data)
{
    FUNC_ENTRY;
    RPC_T_APP_RESULT result = RPC_APP_RESULT_SUCCESS;
    T_BLE_CLIENT_CB_DATA *p_data = (T_BLE_CLIENT_CB_DATA *)cb_data->data;
    switch (p_data->cb_type)
    {
    case BLE_CLIENT_CB_TYPE_READ_RESULT:
        p_data->cb_content.read_result.p_value = read_or_notify_data->data;
        break;
    case BLE_CLIENT_CB_TYPE_NOTIF_IND:
        p_data->cb_content.notif_ind.p_value = read_or_notify_data->data;
        break;
    default:
        break;
    }

    if (_ble_gattc_callback != NULL)
        result = (RPC_T_APP_RESULT)_ble_gattc_callback(client_id, conn_id, p_data);
    FUNC_EXIT;
    return result;
}

RPC_T_APP_RESULT rpc_ble_gatts_callback(uint8_t gatt_if, uint8_t conn_id, uint16_t attrib_index, RPC_T_SERVICE_CALLBACK_TYPE event, uint16_t property, binary_t *read_cb_data, const binary_t *write_cb_data, const binary_t *app_cb_data)
{
    FUNC_ENTRY;
    (void)app_cb_data;
    RPC_T_APP_RESULT result = RPC_APP_RESULT_SUCCESS;
    ble_service_cb_data_t *cb_data = (ble_service_cb_data_t *)malloc(sizeof(ble_service_cb_data_t));

    cb_data->attrib_handle = attrib_index;
    cb_data->conn_id = conn_id;

    switch (event)
    {
    case RPC_SERVICE_CALLBACK_TYPE_INDIFICATION_NOTIFICATION:
    {
        cb_data->event = SERVICE_CALLBACK_TYPE_INDIFICATION_NOTIFICATION;
        cb_data->cb_data_context.cccd_update_data.cccbits = property;
        break;
    }
    case RPC_SERVICE_CALLBACK_TYPE_READ_CHAR_VALUE:
    {
        cb_data->event = SERVICE_CALLBACK_TYPE_READ_CHAR_VALUE;
        cb_data->cb_data_context.read_data.offset = property;
        cb_data->cb_data_context.read_data.length = 0;
        cb_data->cb_data_context.read_data.p_value = NULL;
        break;
    }
    case RPC_SERVICE_CALLBACK_TYPE_WRITE_CHAR_VALUE:
        cb_data->event = SERVICE_CALLBACK_TYPE_WRITE_CHAR_VALUE;
        cb_data->cb_data_context.write_data.write_type = (T_WRITE_TYPE)property;
        cb_data->cb_data_context.write_data.length = write_cb_data->dataLength;
        cb_data->cb_data_context.write_data.p_value = write_cb_data->data;
        break;
    default:
        break;
    }

    if (_ble_gatts_callback != NULL)
        result = (RPC_T_APP_RESULT)_ble_gatts_callback((T_SERVER_ID)gatt_if, (void *)cb_data);

    if (event == RPC_SERVICE_CALLBACK_TYPE_READ_CHAR_VALUE)
    {
        if (cb_data->cb_data_context.read_data.p_value == NULL)
        {
            uint8_t *data = (uint8_t *)erpc_malloc(sizeof(uint8_t) * 1);
            *data = 0;
            read_cb_data->data = data;
            read_cb_data->dataLength = 1;
        }
        else
        {
            read_cb_data->dataLength = cb_data->cb_data_context.read_data.length;
            uint8_t *data = (uint8_t *)erpc_malloc(sizeof(uint8_t) * read_cb_data->dataLength);
            if (data == NULL)
            {
                read_cb_data->dataLength = 1;
                data = (uint8_t *)erpc_malloc(sizeof(uint8_t) * 1);
            }
            else
            {
                memcpy(data, cb_data->cb_data_context.read_data.p_value, read_cb_data->dataLength);
            }
            read_cb_data->data = data;
        }
    }
    free(cb_data);
    FUNC_EXIT;
    return result;
}
