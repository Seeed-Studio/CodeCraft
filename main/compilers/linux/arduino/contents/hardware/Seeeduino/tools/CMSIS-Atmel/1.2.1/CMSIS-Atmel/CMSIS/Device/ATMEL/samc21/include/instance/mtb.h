/**
 * \file
 *
 * \brief Instance description for MTB
 *
 * Copyright (c) 2015 Atmel Corporation. All rights reserved.
 *
 * \asf_license_start
 *
 * \page License
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. The name of Atmel may not be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * 4. This software may only be redistributed and used in connection with an
 *    Atmel microcontroller product.
 *
 * THIS SOFTWARE IS PROVIDED BY ATMEL "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE
 * EXPRESSLY AND SPECIFICALLY DISCLAIMED. IN NO EVENT SHALL ATMEL BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * \asf_license_stop
 *
 */

#ifndef _SAMC21_MTB_INSTANCE_
#define _SAMC21_MTB_INSTANCE_

/* ========== Register definition for MTB peripheral ========== */
#if (defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
#define REG_MTB_POSITION           (0x41008000U) /**< \brief (MTB) MTB Position */
#define REG_MTB_MASTER             (0x41008004U) /**< \brief (MTB) MTB Master */
#define REG_MTB_FLOW               (0x41008008U) /**< \brief (MTB) MTB Flow */
#define REG_MTB_BASE               (0x4100800CU) /**< \brief (MTB) MTB Base */
#define REG_MTB_ITCTRL             (0x41008F00U) /**< \brief (MTB) MTB Integration Mode Control */
#define REG_MTB_CLAIMSET           (0x41008FA0U) /**< \brief (MTB) MTB Claim Set */
#define REG_MTB_CLAIMCLR           (0x41008FA4U) /**< \brief (MTB) MTB Claim Clear */
#define REG_MTB_LOCKACCESS         (0x41008FB0U) /**< \brief (MTB) MTB Lock Access */
#define REG_MTB_LOCKSTATUS         (0x41008FB4U) /**< \brief (MTB) MTB Lock Status */
#define REG_MTB_AUTHSTATUS         (0x41008FB8U) /**< \brief (MTB) MTB Authentication Status */
#define REG_MTB_DEVARCH            (0x41008FBCU) /**< \brief (MTB) MTB Device Architecture */
#define REG_MTB_DEVID              (0x41008FC8U) /**< \brief (MTB) MTB Device Configuration */
#define REG_MTB_DEVTYPE            (0x41008FCCU) /**< \brief (MTB) MTB Device Type */
#define REG_MTB_PID4               (0x41008FD0U) /**< \brief (MTB) Peripheral Identification 4 */
#define REG_MTB_PID5               (0x41008FD4U) /**< \brief (MTB) Peripheral Identification 5 */
#define REG_MTB_PID6               (0x41008FD8U) /**< \brief (MTB) Peripheral Identification 6 */
#define REG_MTB_PID7               (0x41008FDCU) /**< \brief (MTB) Peripheral Identification 7 */
#define REG_MTB_PID0               (0x41008FE0U) /**< \brief (MTB) Peripheral Identification 0 */
#define REG_MTB_PID1               (0x41008FE4U) /**< \brief (MTB) Peripheral Identification 1 */
#define REG_MTB_PID2               (0x41008FE8U) /**< \brief (MTB) Peripheral Identification 2 */
#define REG_MTB_PID3               (0x41008FECU) /**< \brief (MTB) Peripheral Identification 3 */
#define REG_MTB_CID0               (0x41008FF0U) /**< \brief (MTB) Component Identification 0 */
#define REG_MTB_CID1               (0x41008FF4U) /**< \brief (MTB) Component Identification 1 */
#define REG_MTB_CID2               (0x41008FF8U) /**< \brief (MTB) Component Identification 2 */
#define REG_MTB_CID3               (0x41008FFCU) /**< \brief (MTB) Component Identification 3 */
#else
#define REG_MTB_POSITION           (*(RwReg  *)0x41008000U) /**< \brief (MTB) MTB Position */
#define REG_MTB_MASTER             (*(RwReg  *)0x41008004U) /**< \brief (MTB) MTB Master */
#define REG_MTB_FLOW               (*(RwReg  *)0x41008008U) /**< \brief (MTB) MTB Flow */
#define REG_MTB_BASE               (*(RoReg  *)0x4100800CU) /**< \brief (MTB) MTB Base */
#define REG_MTB_ITCTRL             (*(RwReg  *)0x41008F00U) /**< \brief (MTB) MTB Integration Mode Control */
#define REG_MTB_CLAIMSET           (*(RwReg  *)0x41008FA0U) /**< \brief (MTB) MTB Claim Set */
#define REG_MTB_CLAIMCLR           (*(RwReg  *)0x41008FA4U) /**< \brief (MTB) MTB Claim Clear */
#define REG_MTB_LOCKACCESS         (*(RwReg  *)0x41008FB0U) /**< \brief (MTB) MTB Lock Access */
#define REG_MTB_LOCKSTATUS         (*(RoReg  *)0x41008FB4U) /**< \brief (MTB) MTB Lock Status */
#define REG_MTB_AUTHSTATUS         (*(RoReg  *)0x41008FB8U) /**< \brief (MTB) MTB Authentication Status */
#define REG_MTB_DEVARCH            (*(RoReg  *)0x41008FBCU) /**< \brief (MTB) MTB Device Architecture */
#define REG_MTB_DEVID              (*(RoReg  *)0x41008FC8U) /**< \brief (MTB) MTB Device Configuration */
#define REG_MTB_DEVTYPE            (*(RoReg  *)0x41008FCCU) /**< \brief (MTB) MTB Device Type */
#define REG_MTB_PID4               (*(RoReg  *)0x41008FD0U) /**< \brief (MTB) Peripheral Identification 4 */
#define REG_MTB_PID5               (*(RoReg  *)0x41008FD4U) /**< \brief (MTB) Peripheral Identification 5 */
#define REG_MTB_PID6               (*(RoReg  *)0x41008FD8U) /**< \brief (MTB) Peripheral Identification 6 */
#define REG_MTB_PID7               (*(RoReg  *)0x41008FDCU) /**< \brief (MTB) Peripheral Identification 7 */
#define REG_MTB_PID0               (*(RoReg  *)0x41008FE0U) /**< \brief (MTB) Peripheral Identification 0 */
#define REG_MTB_PID1               (*(RoReg  *)0x41008FE4U) /**< \brief (MTB) Peripheral Identification 1 */
#define REG_MTB_PID2               (*(RoReg  *)0x41008FE8U) /**< \brief (MTB) Peripheral Identification 2 */
#define REG_MTB_PID3               (*(RoReg  *)0x41008FECU) /**< \brief (MTB) Peripheral Identification 3 */
#define REG_MTB_CID0               (*(RoReg  *)0x41008FF0U) /**< \brief (MTB) Component Identification 0 */
#define REG_MTB_CID1               (*(RoReg  *)0x41008FF4U) /**< \brief (MTB) Component Identification 1 */
#define REG_MTB_CID2               (*(RoReg  *)0x41008FF8U) /**< \brief (MTB) Component Identification 2 */
#define REG_MTB_CID3               (*(RoReg  *)0x41008FFCU) /**< \brief (MTB) Component Identification 3 */
#endif /* (defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */


#endif /* _SAMC21_MTB_INSTANCE_ */
