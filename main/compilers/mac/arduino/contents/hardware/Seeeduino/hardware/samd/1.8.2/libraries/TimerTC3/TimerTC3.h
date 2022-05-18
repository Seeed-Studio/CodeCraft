
#ifndef _TIMER_TC3_H_
#define _TIMER_TC3_H_


#define CPU_HZ 48000000
#define RESOLUTION 0xffff    // Timer TC3 is 16 bit


class TimerTC3
{
  public:

    void initialize(long microseconds = 1000000);
    
    void setPeriod(long microseconds);
    
    void start();
    void stop();
    void restart();

    void attachInterrupt(void (*isr)());
    void detachInterrupt();

    void (*isrCallback)();
};


extern TimerTC3 TimerTc3;


#endif