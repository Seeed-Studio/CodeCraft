
/*****************************************************************************
 *                                                                           *
 * COPYRIGHT (C) 2018 Chaihuo-edu - All Rights Reserved                      *
 *                                                                           *
 * Chaihuo-edu makes no warranty express or implied including but not        *
 * limited to, any warranty of                                               *
 *                                                                           *
 *                                                                           *
 *  (i)  merchantability or fitness for a particular purpose and/or          *
 *                                                                           *
 *  (ii) requirements, for a particular purpose in relation to the LICENSED  *
 *       MATERIALS, which is provided AS IS, WITH ALL FAULTS. Chaihuo-edu    *
 *       does not represent or warrant that the LICENSED MATERIALS provided  *
 *       here under is free of infringement of any third party patents,      *
 *       copyrights, trade secrets or other intellectual property rights.    *
 *       ALL WARRANTIES, CONDITIONS OR OTHER TERMS IMPLIED BY LAW ARE        *
 *       EXCLUDED TO THE FULLEST EXTENT PERMITTED BY LAW                     *
 *                                                                           *
 *****************************************************************************
 * */

/* lib4_type.h -*- mode:C; c-file-style: "eay" -*- */
/*
 * @author Monsoon Song <zhengbin.song@chaihuo.org>
 *
 */


#ifndef  __lib4_type_H__
#define  __lib4_type_H__


#include <stdint.h>
#include <string.h>


#include "config.h"

 /* 0x0f/0x1f/0x2f/0x3f , mechkey */
struct mechkey_ram {
	uint8_t   line;
	uint8_t   event;
	uint8_t   broadId; /* 用于Index 4个不同的I2C地址 */
	uint8_t   doubleIntervel;   /* 双击间隔,也是使能 */

	uint32_t  evtTimestamp;
	uint32_t  rawTimestamp;
};


struct mechkey_t {
	uint8_t  fnum, rsiz, pad0, pad1;
	struct   mechkey_ram * status;
	void(*Init) ();
	void(*DoubleClick) (uint8_t, uint8_t);


	uint8_t(*isPressed)(uint8_t button_id);
	void(*ledOnColor)(uint8_t key_id, uint8_t Bright, uint16_t Timer, uint8_t *str);

};

/* 0x23 , ultrasonic */

struct ultrasonic_ram {

	uint16_t  rawdata;
	uint16_t  rawIvl;
	uint32_t  rawTimestamp;
};


struct ultrasonic_t {

	uint8_t  fnum, rsiz, pad0, pad1;

	struct   ultrasonic_ram * status;

	void(*Init) ();
	void(*SetIvl) (uint16_t);

	int16_t(*getvalue)();

};

/* 0x0c , gesture, no raw data support. */

struct gesture_ram {

	uint32_t  Evtdata;
	uint32_t  EvtTimestamp;
};


struct gesture_t {

	uint8_t  fnum, rsiz, pad0, pad1;

	struct   gesture_ram * status;

	void(*Init) ();


	int(*getvalue)();

};

/* 0x26 , MP3 player */

struct mp3_ram {
	uint32_t  Volume;
};


struct mp3_t {

	uint8_t  fnum, rsiz, pad0, pad1;

	struct   mp3_ram * status;

	void(*Init) ();

	void(*MP3_PlayStyle)(uint8_t cmd);
	void(*MP3_PlayDirect)(uint8_t MusicNumber, uint8_t Dir);
	void(*MP3_PlayBigDirect)(uint16_t MusicNumber, uint8_t Dir);
	void(*MP3_LoopDirect)(uint8_t dir);
	void(*MP3_PlayRandom)(void);
	void(*MP3_LoopOne)(uint16_t MusicNumber);
	void(*MP3_PlayStop)(void);
	void(*MP3_Reset)(void);
	void(*MP3_SelectDevice)(uint8_t cmd);
	void(*MP3_Sleep)(void);


