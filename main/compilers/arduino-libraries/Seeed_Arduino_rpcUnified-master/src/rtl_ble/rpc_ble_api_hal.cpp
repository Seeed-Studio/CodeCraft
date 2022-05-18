
#define TAG "BLE API"
#include <stdlib.h>
#include <string.h>
#include "erpc/erpc_shim_unified.h"
#include "erpc/erpc_port.h"
#include "rpc_ble_api_utils.h"
#include "rpc_ble_api_hal.h"
#include "gap_adv.h"
#include "ble_common.h"
#include "profile_client.h"
#include "profile_server.h"
#include "ble_server.h"
#include "ble_client.h"

//! @brief Function to free space allocated inside struct binary_t
static void free_binary_t_struct(binary_t *data);

// Free space allocated inside struct binary_t function implementation
static void free_binary_t_struct(binary_t *data)
{
    if (data->data)
    {
        erpc_free(data->data);
    }
}

void ble_init()
{
   RPC_FUN_RETURN_VOID_0(ble_init);
}

void ble_deinit(void)
{
    RPC_FUN_RETURN_VOID_0(ble_deinit);
}

void ble_start()
{
    RPC_FUN_RETURN_VOID_0(ble_start);
}
//! @name rpc_gap
//@{
T_GAP_CAUSE gap_set_param(T_GAP_PARAM_TYPE param, uint8_t len, void *p_value)
{
    RPC_FUN_GAP_SET_PARAM(gap_set_param, T_GAP_PARAM_TYPE);
}

T_GAP_CAUSE gap_get_param(T_GAP_PARAM_TYPE param, void *p_value)
{
    RPC_FUN_GAP_GET_PARAM(gap_get_param, T_GAP_PARAM_TYPE);
}

T_GAP_CAUSE gap_set_pairable_mode(void)
{
    RPC_FUN_RETURN_CAUSE_0(gap_set_pairable_mode);
}
//@}
//! @name rpc_gap_bone
//@{
T_GAP_CAUSE le_bond_set_param(T_LE_BOND_PARAM_TYPE param, uint8_t len, void *p_value)
{
    RPC_FUN_GAP_SET_PARAM(le_bond_set_param, T_LE_BOND_PARAM_TYPE);
}
T_GAP_CAUSE le_bond_pair(uint8_t conn_id)
{
    RPC_FUN_RETURN_CAUSE_1(le_bond_pair, conn_id);
}
T_GAP_CAUSE le_bond_get_display_key(uint8_t conn_id, uint32_t *p_key)
{
    RPC_FUN_RETURN_CAUSE_2(le_bond_get_display_key, conn_id, p_key);
}
T_GAP_CAUSE le_bond_passkey_input_confirm(uint8_t conn_id, uint32_t passcode,
                                          T_GAP_CFM_CAUSE cause)
{
    RPC_FUN_RETURN_CAUSE_3(le_bond_passkey_input_confirm, conn_id, passcode, (RPC_T_GAP_CFM_CAUSE)cause);
}
T_GAP_CAUSE le_bond_oob_input_confirm(uint8_t conn_id, T_GAP_CFM_CAUSE cause)
{
    RPC_FUN_RETURN_CAUSE_2(le_bond_oob_input_confirm, conn_id, (RPC_T_GAP_CFM_CAUSE)cause);
}
T_GAP_CAUSE le_bond_just_work_confirm(uint8_t conn_id, T_GAP_CFM_CAUSE cause)
{
    RPC_FUN_RETURN_CAUSE_2(le_bond_just_work_confirm, conn_id, (RPC_T_GAP_CFM_CAUSE)cause);
}
T_GAP_CAUSE le_bond_passkey_display_confirm(uint8_t conn_id, T_GAP_CFM_CAUSE cause)
{
    RPC_FUN_RETURN_CAUSE_2(le_bond_passkey_display_confirm, conn_id, (RPC_T_GAP_CFM_CAUSE)cause);
}
T_GAP_CAUSE le_bond_user_confirm(uint8_t conn_id, T_GAP_CFM_CAUSE cause)
{
    RPC_FUN_RETURN_CAUSE_2(le_bond_user_confirm, conn_id, (RPC_T_GAP_CFM_CAUSE)cause);
}
T_GAP_CAUSE le_bond_cfg_local_key_distribute(uint8_t init_dist, uint8_t rsp_dist)
{
    RPC_FUN_RETURN_CAUSE_2(le_bond_cfg_local_key_distribute, init_dist, rsp_dist);
}
void le_bond_clear_all_keys(void)
{
    RPC_FUN_RETURN_VOID_0(le_bond_clear_all_keys);
}
T_GAP_CAUSE le_bond_delete_by_idx(uint8_t idx)
{
    RPC_FUN_RETURN_CAUSE_1(le_bond_delete_by_idx, idx);
}
T_GAP_CAUSE le_bond_delete_by_bd(uint8_t *bd_addr, T_GAP_REMOTE_ADDR_TYPE bd_type)
{
    RPC_FUN_RETURN_CAUSE_2(le_bond_delete_by_bd, bd_addr, (RPC_T_GAP_REMOTE_ADDR_TYPE)bd_type);
}
T_GAP_CAUSE le_bond_get_sec_level(uint8_t conn_id, T_GAP_SEC_LEVEL *p_type)
{
    RPC_FUN_RETURN_CAUSE_2(le_bond_get_sec_level, conn_id, (RPC_T_GAP_SEC_LEVEL *)p_type);
}
//@}

