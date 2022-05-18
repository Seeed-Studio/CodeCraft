/**
 * \file
 *
 * \brief Instance description for TC0
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

#ifndef _SAMC21_TC0_INSTANCE_
#define _SAMC21_TC0_INSTANCE_

/* ========== Register definition for TC0 peripheral ========== */
#if (defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
#define REG_TC0_CTRLA              (0x42003000U) /**< \brief (TC0) Control A */
#define REG_TC0_CTRLBCLR           (0x42003004U) /**< \brief (TC0) Control B Clear */
#define REG_TC0_CTRLBSET           (0x42003005U) /**< \brief (TC0) Control B Set */
#define REG_TC0_EVCTRL             (0x42003006U) /**< \brief (TC0) Event Control */
#define REG_TC0_INTENCLR           (0x42003008U) /**< \brief (TC0) Interrupt Enable Clear */
#define REG_TC0_INTENSET           (0x42003009U) /**< \brief (TC0) Interrupt Enable Set */
#define REG_TC0_INTFLAG            (0x4200300AU) /**< \brief (TC0) Interrupt Flag Status and Clear */
#define REG_TC0_STATUS             (0x4200300BU) /**< \brief (TC0) Status */
#define REG_TC0_WAVE               (0x4200300CU) /**< \brief (TC0) Waveform Generation Control */
#define REG_TC0_DRVCTRL            (0x4200300DU) /**< \brief (TC0) Control C */
#define REG_TC0_DBGCTRL            (0x4200300FU) /**< \brief (TC0) Debug Control */
#define REG_TC0_SYNCBUSY           (0x42003010U) /**< \brief (TC0) Synchronization Status */
#define REG_TC0_COUNT16_COUNT      (0x42003014U) /**< \brief (TC0) COUNT16 Count */
#define REG_TC0_COUNT16_CC0        (0x4200301CU) /**< \brief (TC0) COUNT16 Compare and Capture 0 */
#define REG_TC0_COUNT16_CC1        (0x4200301EU) /**< \brief (TC0) COUNT16 Compare and Capture 1 */
#define REG_TC0_COUNT16_CCBUF0     (0x42003030U) /**< \brief (TC0) COUNT16 Compare and Capture Buffer 0 */
#define REG_TC0_COUNT16_CCBUF1     (0x42003032U) /**< \brief (TC0) COUNT16 Compare and Capture Buffer 1 */
#define REG_TC0_COUNT32_COUNT      (0x42003014U) /**< \brief (TC0) COUNT32 Count */
#define REG_TC0_COUNT32_CC0        (0x4200301CU) /**< \brief (TC0) COUNT32 Compare and Capture 0 */
#define REG_TC0_COUNT32_CC1        (0x42003020U) /**< \brief (TC0) COUNT32 Compare and Capture 1 */
#define REG_TC0_COUNT32_CCBUF0     (0x42003030U) /**< \brief (TC0) COUNT32 Compare and Capture Buffer 0 */
#define REG_TC0_COUNT32_CCBUF1     (0x42003034U) /**< \brief (TC0) COUNT32 Compare and Capture Buffer 1 */
#define REG_TC0_COUNT8_COUNT       (0x42003014U) /**< \brief (TC0) COUNT8 Count */
#define REG_TC0_COUNT8_PER         (0x4200301BU) /**< \brief (TC0) COUNT8 Period */
#define REG_TC0_COUNT8_CC0         (0x4200301CU) /**< \brief (TC0) COUNT8 Compare and Capture 0 */
#define REG_TC0_COUNT8_CC1         (0x4200301DU) /**< \brief (TC0) COUNT8 Compare and Capture 1 */
#define REG_TC0_COUNT8_PERBUF      (0x4200302FU) /**< \brief (TC0) COUNT8 Period Buffer */
#define REG_TC0_COUNT8_CCBUF0      (0x42003030U) /**< \brief (TC0) COUNT8 Compare and Capture Buffer 0 */
#define REG_TC0_COUNT8_CCBUF1      (0x42003031U) /**< \brief (TC0) COUNT8 Compare and Capture Buffer 1 */
#else
#define REG_TC0_CTRLA              (*(RwReg  *)0x42003000U) /**< \brief (TC0) Control A */
#define REG_TC0_CTRLBCLR           (*(RwReg8 *)0x42003004U) /**< \brief (TC0) Control B Clear */
#define REG_TC0_CTRLBSET           (*(RwReg8 *)0x42003005U) /**< \brief (TC0) Control B Set */
#define REG_TC0_EVCTRL             (*(RwReg16*)0x42003006U) /**< \brief (TC0) Event Control */
#define REG_TC0_INTENCLR           (*(RwReg8 *)0x42003008U) /**< \brief (TC0) Interrupt Enable Clear */
#define REG_TC0_INTENSET           (*(RwReg8 *)0x42003009U) /**< \brief (TC0) Interrupt Enable Set */
#define REG_TC0_INTFLAG            (*(RwReg8 *)0x4200300AU) /**< \brief (TC0) Interrupt Flag Status and Clear */
#define REG_TC0_STATUS             (*(RwReg8 *)0x4200300BU) /**< \brief (TC0) Status */
#define REG_TC0_WAVE               (*(RwReg8 *)0x4200300CU) /**< \brief (TC0) Waveform Generation Control */
#define REG_TC0_DRVCTRL            (*(RwReg8 *)0x4200300DU) /**< \brief (TC0) Control C */
#define REG_TC0_DBGCTRL            (*(RwReg8 *)0x4200300FU) /**< \brief (TC0) Debug Control */
#define REG_TC0_SYNCBUSY           (*(RoReg  *)0x42003010U) /**< \brief (TC0) Synchronization Status */
#define REG_TC0_COUNT16_COUNT      (*(RwReg16*)0x42003014U) /**< \brief (TC0) COUNT16 Count */
#define REG_TC0_COUNT16_CC0        (*(RwReg16*)0x4200301CU) /**< \brief (TC0) COUNT16 Compare and Capture 0 */
#define REG_TC0_COUNT16_CC1        (*(RwReg16*)0x4200301EU) /**< \brief (TC0) COUNT16 Compare and Capture 1 */
#define REG_TC0_COUNT16_CCBUF0     (*(RwReg16*)0x42003030U) /**< \brief (TC0) COUNT16 Compare and Capture Buffer 0 */
#define REG_TC0_COUNT16_CCBUF1     (*(RwReg16*)0x42003032U) /**< \brief (TC0) COUNT16 Compare and Capture Buffer 1 */
#define REG_TC0_COUNT32_COUNT      (*(RwReg  *)0x42003014U) /**< \brief (TC0) COUNT32 Count */
#define REG_TC0_COUNT32_CC0        (*(RwReg  *)0x4200301CU) /**< \brief (TC0) COUNT32 Compare and Capture 0 */
#define REG_TC0_COUNT32_CC1        (*(RwReg  *)0x42003020U) /**< \brief (TC0) COUNT32 Compare and Capture 1 */
#define REG_TC0_COUNT32_CCBUF0     (*(RwReg  *)0x42003030U) /**< \brief (TC0) COUNT32 Compare and Capture Buffer 0 */
#define REG_TC0_COUNT32_CCBUF1     (*(RwReg  *)0x42003034U) /**< \brief (TC0) COUNT32 Compare and Capture Buffer 1 */
#define REG_TC0_COUNT8_COUNT       (*(RwReg8 *)0x42003014U) /**< \brief (TC0) COUNT8 Count */
#define REG_TC0_COUNT8_PER         (*(RwReg8 *)0x4200301BU) /**< \brief (TC0) COUNT8 Period */
#define REG_TC0_COUNT8_CC0         (*(RwReg8 *)0x4200301CU) /**< \brief (TC0) COUNT8 Compare and Capture 0 */
#define REG_TC0_COUNT8_CC1         (*(RwReg8 *)0x4200301DU) /**< \brief (TC0) COUNT8 Compare and Capture 1 */
#define REG_TC0_COUNT8_PERBUF      (*(RwReg8 *)0x4200302FU) /**< \brief (TC0) COUNT8 Period Buffer */
#define REG_TC0_COUNT8_CCBUF0      (*(RwReg8 *)0x42003030U) /**< \brief (TC0) COUNT8 Compare and Capture Buffer 0 */
#define REG_TC0_COUNT8_CCBUF1      (*(RwReg8 *)0x42003031U) /**< \brief (TC0) COUNT8 Compare and Capture Buffer 1 */
#endif /* (defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

/* ========== Instance parameters for TC0 peripheral ========== */
#define TC0_CC_NUM                  2       
#define TC0_DMAC_ID_MC_0            28
#define TC0_DMAC_ID_MC_1            29
#define TC0_DMAC_ID_MC_LSB          28
#define TC0_DMAC_ID_MC_MSB          29
#define TC0_DMAC_ID_MC_SIZE         2
#define TC0_DMAC_ID_OVF             27       // Indexes of DMA Overflow trigger
#define TC0_EXT                     0       
#define TC0_GCLK_ID                 30      
#define TC0_MASTER                  1       
#define TC0_OW_NUM                  2       

#endif /* _SAMC21_TC0_INSTANCE_ */
