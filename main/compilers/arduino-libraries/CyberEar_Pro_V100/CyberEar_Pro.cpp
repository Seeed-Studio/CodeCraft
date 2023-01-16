/*
 * seeed_led_matrix.cpp
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

#include "CyberEar_Pro.h"


const char *dict_cmd_para[MAX_NET_PARAMETERS] =
{
    "ssid",       //   WIFI_SSID,
    "wifipass",   //   WIFI_PASSWORD,
    "username",   //   ZWB_NAME,
    "password",   //   ZWB_PASSWORD,
    "zwburl",     //   ZWB_URL,
    "language",   //   ZWB_LANGUAGE,
    "zwbtoken",   //   ALY_TOKEN_URL,

    "v2t_time",   //   ALY_V2T_TIME,

    "text",       //   ALY_T2V_TEXT,

    "music",      //   SD_PLAY_MUSIC,
    "volume",     //   SD_PLAY_VOLUME,
    "action",     //   SD_PLAY_ACTION,

    "status",     //   SYSTEM_STATUS,
    "result",     //   V2T_TEXT_RESULT,
    "file",       //   SD_FILE_NUMBERS,

    "init",       //   COMMAND_INIT,
	
    "v2txt",      //   COMMAND_V2T,
    "t2voice",    //   COMMAND_T2V,

    "rec_start",  //   SD_RECORD_START,
    "rec_stop",   //   SD_RECORD_STOP,
    "play",       //   SD_PLAY,
    "rec_time",   //   MUSIC_RECORD_FILE,
    "number",     //   MUSIC_FILE_NUMBER
    
	"userUUID",          //   ZWB_UUID,          
	"accessToken",       //   ZWB_ACCESS_TOKEN,
	
    "alyVoice2TextUrl",  //   ALY_V2T_URL,       
    "alyText2VoiceUrl",  //   ALY_T2V_URL,
    "alyVoiceAppKey",    //   ALY_APP_KEY,
	"alyVoiceToken"      //   ALY_TOKEN,         
};

const char *dict_play_para[SD_PLAY_MAX] =
{
    "start",        //   SD_PLAY_START,
    "stop",         //   SD_PLAY_STOP,
    "pause",        //   SD_PLAY_PAUSE,
    "resume",       //   SD_PLAY_RESUME,
    "next",         //   SD_PLAY_NEXT,
    "previous",     //   SD_PLAY_PREV,
    "loop",         //   SD_PLAY_LOOP,
    "order",        //   SD_PLAY_ORDER,
    "one",          //   SD_PLAY_ONE,
};

typedef enum
{
    // below parameters was transfered through I2C for command INIT.
    LANGUAGE_CN,      //
    LANGUAGE_EN,       //

    LANGUAGE_MAX_NUMBER
}language_paras;

const char *language_matrix[LANGUAGE_MAX_NUMBER] =
{
    "cn",         //   Chinese,
    "en",         //   English,
};

CyberEarPro::CyberEarPro(uint8_t default_iic_addr)
{
    iic_addr_=default_iic_addr;
	wifi_paras = 0;
	memset(v2t_text, 0, MAX_TEXT_SIZE);
}


void CyberEarPro::sendCmd(connection_paras cmd)
{
	char send_buf[32]={0,};

	sprintf(send_buf+1, "{%s}", dict_cmd_para[cmd]);
	send_buf[0]=strlen(send_buf+1) & 0xFF;
	i2cWriteBytes(send_buf, strlen(send_buf+1)+1);
}

uint32_t CyberEarPro::setPara(connection_paras cmd, char *cyber_cmd)
{
	char send_buf[128]={0,};
	uint32_t sta;

	sprintf(send_buf+1, "{%s:%s}", dict_cmd_para[cmd], cyber_cmd);
	send_buf[0]=strlen(send_buf+1) & 0xFF;
	i2cWriteBytes(send_buf, strlen(send_buf+1)+1);
	delay(10);
	
	return 1;
}

void CyberEarPro::setParaWifi_ssid(char *cyber_cmd)
{
	setPara(WIFI_SSID, cyber_cmd);
	wifi_paras |= (1 << WIFI_SSID);
}
void CyberEarPro::setParaWifi_pswd(char *cyber_cmd)
{
	setPara(WIFI_PASSWORD, cyber_cmd);
	wifi_paras |= (1 << WIFI_PASSWORD);
}
void CyberEarPro::setParaUser_name(char *cyber_cmd)
{
	setPara(ZWB_NAME, cyber_cmd);
	wifi_paras |= (1 << ZWB_NAME);
}
void CyberEarPro::setParaUser_pswd(char *cyber_cmd)
{
	setPara(ZWB_PASSWORD, cyber_cmd);
	wifi_paras |= (1 << ZWB_PASSWORD);
}
void CyberEarPro::setParaLogin_url(char *cyber_cmd)
{
	setPara(ZWB_URL, cyber_cmd);
	wifi_paras |= (1 << ZWB_URL);
}
void CyberEarPro::setParaLanguage(char *cyber_cmd)
{
	setPara(ZWB_LANGUAGE, cyber_cmd);
	wifi_paras |= (1 << ZWB_LANGUAGE);
}
void CyberEarPro::setParaToken_url(char *cyber_cmd)
{
	setPara(ALY_TOKEN_URL, cyber_cmd);
	wifi_paras |= (1 << ALY_TOKEN_URL);
}

void CyberEarPro::Connect(char *ssid, char *ss_pwd)
{
    int32_t sys_status = 0;

	setPara(WIFI_SSID, ssid);
	wifi_paras |= (1 << WIFI_SSID);
	
	setPara(WIFI_PASSWORD, ss_pwd);
	wifi_paras |= (1 << WIFI_PASSWORD);

	if ((wifi_paras&PARAMETERS_READY) != PARAMETERS_READY)
	{
		return;
	}
	sendCmd(COMMAND_INIT);

    while (((sys_status & NETWORK_READY) != NETWORK_READY) && (sys_status != -1))
	{
		delay(1000);
		sys_status = getstatus();
	}
}

int CyberEarPro::Connected()
{
    int32_t sys_status = 0;

	sys_status = getstatus();
	if (((sys_status & NETWORK_READY) == NETWORK_READY))
	{
		return 1;
	}else{
		return 0;
	}
}

void CyberEarPro::Voice2Text(int Lang, int Time)
{
    int32_t sys_status = 0;
	char Time_num[20];
	
	itoa(Time, Time_num, 10);
	setPara(ALY_V2T_TIME, Time_num);
	if (Lang < LANGUAGE_MAX_NUMBER)
	{
		setParaLanguage(language_matrix[Lang]);
	}
	
	if ((wifi_paras&PARAMETERS_READY) != PARAMETERS_READY)
	{
		return;
	}
    while (((sys_status & NETWORK_READY) != NETWORK_READY) && (sys_status != -1))
	{
		delay(1000);
		sys_status = getstatus();
	}
	sendCmd(COMMAND_V2T);

    while (((sys_status & (1UL<<V2T_TEXT_RESULT)) != (1UL<<V2T_TEXT_RESULT)) && (sys_status != -1))
	{
		delay(1000);
		sys_status = getstatus();
	}
	getResult(60);
}

void CyberEarPro::Text2Voice(int Lang, char *t2v_text)
{
    int32_t sys_status = 0, i;
	uint8_t t2v_str[MAX_TEXT_SIZE]={0,};

	if ((wifi_paras&PARAMETERS_READY) != PARAMETERS_READY)
	{
		return;
	}
	if (Lang < LANGUAGE_MAX_NUMBER)
	{
		setParaLanguage(language_matrix[Lang]);
	}
	for(i=0;i<strlen(t2v_text);i++)
	{
	    t2v_str[i*3] = 0x25;
		sprintf(&t2v_str[i*3+1], "%2x", (uint8_t)t2v_text[i]);
	}
    setPara(ALY_T2V_TEXT, t2v_str);
	while (((sys_status & NETWORK_READY) != NETWORK_READY) && (sys_status != -1))
	{
		delay(1000);
		sys_status = getstatus();
	}
	sendCmd(COMMAND_T2V);
}

void CyberEarPro::SD_RecordStart(char *v_file)
{
	setPara(MUSIC_RECORD_FILE, v_file);
	sendCmd(SD_RECORD_START);
}
void CyberEarPro::SD_RecordStop()
{
	sendCmd(SD_RECORD_STOP);
}

void CyberEarPro::sdPlayFile(char *v_file)
{
	setPara(MUSIC_RECORD_FILE, v_file);
//	setPara(SD_PLAY_ACTION, (char *)dict_play_para[SD_PLAY_START]);
	sendCmd(SD_PLAY);
}

void CyberEarPro::sdSetVolume(int Volume_Num)
{
	char music_num[20];
	
	itoa(Volume_Num, music_num, 10);
	setPara(SD_PLAY_VOLUME, music_num);
}
void CyberEarPro::sdPlay(int Num)
{
	char music_num[20];
	
	itoa(Num, music_num, 10);
	setPara(MUSIC_FILE_NUMBER, music_num);
	setPara(SD_PLAY_ACTION, (char *)dict_play_para[SD_PLAY_START]);
	sendCmd(SD_PLAY);
}
void CyberEarPro::sdPause()
{
	setPara(SD_PLAY_ACTION, (char *)dict_play_para[SD_PLAY_PAUSE]);
	sendCmd(SD_PLAY);
}
void CyberEarPro::sdStop()
{
	setPara(SD_PLAY_ACTION, (char *)dict_play_para[SD_PLAY_STOP]);
	sendCmd(SD_PLAY);
}
void CyberEarPro::sdResume()
{
	setPara(SD_PLAY_ACTION, (char *)dict_play_para[SD_PLAY_RESUME]);
	sendCmd(SD_PLAY);
}
void CyberEarPro::sdNext()
{
	setPara(SD_PLAY_ACTION, (char *)dict_play_para[SD_PLAY_NEXT]);
	sendCmd(SD_PLAY);
}
void CyberEarPro::sdPrev()
{
	setPara(SD_PLAY_ACTION, (char *)dict_play_para[SD_PLAY_PREV]);
	sendCmd(SD_PLAY);
}
void CyberEarPro::sdMode(int PlayMode)
{
	setPara(SD_PLAY_ACTION, (char *)dict_play_para[SD_PLAY_LOOP+PlayMode]);
	sendCmd(SD_PLAY);
}

/**Display color wave. 
 * @param  disp_time  Display time for one loop,unit ms.
 * @param  flag       Display forever or just display for once.
 * @param  disp_color  Display color,0-255 map to color rgb.
 **/
