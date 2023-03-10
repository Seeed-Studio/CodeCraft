// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT

#ifndef _az_RETRY_INTERNAL_H
#define _az_RETRY_INTERNAL_H

#ifdef __cplusplus
 extern "C" {
#endif

#include <stdint.h>

#include "../_az_cfg_prefix.h"

AZ_NODISCARD AZ_INLINE int32_t
_az_retry_calc_delay(int32_t attempt, int32_t retry_delay_msec, int32_t max_retry_delay_msec)
{
  // scale exponentially
  int32_t const exponential_retry_after
      = retry_delay_msec * (attempt <= 30 ? (int32_t)(1U << (uint32_t)attempt) : INT32_MAX);

  return exponential_retry_after > max_retry_delay_msec ? max_retry_delay_msec
                                                        : exponential_retry_after;
}

#include "../_az_cfg_suffix.h"

#ifdef __cplusplus
}
#endif

#endif // _az_RETRY_INTERNAL_H
