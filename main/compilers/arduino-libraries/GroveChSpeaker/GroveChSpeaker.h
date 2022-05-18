class GroveChSpeaker
{

    private:
        unsigned int __pin;
        uint32_t BassTab[24] = {
            3817, 3401, 3030, 2857, 2551, 2273, 2024, //bass C3~B3
            1908, 1701, 1515, 1433, 1276, 1136, 1012, //bass C4~B4
            956, 852, 759, 716, 638, 568, 506,        //bass C5~B5
        };
        
        uint32_t BeatTab[8] = {
            500, 250, 125, 62, 1000, 2000, 4000 //beat 1, 1/2, 1/4, 1/8, 2, 4, 8
        };

    public:
        GroveChSpeaker(unsigned char pin);
        void playNote(uint8_t noteIndex, uint8_t beat);

};