//! @name rpc_gap_le
//@{
bool le_gap_init(uint8_t link_num)
{
    RPC_FUN_RETURN_1(le_gap_init, link_num, bool);
}
void le_gap_msg_info_way(bool use_msg)
{
    RPC_FUN_RETURN_VOID_1(le_gap_msg_info_way, use_msg);
}
uint8_t le_get_max_link_num(void)
{
    RPC_FUN_RETURN_0(le_get_max_link_num, uint8_t);
}
extern P_FUN_LE_APP_CB _ble_gap_callback;
void le_register_app_cb(P_FUN_LE_APP_CB ble_gap_callback)
{
    FUNC_ENTRY;
    _ble_gap_callback = ble_gap_callback;
    FUNC_EXIT;
}
extern P_FUN_HABDLE_GAP_MSG _handle_gap_msg;
void le_register_msg_handler(P_FUN_HABDLE_GAP_MSG handle_gap_msg)
{
    FUNC_ENTRY;
    _handle_gap_msg = handle_gap_msg;
    FUNC_EXIT;
}

T_GAP_CAUSE le_set_gap_param(T_GAP_LE_PARAM_TYPE param, uint8_t len, void *p_value)
{
    RPC_FUN_GAP_SET_PARAM(le_set_gap_param, T_GAP_LE_PARAM_TYPE);
}
T_GAP_CAUSE le_get_gap_param(T_GAP_LE_PARAM_TYPE param, void *p_value)
{
    RPC_FUN_GAP_GET_PARAM(le_get_gap_param, T_GAP_LE_PARAM_TYPE);
}
T_GAP_CAUSE le_modify_white_list(T_GAP_WHITE_LIST_OP operation, uint8_t *bd_addr,
                                 T_GAP_REMOTE_ADDR_TYPE bd_type)
{
    RPC_FUN_RETURN_CAUSE_3(le_modify_white_list, (RPC_T_GAP_WHITE_LIST_OP)operation, bd_addr, (RPC_T_GAP_REMOTE_ADDR_TYPE)bd_type);
}
T_GAP_CAUSE le_gen_rand_addr(T_GAP_RAND_ADDR_TYPE rand_addr_type, uint8_t *random_bd)
{
    RPC_FUN_RETURN_CAUSE_2(le_gen_rand_addr, (RPC_T_GAP_RAND_ADDR_TYPE)rand_addr_type, random_bd);
}
T_GAP_CAUSE le_set_rand_addr(uint8_t *random_bd)
{
    RPC_FUN_RETURN_CAUSE_1(le_set_rand_addr, random_bd);
}
T_GAP_CAUSE le_cfg_local_identity_address(uint8_t *addr, T_GAP_IDENT_ADDR_TYPE type)
{
    RPC_FUN_RETURN_CAUSE_2(le_cfg_local_identity_address, addr, (RPC_T_GAP_IDENT_ADDR_TYPE)type);
}
T_GAP_CAUSE le_set_host_chann_classif(uint8_t *p_channel_map)
{
    RPC_FUN_RETURN_CAUSE_1(le_set_host_chann_classif, *p_channel_map);
}
T_GAP_CAUSE le_write_default_data_len(uint16_t tx_octets, uint16_t tx_time)
{
    RPC_FUN_RETURN_CAUSE_2(le_write_default_data_len, tx_octets, tx_time);
}
//@}

