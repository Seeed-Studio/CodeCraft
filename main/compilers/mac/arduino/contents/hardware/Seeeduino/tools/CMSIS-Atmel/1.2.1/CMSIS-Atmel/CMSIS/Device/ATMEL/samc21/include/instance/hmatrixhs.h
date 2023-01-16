/**
 * \file
 *
 * \brief Instance description for HMATRIXHS
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

#ifndef _SAMC21_HMATRIXHS_INSTANCE_
#define _SAMC21_HMATRIXHS_INSTANCE_

/* ========== Register definition for HMATRIXHS peripheral ========== */
#if (defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
#define REG_HMATRIXHS_MCFG0        (0x4100A000U) /**< \brief (HMATRIXHS) Master Configuration 0 */
#define REG_HMATRIXHS_MCFG1        (0x4100A004U) /**< \brief (HMATRIXHS) Master Configuration 1 */
#define REG_HMATRIXHS_MCFG2        (0x4100A008U) /**< \brief (HMATRIXHS) Master Configuration 2 */
#define REG_HMATRIXHS_MCFG3        (0x4100A00CU) /**< \brief (HMATRIXHS) Master Configuration 3 */
#define REG_HMATRIXHS_MCFG4        (0x4100A010U) /**< \brief (HMATRIXHS) Master Configuration 4 */
#define REG_HMATRIXHS_MCFG5        (0x4100A014U) /**< \brief (HMATRIXHS) Master Configuration 5 */
#define REG_HMATRIXHS_MCFG6        (0x4100A018U) /**< \brief (HMATRIXHS) Master Configuration 6 */
#define REG_HMATRIXHS_MCFG7        (0x4100A01CU) /**< \brief (HMATRIXHS) Master Configuration 7 */
#define REG_HMATRIXHS_MCFG8        (0x4100A020U) /**< \brief (HMATRIXHS) Master Configuration 8 */
#define REG_HMATRIXHS_MCFG9        (0x4100A024U) /**< \brief (HMATRIXHS) Master Configuration 9 */
#define REG_HMATRIXHS_MCFG10       (0x4100A028U) /**< \brief (HMATRIXHS) Master Configuration 10 */
#define REG_HMATRIXHS_MCFG11       (0x4100A02CU) /**< \brief (HMATRIXHS) Master Configuration 11 */
#define REG_HMATRIXHS_MCFG12       (0x4100A030U) /**< \brief (HMATRIXHS) Master Configuration 12 */
#define REG_HMATRIXHS_MCFG13       (0x4100A034U) /**< \brief (HMATRIXHS) Master Configuration 13 */
#define REG_HMATRIXHS_MCFG14       (0x4100A038U) /**< \brief (HMATRIXHS) Master Configuration 14 */
#define REG_HMATRIXHS_MCFG15       (0x4100A03CU) /**< \brief (HMATRIXHS) Master Configuration 15 */
#define REG_HMATRIXHS_SCFG0        (0x4100A040U) /**< \brief (HMATRIXHS) Slave Configuration 0 */
#define REG_HMATRIXHS_SCFG1        (0x4100A044U) /**< \brief (HMATRIXHS) Slave Configuration 1 */
#define REG_HMATRIXHS_SCFG2        (0x4100A048U) /**< \brief (HMATRIXHS) Slave Configuration 2 */
#define REG_HMATRIXHS_SCFG3        (0x4100A04CU) /**< \brief (HMATRIXHS) Slave Configuration 3 */
#define REG_HMATRIXHS_SCFG4        (0x4100A050U) /**< \brief (HMATRIXHS) Slave Configuration 4 */
#define REG_HMATRIXHS_SCFG5        (0x4100A054U) /**< \brief (HMATRIXHS) Slave Configuration 5 */
#define REG_HMATRIXHS_SCFG6        (0x4100A058U) /**< \brief (HMATRIXHS) Slave Configuration 6 */
#define REG_HMATRIXHS_SCFG7        (0x4100A05CU) /**< \brief (HMATRIXHS) Slave Configuration 7 */
#define REG_HMATRIXHS_SCFG8        (0x4100A060U) /**< \brief (HMATRIXHS) Slave Configuration 8 */
#define REG_HMATRIXHS_SCFG9        (0x4100A064U) /**< \brief (HMATRIXHS) Slave Configuration 9 */
#define REG_HMATRIXHS_SCFG10       (0x4100A068U) /**< \brief (HMATRIXHS) Slave Configuration 10 */
#define REG_HMATRIXHS_SCFG11       (0x4100A06CU) /**< \brief (HMATRIXHS) Slave Configuration 11 */
#define REG_HMATRIXHS_SCFG12       (0x4100A070U) /**< \brief (HMATRIXHS) Slave Configuration 12 */
#define REG_HMATRIXHS_SCFG13       (0x4100A074U) /**< \brief (HMATRIXHS) Slave Configuration 13 */
#define REG_HMATRIXHS_SCFG14       (0x4100A078U) /**< \brief (HMATRIXHS) Slave Configuration 14 */
#define REG_HMATRIXHS_SCFG15       (0x4100A07CU) /**< \brief (HMATRIXHS) Slave Configuration 15 */
#define REG_HMATRIXHS_PRAS0        (0x4100A080U) /**< \brief (HMATRIXHS) Priority A for Slave 0 */
#define REG_HMATRIXHS_PRBS0        (0x4100A084U) /**< \brief (HMATRIXHS) Priority B for Slave 0 */
#define REG_HMATRIXHS_PRAS1        (0x4100A088U) /**< \brief (HMATRIXHS) Priority A for Slave 1 */
#define REG_HMATRIXHS_PRBS1        (0x4100A08CU) /**< \brief (HMATRIXHS) Priority B for Slave 1 */
#define REG_HMATRIXHS_PRAS2        (0x4100A090U) /**< \brief (HMATRIXHS) Priority A for Slave 2 */
#define REG_HMATRIXHS_PRBS2        (0x4100A094U) /**< \brief (HMATRIXHS) Priority B for Slave 2 */
#define REG_HMATRIXHS_PRAS3        (0x4100A098U) /**< \brief (HMATRIXHS) Priority A for Slave 3 */
#define REG_HMATRIXHS_PRBS3        (0x4100A09CU) /**< \brief (HMATRIXHS) Priority B for Slave 3 */
#define REG_HMATRIXHS_MRCR         (0x4100A100U) /**< \brief (HMATRIXHS) Master Remap Control */
#define REG_HMATRIXHS_SFR0         (0x4100A110U) /**< \brief (HMATRIXHS) Special Function 0 */
#define REG_HMATRIXHS_SFR1         (0x4100A114U) /**< \brief (HMATRIXHS) Special Function 1 */
#define REG_HMATRIXHS_SFR2         (0x4100A118U) /**< \brief (HMATRIXHS) Special Function 2 */
#define REG_HMATRIXHS_SFR3         (0x4100A11CU) /**< \brief (HMATRIXHS) Special Function 3 */
#define REG_HMATRIXHS_SFR4         (0x4100A120U) /**< \brief (HMATRIXHS) Special Function 4 */
#define REG_HMATRIXHS_SFR5         (0x4100A124U) /**< \brief (HMATRIXHS) Special Function 5 */
#define REG_HMATRIXHS_SFR6         (0x4100A128U) /**< \brief (HMATRIXHS) Special Function 6 */
#define REG_HMATRIXHS_SFR7         (0x4100A12CU) /**< \brief (HMATRIXHS) Special Function 7 */
#define REG_HMATRIXHS_SFR8         (0x4100A130U) /**< \brief (HMATRIXHS) Special Function 8 */
#define REG_HMATRIXHS_SFR9         (0x4100A134U) /**< \brief (HMATRIXHS) Special Function 9 */
#define REG_HMATRIXHS_SFR10        (0x4100A138U) /**< \brief (HMATRIXHS) Special Function 10 */
#define REG_HMATRIXHS_SFR11        (0x4100A13CU) /**< \brief (HMATRIXHS) Special Function 11 */
#define REG_HMATRIXHS_SFR12        (0x4100A140U) /**< \brief (HMATRIXHS) Special Function 12 */
#define REG_HMATRIXHS_SFR13        (0x4100A144U) /**< \brief (HMATRIXHS) Special Function 13 */
#define REG_HMATRIXHS_SFR14        (0x4100A148U) /**< \brief (HMATRIXHS) Special Function 14 */
#define REG_HMATRIXHS_SFR15        (0x4100A14CU) /**< \brief (HMATRIXHS) Special Function 15 */
#else
#define REG_HMATRIXHS_MCFG0        (*(RwReg  *)0x4100A000U) /**< \brief (HMATRIXHS) Master Configuration 0 */
#define REG_HMATRIXHS_MCFG1        (*(RwReg  *)0x4100A004U) /**< \brief (HMATRIXHS) Master Configuration 1 */
#define REG_HMATRIXHS_MCFG2        (*(RwReg  *)0x4100A008U) /**< \brief (HMATRIXHS) Master Configuration 2 */
#define REG_HMATRIXHS_MCFG3        (*(RwReg  *)0x4100A00CU) /**< \brief (HMATRIXHS) Master Configuration 3 */
#define REG_HMATRIXHS_MCFG4        (*(RwReg  *)0x4100A010U) /**< \brief (HMATRIXHS) Master Configuration 4 */
#define REG_HMATRIXHS_MCFG5        (*(RwReg  *)0x4100A014U) /**< \brief (HMATRIXHS) Master Configuration 5 */
#define REG_HMATRIXHS_MCFG6        (*(RwReg  *)0x4100A018U) /**< \brief (HMATRIXHS) Master Configuration 6 */
#define REG_HMATRIXHS_MCFG7        (*(RwReg  *)0x4100A01CU) /**< \brief (HMATRIXHS) Master Configuration 7 */
#define REG_HMATRIXHS_MCFG8        (*(RwReg  *)0x4100A020U) /**< \brief (HMATRIXHS) Master Configuration 8 */
#define REG_HMATRIXHS_MCFG9        (*(RwReg  *)0x4100A024U) /**< \brief (HMATRIXHS) Master Configuration 9 */
#define REG_HMATRIXHS_MCFG10       (*(RwReg  *)0x4100A028U) /**< \brief (HMATRIXHS) Master Configuration 10 */
#define REG_HMATRIXHS_MCFG11       (*(RwReg  *)0x4100A02CU) /**< \brief (HMATRIXHS) Master Configuration 11 */
#define REG_HMATRIXHS_MCFG12       (*(RwReg  *)0x4100A030U) /**< \brief (HMATRIXHS) Master Configuration 12 */
#define REG_HMATRIXHS_MCFG13       (*(RwReg  *)0x4100A034U) /**< \brief (HMATRIXHS) Master Configuration 13 */
#define REG_HMATRIXHS_MCFG14       (*(RwReg  *)0x4100A038U) /**< \brief (HMATRIXHS) Master Configuration 14 */
#define REG_HMATRIXHS_MCFG15       (*(RwReg  *)0x4100A03CU) /**< \brief (HMATRIXHS) Master Configuration 15 */
#define REG_HMATRIXHS_SCFG0        (*(RwReg  *)0x4100A040U) /**< \brief (HMATRIXHS) Slave Configuration 0 */
#define REG_HMATRIXHS_SCFG1        (*(RwReg  *)0x4100A044U) /**< \brief (HMATRIXHS) Slave Configuration 1 */
#define REG_HMATRIXHS_SCFG2        (*(RwReg  *)0x4100A048U) /**< \brief (HMATRIXHS) Slave Configuration 2 */
#define REG_HMATRIXHS_SCFG3        (*(RwReg  *)0x4100A04CU) /**< \brief (HMATRIXHS) Slave Configuration 3 */
#define REG_HMATRIXHS_SCFG4        (*(RwReg  *)0x4100A050U) /**< \brief (HMATRIXHS) Slave Configuration 4 */
#define REG_HMATRIXHS_SCFG5        (*(RwReg  *)0x4100A054U) /**< \brief (HMATRIXHS) Slave Configuration 5 */
#define REG_HMATRIXHS_SCFG6        (*(RwReg  *)0x4100A058U) /**< \brief (HMATRIXHS) Slave Configuration 6 */
#define REG_HMATRIXHS_SCFG7        (*(RwReg  *)0x4100A05CU) /**< \brief (HMATRIXHS) Slave Configuration 7 */
#define REG_HMATRIXHS_SCFG8        (*(RwReg  *)0x4100A060U) /**< \brief (HMATRIXHS) Slave Configuration 8 */
#define REG_HMATRIXHS_SCFG9        (*(RwReg  *)0x4100A064U) /**< \brief (HMATRIXHS) Slave Configuration 9 */
#define REG_HMATRIXHS_SCFG10       (*(RwReg  *)0x4100A068U) /**< \brief (HMATRIXHS) Slave Configuration 10 */
#define REG_HMATRIXHS_SCFG11       (*(RwReg  *)0x4100A06CU) /**< \brief (HMATRIXHS) Slave Configuration 11 */
#define REG_HMATRIXHS_SCFG12       (*(RwReg  *)0x4100A070U) /**< \brief (HMATRIXHS) Slave Configuration 12 */
#define REG_HMATRIXHS_SCFG13       (*(RwReg  *)0x4100A074U) /**< \brief (HMATRIXHS) Slave Configuration 13 */
#define REG_HMATRIXHS_SCFG14       (*(RwReg  *)0x4100A078U) /**< \brief (HMATRIXHS) Slave Configuration 14 */
#define REG_HMATRIXHS_SCFG15       (*(RwReg  *)0x4100A07CU) /**< \brief (HMATRIXHS) Slave Configuration 15 */
#define REG_HMATRIXHS_PRAS0        (*(RwReg  *)0x4100A080U) /**< \brief (HMATRIXHS) Priority A for Slave 0 */
#define REG_HMATRIXHS_PRBS0        (*(RwReg  *)0x4100A084U) /**< \brief (HMATRIXHS) Priority B for Slave 0 */
#define REG_HMATRIXHS_PRAS1        (*(RwReg  *)0x4100A088U) /**< \brief (HMATRIXHS) Priority A for Slave 1 */
#define REG_HMATRIXHS_PRBS1        (*(RwReg  *)0x4100A08CU) /**< \brief (HMATRIXHS) Priority B for Slave 1 */
#define REG_HMATRIXHS_PRAS2        (*(RwReg  *)0x4100A090U) /**< \brief (HMATRIXHS) Priority A for Slave 2 */
#define REG_HMATRIXHS_PRBS2        (*(RwReg  *)0x4100A094U) /**< \brief (HMATRIXHS) Priority B for Slave 2 */
#define REG_HMATRIXHS_PRAS3        (*(RwReg  *)0x4100A098U) /**< \brief (HMATRIXHS) Priority A for Slave 3 */
#define REG_HMATRIXHS_PRBS3        (*(RwReg  *)0x4100A09CU) /**< \brief (HMATRIXHS) Priority B for Slave 3 */
#define REG_HMATRIXHS_MRCR         (*(RwReg  *)0x4100A100U) /**< \brief (HMATRIXHS) Master Remap Control */
#define REG_HMATRIXHS_SFR0         (*(RwReg  *)0x4100A110U) /**< \brief (HMATRIXHS) Special Function 0 */
#define REG_HMATRIXHS_SFR1         (*(RwReg  *)0x4100A114U) /**< \brief (HMATRIXHS) Special Function 1 */
#define REG_HMATRIXHS_SFR2         (*(RwReg  *)0x4100A118U) /**< \brief (HMATRIXHS) Special Function 2 */
#define REG_HMATRIXHS_SFR3         (*(RwReg  *)0x4100A11CU) /**< \brief (HMATRIXHS) Special Function 3 */
#define REG_HMATRIXHS_SFR4         (*(RwReg  *)0x4100A120U) /**< \brief (HMATRIXHS) Special Function 4 */
#define REG_HMATRIXHS_SFR5         (*(RwReg  *)0x4100A124U) /**< \brief (HMATRIXHS) Special Function 5 */
#define REG_HMATRIXHS_SFR6         (*(RwReg  *)0x4100A128U) /**< \brief (HMATRIXHS) Special Function 6 */
#define REG_HMATRIXHS_SFR7         (*(RwReg  *)0x4100A12CU) /**< \brief (HMATRIXHS) Special Function 7 */
#define REG_HMATRIXHS_SFR8         (*(RwReg  *)0x4100A130U) /**< \brief (HMATRIXHS) Special Function 8 */
#define REG_HMATRIXHS_SFR9         (*(RwReg  *)0x4100A134U) /**< \brief (HMATRIXHS) Special Function 9 */
#define REG_HMATRIXHS_SFR10        (*(RwReg  *)0x4100A138U) /**< \brief (HMATRIXHS) Special Function 10 */
#define REG_HMATRIXHS_SFR11        (*(RwReg  *)0x4100A13CU) /**< \brief (HMATRIXHS) Special Function 11 */
#define REG_HMATRIXHS_SFR12        (*(RwReg  *)0x4100A140U) /**< \brief (HMATRIXHS) Special Function 12 */
#define REG_HMATRIXHS_SFR13        (*(RwReg  *)0x4100A144U) /**< \brief (HMATRIXHS) Special Function 13 */
#define REG_HMATRIXHS_SFR14        (*(RwReg  *)0x4100A148U) /**< \brief (HMATRIXHS) Special Function 14 */
#define REG_HMATRIXHS_SFR15        (*(RwReg  *)0x4100A14CU) /**< \brief (HMATRIXHS) Special Function 15 */
#endif /* (defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

/* ========== Instance parameters for HMATRIXHS peripheral ========== */
#define HMATRIXHS_CLK_AHB_ID        4        // Index of AHB Clock in MCLK.AHBMASK register (MASK may be tied to 1 depending on chip integration)
#define HMATRIXHS_DEFINED                   

#endif /* _SAMC21_HMATRIXHS_INSTANCE_ */
