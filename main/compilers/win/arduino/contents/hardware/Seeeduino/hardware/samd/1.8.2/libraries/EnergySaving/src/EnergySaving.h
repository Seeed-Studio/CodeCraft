#ifndef energy_saving_h
#define energy_saving_h


#include <sam.h>
#include <Arduino.h>

#define WAKE_EXT_INTERRUPT 1
#define WAKE_RTC_ALARM 2

typedef void (*voidFuncPtr)( void ) ;

class EnergySaving {
	public:
		//sleep();
		void begin(unsigned int mode, unsigned int inter_pin, voidFuncPtr callback);
		void begin(unsigned int mode);
		void standby(void);

	private:
		void set_clk(void);
		void enable_eic_wake(unsigned int inter_pin);

};

#endif
