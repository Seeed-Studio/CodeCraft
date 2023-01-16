/**
 * \file
 *
 * \brief Component description for NVMCTRL
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

#ifndef _SAMC21_NVMCTRL_COMPONENT_
#define _SAMC21_NVMCTRL_COMPONENT_

/* ========================================================================== */
/**  SOFTWARE API DEFINITION FOR NVMCTRL */
/* ========================================================================== */
/** \addtogroup SAMC21_NVMCTRL Non-Volatile Memory Controller */
/*@{*/

#define NVMCTRL_U2207
#define REV_NVMCTRL                 0x401

/* -------- NVMCTRL_CTRLA : (NVMCTRL Offset: 0x00) (R/W 16) Control A -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  struct {
    uint16_t CMD:7;            /*!< bit:  0.. 6  Command                            */
    uint16_t :1;               /*!< bit:      7  Reserved                           */
    uint16_t CMDEX:8;          /*!< bit:  8..15  Command Execution                  */
  } bit;                       /*!< Structure used for bit  access                  */
  uint16_t reg;                /*!< Type      used for register access              */
} NVMCTRL_CTRLA_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_CTRLA_OFFSET        0x00         /**< \brief (NVMCTRL_CTRLA offset) Control A */
#define NVMCTRL_CTRLA_RESETVALUE    0x0000ul     /**< \brief (NVMCTRL_CTRLA reset_value) Control A */

#define NVMCTRL_CTRLA_CMD_Pos       0            /**< \brief (NVMCTRL_CTRLA) Command */
#define NVMCTRL_CTRLA_CMD_Msk       (0x7Ful << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD(value)    (NVMCTRL_CTRLA_CMD_Msk & ((value) << NVMCTRL_CTRLA_CMD_Pos))
#define   NVMCTRL_CTRLA_CMD_ER_Val        0x2ul  /**< \brief (NVMCTRL_CTRLA) Erase Row - Erases the row addressed by the ADDR register. */
#define   NVMCTRL_CTRLA_CMD_WP_Val        0x4ul  /**< \brief (NVMCTRL_CTRLA) Write Page - Writes the contents of the page buffer to the page addressed by the ADDR register. */
#define   NVMCTRL_CTRLA_CMD_EAR_Val       0x5ul  /**< \brief (NVMCTRL_CTRLA) Erase Auxiliary Row - Erases the auxiliary row addressed by the ADDR register. This command can be given only when the security bit is not set and only to the user configuration row. */
#define   NVMCTRL_CTRLA_CMD_WAP_Val       0x6ul  /**< \brief (NVMCTRL_CTRLA) Write Auxiliary Page - Writes the contents of the page buffer to the page addressed by the ADDR register. This command can be given only when the security bit is not set and only to the user configuration row. */
#define   NVMCTRL_CTRLA_CMD_SF_Val        0xAul  /**< \brief (NVMCTRL_CTRLA) Security Flow Command */
#define   NVMCTRL_CTRLA_CMD_WL_Val        0xFul  /**< \brief (NVMCTRL_CTRLA) Write lockbits */
#define   NVMCTRL_CTRLA_CMD_RWWEEER_Val   0x1Aul  /**< \brief (NVMCTRL_CTRLA) RWW EEPROM area Erase Row - Erases the row addressed by the ADDR register. */
#define   NVMCTRL_CTRLA_CMD_RWWEEWP_Val   0x1Cul  /**< \brief (NVMCTRL_CTRLA) RWW EEPROM Write Page - Writes the contents of the page buffer to the page addressed by the ADDR register. */
#define   NVMCTRL_CTRLA_CMD_LR_Val        0x40ul  /**< \brief (NVMCTRL_CTRLA) Lock Region - Locks the region containing the address location in the ADDR register. */
#define   NVMCTRL_CTRLA_CMD_UR_Val        0x41ul  /**< \brief (NVMCTRL_CTRLA) Unlock Region - Unlocks the region containing the address location in the ADDR register. */
#define   NVMCTRL_CTRLA_CMD_SPRM_Val      0x42ul  /**< \brief (NVMCTRL_CTRLA) Sets the power reduction mode. */
#define   NVMCTRL_CTRLA_CMD_CPRM_Val      0x43ul  /**< \brief (NVMCTRL_CTRLA) Clears the power reduction mode. */
#define   NVMCTRL_CTRLA_CMD_PBC_Val       0x44ul  /**< \brief (NVMCTRL_CTRLA) Page Buffer Clear - Clears the page buffer. */
#define   NVMCTRL_CTRLA_CMD_SSB_Val       0x45ul  /**< \brief (NVMCTRL_CTRLA) Set Security Bit - Sets the security bit by writing 0x00 to the first byte in the lockbit row. */
#define   NVMCTRL_CTRLA_CMD_INVALL_Val    0x46ul  /**< \brief (NVMCTRL_CTRLA) Invalidate all cache lines. */
#define NVMCTRL_CTRLA_CMD_ER        (NVMCTRL_CTRLA_CMD_ER_Val      << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_WP        (NVMCTRL_CTRLA_CMD_WP_Val      << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_EAR       (NVMCTRL_CTRLA_CMD_EAR_Val     << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_WAP       (NVMCTRL_CTRLA_CMD_WAP_Val     << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_SF        (NVMCTRL_CTRLA_CMD_SF_Val      << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_WL        (NVMCTRL_CTRLA_CMD_WL_Val      << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_RWWEEER   (NVMCTRL_CTRLA_CMD_RWWEEER_Val << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_RWWEEWP   (NVMCTRL_CTRLA_CMD_RWWEEWP_Val << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_LR        (NVMCTRL_CTRLA_CMD_LR_Val      << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_UR        (NVMCTRL_CTRLA_CMD_UR_Val      << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_SPRM      (NVMCTRL_CTRLA_CMD_SPRM_Val    << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_CPRM      (NVMCTRL_CTRLA_CMD_CPRM_Val    << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_PBC       (NVMCTRL_CTRLA_CMD_PBC_Val     << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_SSB       (NVMCTRL_CTRLA_CMD_SSB_Val     << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMD_INVALL    (NVMCTRL_CTRLA_CMD_INVALL_Val  << NVMCTRL_CTRLA_CMD_Pos)
#define NVMCTRL_CTRLA_CMDEX_Pos     8            /**< \brief (NVMCTRL_CTRLA) Command Execution */
#define NVMCTRL_CTRLA_CMDEX_Msk     (0xFFul << NVMCTRL_CTRLA_CMDEX_Pos)
#define NVMCTRL_CTRLA_CMDEX(value)  (NVMCTRL_CTRLA_CMDEX_Msk & ((value) << NVMCTRL_CTRLA_CMDEX_Pos))
#define   NVMCTRL_CTRLA_CMDEX_KEY_Val     0xA5ul  /**< \brief (NVMCTRL_CTRLA) Execution Key */
#define NVMCTRL_CTRLA_CMDEX_KEY     (NVMCTRL_CTRLA_CMDEX_KEY_Val   << NVMCTRL_CTRLA_CMDEX_Pos)
#define NVMCTRL_CTRLA_MASK          0xFF7Ful     /**< \brief (NVMCTRL_CTRLA) MASK Register */