//! @name rpc_gap_config
//@{
void gap_config_cccd_not_check(T_GAP_CONFIG_GATT_CCCD_NOT_CHECK cccd_not_check_flag)
{
    RPC_FUN_RETURN_VOID_1(gap_config_cccd_not_check, (RPC_T_GAP_CONFIG_GATT_CCCD_NOT_CHECK)cccd_not_check_flag);
}

void gap_config_ccc_bits_count(uint8_t gatt_server_ccc_bits_count,
                               uint8_t gatt_storage_ccc_bits_count)
{
    RPC_FUN_RETURN_VOID_2(gap_config_ccc_bits_count, gatt_server_ccc_bits_count, gatt_storage_ccc_bits_count);
}

void gap_config_max_attribute_table_count(uint8_t gatt_max_attribute_table_count)
{
    RPC_FUN_RETURN_VOID_1(gap_config_max_attribute_table_count, gatt_max_attribute_table_count);
}

void gap_config_max_mtu_size(uint16_t att_max_mtu_size)
{
    RPC_FUN_RETURN_VOID_1(gap_config_max_mtu_size, att_max_mtu_size);
}

void gap_config_bte_pool_size(uint8_t bte_pool_size)
{
    RPC_FUN_RETURN_VOID_1(gap_config_bte_pool_size, bte_pool_size);
}

void gap_config_bt_report_buf_num(uint8_t bt_report_buf_num)
{
    RPC_FUN_RETURN_VOID_1(gap_config_bt_report_buf_num, bt_report_buf_num);
}

void gap_config_le_key_storage_flag(uint16_t le_key_storage_flag)
{
    RPC_FUN_RETURN_VOID_1(gap_config_le_key_storage_flag, le_key_storage_flag);
}

void gap_config_max_le_paired_device(uint8_t max_le_paired_device)
{
    RPC_FUN_RETURN_VOID_1(gap_config_max_le_paired_device, max_le_paired_device);
}

void gap_config_max_le_link_num(uint8_t le_link_num)
{
    RPC_FUN_RETURN_VOID_1(gap_config_max_le_link_num, le_link_num);
}
//@}

//! @name rpc_gap_adv
//@{
T_GAP_CAUSE le_adv_set_param(T_LE_ADV_PARAM_TYPE param, uint8_t len, void *p_value)
{
    RPC_FUN_GAP_SET_PARAM(le_adv_set_param, T_LE_ADV_PARAM_TYPE);
}

T_GAP_CAUSE le_adv_get_param(T_LE_ADV_PARAM_TYPE param, void *p_value)
{
    RPC_FUN_GAP_GET_PARAM(le_adv_get_param, T_LE_ADV_PARAM_TYPE);
}

T_GAP_CAUSE le_adv_start(void)
{
    RPC_FUN_RETURN_CAUSE_0(le_adv_start);
}

T_GAP_CAUSE le_adv_stop(void)
{
    RPC_FUN_RETURN_CAUSE_0(le_adv_stop);
}

