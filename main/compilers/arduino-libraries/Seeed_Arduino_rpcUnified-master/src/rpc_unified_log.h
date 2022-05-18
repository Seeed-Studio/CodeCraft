#ifndef _RPC_LOG_H
#define _RPC_LOG_H

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdio.h>
#include <stdlib.h>
#ifndef TAG
#define TAG "RPC"
#endif
//  #define ENABLE_RPC_DEBUG
// #define ENABLE_RPC_WARN
// #define ENABLE_RPC_INFO
// #define ENABLE_RPC_ERROR
// #define ENABLE_RPC_TRACE

	extern void rpc_printf(const char *format, ...);
/**
 * @brief Debug level logging macro.
 *
 * Macro to expose function, line number as well as desired log message.
 */
#ifdef ENABLE_RPC_DEBUG
#define RPC_DEBUG(...)                                       \
	{                                                        \
		rpc_printf("%s: ", TAG);                             \
		rpc_printf("DEBUG:   %s L#%d ", __func__, __LINE__); \
		rpc_printf(__VA_ARGS__);                             \
		rpc_printf("\n");                                    \
	}
#else
#define RPC_DEBUG(...)
#endif

/**
 * @brief Debug level trace logging macro.
 *
 * Macro to print message function entry and exit
 */
#ifdef ENABLE_RPC_TRACE
#define FUNC_ENTRY                                                  \
	{                                                               \
		rpc_printf("FUNC_ENTRY:   %s L#%d \n", __func__, __LINE__); \
	}
#define FUNC_EXIT                                                  \
	{                                                              \
		rpc_printf("FUNC_EXIT:   %s L#%d \n", __func__, __LINE__); \
	}
#define FUNC_EXIT_RC(x)                                                                \
	{                                                                                  \
		rpc_printf("FUNC_EXIT:   %s L#%d Return Code : %d \n", __func__, __LINE__, x); \
		return x;                                                                      \
	}
#else
#define FUNC_ENTRY

#define FUNC_EXIT
#define FUNC_EXIT_RC(x) \
	{                   \
		return x;       \
	}
#endif

/**
 * @brief Info level logging macro.
 *
 * Macro to expose desired log message.  Info messages do not include automatic function names and line numbers.
 */
#ifdef ENABLE_RPC_INFO
#define RPC_INFO(...)              \
	{                              \
		rpc_printf("[%s]: ", TAG); \
		rpc_printf(__VA_ARGS__);   \
		rpc_printf("\n\r");        \
	}
#else
#define RPC_INFO(...)
#endif

/**
 * @brief Warn level logging macro.
 *
 * Macro to expose function, line number as well as desired log message.
 */
#ifdef ENABLE_RPC_WARN
#define RPC_WARN(...)                                      \
	{                                                      \
		rpc_printf("%s: ", TAG);                           \
		rpc_printf("WARN:  %s L#%d ", __func__, __LINE__); \
		rpc_printf(__VA_ARGS__);                           \
		rpc_printf("\n\r");                                \
	}
#else
#define RPC_WARN(...)
#endif

/**
 * @brief Error level logging macro.
 *
 * Macro to expose function, line number as well as desired log message.
 */
#ifdef ENABLE_RPC_ERROR
#define RPC_ERROR(...)                                     \
	{                                                      \
		rpc_printf("%s: ", TAG);                           \
		rpc_printf("ERROR: %s L#%d ", __func__, __LINE__); \
		rpc_printf(__VA_ARGS__);                           \
		rpc_printf("\n\r");                                \
	}
#else
#define RPC_ERROR(...)
#endif

#ifdef __cplusplus
}
#endif

#endif // _RPC_LOG_H