	void(*playSong)(uint16_t number);
	void(*pause)(void);
	void(*resume)(void);
	void(*nextSong)(void);
	void(*prevSong)(void);
	void(*volSet)(uint8_t Vol);
	void(*volIncr)(void);
	void(*volDecr)(void);
	uint8_t(*volGet)(void);
	void(*playInOrder)(void);
	void(*loopCurrent)(uint8_t number);
	void(*playRandom)(void);
	void(*playLoopOne)(uint8_t);
	void(*playLoopAll)(void);
	void(*volChg)(int16_t vdelta);  //(uint8_t sign, uint8_t delta);
	void(*playStop)(void);

};

/* 0x22 , 4 digital display */

struct fourdigitdisplay_ram {
	uint32_t  watchtime;
	uint32_t  EvtTimestamp;
};


struct fourdigitdisplay_t {

	uint8_t  fnum, rsiz, pad0, pad1;

	struct   fourdigitdisplay_ram * status;

	void(*Init) ();

	void(*displayNum)(int num);
	void(*displayOff)(void);
	void(*startTimer)(uint16_t sec);
	void(*startWatch)(void);
	void(*pauseWatch)(void);
	void(*resumeWatch)(void);
	void(*resetWatch)(void);
	uint32_t(*getWatch)(void);
	void(*displayLevel)(uint8_t level);

};


/* RGB LED Matrix: 0x60 ~ 0x6F*/
struct rgbLedMatrix_ram 
{
	uint8_t rgbLedM[64];
	uint16_t boardId;
	uint16_t  rawIvl;
	uint32_t  rawTimestamp;
	uint8_t rawXYColor[8];
};


struct rgbLedMatrix_t 
{

	uint8_t  fnum, rsiz, pad0, pad1;

	struct   rgbLedMatrix_ram * status;

	void(*Init)();
	void(*DisplayOff)(uint8_t idx);
	void (*DisplaySet)(uint8_t idx, uint8_t xval, uint8_t yval, uint8_t color);
	void(*DisplayStr)(uint8_t idx, uint8_t noclear, uint16_t tmo, uint8_t color, char * str);
	void(*DisplayNum)(uint8_t idx, uint16_t number, uint16_t tmo, uint8_t flag, uint8_t color);
	void (*DisplayColorBar)(uint8_t idx, uint8_t bar, uint16_t tmo, uint8_t noclear);
	void (*DisplayWave)(uint8_t idx, uint8_t color, uint16_t tmo, uint8_t noclear);
	void(*DisplayClock)(uint8_t idx, uint8_t clock_direction, uint8_t clock_size, uint16_t tmo, uint8_t noclear);
	void (*EraseFlash)(uint8_t idx);
	void (*Save2Flash)(uint8_t idx);
	void (*DisplayFlash)(uint8_t idx, uint16_t tmo, uint8_t noclear, uint8_t start, uint8_t end);
	void(*DisplayCustom)(uint8_t idx, uint16_t tmo, uint8_t noclear, uint8_t frame_no, uint8_t packet_no, char * str);
	void (*DisplayGIF)(uint8_t idx, uint8_t start, uint8_t end, uint16_t tmo, uint8_t noclear);
	void (*DisplayEmoji)(uint8_t idx, uint8_t emoji, uint16_t tmo, uint8_t noclear);
	void(*Switch)(uint8_t idx, uint8_t xval, uint8_t yval, uint8_t color);
	void(*Get)(uint8_t idx, uint8_t xval, uint8_t yval);