T_GAP_CAUSE le_adv_update_param(void)
{
    RPC_FUN_RETURN_CAUSE_0(le_adv_stop);
}
//@}

//! @name rpc_gap_scan
//@{
T_GAP_CAUSE le_scan_set_param(T_LE_SCAN_PARAM_TYPE param, uint8_t len, void *p_value)
{
    RPC_FUN_GAP_SET_PARAM(le_scan_set_param, T_LE_SCAN_PARAM_TYPE);
}

T_GAP_CAUSE le_scan_get_param(T_LE_SCAN_PARAM_TYPE param, void *p_value)
{
    RPC_FUN_GAP_GET_PARAM(le_scan_get_param, T_LE_SCAN_PARAM_TYPE);
}

T_GAP_CAUSE le_scan_start(void)
{
    RPC_FUN_RETURN_CAUSE_0(le_scan_start);
}

T_GAP_CAUSE le_scan_timer_start(uint32_t tick)
{
    RPC_FUN_RETURN_1(le_scan_timer_start, (uint32_t)tick, T_GAP_CAUSE);
}

T_GAP_CAUSE le_scan_stop(void)
{
    RPC_FUN_RETURN_CAUSE_0(le_scan_stop);
}

bool le_scan_info_filter(bool enable, uint8_t offset, uint8_t len, uint8_t *p_filter)
{
    RPC_FUN_RETURN_4(le_scan_info_filter, enable, offset, len, p_filter, bool);
}
//@}

//! @name rpc_gap_conn
//@{

T_GAP_CAUSE le_get_conn_param(T_LE_CONN_PARAM_TYPE param, void *p_value, uint8_t conn_id)
{
    FUNC_ENTRY;
    T_GAP_CAUSE ret = GAP_CAUSE_SUCCESS;
    binary_t value;
    ret = (T_GAP_CAUSE)rpc_le_get_conn_param((RPC_T_LE_CONN_PARAM_TYPE)param, &value, conn_id);
    if (GAP_SUCCESS == ret)
        memcpy(p_value, value.data, value.dataLength);
    erpc_free(value.data);
    return ret;
}

bool le_get_conn_info(uint8_t conn_id, T_GAP_CONN_INFO *p_conn_info)
{
    RPC_FUN_RETURN_2(le_get_conn_info, conn_id, (RPC_T_GAP_CONN_INFO *)p_conn_info, bool);
}

bool le_get_conn_addr(uint8_t conn_id, uint8_t *bd_addr, uint8_t *bd_type)
{
    RPC_FUN_RETURN_3(le_get_conn_addr, conn_id, bd_addr, bd_type, bool);
}

bool le_get_conn_id(uint8_t *bd_addr, uint8_t bd_type, uint8_t *p_conn_id)
{
    RPC_FUN_RETURN_3(le_get_conn_id, bd_addr, bd_type, p_conn_id, bool);
}

uint8_t le_get_active_link_num(void)
{
    RPC_FUN_RETURN_0(le_get_active_link_num, uint8_t);
}

uint8_t le_get_idle_link_num(void)
{
    RPC_FUN_RETURN_0(le_get_idle_link_num, uint8_t);
}

T_GAP_CAUSE le_disconnect(uint8_t conn_id)
{
    RPC_FUN_RETURN_CAUSE_1(le_disconnect, conn_id);
}

T_GAP_CAUSE le_read_rssi(uint8_t conn_id)
{
    RPC_FUN_RETURN_CAUSE_1(le_read_rssi, conn_id);
}

T_GAP_CAUSE le_set_data_len(uint8_t conn_id, uint16_t tx_octets, uint16_t tx_time)
{
    RPC_FUN_RETURN_CAUSE_3(le_set_data_len, conn_id, tx_octets, tx_time);
}

