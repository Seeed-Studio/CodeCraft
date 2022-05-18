/**
 * \file
 *
 * \brief gcc starttup file for SAMC21
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

#include "samc21.h"

/* Initialize segments */
extern uint32_t _sfixed;
extern uint32_t _efixed;
extern uint32_t _etext;
extern uint32_t _srelocate;
extern uint32_t _erelocate;
extern uint32_t _szero;
extern uint32_t _ezero;
extern uint32_t _sstack;
extern uint32_t _estack;

/** \cond DOXYGEN_SHOULD_SKIP_THIS */
int main(void);
/** \endcond */

void __libc_init_array(void);

/* Default empty handler */
void Dummy_Handler(void);

/* Cortex-M0+ core handlers */
void NMI_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void HardFault_Handler       ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void SVC_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void PendSV_Handler          ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void SysTick_Handler         ( void ) __attribute__ ((weak, alias("Dummy_Handler")));

/* Peripherals handlers */
void SYSTEM_Handler          ( void ) __attribute__ ((weak, alias("Dummy_Handler"))); /* MCLK, OSCCTRL, OSC32KCTRL, PAC, PM, SUPC, TAL */
void WDT_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void RTC_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void EIC_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void FREQM_Handler           ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#ifdef ID_TSENS
void TSENS_Handler           ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
void NVMCTRL_Handler         ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void DMAC_Handler            ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void EVSYS_Handler           ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void SERCOM0_Handler         ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void SERCOM1_Handler         ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void SERCOM2_Handler         ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void SERCOM3_Handler         ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#ifdef ID_SERCOM4
void SERCOM4_Handler         ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_SERCOM5
void SERCOM5_Handler         ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_CAN0
void CAN0_Handler            ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_CAN1
void CAN1_Handler            ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
void TCC0_Handler            ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#ifdef ID_TCC1
void TCC1_Handler            ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_TCC2
void TCC2_Handler            ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
void TC0_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void TC1_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void TC2_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void TC3_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
void TC4_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#ifdef ID_ADC0
void ADC0_Handler            ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_ADC1
void ADC1_Handler            ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_AC
void AC_Handler              ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_DAC
void DAC_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_SDADC
void SDADC_Handler           ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif
#ifdef ID_PTC
void PTC_Handler             ( void ) __attribute__ ((weak, alias("Dummy_Handler")));
#endif

/* Exception Table */
__attribute__ ((section(".vectors")))
const DeviceVectors exception_table = {

        /* Configure Initial Stack Pointer, using linker-generated symbols */
        (void*) (&_estack),

        (void*) Reset_Handler,
        (void*) NMI_Handler,
        (void*) HardFault_Handler,
        (void*) (0UL), /* Reserved */
        (void*) (0UL), /* Reserved */
        (void*) (0UL), /* Reserved */
        (void*) (0UL), /* Reserved */
        (void*) (0UL), /* Reserved */
        (void*) (0UL), /* Reserved */
        (void*) (0UL), /* Reserved */
        (void*) SVC_Handler,
        (void*) (0UL), /* Reserved */
        (void*) (0UL), /* Reserved */
        (void*) PendSV_Handler,
        (void*) SysTick_Handler,

        /* Configurable interrupts */
        (void*) SYSTEM_Handler,         /*  0 Main Clock, Oscillators Control, 32k Oscillators Control, Peripheral Access Controller, Power Manager, Supply Controller, Trigger Allocator */
        (void*) WDT_Handler,            /*  1 Watchdog Timer */
        (void*) RTC_Handler,            /*  2 Real-Time Counter */
        (void*) EIC_Handler,            /*  3 External Interrupt Controller */
        (void*) FREQM_Handler,          /*  4 Frequency Meter */
#ifdef ID_TSENS
        (void*) TSENS_Handler,          /*  5 Temperature Sensor */
#else
        (void*) (0UL), /* Reserved */
#endif
        (void*) NVMCTRL_Handler,        /*  6 Non-Volatile Memory Controller */
        (void*) DMAC_Handler,           /*  7 Direct Memory Access Controller */
        (void*) EVSYS_Handler,          /*  8 Event System Interface */
        (void*) SERCOM0_Handler,        /*  9 Serial Communication Interface 0 */
        (void*) SERCOM1_Handler,        /* 10 Serial Communication Interface 1 */
        (void*) SERCOM2_Handler,        /* 11 Serial Communication Interface 2 */
        (void*) SERCOM3_Handler,        /* 12 Serial Communication Interface 3 */
#ifdef ID_SERCOM4
        (void*) SERCOM4_Handler,        /* 13 Serial Communication Interface 4 */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_SERCOM5
        (void*) SERCOM5_Handler,        /* 14 Serial Communication Interface 5 */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_CAN0
        (void*) CAN0_Handler,           /* 15 Control Area Network 0 */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_CAN1
        (void*) CAN1_Handler,           /* 16 Control Area Network 1 */
#else
        (void*) (0UL), /* Reserved */
#endif
        (void*) TCC0_Handler,           /* 17 Timer Counter Control 0 */
#ifdef ID_TCC1
        (void*) TCC1_Handler,           /* 18 Timer Counter Control 1 */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_TCC2
        (void*) TCC2_Handler,           /* 19 Timer Counter Control 2 */
#else
        (void*) (0UL), /* Reserved */
#endif
        (void*) TC0_Handler,            /* 20 Basic Timer Counter 0 */
        (void*) TC1_Handler,            /* 21 Basic Timer Counter 1 */
        (void*) TC2_Handler,            /* 22 Basic Timer Counter 2 */
        (void*) TC3_Handler,            /* 23 Basic Timer Counter 3 */
        (void*) TC4_Handler,            /* 24 Basic Timer Counter 4 */
#ifdef ID_ADC0
        (void*) ADC0_Handler,           /* 25 Analog Digital Converter 0 */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_ADC1
        (void*) ADC1_Handler,           /* 26 Analog Digital Converter 1 */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_AC
        (void*) AC_Handler,             /* 27 Analog Comparators */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_DAC
        (void*) DAC_Handler,            /* 28 Digital Analog Converter */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_SDADC
        (void*) SDADC_Handler,          /* 29 Sigma-Delta Analog Digital Converter */
#else
        (void*) (0UL), /* Reserved */
#endif
#ifdef ID_PTC
        (void*) PTC_Handler             /* 30 Peripheral Touch Controller */
#else
        (void*) (0UL)  /* Reserved */
#endif
};

/**
 * \brief This is the code that gets called on processor reset.
 * To initialize the device, and call the main() routine.
 */
void Reset_Handler(void)
{
        uint32_t *pSrc, *pDest;

        /* Initialize the relocate segment */
        pSrc = &_etext;
        pDest = &_srelocate;

        if (pSrc != pDest) {
                for (; pDest < &_erelocate;) {
                        *pDest++ = *pSrc++;
                }
        }

        /* Clear the zero segment */
        for (pDest = &_szero; pDest < &_ezero;) {
                *pDest++ = 0;
        }

        /* Set the vector table base address */
        pSrc = (uint32_t *) & _sfixed;
        SCB->VTOR = ((uint32_t) pSrc & SCB_VTOR_TBLOFF_Msk);

        /* Initialize the C library */
        __libc_init_array();

        /* Branch to main function */
        main();

        /* Infinite loop */
        while (1);
}

/**
 * \brief Default interrupt handler for unused IRQs.
 */
void Dummy_Handler(void)
{
        while (1) {
        }
}