	void(*displayEmoji)(uint8_t idx, uint8_t emoji, float tmo, uint8_t forever);
	void(*displayGIF)(uint8_t idx, uint8_t start, uint8_t end, float tmo, uint8_t forever);
	void(*displayClock)(uint8_t idx, uint8_t clock_direction, uint8_t clock_size, float tmo, uint8_t forever);
	void(*displayWave)(uint8_t idx, uint8_t color, float tmo, uint8_t forever);
	void(*displayColorBar)(uint8_t idx, uint8_t barlevel, float tmo, uint8_t forever);
	void(*displayStr)(uint8_t idx, uint8_t forever, float tmo, uint8_t color, char * str);
	void(*displayCustom)(uint8_t idx, float tmo, uint8_t forever, uint8_t frame_no, uint8_t packet_no, char * str);
	void(*displayFlash)(uint8_t idx, float tmo, uint8_t forever, uint8_t start, uint8_t end);
	void(*displayNumber)(uint8_t idx, uint16_t number, float tmo, uint8_t flag, uint8_t color);
	void(*displaySet)(uint8_t idx, uint8_t xval, uint8_t yval, uint8_t color);
	void(*switchOnOff)(uint8_t idx, uint8_t xval, uint8_t yval, uint8_t color);
	uint8_t(*checkOnOff)(uint8_t idx, uint8_t xval, uint8_t yval);
	uint8_t(*getColor)(uint8_t idx, uint8_t xval, uint8_t yval);
	void(*displayOff)(uint8_t idx);
	void(*save2Flash)(uint8_t idx);
	void(*eraseFlash)(uint8_t idx);
	uint8_t* (*getXYColor)(uint8_t idx, uint8_t xval, uint8_t yval);

};



/* Pirmotion: 0x09*/
struct pirmotion_ram
{
	uint8_t  event;

	uint32_t evtTimestamp;
};


struct pirmotion_t
{
	uint8_t  fnum, rsiz, pad0, pad1;

	struct   pirmotion_ram * status;

	void(*Init)();

};

/* temperature & humidity: 0x0e*/
struct tempHumid_ram 
{

	uint8_t  rawdata[4];
	uint16_t  rawIvl;
	uint32_t  rawTimestamp;
};

struct tempHumid_t 
{

	uint8_t  fnum, rsiz, pad0, pad1;

	struct   tempHumid_ram * status;

	void(*Init) ();
	void(*SetIvl) (uint16_t);

	//for code craft.
	int16_t(*gettempvalue)(uint8_t unit);	/*0:C temperature value, 1: F temperature value, 0xFFFF,不存在*/
	uint16_t(*gethumidvalue)(void);

};


/* Knob: 0x10/0x18/0x30/0x38 */
struct knob_ram
{
	uint8_t  event;
	uint8_t  boardId;

	uint32_t evtTimestamp;
};

struct knob_t
{
	uint8_t  fnum, rsiz, pad0, pad1;

	struct   knob_ram * status;

	void(*Init)();
};

/* DC motor: 0x29*/
struct dcMotor_ram 
{
	uint32_t  dM_var;
};

struct dcMotor_t 
{

	uint8_t  fnum, rsiz, pad0, pad1;

	struct   dcMotor_ram * status;

	void(*Init) ();
	void (*Run)(int8_t left, int8_t right, uint16_t time);
	void(*Motion)(uint8_t speed, uint8_t direction, uint16_t time);


	void(*motion)(uint8_t speed, uint8_t direction);									//speed:low->1,medium->2, fast->3; direction: CLOCKWISE->1, ANTICLOCKWISE->2;
	void(*motion_duration)(uint8_t speed, uint8_t direction, float time);
	void(*motion_stop)();
	void(*run)(float left, float right);
	void(*run_duration)(float left, float right, float time);
};

/* slider dimmer: 0x21/0x31/0x61/0x71 ==> 0x21/0x2A/0x2B/0x2C */
struct sliderDimmer_ram
{
	uint16_t raw;
	uint8_t  event;
	uint8_t  boardId;

	uint32_t rawTimestamp;
	uint32_t evtTimestamp;
};

struct sliderDimmer_t
{
	uint8_t  fnum, rsiz, pad0, pad1;

	struct   sliderDimmer_ram * status;

	void(*Init)();


	uint16_t(*getvalue)(uint8_t sliderdimmer_id);			//ID: 0/1/2/3.
};

