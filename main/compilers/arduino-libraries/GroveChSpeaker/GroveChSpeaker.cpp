#include <Arduino.h>
#include "GroveChSpeaker.h"

GroveChSpeaker::GroveChSpeaker(unsigned char pin)
{
    __pin = pin;

    pinMode(pin, OUTPUT);
    digitalWrite(pin, LOW);
}

void GroveChSpeaker::playNote(uint8_t noteIndex, uint8_t beat)
{
    uint32_t i, BeatDelay;

    BeatDelay = (BeatTab[beat] * 500) / BassTab[noteIndex];

    for (i = 0; i < BeatDelay; i++)
    {
        digitalWrite(__pin, HIGH);
        delayMicroseconds(BassTab[noteIndex]);
        digitalWrite(__pin, LOW);
        delayMicroseconds(BassTab[noteIndex]);
    }
}