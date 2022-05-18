#if !defined(_rpc_ble_api__hal_h_)
#define _rpc_ble_api__hal_h_

#include "bt_types.h"
#include "gap.h"
#include "gap_adv.h"
#include "gap_bond_le.h"
#include "gap_callback_le.h"
#include "gap_config.h"
#include "gap_conn_le.h"
#include "gap_le.h"
#include "gap_le_types.h"
#include "gap_msg.h"
#include "gap_privacy.h"
#include "gap_scan.h"
#include "gap_storage_le.h"
#include "app_msg.h"
#include "profile_client.h"

typedef void (*P_FUN_HABDLE_GAP_MSG)(T_IO_MSG *p_gap_msg);


void ble_start(void);
void ble_init(void);
void ble_deinit(void);
void le_register_app_cb(P_FUN_LE_APP_CB gap_callback);
void le_register_msg_handler(P_FUN_HABDLE_GAP_MSG handle_gap_msg);
void le_register_gattc_cb(P_FUN_GENERAL_APP_CB ble_gattc_callback);
void le_register_gatts_cb(P_FUN_SERVER_GENERAL_CB ble_gatts_callback);
bool ble_client_init(uint8_t num);
uint8_t ble_add_client(uint8_t app_id, uint8_t link_num);
T_GAP_CAUSE le_scan_timer_start(uint32_t tick);

#endif /* _rpc_ble_api__hal_h_ */