/* rocker:  0x31/0x3A/0x3B/0x3C */
struct rocker_ram
{
	uint16_t raw[2];
	uint8_t  event;
	uint8_t  boardId;

	uint32_t rawTimestamp;
	uint32_t evtTimestamp;
};

struct rocker_t
{
	uint8_t  fnum, rsiz, pad0, pad1;

	struct   rocker_ram * status;

	void(*Init)();


	uint16_t(*getvalue)(uint8_t rocker_id, uint8_t direction);			//ID: 0/1/2/3.
	int8_t(*rockerlocation)(uint8_t rocker_id, uint8_t location);
};

 /*touchpad: 0x34/0x35/0x36/0x37 */
struct touchPad_ram
{

	uint16_t  line;
	uint8_t   broadId; /* 用于Index 4个不同的I2C地址 */

	uint32_t  rawTimestamp;
};

struct touchPad_t
{

	uint8_t  fnum, rsiz, pad0, pad1;

	struct   touchPad_ram *status;

	void(*Init) ();


	uint8_t(*isTouched)(uint8_t touchpad_id, uint8_t touchpad);		//ID: 0/1/2/3.
};


/* 0x02/0x12/0x0A/0x1A , Twin Button */

struct twinButton_ram {

   uint8_t   line ;
   uint8_t   event;
   uint8_t   broadId; /* 用于Index 4个不同的I2C地址 */
   uint8_t   doubleIntervel;   /* 双击间隔,也是使能 */

   uint32_t  evtTimestamp ;
   uint32_t  rawTimestamp ;
};

struct twinButton_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   twinButton_ram * status ;

   void     (* Init) ();
   void     (* DoubleClick)(uint8_t,uint8_t);


   uint8_t(*isPressed)(uint8_t button_id, uint8_t key);
} ;


/* 0x03 , Temp Sensor */

struct tempSensor_ram {

   int16_t   rawdata ;
   uint16_t  rawIvl  ;
   uint32_t  rawTimestamp ;
};

struct tempSensor_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   tempSensor_ram * status ;

   void     (* Init  ) ( );
   void     (* SetIvl) (uint16_t);


   int32_t  (*getvalue)(uint8_t unit);	/*0:C temperature value, 1: F temperature value, 0xFFFF,不存在*/
} ;


/* 0x04 , Imu9 Sensor */

struct imu9Sensor_ram {

   int16_t  rawAcce[3] ;
   int16_t  magnetic[4] ;
   int16_t  angular[3] ;
   int16_t  rotation[3] ;
   uint16_t  rawIvl  ;
   uint32_t  rawTimestamp ;
};

struct imu9Sensor_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   imu9Sensor_ram * status ;

   void     (* Init  ) ( );
   void     (* SetIvl) (uint16_t);


   int32_t(*getvalue)(uint8_t); /*0xFFFF,不存在*/
   int32_t(*getmagnetic)(uint8_t); /*0xFFFF,不存在*/
   int32_t(*getangular)(uint8_t); /*0xFFFF,不存在*/
   int32_t(*getrotation)(uint8_t); /*0xFFFF,不存在*/
} ;


/* 0x05 , Light Sensor */

struct lightSensor_ram {

   int       rawdata ;
   uint32_t  rawTimestamp ;
};

struct lightSensor_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   lightSensor_ram * status ;

   void     (* Init) ();

   int(*getvalue)(); /*2B,-1,不存在*/
} ;


/* 0x06 , Sound Sensor */

struct soundSensor_ram {

   uint16_t  rawdata ;
   uint16_t  rawIvl  ;
   uint32_t  rawTimestamp ;
};

struct soundSensor_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   soundSensor_ram * status ;

   void     (* Init  ) ( );
   void     (* SetIvl) (uint16_t);


   uint16_t(*getvalue)(); /*0,不存在*/
} ;


/* 0x07 , LED Matrix */

struct ledMatrix_ram {
   uint32_t  ledm ;
};