/* -------- NVMCTRL_CTRLB : (NVMCTRL Offset: 0x04) (R/W 32) Control B -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  struct {
    uint32_t :1;               /*!< bit:      0  Reserved                           */
    uint32_t RWS:4;            /*!< bit:  1.. 4  NVM Read Wait States               */
    uint32_t :2;               /*!< bit:  5.. 6  Reserved                           */
    uint32_t MANW:1;           /*!< bit:      7  Manual Write                       */
    uint32_t SLEEPPRM:2;       /*!< bit:  8.. 9  Power Reduction Mode during Sleep  */
    uint32_t :6;               /*!< bit: 10..15  Reserved                           */
    uint32_t READMODE:2;       /*!< bit: 16..17  NVMCTRL Read Mode                  */
    uint32_t CACHEDIS:2;       /*!< bit: 18..19  Cache Disable                      */
    uint32_t :12;              /*!< bit: 20..31  Reserved                           */
  } bit;                       /*!< Structure used for bit  access                  */
  uint32_t reg;                /*!< Type      used for register access              */
} NVMCTRL_CTRLB_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_CTRLB_OFFSET        0x04         /**< \brief (NVMCTRL_CTRLB offset) Control B */
#define NVMCTRL_CTRLB_RESETVALUE    0x00000080ul /**< \brief (NVMCTRL_CTRLB reset_value) Control B */

#define NVMCTRL_CTRLB_RWS_Pos       1            /**< \brief (NVMCTRL_CTRLB) NVM Read Wait States */
#define NVMCTRL_CTRLB_RWS_Msk       (0xFul << NVMCTRL_CTRLB_RWS_Pos)
#define NVMCTRL_CTRLB_RWS(value)    (NVMCTRL_CTRLB_RWS_Msk & ((value) << NVMCTRL_CTRLB_RWS_Pos))
#define   NVMCTRL_CTRLB_RWS_SINGLE_Val    0x0ul  /**< \brief (NVMCTRL_CTRLB) Single Auto Wait State */
#define   NVMCTRL_CTRLB_RWS_HALF_Val      0x1ul  /**< \brief (NVMCTRL_CTRLB) Half Auto Wait State */
#define   NVMCTRL_CTRLB_RWS_DUAL_Val      0x2ul  /**< \brief (NVMCTRL_CTRLB) Dual Auto Wait State */
#define NVMCTRL_CTRLB_RWS_SINGLE    (NVMCTRL_CTRLB_RWS_SINGLE_Val  << NVMCTRL_CTRLB_RWS_Pos)
#define NVMCTRL_CTRLB_RWS_HALF      (NVMCTRL_CTRLB_RWS_HALF_Val    << NVMCTRL_CTRLB_RWS_Pos)
#define NVMCTRL_CTRLB_RWS_DUAL      (NVMCTRL_CTRLB_RWS_DUAL_Val    << NVMCTRL_CTRLB_RWS_Pos)
#define NVMCTRL_CTRLB_MANW_Pos      7            /**< \brief (NVMCTRL_CTRLB) Manual Write */
#define NVMCTRL_CTRLB_MANW          (0x1ul << NVMCTRL_CTRLB_MANW_Pos)
#define NVMCTRL_CTRLB_SLEEPPRM_Pos  8            /**< \brief (NVMCTRL_CTRLB) Power Reduction Mode during Sleep */
#define NVMCTRL_CTRLB_SLEEPPRM_Msk  (0x3ul << NVMCTRL_CTRLB_SLEEPPRM_Pos)
#define NVMCTRL_CTRLB_SLEEPPRM(value) (NVMCTRL_CTRLB_SLEEPPRM_Msk & ((value) << NVMCTRL_CTRLB_SLEEPPRM_Pos))
#define   NVMCTRL_CTRLB_SLEEPPRM_WAKEONACCESS_Val 0x0ul  /**< \brief (NVMCTRL_CTRLB) NVM block enters low-power mode when entering sleep.NVM block exits low-power mode upon first access. */
#define   NVMCTRL_CTRLB_SLEEPPRM_WAKEUPINSTANT_Val 0x1ul  /**< \brief (NVMCTRL_CTRLB) NVM block enters low-power mode when entering sleep.NVM block exits low-power mode when exiting sleep. */
#define   NVMCTRL_CTRLB_SLEEPPRM_DISABLED_Val 0x3ul  /**< \brief (NVMCTRL_CTRLB) Auto power reduction disabled. */
#define NVMCTRL_CTRLB_SLEEPPRM_WAKEONACCESS (NVMCTRL_CTRLB_SLEEPPRM_WAKEONACCESS_Val << NVMCTRL_CTRLB_SLEEPPRM_Pos)
#define NVMCTRL_CTRLB_SLEEPPRM_WAKEUPINSTANT (NVMCTRL_CTRLB_SLEEPPRM_WAKEUPINSTANT_Val << NVMCTRL_CTRLB_SLEEPPRM_Pos)
#define NVMCTRL_CTRLB_SLEEPPRM_DISABLED (NVMCTRL_CTRLB_SLEEPPRM_DISABLED_Val << NVMCTRL_CTRLB_SLEEPPRM_Pos)
#define NVMCTRL_CTRLB_READMODE_Pos  16           /**< \brief (NVMCTRL_CTRLB) NVMCTRL Read Mode */
#define NVMCTRL_CTRLB_READMODE_Msk  (0x3ul << NVMCTRL_CTRLB_READMODE_Pos)
#define NVMCTRL_CTRLB_READMODE(value) (NVMCTRL_CTRLB_READMODE_Msk & ((value) << NVMCTRL_CTRLB_READMODE_Pos))
#define   NVMCTRL_CTRLB_READMODE_NO_MISS_PENALTY_Val 0x0ul  /**< \brief (NVMCTRL_CTRLB) The NVM Controller (cache system) does not insert wait states on a cache miss. Gives the best system performance. */
#define   NVMCTRL_CTRLB_READMODE_LOW_POWER_Val 0x1ul  /**< \brief (NVMCTRL_CTRLB) Reduces power consumption of the cache system, but inserts a wait state each time there is a cache miss. This mode may not be relevant if CPU performance is required, as the application will be stalled and may lead to increase run time. */
#define   NVMCTRL_CTRLB_READMODE_DETERMINISTIC_Val 0x2ul  /**< \brief (NVMCTRL_CTRLB) The cache system ensures that a cache hit or miss takes the same amount of time, determined by the number of programmed flash wait states. This mode can be used for real-time applications that require deterministic execution timings. */
#define NVMCTRL_CTRLB_READMODE_NO_MISS_PENALTY (NVMCTRL_CTRLB_READMODE_NO_MISS_PENALTY_Val << NVMCTRL_CTRLB_READMODE_Pos)
#define NVMCTRL_CTRLB_READMODE_LOW_POWER (NVMCTRL_CTRLB_READMODE_LOW_POWER_Val << NVMCTRL_CTRLB_READMODE_Pos)
#define NVMCTRL_CTRLB_READMODE_DETERMINISTIC (NVMCTRL_CTRLB_READMODE_DETERMINISTIC_Val << NVMCTRL_CTRLB_READMODE_Pos)
#define NVMCTRL_CTRLB_CACHEDIS_Pos  18           /**< \brief (NVMCTRL_CTRLB) Cache Disable */
#define NVMCTRL_CTRLB_CACHEDIS_Msk  (0x3ul << NVMCTRL_CTRLB_CACHEDIS_Pos)
#define NVMCTRL_CTRLB_CACHEDIS(value) (NVMCTRL_CTRLB_CACHEDIS_Msk & ((value) << NVMCTRL_CTRLB_CACHEDIS_Pos))
#define NVMCTRL_CTRLB_MASK          0x000F039Eul /**< \brief (NVMCTRL_CTRLB) MASK Register */

