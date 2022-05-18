/*
  Copyright (c) 2014 Arduino.  All right reserved.

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

#include <Arduino.h>
#include <stdlib.h>

void __attribute__((weak))  *operator new(size_t size) {
  return malloc(size);
}

void __attribute__((weak))  *operator new[](size_t size) {
  return malloc(size);
}

void __attribute__((weak))  operator delete(void * ptr) {
  free(ptr);
}

void __attribute__((weak)) operator delete[](void * ptr) {
  free(ptr);
}

extern "C" {
extern char __HeapLimit;
extern char __end__;

/*
 * a library function _sbrk() reimplement.
 *
 * The arm-none-eabi-gcc-4.8.3-2014q1 's _sbrk() check heap_end & current stack(),
 * not applied for RTOS environment in which malloc() will failed.
 */
void *_sbrk(size_t incr) {
  static char* heap_end;
  char* old_end;

  uint8_t irqsave = interruptsStatus();
  noInterrupts();

  if (!heap_end) {
    heap_end = &__end__;
  }

  old_end = heap_end;
  if (old_end + incr >= (char*)__get_MSP()) {
    old_end = (char*)-1;
  } else {
    heap_end += incr;
  }

  if (irqsave)
    interrupts();

  return old_end;
}

}//extern "C"