struct ledMatrix_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   ledMatrix_ram * status ;

   void     (* Init) ();
   void     (* DisplayOffset) (uint8_t , int16_t );
   void     (* DisplayBar)    (uint8_t , uint16_t , uint8_t);
   void     (* DisplayEmoji)  (uint8_t , uint16_t , uint8_t);
   void     (* DisplayNumber) (int16_t , uint16_t , uint8_t);
   void     (* DisplayStr)    (uint8_t , uint16_t , uint8_t, char * );
   void     (* DisplayData)   (uint16_t, uint8_t*);
   void     (* DisplayOff)    ();

   //for code craft
   void(*showBar)(uint8_t);
   void(*showIcon)(uint8_t  icon, uint16_t time);
   void(*setShape)(uint32_t shape, uint16_t time);
   void(*scrollText)(uint16_t time, char * str);
   void(*turnOn)(uint8_t x, uint8_t y);
   void(*turnOff)(uint8_t x, uint8_t y);
   uint8_t(*checkOnOff)(uint8_t x, uint8_t y);
   void(*switchOnOff)(uint8_t x, uint8_t y);
   void(*clean)();
   void(*displayNumber)(int16_t number, uint16_t tmo, uint8_t display_orientation); //00:不旋转; 01:旋转90度; 02:旋转180度; 03: 旋转270度;
} ;


/* 0x08 , Buzzer */

struct buzzer_ram {
   uint16_t   bpm ;
};

struct buzzer_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   buzzer_ram * status ;

   void     (* Init) ();

   void     (* PlayTone    ) (uint8_t ,uint8_t);
   void     (* RingTone    ) (uint8_t,uint16_t);
   void     (* PlayMelody  ) (uint8_t, uint8_t);
   void     (* PlayStop    ) ( );
   void     (* SetBPM      ) (uint16_t, uint8_t);
   void     (* ChangeBPM   ) (uint8_t, uint16_t);


   void(*playMelody) (uint8_t, uint8_t);
   void(*playMelodyForEnd)(uint8_t);
   void(*playNoteForBeat) (uint8_t, uint8_t);
   void(*RingNote) (uint8_t);
   void(*muteForBeat) (uint8_t);
   void(*setBPM) (float);
   void(*addBPM) (float);
   uint16_t(*getBPM) (void);
   void(*stop)();
} ;


/* 0x0B , RGB LED */

struct rgbLed_ram {
   uint8_t  pad ;
};

struct rgbLed_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   rgbLed_ram * status ;

   void     (* Init) ();

   void     (*Display        )(uint8_t,uint8_t,uint8_t,uint16_t);
   void     (*DisplayBlinking)(uint8_t,uint8_t,uint8_t,uint16_t,uint16_t);
   void     (*DisplayBreathe )(uint8_t,uint8_t,uint8_t,uint16_t,uint16_t);
   void     (*DisplayRainbow )(uint16_t,uint16_t);
   void     (*DisplayFade    )(uint8_t,uint8_t,uint8_t,uint8_t,uint8_t,
                      uint8_t,uint16_t,uint16_t);
   void     (*DisplayRandom  )(uint16_t);
   void     (*SetBrightness  )(uint8_t);
   void     (*DisplayStop    )( );


#if 1		//20180820: modify to unit the format for input and output.
		void(*displayColor_style)(uint8_t style, char *color);
#else
	   void(*displayColor_style)(uint8_t, uint8_t, uint8_t, uint8_t);
#endif

   void(*displayMagic)(uint8_t);
   void(*displayFade)(uint16_t interval, uint16_t duration, char *color1, char *color2);
   void(*setBrightness)(uint8_t);
   void(*displayStop)();
   void(*displayColor)(uint8_t, uint8_t, uint8_t);
} ;


/* 0x20 , BLE Core */

struct bleCore_ram {

   float     timer[32] ;
   uint32_t  bmsg [32][3]  ;
   float     coretimer ;
};