/* -------- NVMCTRL_PARAM : (NVMCTRL Offset: 0x08) (R/W 32) NVM Parameter -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  struct {
    uint32_t NVMP:16;          /*!< bit:  0..15  NVM Pages                          */
    uint32_t PSZ:3;            /*!< bit: 16..18  Page Size                          */
    uint32_t :1;               /*!< bit:     19  Reserved                           */
    uint32_t RWWEEP:12;        /*!< bit: 20..31  RWW EEPROM Pages                   */
  } bit;                       /*!< Structure used for bit  access                  */
  uint32_t reg;                /*!< Type      used for register access              */
} NVMCTRL_PARAM_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_PARAM_OFFSET        0x08         /**< \brief (NVMCTRL_PARAM offset) NVM Parameter */
#define NVMCTRL_PARAM_RESETVALUE    0x00000000ul /**< \brief (NVMCTRL_PARAM reset_value) NVM Parameter */

#define NVMCTRL_PARAM_NVMP_Pos      0            /**< \brief (NVMCTRL_PARAM) NVM Pages */
#define NVMCTRL_PARAM_NVMP_Msk      (0xFFFFul << NVMCTRL_PARAM_NVMP_Pos)
#define NVMCTRL_PARAM_NVMP(value)   (NVMCTRL_PARAM_NVMP_Msk & ((value) << NVMCTRL_PARAM_NVMP_Pos))
#define NVMCTRL_PARAM_PSZ_Pos       16           /**< \brief (NVMCTRL_PARAM) Page Size */
#define NVMCTRL_PARAM_PSZ_Msk       (0x7ul << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_PSZ(value)    (NVMCTRL_PARAM_PSZ_Msk & ((value) << NVMCTRL_PARAM_PSZ_Pos))
#define   NVMCTRL_PARAM_PSZ_8_Val         0x0ul  /**< \brief (NVMCTRL_PARAM) 8 bytes */
#define   NVMCTRL_PARAM_PSZ_16_Val        0x1ul  /**< \brief (NVMCTRL_PARAM) 16 bytes */
#define   NVMCTRL_PARAM_PSZ_32_Val        0x2ul  /**< \brief (NVMCTRL_PARAM) 32 bytes */
#define   NVMCTRL_PARAM_PSZ_64_Val        0x3ul  /**< \brief (NVMCTRL_PARAM) 64 bytes */
#define   NVMCTRL_PARAM_PSZ_128_Val       0x4ul  /**< \brief (NVMCTRL_PARAM) 128 bytes */
#define   NVMCTRL_PARAM_PSZ_256_Val       0x5ul  /**< \brief (NVMCTRL_PARAM) 256 bytes */
#define   NVMCTRL_PARAM_PSZ_512_Val       0x6ul  /**< \brief (NVMCTRL_PARAM) 512 bytes */
#define   NVMCTRL_PARAM_PSZ_1024_Val      0x7ul  /**< \brief (NVMCTRL_PARAM) 1024 bytes */
#define NVMCTRL_PARAM_PSZ_8         (NVMCTRL_PARAM_PSZ_8_Val       << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_PSZ_16        (NVMCTRL_PARAM_PSZ_16_Val      << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_PSZ_32        (NVMCTRL_PARAM_PSZ_32_Val      << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_PSZ_64        (NVMCTRL_PARAM_PSZ_64_Val      << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_PSZ_128       (NVMCTRL_PARAM_PSZ_128_Val     << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_PSZ_256       (NVMCTRL_PARAM_PSZ_256_Val     << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_PSZ_512       (NVMCTRL_PARAM_PSZ_512_Val     << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_PSZ_1024      (NVMCTRL_PARAM_PSZ_1024_Val    << NVMCTRL_PARAM_PSZ_Pos)
#define NVMCTRL_PARAM_RWWEEP_Pos    20           /**< \brief (NVMCTRL_PARAM) RWW EEPROM Pages */
#define NVMCTRL_PARAM_RWWEEP_Msk    (0xFFFul << NVMCTRL_PARAM_RWWEEP_Pos)
#define NVMCTRL_PARAM_RWWEEP(value) (NVMCTRL_PARAM_RWWEEP_Msk & ((value) << NVMCTRL_PARAM_RWWEEP_Pos))
#define NVMCTRL_PARAM_MASK          0xFFF7FFFFul /**< \brief (NVMCTRL_PARAM) MASK Register */

