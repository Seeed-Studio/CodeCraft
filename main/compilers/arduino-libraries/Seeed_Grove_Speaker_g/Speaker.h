// library for seeed Graphic programming project
// loovee @ 2015-9-24
// under MIT license
#ifndef __GROVE_SPEAKER_G_H__
#define __GROVE_SPEAKER_G_H__
#include <Arduino.h>

#define NOTE_1  532
#define NOTE_2  587
#define NOTE_3  659
#define NOTE_4  698
#define NOTE_5  784
#define NOTE_6  880
#define NOTE_7  988
#define NOTE_8  1047

#define NO_NOTE 0 


class grove_speaker_g{

public:
    void SpeakerWrite(int PinName,int Note)
    {
        if((Note < 0)||(Note > 8))Note = 0; 
		
        int __note[8] = {NOTE_1, NOTE_2, NOTE_3, NOTE_4, NOTE_5, NOTE_6, NOTE_7, NOTE_8};
		if(Note==0){
			digitalWrite(PinName, LOW);
		}
		else {
			int period = 1000000L /__note[Note-1];
			int pulse = period / 2;
			for (long i = 0; i < 200 * 1000L; i += period) {
			digitalWrite(PinName, HIGH);
			delayMicroseconds(pulse);
			digitalWrite(PinName, LOW);
			delayMicroseconds(pulse);	
			}			
		}

			
		


    }
};


#endif