struct bleCore_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   bleCore_ram * status ;

   void     (* Init  ) ( );


   int(*onstartup)(int  func);
   int(*addtimer)(float tmr, int func);
   float(*gettimer)();
   void(*resettimer)();
   void(*wait)(float sec);
   int(*onbroadcastrecv)(int func, uint8_t *p);
   void(*broadcastsend)(uint8_t *p);
   void(*broadcaststop)();
   void(*broadcastset)(uint8_t chn);

   uint8_t* (*getinputcolor)(uint8_t red, uint8_t green, uint8_t blue, uint8_t *str);

} ;


/* 0x21 , Slider */

struct slider_ram {

   uint16_t  rawdata ;
   uint16_t  rawIvl  ;
   uint32_t  rawTimestamp ;
};

struct slider_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   slider_ram * status ;

   void     (* Init  ) ( );
   void     (* SetIvl) (uint16_t);


   uint16_t(*getvalue)(); /*0,不存在*/
} ;



/* 0x24 , Servo */

struct servo_ram {

   uint8_t   angle ;

};

struct servo_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   servo_ram * status ;

   void     (* Init  ) ( );


   void(*setAngle)(float);
} ;


/* 0x27 , Line Follow */

/* 关于帽子块的注册例子, Color Event,和 Line Event,
 *
 *  _co_registerCB_ (
 *        0x0X27, /@ 事件值X见下面定义,其它不变 @/
 *        (int)CallBack ,
 *         0 , 0  /@ 这两个参数不变 @/
 *        );
 *
 * #define  LINEFOLLOW_COLOR_WHITE       (5 + 0)
 * #define  LINEFOLLOW_COLOR_BLACK       (1 + 0)
 * #define  LINEFOLLOW_COLOR_RED         (2 + 0)
 * #define  LINEFOLLOW_COLOR_GREEN       (3 + 0)
 * #define  LINEFOLLOW_COLOR_BLUE        (4 + 0)
 * 
 * /@伪造帽子块时,Line Event值 + 8 @/
 * #define  LINEFOLLOW_LINE_ONLINE       (1 + 8)
 * #define  LINEFOLLOW_LINE_NOLINE       (2 + 8)
 * #define  LINEFOLLOW_LINE_RIGHT1       (3 + 8)
 * #define  LINEFOLLOW_LINE_RIGHT2       (4 + 8)
 * #define  LINEFOLLOW_LINE_LEFT1        (5 + 8)
 * #define  LINEFOLLOW_LINE_LEFT2        (6 + 8)
 *
 * */

struct lineFollow_ram {

   uint16_t  rawevt ; /*Color Event/B0 + Line Event/B1 */
   uint16_t  rawIvl ;
   uint32_t  rawTimestamp ;
   uint8_t   color[4];	 /* RGB */
};

struct lineFollow_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   lineFollow_ram * status ;

   void     (* Init  ) ( );
   void     (* SetIvl) (uint16_t);
   int8_t   (* RecognizeColor)( uint8_t select);
   int8_t   (*RecognizeLineLocation)( uint8_t select);


   uint8_t* (*getcolor)(uint8_t *str); /* NULL,不存在 */
   int8_t(*ismatchcolor)(uint8_t select);		 /*-1,no exsit,1->true,0->false*/
   int8_t(*ismatchlocation)(uint8_t select);

} ;


/* 0x28 , miniwheel */

struct miniwheel_ram {

   uint8_t   pad ;

};

struct miniwheel_t {

   uint8_t  fnum , rsiz , pad0 , pad1 ;

   struct   miniwheel_ram * status ;

   void     (* Init  ) ( );
   void     (* Run   ) (int16_t , int16_t );
   void     (* Motion) (uint8_t , uint8_t, uint16_t );


   void(*motion) (uint8_t, uint8_t);
   void(*motion_duration)(uint8_t, uint8_t, float);		//2018 08 22: change to input float parameter from uint16_t);
   void(*stop) (void);
   void(*run) (float, float);
} ;


/*********************************************************************/
/*                                                                   */
/*********************************************************************/
struct math_t {