/* -------- NVMCTRL_INTENCLR : (NVMCTRL Offset: 0x0C) (R/W  8) Interrupt Enable Clear -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  struct {
    uint8_t  READY:1;          /*!< bit:      0  NVM Ready Interrupt Enable         */
    uint8_t  ERROR:1;          /*!< bit:      1  Error Interrupt Enable             */
    uint8_t  :6;               /*!< bit:  2.. 7  Reserved                           */
  } bit;                       /*!< Structure used for bit  access                  */
  uint8_t reg;                 /*!< Type      used for register access              */
} NVMCTRL_INTENCLR_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_INTENCLR_OFFSET     0x0C         /**< \brief (NVMCTRL_INTENCLR offset) Interrupt Enable Clear */
#define NVMCTRL_INTENCLR_RESETVALUE 0x00ul       /**< \brief (NVMCTRL_INTENCLR reset_value) Interrupt Enable Clear */

#define NVMCTRL_INTENCLR_READY_Pos  0            /**< \brief (NVMCTRL_INTENCLR) NVM Ready Interrupt Enable */
#define NVMCTRL_INTENCLR_READY      (0x1ul << NVMCTRL_INTENCLR_READY_Pos)
#define NVMCTRL_INTENCLR_ERROR_Pos  1            /**< \brief (NVMCTRL_INTENCLR) Error Interrupt Enable */
#define NVMCTRL_INTENCLR_ERROR      (0x1ul << NVMCTRL_INTENCLR_ERROR_Pos)
#define NVMCTRL_INTENCLR_MASK       0x03ul       /**< \brief (NVMCTRL_INTENCLR) MASK Register */

/* -------- NVMCTRL_INTENSET : (NVMCTRL Offset: 0x10) (R/W  8) Interrupt Enable Set -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  struct {
    uint8_t  READY:1;          /*!< bit:      0  NVM Ready Interrupt Enable         */
    uint8_t  ERROR:1;          /*!< bit:      1  Error Interrupt Enable             */
    uint8_t  :6;               /*!< bit:  2.. 7  Reserved                           */
  } bit;                       /*!< Structure used for bit  access                  */
  uint8_t reg;                 /*!< Type      used for register access              */
} NVMCTRL_INTENSET_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_INTENSET_OFFSET     0x10         /**< \brief (NVMCTRL_INTENSET offset) Interrupt Enable Set */
#define NVMCTRL_INTENSET_RESETVALUE 0x00ul       /**< \brief (NVMCTRL_INTENSET reset_value) Interrupt Enable Set */

#define NVMCTRL_INTENSET_READY_Pos  0            /**< \brief (NVMCTRL_INTENSET) NVM Ready Interrupt Enable */
#define NVMCTRL_INTENSET_READY      (0x1ul << NVMCTRL_INTENSET_READY_Pos)
#define NVMCTRL_INTENSET_ERROR_Pos  1            /**< \brief (NVMCTRL_INTENSET) Error Interrupt Enable */
#define NVMCTRL_INTENSET_ERROR      (0x1ul << NVMCTRL_INTENSET_ERROR_Pos)
#define NVMCTRL_INTENSET_MASK       0x03ul       /**< \brief (NVMCTRL_INTENSET) MASK Register */

/* -------- NVMCTRL_INTFLAG : (NVMCTRL Offset: 0x14) (R/W  8) Interrupt Flag Status and Clear -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union { // __I to avoid read-modify-write on write-to-clear register
  struct {
    __I uint8_t  READY:1;          /*!< bit:      0  NVM Ready                          */
    __I uint8_t  ERROR:1;          /*!< bit:      1  Error                              */
    __I uint8_t  :6;               /*!< bit:  2.. 7  Reserved                           */
  } bit;                       /*!< Structure used for bit  access                  */
  uint8_t reg;                 /*!< Type      used for register access              */
} NVMCTRL_INTFLAG_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_INTFLAG_OFFSET      0x14         /**< \brief (NVMCTRL_INTFLAG offset) Interrupt Flag Status and Clear */
#define NVMCTRL_INTFLAG_RESETVALUE  0x00ul       /**< \brief (NVMCTRL_INTFLAG reset_value) Interrupt Flag Status and Clear */

#define NVMCTRL_INTFLAG_READY_Pos   0            /**< \brief (NVMCTRL_INTFLAG) NVM Ready */
#define NVMCTRL_INTFLAG_READY       (0x1ul << NVMCTRL_INTFLAG_READY_Pos)
#define NVMCTRL_INTFLAG_ERROR_Pos   1            /**< \brief (NVMCTRL_INTFLAG) Error */
#define NVMCTRL_INTFLAG_ERROR       (0x1ul << NVMCTRL_INTFLAG_ERROR_Pos)
#define NVMCTRL_INTFLAG_MASK        0x03ul       /**< \brief (NVMCTRL_INTFLAG) MASK Register */

/* -------- NVMCTRL_STATUS : (NVMCTRL Offset: 0x18) (R/W 16) Status -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  struct {
    uint16_t PRM:1;            /*!< bit:      0  Power Reduction Mode               */
    uint16_t LOAD:1;           /*!< bit:      1  NVM Page Buffer Active Loading     */
    uint16_t PROGE:1;          /*!< bit:      2  Programming Error Status           */
    uint16_t LOCKE:1;          /*!< bit:      3  Lock Error Status                  */
    uint16_t NVME:1;           /*!< bit:      4  NVM Error                          */
    uint16_t :3;               /*!< bit:  5.. 7  Reserved                           */
    uint16_t SB:1;             /*!< bit:      8  Security Bit Status                */
    uint16_t :7;               /*!< bit:  9..15  Reserved                           */
  } bit;                       /*!< Structure used for bit  access                  */
  uint16_t reg;                /*!< Type      used for register access              */
} NVMCTRL_STATUS_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_STATUS_OFFSET       0x18         /**< \brief (NVMCTRL_STATUS offset) Status */
#define NVMCTRL_STATUS_RESETVALUE   0x0000ul     /**< \brief (NVMCTRL_STATUS reset_value) Status */

