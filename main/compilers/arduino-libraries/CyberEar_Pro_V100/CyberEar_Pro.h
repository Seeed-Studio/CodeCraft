/*
 * cyberear_pro_v100.h
 * Driver for DIGITAL I2C HUMIDITY AND TEMPERATURE SENSOR
 *  
 * Copyright (c) 2019 CH Technology Co., Ltd.
 * Website    : www.chmakered.cc
 * Author     : Jim XU
 * Create Time: Oct. 2019
 * Change Log :
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#ifndef _CYBEREAR_PRO_V100_
#define _CYBEREAR_PRO_V100_

#include <Arduino.h>
#include "wiring_private.h"
#include <avr/io.h>
#include <Wire.h>

#define CYBEREAR_DEVICE_ADDRESS     0x48
#define MAX_RETRY_TIMES             10
#define SYSTEM_MAX_PARA_LEN         128
#define MAX_TEXT_SIZE               256

typedef enum
{
    // below parameters was transfered through I2C for command INIT.
    WIFI_SSID,          // CHCK
    WIFI_PASSWORD,      // depot0510
    ZWB_NAME,           // shuo.deng@foxmail.com
    ZWB_PASSWORD,       // 123456
    ZWB_URL,            // https://cctest2.chmakered.com/UserServiceGroup/User/UserLoginWithPwd
    ZWB_LANGUAGE,       // cn/en
    ALY_TOKEN_URL,      // https://cctest2.chmakered.com/AlyVoiceGW/GetToken
    // below parameters was transfered through I2C for command V2T.
    ALY_V2T_TIME,       // times for record.
	
    // below parameters was transfered through I2C for command T2V.
    ALY_T2V_TEXT,       // text for T2V, in UTF-8.
    // below parameters was transfered through I2C for command SD_PLAY.
    SD_PLAY_MUSIC,      // play voice file number in SD card.
    SD_PLAY_VOLUME,     // play voice volume, in 0-255.
    SD_PLAY_ACTION,     // play voice file actions, like start, stop, pause...
    // below command was transfered through I2C.
    SYSTEM_STATUS,      // get system status.
    V2T_TEXT_RESULT,    // get voice to text result.
    SD_FILE_NUMBERS,    // get file numbers in SD card.
    // Initial and VT convert command was transfered through I2C.
    COMMAND_INIT,       // init
	
    COMMAND_V2T,        // v2t
    COMMAND_T2V,        // t2v
    // SD play command was transfered through I2C.
    SD_RECORD_START,    // record voice, and save in SD card.
    SD_RECORD_STOP,     // record voice, and save in SD card.
    SD_PLAY,            // play voice file in SD card.
    MUSIC_RECORD_FILE,  // record file name.
    MUSIC_FILE_NUMBER,  // sd_play_num
	
    // below parameters was transfered through network.
    ZWB_UUID,           // 70c4a40e-c8fc-4264-9f71-6efb9bba1937
    ZWB_ACCESS_TOKEN,   // 0f362e0e46e15ea1bf51f0fab6b5de1c48489bc6b145559eae65d000da3c5563
    ALY_V2T_URL,        // https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/tts
    ALY_T2V_URL,        // http://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/asr
	
    ALY_APP_KEY,        // KtAVbvcHK895c6yM
    ALY_TOKEN,          // dfe66eb671f947328d3c3358407ec83a

    MAX_NET_PARAMETERS
}connection_paras;


typedef enum
{
    // below parameters was transfered through I2C for command INIT.
    SD_PLAY_START,      //
    SD_PLAY_STOP,       //
    SD_PLAY_PAUSE,      //
    SD_PLAY_RESUME,     //
    SD_PLAY_NEXT,       //
    SD_PLAY_PREV,       //
	SD_PLAY_LOOP,
	SD_PLAY_ORDER,
	SD_PLAY_ONE,
	
    SD_PLAY_MAX
}sd_play_paras;

#define PARAMETERS_READY    ((1UL<<WIFI_SSID) | (1UL<<WIFI_PASSWORD) | (1UL<<ZWB_NAME) | (1UL<<ZWB_PASSWORD) | \
                             (1UL<<ZWB_URL) | (1UL<<ALY_TOKEN_URL))

#define NETWORK_READY 		((1UL<<ALY_V2T_URL) | (1UL<<ALY_T2V_URL) | \
							 (1UL<<ALY_APP_KEY) | (1UL<<ALY_TOKEN))

class CyberEarPro
{
    public:
        CyberEarPro(uint8_t default_iic_addr=CYBEREAR_DEVICE_ADDRESS);
        ~CyberEarPro(){};
        void sendCmd(connection_paras cmd);
        uint32_t setPara(connection_paras cmd, char *cyber_cmd);
        uint32_t getstatus(void);
        uint32_t getfiles(void);
        void Connect(char *ssid, char *ss_pwd);
		int Connected();
		
		void Voice2Text(int Lang, int Time);
        uint32_t getResult(int TimeOut);
		uint8_t * getText();
		
		void Text2Voice(int Lang, char *t2v_text);

		void SD_RecordStart(char *v_file);
		void SD_RecordStop();
		
        void sdPlayFile(char *v_file);
        void sdPlay(int Num);
		void sdSetVolume(int Num);
        void sdStop();
        void sdPause();
        void sdResume();
        void sdMode(int PlayMode);
        void sdNext();
        void sdPrev();
        void setParaWifi_ssid(char *cyber_cmd);
        void setParaWifi_pswd(char *cyber_cmd);
        void setParaUser_name(char *cyber_cmd);
        void setParaUser_pswd(char *cyber_cmd);
        void setParaLogin_url(char *cyber_cmd);
        void setParaLanguage(char *cyber_cmd);
        void setParaToken_url(char *cyber_cmd);

    private:
        uint8_t iic_addr_, wifi_paras;
        uint8_t v2t_text[MAX_TEXT_SIZE];
		void DisableUart();
		void EnableUart();
        int i2cWriteBytes(char* data,uint32_t data_len);
        int iicReadBytes(char *bytes,uint8_t len);
};


#endif