	void(*Init) ();

	int(*randi) (int, int);
	float(*randf) (float, float);
	float(*fabs) (float);
	int(*floor) (float);
	int(*ceil) (float);
	float(*cos) (float);
	float(*sin) (float);
	float(*tan) (float);
	float(*exp) (float);
	float(*ln) (float);
	float(*log10) (float);
	float(*pow) (float, float);
	float(*sqrt) (float);

	int(*round)(float);
	float (*fmod)(float, float);

	uint8_t(*islarger)(float , float );			//1: >, 0: <=.
	uint8_t(*isequal)(float, float);			//1: =, 0: <>.
	uint8_t (*isless)(float, float);			//1:<, 0:> or =.

};

struct string_t {

	void(*Init) ();

	uint8_t* (*strcat) (uint8_t*, uint8_t*);
	uint8_t(*strlen) (uint8_t*);
	uint8_t (*strstr) (uint8_t*, uint8_t*);			//return 1:include, 0:exclude.
	uint8_t* (*cinstr) (uint8_t*, uint8_t);
	char* (*itoa)(int32_t i_val, char *str, uint8_t radix);
	uint8_t* (*strnc)(uint8_t n, uint8_t *str, uint8_t*);

};


/*********************************************************************/
/*                                                                   */
/*********************************************************************/
struct groveZero_t {

	uint32_t    pad00;
	uint32_t    pad01;
	struct twinButton_t  * twinbutton;				/*0x02*/
	struct tempSensor_t  * temperaturesensor;
	struct imu9Sensor_t  * imu9;
	struct lightSensor_t * lightsensor;
	struct soundSensor_t * soundsensor;
	struct ledMatrix_t   * ledmatrix;

	struct buzzer_t      * buzzer;
	struct pirmotion_t   * pirmotion;		/*0x09*/
	struct twinButton_t  * twinbutton1;		/*0x0A*/
	struct rgbLed_t      * rgbled;			/*0x0B*/
	struct gesture_t    *gesture;	/* 0x0c */
	uint32_t    pad0d;
	struct tempHumid_t   * temperaturehumidity;					/*0x0e*/
	struct mechkey_t    *mechkey;		/* 0x0f */

	struct knob_t    * knob;		/*0x10*/
	uint32_t    pad11;
	struct twinButton_t  * twinbutton2; /**0x12*/
	uint32_t    pad13;
	uint32_t    pad14;
	uint32_t    pad15;
	uint32_t    pad16;
	uint32_t    pad17;
	struct knob_t    *knob1;	/* 0x18 */
	uint32_t    pad19;
	struct twinButton_t  * twinbutton3; /**0x1A*/
	uint32_t    pad1b;
	uint32_t    pad1c;
	uint32_t    pad1d;
	uint32_t    pad1e;
	struct mechkey_t    *mechkey1;		/* 0x1f */

	struct bleCore_t     * blecore; /*0x20*/
	struct sliderDimmer_t      * sliderdimmer; /*0x21*/
	struct fourdigitdisplay_t    *fourdigitdisplay;	/* 0x22 */
	struct ultrasonic_t    *ultrasonic;	/* 0x23 */
	struct servo_t       * servo; /*0x24*/
	uint32_t    pad25;
	struct mp3_t    *mp3;	/* 0x26 */
	struct lineFollow_t  * linefollow;/*0x27*/
	struct miniwheel_t   * chassis; /*0x28*/
	struct dcMotor_t    * dcmotor;	/* 0x29 */
	struct sliderDimmer_t    *sliderdimmer1;	/* 0x2a */
	struct sliderDimmer_t    *sliderdimmer2;	/* 0x2b */
	struct sliderDimmer_t    *sliderdimmer3;  /* 0x2c */
	uint32_t    pad2d;
	uint32_t    pad2e;
	struct mechkey_t    *mechkey2;		/* 0x2f */