#define NVMCTRL_STATUS_PRM_Pos      0            /**< \brief (NVMCTRL_STATUS) Power Reduction Mode */
#define NVMCTRL_STATUS_PRM          (0x1ul << NVMCTRL_STATUS_PRM_Pos)
#define NVMCTRL_STATUS_LOAD_Pos     1            /**< \brief (NVMCTRL_STATUS) NVM Page Buffer Active Loading */
#define NVMCTRL_STATUS_LOAD         (0x1ul << NVMCTRL_STATUS_LOAD_Pos)
#define NVMCTRL_STATUS_PROGE_Pos    2            /**< \brief (NVMCTRL_STATUS) Programming Error Status */
#define NVMCTRL_STATUS_PROGE        (0x1ul << NVMCTRL_STATUS_PROGE_Pos)
#define NVMCTRL_STATUS_LOCKE_Pos    3            /**< \brief (NVMCTRL_STATUS) Lock Error Status */
#define NVMCTRL_STATUS_LOCKE        (0x1ul << NVMCTRL_STATUS_LOCKE_Pos)
#define NVMCTRL_STATUS_NVME_Pos     4            /**< \brief (NVMCTRL_STATUS) NVM Error */
#define NVMCTRL_STATUS_NVME         (0x1ul << NVMCTRL_STATUS_NVME_Pos)
#define NVMCTRL_STATUS_SB_Pos       8            /**< \brief (NVMCTRL_STATUS) Security Bit Status */
#define NVMCTRL_STATUS_SB           (0x1ul << NVMCTRL_STATUS_SB_Pos)
#define NVMCTRL_STATUS_MASK         0x011Ful     /**< \brief (NVMCTRL_STATUS) MASK Register */

/* -------- NVMCTRL_ADDR : (NVMCTRL Offset: 0x1C) (R/W 32) Address -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  struct {
    uint32_t ADDR:22;          /*!< bit:  0..21  NVM Address                        */
    uint32_t :10;              /*!< bit: 22..31  Reserved                           */
  } bit;                       /*!< Structure used for bit  access                  */
  uint32_t reg;                /*!< Type      used for register access              */
} NVMCTRL_ADDR_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_ADDR_OFFSET         0x1C         /**< \brief (NVMCTRL_ADDR offset) Address */
#define NVMCTRL_ADDR_RESETVALUE     0x00000000ul /**< \brief (NVMCTRL_ADDR reset_value) Address */

#define NVMCTRL_ADDR_ADDR_Pos       0            /**< \brief (NVMCTRL_ADDR) NVM Address */
#define NVMCTRL_ADDR_ADDR_Msk       (0x3FFFFFul << NVMCTRL_ADDR_ADDR_Pos)
#define NVMCTRL_ADDR_ADDR(value)    (NVMCTRL_ADDR_ADDR_Msk & ((value) << NVMCTRL_ADDR_ADDR_Pos))
#define NVMCTRL_ADDR_MASK           0x003FFFFFul /**< \brief (NVMCTRL_ADDR) MASK Register */

/* -------- NVMCTRL_LOCK : (NVMCTRL Offset: 0x20) (R/W 16) Lock Section -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  struct {
    uint16_t LOCK:16;          /*!< bit:  0..15  Region Lock Bits                   */
  } bit;                       /*!< Structure used for bit  access                  */
  uint16_t reg;                /*!< Type      used for register access              */
} NVMCTRL_LOCK_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_LOCK_OFFSET         0x20         /**< \brief (NVMCTRL_LOCK offset) Lock Section */
#define NVMCTRL_LOCK_RESETVALUE     0x0000ul     /**< \brief (NVMCTRL_LOCK reset_value) Lock Section */

#define NVMCTRL_LOCK_LOCK_Pos       0            /**< \brief (NVMCTRL_LOCK) Region Lock Bits */
#define NVMCTRL_LOCK_LOCK_Msk       (0xFFFFul << NVMCTRL_LOCK_LOCK_Pos)
#define NVMCTRL_LOCK_LOCK(value)    (NVMCTRL_LOCK_LOCK_Msk & ((value) << NVMCTRL_LOCK_LOCK_Pos))
#define NVMCTRL_LOCK_MASK           0xFFFFul     /**< \brief (NVMCTRL_LOCK) MASK Register */

/* -------- NVMCTRL_PBLDATA0 : (NVMCTRL Offset: 0x28) (R/  32) Page Buffer Load Data 0 -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  uint32_t reg;                /*!< Type      used for register access              */
} NVMCTRL_PBLDATA0_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_PBLDATA0_OFFSET     0x28         /**< \brief (NVMCTRL_PBLDATA0 offset) Page Buffer Load Data 0 */
#define NVMCTRL_PBLDATA0_RESETVALUE 0x00000000ul /**< \brief (NVMCTRL_PBLDATA0 reset_value) Page Buffer Load Data 0 */
#define NVMCTRL_PBLDATA0_MASK       0xFFFFFFFFul /**< \brief (NVMCTRL_PBLDATA0) MASK Register */

/* -------- NVMCTRL_PBLDATA1 : (NVMCTRL Offset: 0x2C) (R/  32) Page Buffer Load Data 1 -------- */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef union {
  uint32_t reg;                /*!< Type      used for register access              */
} NVMCTRL_PBLDATA1_Type;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#define NVMCTRL_PBLDATA1_OFFSET     0x2C         /**< \brief (NVMCTRL_PBLDATA1 offset) Page Buffer Load Data 1 */
#define NVMCTRL_PBLDATA1_RESETVALUE 0x00000000ul /**< \brief (NVMCTRL_PBLDATA1 reset_value) Page Buffer Load Data 1 */
#define NVMCTRL_PBLDATA1_MASK       0xFFFFFFFFul /**< \brief (NVMCTRL_PBLDATA1) MASK Register */