T_GAP_CAUSE le_set_phy(uint8_t conn_id, uint8_t all_phys, uint8_t tx_phys, uint8_t rx_phys,
                       T_GAP_PHYS_OPTIONS phy_options)
{
    RPC_FUN_RETURN_CAUSE_5(le_set_phy, conn_id, all_phys, tx_phys, rx_phys, (RPC_T_GAP_PHYS_OPTIONS)phy_options);
}

T_GAP_CAUSE le_set_conn_param(T_GAP_CONN_PARAM_TYPE type,
                              T_GAP_LE_CONN_REQ_PARAM *p_conn_param)
{
    RPC_FUN_RETURN_CAUSE_2(le_set_conn_param, (RPC_T_GAP_CONN_PARAM_TYPE)type, (RPC_T_GAP_LE_CONN_REQ_PARAM *)p_conn_param);
}

T_GAP_CAUSE le_connect(uint8_t init_phys, uint8_t *remote_bd,
                       T_GAP_REMOTE_ADDR_TYPE remote_bd_type,
                       T_GAP_LOCAL_ADDR_TYPE local_bd_type, uint16_t scan_timeout)
{
    RPC_FUN_RETURN_CAUSE_5(le_connect, init_phys, remote_bd,
                           (RPC_T_GAP_REMOTE_ADDR_TYPE)remote_bd_type,
                           (RPC_T_GAP_LOCAL_ADDR_TYPE)local_bd_type, scan_timeout);
}

T_GAP_CAUSE le_update_conn_param(uint8_t conn_id,
                                 uint16_t conn_interval_min,
                                 uint16_t conn_interval_max,
                                 uint16_t conn_latency,
                                 uint16_t supervision_timeout,
                                 uint16_t ce_length_min,
                                 uint16_t ce_length_max)
{

    RPC_FUN_RETURN_CAUSE_7(le_update_conn_param,
                           conn_id,
                           conn_interval_min,
                           conn_interval_max,
                           conn_latency,
                           supervision_timeout,
                           ce_length_min,
                           ce_length_max);
}
//@}

//! @name rpc_gatt_client
//@{

extern P_FUN_GENERAL_APP_CB _ble_gattc_callback;
void le_register_gattc_cb(P_FUN_GENERAL_APP_CB ble_gattc_callback)
{
    FUNC_ENTRY;
    _ble_gattc_callback = ble_gattc_callback;
    FUNC_EXIT;
}

bool ble_client_init(uint8_t num)
{
    RPC_FUN_RETURN_1(ble_client_init, num, bool);
}

uint8_t ble_add_client(uint8_t app_id, uint8_t link_num)
{
    RPC_FUN_RETURN_2(ble_add_client, app_id, link_num, uint8_t);
}

T_GAP_CAUSE client_all_primary_srv_discovery(uint8_t conn_id, T_CLIENT_ID client_id)
{
    RPC_FUN_RETURN_CAUSE_2(client_all_primary_srv_discovery, conn_id, (T_CLIENT_ID)client_id);
}

T_GAP_CAUSE client_by_uuid_srv_discovery(uint8_t conn_id, T_CLIENT_ID client_id, uint16_t uuid16)
{
    RPC_FUN_RETURN_CAUSE_3(client_by_uuid_srv_discovery, conn_id, client_id, uuid16);
}

