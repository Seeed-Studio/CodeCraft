
#ifndef _TIMER_TCC0_H_
#define _TIMER_TCC0_H_


#define CPU_HZ 48000000
#define RESOLUTION 0xffffff    // Timer TCC0 is 24 bit


class TimerTCC0
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


extern TimerTCC0 TimerTcc0;


#endif