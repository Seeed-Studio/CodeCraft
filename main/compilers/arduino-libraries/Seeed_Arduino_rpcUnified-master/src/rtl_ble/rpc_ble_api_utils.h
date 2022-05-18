#if !defined(_rpc_ble_api_utils_h_)
#define _rpc_ble_api_utils_h_

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
#include "profile_server.h"
#include "rpc_api_utils.h"

#define RPC_FUN_GAP_SET_PARAM(FUN, PARAM_TYPE)                         \
    do                                                                 \
    {                                                                  \
        FUNC_ENTRY;                                                    \
        T_GAP_CAUSE ret = GAP_CAUSE_SUCCESS;                           \
        binary_t value;                                                \
        value.dataLength = len;                                        \
        value.data = (uint8_t *)p_value;                               \
        ret = (T_GAP_CAUSE)rpc_##FUN((RPC_##PARAM_TYPE)param, &value); \
        FUNC_EXIT;                                                     \
        return ret;                                                    \
    } while (0)

#define RPC_FUN_GAP_GET_PARAM(FUN, PARAM_TYPE)                         \
    do                                                                 \
    {                                                                  \
        FUNC_ENTRY;                                                    \
        T_GAP_CAUSE ret = GAP_CAUSE_SUCCESS;                           \
        binary_t value;                                                \
        ret = (T_GAP_CAUSE)rpc_##FUN((RPC_##PARAM_TYPE)param, &value); \
        if (GAP_SUCCESS == ret)                                        \
            memcpy(p_value, value.data, value.dataLength);             \
        erpc_free(value.data);                                         \
        FUNC_EXIT;                                                     \
        return ret;                                                    \
    } while (0)

#define RPC_FUN_RETURN_CAUSE_0(FUN) \
    RPC_FUN_RETURN_0(FUN, T_GAP_CAUSE)

#define RPC_FUN_RETURN_CAUSE_1(FUN, PARAM0) \
    RPC_FUN_RETURN_1(FUN, PARAM0, T_GAP_CAUSE)

#define RPC_FUN_RETURN_CAUSE_2(FUN, PARAM0, PARAM1) \
    RPC_FUN_RETURN_2(FUN, PARAM0, PARAM1, T_GAP_CAUSE)

#define RPC_FUN_RETURN_CAUSE_3(FUN, PARAM0, PARAM1, PARAM2) \
    RPC_FUN_RETURN_3(FUN, PARAM0, PARAM1, PARAM2, T_GAP_CAUSE)

#define RPC_FUN_RETURN_CAUSE_4(FUN, PARAM0, PARAM1, PARAM2, PARAM3) \
    RPC_FUN_RETURN_4(FUN, PARAM0, PARAM1, PARAM2, PARAM3, T_GAP_CAUSE)

#define RPC_FUN_RETURN_CAUSE_5(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4) \
    RPC_FUN_RETURN_5(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, T_GAP_CAUSE)

#define RPC_FUN_RETURN_CAUSE_6(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5) \
    RPC_FUN_RETURN_6(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, T_GAP_CAUSE)

#define RPC_FUN_RETURN_CAUSE_7(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6) \
    RPC_FUN_RETURN_7(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6, T_GAP_CAUSE)

#define RPC_FUN_RETURN_CAUSE_8(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6, PARAM7) \
    RPC_FUN_RETURN_8(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6, PARAM7, T_GAP_CAUSE)

#endif /* _rpc_ble_api_utils_h_ */