T_GAP_CAUSE client_by_uuid128_srv_discovery(uint8_t conn_id, T_CLIENT_ID client_id,
                                            uint8_t *p_uuid128)
{
    RPC_FUN_RETURN_CAUSE_3(client_by_uuid128_srv_discovery, conn_id, client_id, p_uuid128);
}
T_GAP_CAUSE client_relationship_discovery(uint8_t conn_id, T_CLIENT_ID client_id,
                                          uint16_t start_handle, uint16_t end_handle)
{
    RPC_FUN_RETURN_CAUSE_4(client_relationship_discovery, conn_id, client_id, start_handle, end_handle);
}
T_GAP_CAUSE client_all_char_discovery(uint8_t conn_id, T_CLIENT_ID client_id, uint16_t start_handle,
                                      uint16_t end_handle)
{
    RPC_FUN_RETURN_CAUSE_4(client_all_char_discovery, conn_id, client_id, start_handle, end_handle);
}
T_GAP_CAUSE client_by_uuid_char_discovery(uint8_t conn_id, T_CLIENT_ID client_id,
                                          uint16_t start_handle,
                                          uint16_t end_handle, uint16_t uuid16)
{
    RPC_FUN_RETURN_CAUSE_5(client_by_uuid_char_discovery, conn_id, client_id, start_handle, end_handle, uuid16);
}
T_GAP_CAUSE client_by_uuid128_char_discovery(uint8_t conn_id, T_CLIENT_ID client_id,
                                             uint16_t start_handle,
                                             uint16_t end_handle, uint8_t *p_uuid128)
{
    RPC_FUN_RETURN_CAUSE_5(client_by_uuid128_char_discovery, conn_id, client_id, start_handle, end_handle, p_uuid128);
}
T_GAP_CAUSE client_all_char_descriptor_discovery(uint8_t conn_id, T_CLIENT_ID client_id,
                                                 uint16_t start_handle, uint16_t end_handle)
{
    RPC_FUN_RETURN_CAUSE_4(client_all_char_descriptor_discovery, conn_id, client_id, start_handle, end_handle);
}

T_GAP_CAUSE client_attr_read(uint8_t conn_id, T_CLIENT_ID client_id, uint16_t handle)
{
    RPC_FUN_RETURN_CAUSE_3(client_attr_read, conn_id, client_id, handle);
}

T_GAP_CAUSE client_attr_read_using_uuid(uint8_t conn_id, T_CLIENT_ID client_id,
                                        uint16_t start_handle,
                                        uint16_t end_handle, uint16_t uuid16, uint8_t *p_uuid128)
{
    RPC_FUN_RETURN_CAUSE_6(client_attr_read_using_uuid, conn_id, client_id, start_handle, end_handle, uuid16, p_uuid128);
}
T_GAP_CAUSE client_attr_write(uint8_t conn_id, T_CLIENT_ID client_id,
                              T_GATT_WRITE_TYPE write_type,
                              uint16_t handle, uint16_t length, uint8_t *p_data)
{
    binary_t data;
    data.dataLength = length;
    data.data = p_data;
    RPC_FUN_RETURN_CAUSE_5(client_attr_write, conn_id, client_id, (RPC_T_GATT_WRITE_TYPE)write_type, handle, &data);
}
T_GAP_CAUSE client_attr_ind_confirm(uint8_t conn_id)
{
    RPC_FUN_RETURN_CAUSE_1(client_attr_ind_confirm, conn_id);
}
//@}

//! @name rpc_gatt_server
//@{
extern P_FUN_SERVER_GENERAL_CB _ble_gatts_callback;
void le_register_gatts_cb(P_FUN_SERVER_GENERAL_CB ble_gatts_callback)
{
    FUNC_ENTRY;
    _ble_gatts_callback = ble_gatts_callback;
    FUNC_EXIT;
}