/** \brief NVMCTRL APB hardware registers */
#if !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__))
typedef struct {
  __IO NVMCTRL_CTRLA_Type        CTRLA;       /**< \brief Offset: 0x00 (R/W 16) Control A */
       RoReg8                    Reserved1[0x2];
  __IO NVMCTRL_CTRLB_Type        CTRLB;       /**< \brief Offset: 0x04 (R/W 32) Control B */
  __IO NVMCTRL_PARAM_Type        PARAM;       /**< \brief Offset: 0x08 (R/W 32) NVM Parameter */
  __IO NVMCTRL_INTENCLR_Type     INTENCLR;    /**< \brief Offset: 0x0C (R/W  8) Interrupt Enable Clear */
       RoReg8                    Reserved2[0x3];
  __IO NVMCTRL_INTENSET_Type     INTENSET;    /**< \brief Offset: 0x10 (R/W  8) Interrupt Enable Set */
       RoReg8                    Reserved3[0x3];
  __IO NVMCTRL_INTFLAG_Type      INTFLAG;     /**< \brief Offset: 0x14 (R/W  8) Interrupt Flag Status and Clear */
       RoReg8                    Reserved4[0x3];
  __IO NVMCTRL_STATUS_Type       STATUS;      /**< \brief Offset: 0x18 (R/W 16) Status */
       RoReg8                    Reserved5[0x2];
  __IO NVMCTRL_ADDR_Type         ADDR;        /**< \brief Offset: 0x1C (R/W 32) Address */
  __IO NVMCTRL_LOCK_Type         LOCK;        /**< \brief Offset: 0x20 (R/W 16) Lock Section */
       RoReg8                    Reserved6[0x6];
  __I  NVMCTRL_PBLDATA0_Type     PBLDATA0;    /**< \brief Offset: 0x28 (R/  32) Page Buffer Load Data 0 */
  __I  NVMCTRL_PBLDATA1_Type     PBLDATA1;    /**< \brief Offset: 0x2C (R/  32) Page Buffer Load Data 1 */
} Nvmctrl;
#endif /* !(defined(__ASSEMBLY__) || defined(__IAR_SYSTEMS_ASM__)) */

#ifdef __GNUC__
 #define SECTION_NVMCTRL_CAL          __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_CAL          @".flash"
#endif

#ifdef __GNUC__
 #define SECTION_NVMCTRL_LOCKBIT      __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_LOCKBIT      @".flash"
#endif

#ifdef __GNUC__
 #define SECTION_NVMCTRL_OTP1         __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_OTP1         @".flash"
#endif

#ifdef __GNUC__
 #define SECTION_NVMCTRL_OTP2         __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_OTP2         @".flash"
#endif

#ifdef __GNUC__
 #define SECTION_NVMCTRL_OTP3         __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_OTP3         @".flash"
#endif

#ifdef __GNUC__
 #define SECTION_NVMCTRL_OTP4         __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_OTP4         @".flash"
#endif

#ifdef __GNUC__
 #define SECTION_NVMCTRL_OTP5         __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_OTP5         @".flash"
#endif

#ifdef __GNUC__
 #define SECTION_NVMCTRL_TEMP_LOG     __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_TEMP_LOG     @".flash"
#endif

#ifdef __GNUC__
 #define SECTION_NVMCTRL_USER         __attribute__ ((section(".flash")))
#elif defined(__ICCARM__)
 #define SECTION_NVMCTRL_USER         @".flash"
#endif

/*@}*/

/* ************************************************************************** */
/**  SOFTWARE PERIPHERAL API DEFINITION FOR NON-VOLATILE FUSES */
/* ************************************************************************** */
/** \addtogroup fuses_api Peripheral Software API */
/*@{*/


#define ADC0_FUSES_BIASCOMP_ADDR    NVMCTRL_OTP5
#define ADC0_FUSES_BIASCOMP_Pos     3            /**< \brief (NVMCTRL_OTP5) ADC Comparator Scaling */
#define ADC0_FUSES_BIASCOMP_Msk     (0x7ul << ADC0_FUSES_BIASCOMP_Pos)
#define ADC0_FUSES_BIASCOMP(value)  (ADC0_FUSES_BIASCOMP_Msk & ((value) << ADC0_FUSES_BIASCOMP_Pos))

#define ADC0_FUSES_BIASREFBUF_ADDR  NVMCTRL_OTP5
#define ADC0_FUSES_BIASREFBUF_Pos   0            /**< \brief (NVMCTRL_OTP5) ADC Bias Reference Buffer Scaling */
#define ADC0_FUSES_BIASREFBUF_Msk   (0x7ul << ADC0_FUSES_BIASREFBUF_Pos)
#define ADC0_FUSES_BIASREFBUF(value) (ADC0_FUSES_BIASREFBUF_Msk & ((value) << ADC0_FUSES_BIASREFBUF_Pos))

#define ADC1_FUSES_BIASCOMP_ADDR    NVMCTRL_OTP5
#define ADC1_FUSES_BIASCOMP_Pos     9            /**< \brief (NVMCTRL_OTP5) ADC Comparator Scaling */
#define ADC1_FUSES_BIASCOMP_Msk     (0x7ul << ADC1_FUSES_BIASCOMP_Pos)
#define ADC1_FUSES_BIASCOMP(value)  (ADC1_FUSES_BIASCOMP_Msk & ((value) << ADC1_FUSES_BIASCOMP_Pos))

#define ADC1_FUSES_BIASREFBUF_ADDR  NVMCTRL_OTP5
#define ADC1_FUSES_BIASREFBUF_Pos   6            /**< \brief (NVMCTRL_OTP5) ADC Bias Reference Buffer Scaling */
#define ADC1_FUSES_BIASREFBUF_Msk   (0x7ul << ADC1_FUSES_BIASREFBUF_Pos)
#define ADC1_FUSES_BIASREFBUF(value) (ADC1_FUSES_BIASREFBUF_Msk & ((value) << ADC1_FUSES_BIASREFBUF_Pos))

#define FUSES_BODCOREUSERLEVEL_ADDR NVMCTRL_USER
#define FUSES_BODCOREUSERLEVEL_Pos  17           /**< \brief (NVMCTRL_USER) BODCORE User Level */
#define FUSES_BODCOREUSERLEVEL_Msk  (0x3Ful << FUSES_BODCOREUSERLEVEL_Pos)
#define FUSES_BODCOREUSERLEVEL(value) (FUSES_BODCOREUSERLEVEL_Msk & ((value) << FUSES_BODCOREUSERLEVEL_Pos))