uint32_t CyberEarPro::getstatus()
{
	char send_buf[32]={0};
	uint32_t reslt = 0;

	sprintf(send_buf+1, "{%s}", dict_cmd_para[SYSTEM_STATUS]);
	send_buf[0]=strlen(send_buf+1) & 0xFF;
	i2cWriteBytes(send_buf, strlen(send_buf));
	delay(100);
	if (iicReadBytes(send_buf, 5) != -1)
	{
		if (send_buf[0] == 4)
		{
			memcpy(&reslt, &send_buf[1], 4);
			return reslt;
		}
	}
	return 0;
}


uint32_t CyberEarPro::getfiles()
{
	char send_buf[32]={0};
	uint32_t reslt = 0;

	sprintf(send_buf+1, "{%s}", dict_cmd_para[SD_FILE_NUMBERS]);
	send_buf[0]=strlen(send_buf+1) & 0xFF;
	i2cWriteBytes(send_buf,strlen(send_buf+1)+1);
	delay(100);
	if (iicReadBytes(send_buf, 5) != -1)
	{
		if (send_buf[0] == 4)
		{
			memcpy(&reslt, &send_buf[1], 4);
			return reslt;
		}
			
	}
	return 0;
}



uint32_t CyberEarPro::getResult(int TimeOut)
{
	char send_buf=0, i;
	int ReadNum = 0, sys_status;

	for(i=0;i<TimeOut;i++)
	{
		sys_status = getstatus();
		if ((sys_status & (1UL<<V2T_TEXT_RESULT)) == (1UL<<V2T_TEXT_RESULT))
		{
			sendCmd(V2T_TEXT_RESULT);
			delay(200);
			send_buf = 0;
			while(send_buf <= 0)
			{
				iicReadBytes(&send_buf, 1);
				delay(20);
			}
			ReadNum = iicReadBytes(v2t_text, send_buf);
			if (ReadNum != -1)
			{
				v2t_text[send_buf] = 0;
			}
			break;
		}
		delay(1000);
	}
	return ReadNum;
}