	struct knob_t    *knob2;  /* 0x30 */
	struct rocker_t      * rocker; /*0x31*/
	uint32_t    pad32;
	uint32_t    pad33;
	struct touchPad_t    *touchpad;	/* 0x34 */
	struct touchPad_t    *touchpad1; /* 0x35 */
	struct touchPad_t    *touchpad2;	/* 0x36 */
	struct touchPad_t    *touchpad3;	/* 0x37 */
	struct knob_t    *knob3;  /* 0x38 */
	uint32_t    pad39;
	struct rocker_t      * rocker1; /*0x3a*/	
	struct rocker_t      * rocker2; /*0x3b*/	
	struct rocker_t      * rocker3; /*0x3c*/
	uint32_t    pad3d;
	uint32_t    pad3e;
	struct mechkey_t    *mechkey3;		/* 0x3f */

	uint32_t    pad40;
	uint32_t    pad41;
	uint32_t    pad42;
	uint32_t    pad43;
	uint32_t    pad44;
	uint32_t    pad45;
	uint32_t    pad46;
	uint32_t    pad47;
	uint32_t    pad48;
	uint32_t    pad49;
	uint32_t    pad4a;
	uint32_t    pad4b;
	uint32_t    pad4c;
	uint32_t    pad4d;
	uint32_t    pad4e;
	uint32_t    pad4f;

	uint32_t    pad50;
	uint32_t    pad51;
	uint32_t    pad52;
	uint32_t    pad53;
	uint32_t    pad54;
	uint32_t    pad55;
	uint32_t    pad56;
	uint32_t    pad57;
	uint32_t    pad58;
	uint32_t    pad59;
	uint32_t    pad5a;
	uint32_t    pad5b;
	uint32_t    pad5c;
	uint32_t    pad5d;
	uint32_t    pad5e;
	uint32_t    pad5f;

	struct rgbLedMatrix_t    *rgbledmatrix;		/* 0x60 */
	struct rgbLedMatrix_t    *rgbledmatrix1;		/* 0x61 */
	struct rgbLedMatrix_t    *rgbledmatrix2;		/* 0x62 */
	struct rgbLedMatrix_t    *rgbledmatrix3;		/* 0x63 */
	struct rgbLedMatrix_t    *rgbledmatrix4;		/* 0x64 */
	struct rgbLedMatrix_t    *rgbledmatrix5;		/* 0x65 */
	struct rgbLedMatrix_t    *rgbledmatrix6;		/* 0x66 */
	struct rgbLedMatrix_t    *rgbledmatrix7;		/* 0x67 */
	struct rgbLedMatrix_t    *rgbledmatrix8;		/* 0x68 */
	struct rgbLedMatrix_t    *rgbledmatrix9;		/* 0x69 */
	struct rgbLedMatrix_t    *rgbledmatrix10;		/* 0x6a */
	struct rgbLedMatrix_t    *rgbledmatrix11;		/* 0x6b */
	struct rgbLedMatrix_t    *rgbledmatrix12;		/* 0x6c */
	struct rgbLedMatrix_t    *rgbledmatrix13;		/* 0x6d */
	struct rgbLedMatrix_t    *rgbledmatrix14;		/* 0x6e */
	struct rgbLedMatrix_t    *rgbledmatrix15;		/* 0x6f */

	uint32_t    pad70;
	uint32_t    pad71;
	uint32_t    pad72;
	uint32_t    pad73;
	uint32_t    pad74;
	uint32_t    pad75;
	uint32_t    pad76;
	uint32_t    pad77;
	uint32_t    pad78;
	uint32_t    pad79;
	uint32_t    pad7a;
	uint32_t    pad7b;
	uint32_t    pad7c;
	uint32_t    pad7d;
	uint32_t    pad7e;
	struct math_t    *math;	/* 0x7f */
	struct string_t *string;	/* 0x80 */
};


#ifdef   LEVEL3

#define  grovezero      ((struct groveZero_t *)(APP_ADDR_L4LIB + 16))

#endif


#endif /* __lib4_type_H__ */