#define FUSES_BODCORE_ACTION_ADDR   NVMCTRL_USER
#define FUSES_BODCORE_ACTION_Pos    24           /**< \brief (NVMCTRL_USER) BODCORE Action */
#define FUSES_BODCORE_ACTION_Msk    (0x3ul << FUSES_BODCORE_ACTION_Pos)
#define FUSES_BODCORE_ACTION(value) (FUSES_BODCORE_ACTION_Msk & ((value) << FUSES_BODCORE_ACTION_Pos))

#define FUSES_BODCORE_DIS_ADDR      NVMCTRL_USER
#define FUSES_BODCORE_DIS_Pos       23           /**< \brief (NVMCTRL_USER) BODCORE Disable */
#define FUSES_BODCORE_DIS_Msk       (0x1ul << FUSES_BODCORE_DIS_Pos)

#define FUSES_BODCORE_HYST_ADDR     (NVMCTRL_USER + 4)
#define FUSES_BODCORE_HYST_Pos      10           /**< \brief (NVMCTRL_USER) BODCORE Hysterisis */
#define FUSES_BODCORE_HYST_Msk      (0x1ul << FUSES_BODCORE_HYST_Pos)

#define FUSES_BODVDDUSERLEVEL_ADDR  NVMCTRL_USER
#define FUSES_BODVDDUSERLEVEL_Pos   8            /**< \brief (NVMCTRL_USER) BODVDD User Level */
#define FUSES_BODVDDUSERLEVEL_Msk   (0x3Ful << FUSES_BODVDDUSERLEVEL_Pos)
#define FUSES_BODVDDUSERLEVEL(value) (FUSES_BODVDDUSERLEVEL_Msk & ((value) << FUSES_BODVDDUSERLEVEL_Pos))

#define FUSES_BODVDD_ACTION_ADDR    NVMCTRL_USER
#define FUSES_BODVDD_ACTION_Pos     15           /**< \brief (NVMCTRL_USER) BODVDD Action */
#define FUSES_BODVDD_ACTION_Msk     (0x3ul << FUSES_BODVDD_ACTION_Pos)
#define FUSES_BODVDD_ACTION(value)  (FUSES_BODVDD_ACTION_Msk & ((value) << FUSES_BODVDD_ACTION_Pos))

#define FUSES_BODVDD_DIS_ADDR       NVMCTRL_USER
#define FUSES_BODVDD_DIS_Pos        14           /**< \brief (NVMCTRL_USER) BODVDD Disable */
#define FUSES_BODVDD_DIS_Msk        (0x1ul << FUSES_BODVDD_DIS_Pos)

#define FUSES_BODVDD_HYST_ADDR      (NVMCTRL_USER + 4)
#define FUSES_BODVDD_HYST_Pos       9            /**< \brief (NVMCTRL_USER) BODVDD Hysterisis */
#define FUSES_BODVDD_HYST_Msk       (0x1ul << FUSES_BODVDD_HYST_Pos)

#define NVMCTRL_FUSES_BOOTPROT_ADDR NVMCTRL_USER
#define NVMCTRL_FUSES_BOOTPROT_Pos  0            /**< \brief (NVMCTRL_USER) Bootloader Size */
#define NVMCTRL_FUSES_BOOTPROT_Msk  (0x7ul << NVMCTRL_FUSES_BOOTPROT_Pos)
#define NVMCTRL_FUSES_BOOTPROT(value) (NVMCTRL_FUSES_BOOTPROT_Msk & ((value) << NVMCTRL_FUSES_BOOTPROT_Pos))

#define NVMCTRL_FUSES_DUMMY2_ADDR   (NVMCTRL_OTP3 + 4)
#define NVMCTRL_FUSES_DUMMY2_Pos    31           /**< \brief (NVMCTRL_OTP3) Dummy for OTP row. */
#define NVMCTRL_FUSES_DUMMY2_Msk    (0x1ul << NVMCTRL_FUSES_DUMMY2_Pos)

#define NVMCTRL_FUSES_EEPROM_SIZE_ADDR NVMCTRL_USER
#define NVMCTRL_FUSES_EEPROM_SIZE_Pos 4            /**< \brief (NVMCTRL_USER) EEPROM Size */
#define NVMCTRL_FUSES_EEPROM_SIZE_Msk (0x7ul << NVMCTRL_FUSES_EEPROM_SIZE_Pos)
#define NVMCTRL_FUSES_EEPROM_SIZE(value) (NVMCTRL_FUSES_EEPROM_SIZE_Msk & ((value) << NVMCTRL_FUSES_EEPROM_SIZE_Pos))

#define NVMCTRL_FUSES_NVMP_ADDR     NVMCTRL_OTP1
#define NVMCTRL_FUSES_NVMP_Pos      16           /**< \brief (NVMCTRL_OTP1) Number of NVM Pages */
#define NVMCTRL_FUSES_NVMP_Msk      (0x1FFFul << NVMCTRL_FUSES_NVMP_Pos)
#define NVMCTRL_FUSES_NVMP(value)   (NVMCTRL_FUSES_NVMP_Msk & ((value) << NVMCTRL_FUSES_NVMP_Pos))

#define NVMCTRL_FUSES_NVM_LOCK_ADDR NVMCTRL_OTP1
#define NVMCTRL_FUSES_NVM_LOCK_Pos  0            /**< \brief (NVMCTRL_OTP1) NVM Lock */
#define NVMCTRL_FUSES_NVM_LOCK_Msk  (0xFFul << NVMCTRL_FUSES_NVM_LOCK_Pos)
#define NVMCTRL_FUSES_NVM_LOCK(value) (NVMCTRL_FUSES_NVM_LOCK_Msk & ((value) << NVMCTRL_FUSES_NVM_LOCK_Pos))

#define NVMCTRL_FUSES_PSZ_ADDR      NVMCTRL_OTP1
#define NVMCTRL_FUSES_PSZ_Pos       8            /**< \brief (NVMCTRL_OTP1) NVM Page Size */
#define NVMCTRL_FUSES_PSZ_Msk       (0x3ul << NVMCTRL_FUSES_PSZ_Pos)
#define NVMCTRL_FUSES_PSZ(value)    (NVMCTRL_FUSES_PSZ_Msk & ((value) << NVMCTRL_FUSES_PSZ_Pos))

