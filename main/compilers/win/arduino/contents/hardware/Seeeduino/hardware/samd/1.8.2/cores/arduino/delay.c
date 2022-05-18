/*
  Copyright (c) 2015 Arduino LLC.  All right reserved.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

#include "delay.h"
#include "Arduino.h"
#include "sys/time.h"
#include <time.h>

#ifdef __cplusplus
extern "C" {
#endif

/** Tick Counter united by ms */
static volatile uint32_t _ulTickCount=0 ;

unsigned long millis( void )
{
// todo: ensure no interrupts
  return _ulTickCount ;
}

static volatile struct timeval timebase[1];

int settimeofday(const struct timeval* tv, const struct timezone* tz) {
  timebase->tv_usec = 0;
  timebase->tv_sec  = tv->tv_sec - millis() / 1000UL;
  return 0;
}

int _gettimeofday(struct timeval* tv, void* timezone) {
  /*
  if (!timebase->tv_sec) {
    struct tm ti[1] = {{0}};
    ti->tm_year = 2020 - 1900;
    ti->tm_mon  =    1 - 1;
    ti->tm_mday =    1 - 0;
    timebase->tv_sec = mktime(ti);
  }
  */
  tv->tv_sec = timebase->tv_sec + millis() / 1000UL;
  tv->tv_usec = (millis() % 1000UL) * 1000UL;
  return 0;
}

// Interrupt-compatible version of micros
// Theory: repeatedly take readings of SysTick counter, millis counter and SysTick interrupt pending flag.
// When it appears that millis counter and pending is stable and SysTick hasn't rolled over, use these
// values to calculate micros. If there is a pending SysTick, add one to the millis counter in the calculation.
unsigned long micros( void )
{
  uint32_t ticks, ticks2;
  uint32_t pend, pend2;
  uint32_t count, count2;

  ticks2  = SysTick->VAL;
  pend2   = !!(SCB->ICSR & SCB_ICSR_PENDSTSET_Msk)  ;
  count2  = _ulTickCount ;

  do
  {
    ticks=ticks2;
    pend=pend2;
    count=count2;
    ticks2  = SysTick->VAL;
    pend2   = !!(SCB->ICSR & SCB_ICSR_PENDSTSET_Msk)  ;
    count2  = _ulTickCount ;
  } while ((pend != pend2) || (count != count2) || (ticks < ticks2));

  return ((count+pend) * 1000) + (((SysTick->LOAD  - ticks)*(1048576/(VARIANT_MCK/1000000)))>>20) ;
  // this is an optimization to turn a runtime division into two compile-time divisions and
  // a runtime multiplication and shift, saving a few cycles
}

#ifdef __SAMD51__
/*
 * On SAMD51, use the (32bit) cycle count maintained by the DWT unit,
 * and count exact number of cycles elapsed, rather than guessing how
 * many cycles a loop takes, which is dangerous in the presence of
 * cache.  The overhead of the call and internal code is "about" 20
 * cycles.  (at 120MHz, that's about 1/6 us)
 */
void delayMicroseconds(unsigned int us)
{
  uint32_t start, elapsed;
  uint32_t count;

  if (us == 0)
    return;

  count = us * (VARIANT_MCK / 1000000) - 20;  // convert us to cycles.
  start = DWT->CYCCNT;  //CYCCNT is 32bits, takes 37s or so to wrap.
  while (1) {
    elapsed = DWT->CYCCNT - start;
    if (elapsed >= count)
      return;
  }
}
#endif

void _real_delay( unsigned long ms )
{
  if (ms == 0)
  {
    return;
  }

  uint32_t start = micros();

  while (ms > 0)
  {
    yield();
    while (ms > 0 && (micros() - start) >= 1000)
    {
      ms--;
      start += 1000;
    }
  }
}

/*
 * override this delay() when run RTOS
 */
void delay( unsigned long ms ) __attribute__ ((weak, alias("_real_delay")));

#include "Reset.h" // for tickReset()

void SysTick_DefaultHandler(void)
{
  // Increment tick count each ms
  _ulTickCount++;
  tickReset();
}

#ifdef __cplusplus
}
#endif