uint8_t * CyberEarPro::getText()
{
	return v2t_text;
}

/***************************************************************************************************/
/************************************IIC communication oprations************************************/
/***************************************************************************************************/

void CyberEarPro::DisableUart()
{
	uint8_t oldSREG = SREG;
	cli();
#if 0
	// Disable TX and RX    
	cbi(UCSRB, RXEN);
	cbi(UCSRB, TXEN);

	// Disable RX ISR
	cbi(UCSRB, RXCIE);
	
	cbi(UCSRB, UDRIE);

	// Flush the internal buffer
	Serial.flush();
#endif
	// Restore status register
	SREG = oldSREG; 
}

void CyberEarPro::EnableUart()
{
	uint8_t oldSREG = SREG;
	sei();
#if 0
	// Disable TX and RX    
	sbi(UCSRB, RXEN);
	sbi(UCSRB, TXEN);

	// Disable RX ISR
	sbi(UCSRB, RXCIE);
	
	cbi(UCSRB, UDRIE);
 
	// Flush the internal buffer
	Serial.flush();
#endif
	// Restore status register
	SREG = oldSREG; 
}


/***************************************************************************************************/

int CyberEarPro::iicReadBytes(char *bytes,uint8_t len)
{
    uint32_t time_out_count=0;

//	cli();
	
    Wire.requestFrom(iic_addr_,len);
    while(len>Wire.available())
    {
        time_out_count++;
        if(time_out_count>10)  return -1;
        delay(1);
    }
    for(int i=0;i<len;i++)
    {
        bytes[i]=Wire.read();
    }
	delay(10);
//	sei();
    return 1;
}



int CyberEarPro::i2cWriteBytes(char* data,uint32_t data_len)
{
//	cli();
	
    Wire.beginTransmission(iic_addr_);
	for(int i=0;i<data_len;i++)
	{
		Wire.write(data[i]);
	}
	Wire.endTransmission();
	delay(10);
//	sei();
	
	return 1;
}