bool ble_server_init(uint8_t num)
{
    RPC_FUN_RETURN_1(ble_server_init, (uint8_t)num, bool);
}
T_SERVER_ID ble_service_start(uint8_t app_id)
{
    RPC_FUN_RETURN_1(ble_service_start, (uint8_t)app_id, T_SERVER_ID);
}
uint8_t ble_create_service(ble_service_t service)
{
    return rpc_ble_create_service(service.uuid, service.uuid_length, service.is_primary);
}
bool ble_delete_service(uint8_t app_id)
{
    RPC_FUN_RETURN_1(ble_delete_service, (uint8_t)app_id, bool);
}
T_SERVER_ID ble_get_servie_handle(uint8_t app_id)
{
    RPC_FUN_RETURN_1(ble_get_servie_handle, (uint8_t)app_id, T_SERVER_ID);
}
uint16_t ble_create_char(uint8_t app_id, ble_char_t CHAR)
{
    RPC_FUN_RETURN_5(ble_create_char, app_id, CHAR.uuid, CHAR.uuid_length, CHAR.properties, CHAR.permissions, uint16_t);
}
uint16_t ble_create_desc(uint8_t app_id, uint16_t char_handle, ble_desc_t desc)
{
    if (desc.p_value == NULL)
    {
        RPC_FUN_RETURN_8(ble_create_desc, app_id, char_handle, desc.uuid, desc.uuid_length, desc.flags, desc.permissions, desc.vlaue_length, NULL, uint16_t);
    }
    else
    {
        binary_t value;
        value.dataLength = desc.vlaue_length;
        value.data = desc.p_value;
        RPC_FUN_RETURN_8(ble_create_desc, app_id, char_handle, desc.uuid, desc.uuid_length, desc.flags, desc.permissions, desc.vlaue_length, &value, uint16_t);
    }
}

uint16_t ble_server_get_attr_value(uint8_t app_id, uint16_t handle, uint8_t *p_value)
{
    FUNC_ENTRY;
    binary_t *data = rpc_ble_server_get_attr_value(app_id, handle);
    uint16_t value_len = 0;
    if (data != NULL)
    {
        memcpy(p_value, data->data, data->dataLength);
        value_len = data->dataLength;
        if (data)
        {
            free_binary_t_struct(data);
        }
        if (data)
        {
            erpc_free(data);
        }
    }
    FUNC_EXIT;
    return value_len;
}

bool server_attr_read_confirm(uint8_t conn_id, T_SERVER_ID service_id, uint16_t attrib_index, uint8_t *p_data, uint16_t length, T_APP_RESULT cause)
{
    binary_t data;
    data.data = p_data;
    data.dataLength = length;
    RPC_FUN_RETURN_5(server_attr_read_confirm, conn_id, service_id, attrib_index, &data, (RPC_T_APP_RESULT)cause, bool);
}

bool server_exec_write_confirm(uint8_t conn_id, uint16_t cause, uint16_t handle)
{
    RPC_FUN_RETURN_3(server_exec_write_confirm, conn_id, cause, handle, bool);
}

bool server_attr_write_confirm(uint8_t conn_id, T_SERVER_ID service_id, uint16_t attrib_index, T_APP_RESULT cause)
{
    RPC_FUN_RETURN_4(server_attr_write_confirm, conn_id, service_id, attrib_index, (RPC_T_APP_RESULT)cause, bool);
}

bool server_send_data(uint8_t conn_id, T_SERVER_ID service_id, uint16_t attrib_index, uint8_t *p_data, uint16_t data_len, T_GATT_PDU_TYPE type)
{
    binary_t data;
    data.data = p_data;
    data.dataLength = data_len;
    RPC_FUN_RETURN_5(server_send_data, conn_id, service_id, attrib_index, &data, (RPC_T_GATT_PDU_TYPE)type, bool);
}
//@}

//! @name rpc_gap_storage
//@{
uint32_t flash_save_local_name(T_LOCAL_NAME *p_data)
{
    RPC_FUN_RETURN_1(flash_save_local_name, (RPC_T_LOCAL_NAME *)p_data, uint32_t);
}

uint32_t flash_load_local_name(T_LOCAL_NAME *p_data)
{
    RPC_FUN_RETURN_1(flash_load_local_name, (RPC_T_LOCAL_NAME *)p_data, uint32_t);
}

uint32_t flash_save_local_appearance(T_LOCAL_APPEARANCE *p_data)
{
    RPC_FUN_RETURN_1(flash_save_local_appearance, (RPC_T_LOCAL_APPEARANCE *)p_data, uint32_t);
}

uint32_t flash_load_local_appearance(T_LOCAL_APPEARANCE *p_data)
{
    RPC_FUN_RETURN_1(flash_load_local_appearance, (RPC_T_LOCAL_APPEARANCE *)p_data, uint32_t);
}

