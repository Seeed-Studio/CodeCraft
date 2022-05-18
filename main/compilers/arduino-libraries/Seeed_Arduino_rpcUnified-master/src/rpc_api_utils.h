#if !defined(_rpc_api_utils_h_)
#define _rpc_ble_utils_h_

#include "rpc_unified_log.h"

#define RPC_FUN_RETURN_0(FUN, RETURN) \
    do                                \
    {                                 \
        FUNC_ENTRY;                   \
        RETURN ret;                   \
        ret = (RETURN)rpc_##FUN();    \
        FUNC_EXIT;                    \
        return ret;                   \
    } while (0)

#define RPC_FUN_RETURN_1(FUN, PARAM0, RETURN) \
    do                                        \
    {                                         \
        FUNC_ENTRY;                           \
        RETURN ret;                           \
        ret = (RETURN)rpc_##FUN(PARAM0);      \
        FUNC_EXIT;                            \
        return ret;                           \
    } while (0)

#define RPC_FUN_RETURN_2(FUN, PARAM0, PARAM1, RETURN) \
    do                                                \
    {                                                 \
        FUNC_ENTRY;                                   \
        RETURN ret;                                   \
        ret = (RETURN)rpc_##FUN(PARAM0, PARAM1);      \
        FUNC_EXIT;                                    \
        return ret;                                   \
    } while (0)

#define RPC_FUN_RETURN_3(FUN, PARAM0, PARAM1, PARAM2, RETURN) \
    do                                                        \
    {                                                         \
        FUNC_ENTRY;                                           \
        RETURN ret;                                           \
        ret = (RETURN)rpc_##FUN(PARAM0, PARAM1, PARAM2);      \
        FUNC_EXIT;                                            \
        return ret;                                           \
    } while (0)

#define RPC_FUN_RETURN_4(FUN, PARAM0, PARAM1, PARAM2, PARAM3, RETURN) \
    do                                                                \
    {                                                                 \
        FUNC_ENTRY;                                                   \
        RETURN ret;                                                   \
        ret = (RETURN)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3);      \
        FUNC_EXIT;                                                    \
        return ret;                                                   \
    } while (0)

#define RPC_FUN_RETURN_5(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, RETURN) \
    do                                                                        \
    {                                                                         \
        FUNC_ENTRY;                                                           \
        RETURN ret;                                                           \
        ret = (RETURN)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3, PARAM4);      \
        FUNC_EXIT;                                                            \
        return ret;                                                           \
    } while (0)

#define RPC_FUN_RETURN_6(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, RETURN) \
    do                                                                                \
    {                                                                                 \
        FUNC_ENTRY;                                                                   \
        RETURN ret;                                                                   \
        ret = (RETURN)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5);      \
        FUNC_EXIT;                                                                    \
        return ret;                                                                   \
    } while (0)

#define RPC_FUN_RETURN_7(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6, RETURN) \
    do                                                                                        \
    {                                                                                         \
        FUNC_ENTRY;                                                                           \
        RETURN ret;                                                                           \
        ret = (RETURN)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6);      \
        FUNC_EXIT;                                                                            \
        return ret;                                                                           \
    } while (0)

#define RPC_FUN_RETURN_8(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6, PARAM7, RETURN) \
    do                                                                                                \
    {                                                                                                 \
        FUNC_ENTRY;                                                                                   \
        RETURN ret;                                                                                   \
        ret = (RETURN)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6, PARAM7);      \
        FUNC_EXIT;                                                                                    \
        return ret;                                                                                   \
    } while (0)

#define RPC_FUN_RETURN_VOID_0(FUN) \
    do                             \
    {                              \
        FUNC_ENTRY;                \
        (void)rpc_##FUN();         \
        FUNC_EXIT;                 \
        return;                    \
    } while (0)

#define RPC_FUN_RETURN_VOID_1(FUN, PARAM0) \
    do                                     \
    {                                      \
        FUNC_ENTRY;                        \
        (void)rpc_##FUN(PARAM0);           \
        FUNC_EXIT;                         \
        return;                            \
    } while (0)

#define RPC_FUN_RETURN_VOID_2(FUN, PARAM0, PARAM1) \
    do                                             \
    {                                              \
        FUNC_ENTRY;                                \
        (void)rpc_##FUN(PARAM0, PARAM1);           \
        FUNC_EXIT;                                 \
        return;                                    \
    } while (0)

#define RPC_FUN_RETURN_VOID_3(FUN, PARAM0, PARAM1, PARAM2) \
    do                                                     \
    {                                                      \
        FUNC_ENTRY;                                        \
        (void)rpc_##FUN(PARAM0, PARAM1, PARAM2);           \
        FUNC_EXIT;                                         \
        return;                                            \
    } while (0)

#define RPC_FUN_RETURN_VOID_4(FUN, PARAM0, PARAM1, PARAM2, PARAM3) \
    do                                                             \
    {                                                              \
        FUNC_ENTRY;                                                \
        (void)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3);           \
        FUNC_EXIT;                                                 \
        return;                                                    \
    } while (0)

#define RPC_FUN_RETURN_VOID_5(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4) \
    do                                                                     \
    {                                                                      \
        FUNC_ENTRY;                                                        \
        (void)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3, PARAM4);           \
        FUNC_EXIT;                                                         \
        return;                                                            \
    } while (0)

#define RPC_FUN_RETURN_VOID_6(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5) \
    do                                                                             \
    {                                                                              \
        FUNC_ENTRY;                                                                \
        (void)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5);           \
        FUNC_EXIT;                                                                 \
        return;                                                                    \
    } while (0)

#define RPC_FUN_RETURN_VOID_7(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6) \
    do                                                                                     \
    {                                                                                      \
        FUNC_ENTRY;                                                                        \
        (void)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6);           \
        FUNC_EXIT;                                                                         \
        return;                                                                            \
    } while (0)

#define RPC_FUN_RETURN_VOID_8(FUN, PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6, PARAM7) \
    do                                                                                             \
    {                                                                                              \
        FUNC_ENTRY;                                                                                \
        (void)rpc_##FUN(PARAM0, PARAM1, PARAM2, PARAM3, PARAM4, PARAM5, PARAM6, PARAM7);           \
        FUNC_EXIT;                                                                                 \
        return;                                                                                    \
    } while (0)

#endif