#define NVMCTRL_FUSES_REGION_LOCKS_ADDR (NVMCTRL_USER + 4)
#define NVMCTRL_FUSES_REGION_LOCKS_Pos 16           /**< \brief (NVMCTRL_USER) NVM Region Locks */
#define NVMCTRL_FUSES_REGION_LOCKS_Msk (0xFFFFul << NVMCTRL_FUSES_REGION_LOCKS_Pos)
#define NVMCTRL_FUSES_REGION_LOCKS(value) (NVMCTRL_FUSES_REGION_LOCKS_Msk & ((value) << NVMCTRL_FUSES_REGION_LOCKS_Pos))

#define NVMCTRL_FUSES_RWWEEP_ADDR   (NVMCTRL_OTP1 + 4)
#define NVMCTRL_FUSES_RWWEEP_Pos    0            /**< \brief (NVMCTRL_OTP1) Number of RWW EEPROM Pages */
#define NVMCTRL_FUSES_RWWEEP_Msk    (0xFFul << NVMCTRL_FUSES_RWWEEP_Pos)
#define NVMCTRL_FUSES_RWWEEP(value) (NVMCTRL_FUSES_RWWEEP_Msk & ((value) << NVMCTRL_FUSES_RWWEEP_Pos))

#define TSENS_FUSES_FCAL_ADDR       NVMCTRL_TEMP_LOG
#define TSENS_FUSES_FCAL_Pos        6            /**< \brief (NVMCTRL_TEMP_LOG) Frequency Calibration */
#define TSENS_FUSES_FCAL_Msk        (0x3Ful << TSENS_FUSES_FCAL_Pos)
#define TSENS_FUSES_FCAL(value)     (TSENS_FUSES_FCAL_Msk & ((value) << TSENS_FUSES_FCAL_Pos))

#define TSENS_FUSES_GAIN_0_ADDR     NVMCTRL_TEMP_LOG
#define TSENS_FUSES_GAIN_0_Pos      12           /**< \brief (NVMCTRL_TEMP_LOG) Gain Calibration bits 19:0 */
#define TSENS_FUSES_GAIN_0_Msk      (0xFFFFFul << TSENS_FUSES_GAIN_0_Pos)
#define TSENS_FUSES_GAIN_0(value)   (TSENS_FUSES_GAIN_0_Msk & ((value) << TSENS_FUSES_GAIN_0_Pos))

#define TSENS_FUSES_GAIN_1_ADDR     (NVMCTRL_TEMP_LOG + 4)
#define TSENS_FUSES_GAIN_1_Pos      0            /**< \brief (NVMCTRL_TEMP_LOG) Gain Calibration bits 23:20 */
#define TSENS_FUSES_GAIN_1_Msk      (0xFul << TSENS_FUSES_GAIN_1_Pos)
#define TSENS_FUSES_GAIN_1(value)   (TSENS_FUSES_GAIN_1_Msk & ((value) << TSENS_FUSES_GAIN_1_Pos))

#define TSENS_FUSES_OFFSET_ADDR     (NVMCTRL_TEMP_LOG + 4)
#define TSENS_FUSES_OFFSET_Pos      4            /**< \brief (NVMCTRL_TEMP_LOG) Offse Calibration */
#define TSENS_FUSES_OFFSET_Msk      (0xFFFFFFul << TSENS_FUSES_OFFSET_Pos)
#define TSENS_FUSES_OFFSET(value)   (TSENS_FUSES_OFFSET_Msk & ((value) << TSENS_FUSES_OFFSET_Pos))

#define TSENS_FUSES_TCAL_ADDR       NVMCTRL_TEMP_LOG
#define TSENS_FUSES_TCAL_Pos        0            /**< \brief (NVMCTRL_TEMP_LOG) Temperature Calibration */
#define TSENS_FUSES_TCAL_Msk        (0x3Ful << TSENS_FUSES_TCAL_Pos)
#define TSENS_FUSES_TCAL(value)     (TSENS_FUSES_TCAL_Msk & ((value) << TSENS_FUSES_TCAL_Pos))

#define WDT_FUSES_ALWAYSON_ADDR     NVMCTRL_USER
#define WDT_FUSES_ALWAYSON_Pos      27           /**< \brief (NVMCTRL_USER) WDT Always On */
#define WDT_FUSES_ALWAYSON_Msk      (0x1ul << WDT_FUSES_ALWAYSON_Pos)

#define WDT_FUSES_ENABLE_ADDR       NVMCTRL_USER
#define WDT_FUSES_ENABLE_Pos        26           /**< \brief (NVMCTRL_USER) WDT Enable */
#define WDT_FUSES_ENABLE_Msk        (0x1ul << WDT_FUSES_ENABLE_Pos)

#define WDT_FUSES_EWOFFSET_ADDR     (NVMCTRL_USER + 4)
#define WDT_FUSES_EWOFFSET_Pos      4            /**< \brief (NVMCTRL_USER) WDT Early Warning Offset */
#define WDT_FUSES_EWOFFSET_Msk      (0xFul << WDT_FUSES_EWOFFSET_Pos)
#define WDT_FUSES_EWOFFSET(value)   (WDT_FUSES_EWOFFSET_Msk & ((value) << WDT_FUSES_EWOFFSET_Pos))

#define WDT_FUSES_PER_ADDR          NVMCTRL_USER
#define WDT_FUSES_PER_Pos           28           /**< \brief (NVMCTRL_USER) WDT Period */
#define WDT_FUSES_PER_Msk           (0xFul << WDT_FUSES_PER_Pos)
#define WDT_FUSES_PER(value)        (WDT_FUSES_PER_Msk & ((value) << WDT_FUSES_PER_Pos))

#define WDT_FUSES_WEN_ADDR          (NVMCTRL_USER + 4)
#define WDT_FUSES_WEN_Pos           8            /**< \brief (NVMCTRL_USER) WDT Window Mode Enable */
#define WDT_FUSES_WEN_Msk           (0x1ul << WDT_FUSES_WEN_Pos)

#define WDT_FUSES_WINDOW_ADDR       (NVMCTRL_USER + 4)
#define WDT_FUSES_WINDOW_Pos        0            /**< \brief (NVMCTRL_USER) WDT Window */
#define WDT_FUSES_WINDOW_Msk        (0xFul << WDT_FUSES_WINDOW_Pos)
#define WDT_FUSES_WINDOW(value)     (WDT_FUSES_WINDOW_Msk & ((value) << WDT_FUSES_WINDOW_Pos))

/*@}*/

#endif /* _SAMC21_NVMCTRL_COMPONENT_ */