T_LE_KEY_ENTRY *le_find_key_entry(uint8_t *bd_addr, T_GAP_REMOTE_ADDR_TYPE bd_type)
{
    RPC_FUN_RETURN_2(le_find_key_entry, bd_addr, (RPC_T_GAP_REMOTE_ADDR_TYPE)bd_type, T_LE_KEY_ENTRY *);
}

T_LE_KEY_ENTRY *le_find_key_entry_by_idx(uint8_t idx)
{
    RPC_FUN_RETURN_1(le_find_key_entry_by_idx, idx, T_LE_KEY_ENTRY *);
}

uint8_t le_get_bond_dev_num(void)
{
    RPC_FUN_RETURN_0(le_get_bond_dev_num, uint8_t);
}

T_LE_KEY_ENTRY *le_get_low_priority_bond(void)
{
    RPC_FUN_RETURN_0(le_get_low_priority_bond, T_LE_KEY_ENTRY *);
}

T_LE_KEY_ENTRY *le_get_high_priority_bond(void)
{
    RPC_FUN_RETURN_0(le_get_high_priority_bond, T_LE_KEY_ENTRY *);
}

bool le_set_high_priority_bond(uint8_t *bd_addr, T_GAP_REMOTE_ADDR_TYPE bd_type)
{
    RPC_FUN_RETURN_2(le_find_key_entry, bd_addr, (RPC_T_GAP_REMOTE_ADDR_TYPE)bd_type, bool);
}

bool le_resolve_random_address(uint8_t *unresolved_addr, uint8_t *resolved_addr,
                               T_GAP_IDENT_ADDR_TYPE *resolved_addr_type)
{
    RPC_FUN_RETURN_3(le_resolve_random_address, unresolved_addr, resolved_addr, (RPC_T_GAP_IDENT_ADDR_TYPE *)resolved_addr_type, bool);
}

bool le_get_cccd_data(T_LE_KEY_ENTRY *p_entry, T_LE_CCCD *p_data)
{
    RPC_FUN_RETURN_2(le_get_cccd_data, (RPC_T_LE_KEY_ENTRY *)p_entry, (RPC_T_LE_CCCD *)p_data, bool);
}

bool le_gen_bond_dev(uint8_t *bd_addr, T_GAP_REMOTE_ADDR_TYPE bd_type,
                     T_GAP_LOCAL_ADDR_TYPE local_bd_type,
                     uint8_t ltk_length, uint8_t *local_ltk, T_LE_KEY_TYPE key_type, T_LE_CCCD *p_cccd)
{
    binary_t data;
    data.dataLength = ltk_length;
    data.data = local_ltk;
    RPC_FUN_RETURN_6(le_gen_bond_dev, bd_addr, (RPC_T_GAP_REMOTE_ADDR_TYPE)bd_type, (RPC_T_GAP_LOCAL_ADDR_TYPE)local_bd_type, &data, (RPC_T_LE_KEY_TYPE)key_type, (RPC_T_LE_CCCD *)p_cccd, bool);
}

uint16_t le_get_dev_bond_info_len(void)
{
    RPC_FUN_RETURN_0(le_get_dev_bond_info_len, uint16_t);
}

// bool le_get_dev_bond_info(T_LE_KEY_ENTRY *p_entry, uint8_t *p_data)
// {
//     RPC_FUN_RETURN_2(le_get_dev_bond_info, (RPC_T_LE_KEY_ENTRY *)p_entry, p_data, bool);
// }

T_LE_KEY_ENTRY *le_set_dev_bond_info(uint16_t length, uint8_t *p_data, bool *exist)
{
    binary_t data;
    data.dataLength = length;
    data.data = p_data;
    RPC_FUN_RETURN_2(le_set_dev_bond_info, &data, exist, T_LE_KEY_ENTRY *);
}
//@}
