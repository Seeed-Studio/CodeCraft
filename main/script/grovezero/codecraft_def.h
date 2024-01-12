
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
 ****************************************************************************** */



/*=========================================================
			_co_registerCB_, Node Event/RAW 
===========================================================*/
 /* TWINBUTTON */
#define  REGTB0                        0xFF02
#define  REGTB1                        0xFF0A
#define  REGTB2                        0xFF12
#define  REGTB3                        0xFF1A

 /* IMU9SENSOR */
#define  REGIMU9                       0xFF04


/* LINEFOLLOW */
#define  REGLF_CO_BLACK                0x0127
#define  REGLF_CO_RED                  0x0227
#define  REGLF_CO_GREEN                0x0327
#define  REGLF_CO_BLUE                 0x0427
#define  REGLF_CO_WRITE                0x0527

#define  REGLF_LI_ONLINE               0x0927
#define  REGLF_LI_NOLINE               0x0A27
#define  REGLF_LI_RIGHT1               0x0B27
#define  REGLF_LI_RIGHT2               0x0C27
#define  REGLF_LI_LEFT1                0x0D27
#define  REGLF_LI_LEFT2                0x0E27

/* GESTURE */
#define	REGGESTURE						0xFF0C

/* PIRMOTION */
#define	REGPIRMOTION					0xFF09

/* MECH KEY */
#define	REGMK0							0xFF0F
#define	REGMK1							0xFF1F
#define	REGMK2							0xFF2F
#define	REGMK3							0xFF3F

/* FOUR DIGIT DISPLAY */
#define	REG4DIGDISP						0xFF22

/* ROCKER */
#define	REGROCKER0					    0xFF31
#define	REGROCKER1						0xFF3A
#define	REGROCKER2						0xFF3B
#define	REGROCKER3						0xFF3C
/* TOUCH PAD */
#define	REGTP0							0xFF34
#define	REGTP1							0xFF35
#define	REGTP2							0xFF36
#define	REGTP3  						0xFF37

/* KNOB */
#define	REGKNOB0						0xFF10
#define	REGKNOB1						0xFF18
#define	REGKNOB2						0xFF30
#define	REGKNOB3						0xFF38

/* SLIDDER DIMMER */
#define	REGSD0							0xFF21
#define	REGSD1							0xFF2A
#define	REGSD2							0xFF2B
#define	REGSD3							0xFF2C

/* TEMPERATURE SENSOR*/
#define REGTS0							0xFF03

/* LIGHT SENSOR */
#define	REGLIGHTSENSOR					0xFF05

/* SOUND SENSOR */
#define	REGSOUNDSENSOR					0xFF06

/* ULTRASONIC SENSOR */
#define REGULTRASONICSENSOR				0xFF23


/*=========================================================
				CallBack hook Event
===========================================================*/

/* TWINBUTTON */
#define  EVT_TWINBUTTON_A__CLICK       0x11
#define  EVT_TWINBUTTON_B__CLICK       0x14
#define  EVT_TWINBUTTON_AB_CLICK       0x17
#define  EVT_TWINBUTTON_A__LONGCLICK   0x03
#define  EVT_TWINBUTTON_B__LONGCLICK   0x06
#define  EVT_TWINBUTTON_AB_LONGCLICK   0x09
#define  EVT_TWINBUTTON_A_DOUBLE_CLICK       0x12
#define  EVT_TWINBUTTON_B_DOUBLE_CLICK       0x15
#define  EVT_TWINBUTTON_AB_DOUBLE_CLICK      0x18

#define  TWINBUTTON_0_A					0x02
#define  TWINBUTTON_0_B					0x02

#define  TWINBUTTON_1_A					0x0A
#define  TWINBUTTON_1_B					0x0A

#define  TWINBUTTON_2_A					0x12
#define  TWINBUTTON_2_B					0x12

#define  TWINBUTTON_3_A					0x1A
#define  TWINBUTTON_3_B					0x1A


/* IMU9SENSOR */
#define  EVT_IMU9SENEOR_BACK           0x01
#define  EVT_IMU9SENEOR_FRONT          0x02
#define  EVT_IMU9SENEOR_RIGHT          0x03
#define  EVT_IMU9SENEOR_LEFT           0x04
#define  EVT_IMU9SENEOR_FACEUP         0x05
#define  EVT_IMU9SENEOR_FACEDOWN       0x06
#define  EVT_IMU9SENEOR_FALLING        0x07
#define  EVT_IMU9SENEOR_SHAKE          0x08

#define  EVT_IMU9SENEOR_CALIBRATION    0x80


/* LINEFOLLOW */
#define  EVT_CO_BLACK                0x01
#define  EVT_CO_RED                  0x02
#define  EVT_CO_GREEN                0x03
#define  EVT_CO_BLUE                 0x04
#define  EVT_CO_WRITE                0x05

#define  EVT_LI_ONLINE               0x09
#define  EVT_LI_NOLINE               0x0A
#define  EVT_LI_RIGHT1               0x0B
#define  EVT_LI_RIGHT2               0x0C
#define  EVT_LI_LEFT1                0x0D
#define  EVT_LI_LEFT2                0x0E

/* GESTURE */
#define EVT_GESTURE_LEFT			2
#define EVT_GESTURE_RIGHT			1
#define EVT_GESTURE_UP				3
#define EVT_GESTURE_DOWN			4
#define EVT_GESTURE_CLOSE	 		5
#define EVT_GESTURE_ESCAPE			6
#define EVT_GESTURE_CLOCKWISE 		7
#define EVT_GESTURE_ANTICLOCKWISE 	8
#define EVT_GESTURE_WAVE 			9

/* PIRMOTION */
#define EVT_PIRMOTION_NO_CREATURE			0
#define EVT_PIRMOTION_CREATURE_DETD			1

/* MECH KEY */
#define  EVT_MECHKEY_CLICK       0x11
#define  EVT_MECHKEY_LONGCLICK   0x02

#define  MECHKEY_0					0x0F
#define  MECHKEY_1					0x1F
#define  MECHKEY_2					0x2F
#define  MECHKEY_3					0x3F

/* FOUR DIGIT DISPLAY */
#define EVT_FOURDIGDISP_TIMEDUE        0x01


/* TOUCH PAD */
#define EVT_TOUCHPAD_PAD0_CLICK			1
#define EVT_TOUCHPAD_PAD1_CLICK			2
#define EVT_TOUCHPAD_PAD2_CLICK			4
#define EVT_TOUCHPAD_PAD3_CLICK			8

#define	TOUCHPAD0						0x34
#define	TOUCHPAD1						0x35
#define	TOUCHPAD2						0x36
#define	TOUCHPAD3  						0x37

/* KNOB */
#define EVT_KNOB_CLOCK				1
#define EVT_KNOB_ANTICLOCK			2
#define EVT_KNOB_CLICK				3

#define	KNOB0						0x10
#define	KNOB1						0x18
#define	KNOB2						0x30
#define	KNOB3						0x38

/* SLIDDER DIMMER */
#define		EVT_SLIDERDIMMER_LESSTHAN_TH0		1
#define		EVT_SLIDERDIMMER_BETWEEN_TH0TH1		2
#define		EVT_SLIDERDIMMER_ABOVE_TH1			3

#define	SLIDERDIMMER0				0x21
#define	SLIDERDIMMER1				0x2A
#define	SLIDERDIMMER2				0x2B
#define	SLIDERDIMMER3				0x2C

/* TEMPERATURE SENSOR*/
#define		EVT_TEMPSENSOR_LESSTHAN_TH0		1
#define		EVT_TEMPSENSOR_BETWEEN_TH0TH1	2
#define		EVT_TEMPSENSOR_ABOVE_TH1		3

/* LIGHT SENSOR */
#define		EVT_LIGHTSENSOR_LESSTHAN_TH0		1
#define		EVT_LIGHTSENSOR_BETWEEN_TH0TH1		2
#define		EVT_LIGHTSENSOR_ABOVE_TH1			3

/* SOUND SENSOR */
#define		EVT_SOUNDSENSOR_LESSTHAN_TH0		1
#define		EVT_SOUNDSENSOR_BETWEEN_TH0TH1		2
#define		EVT_SOUNDSENSOR_ABOVE_TH1			3

/* ULTRASONIC SENSOR */
#define		EVT_ULTRASENSOR_LESSTHAN_TH0		1
#define		EVT_ULTRASENSOR_BETWEEN_TH0TH1		2
#define		EVT_ULTRASENSOR_ABOVE_TH1			3

/* ROCKER */
#define		EVT_ROCKER_UPLEFT		 		1
#define		EVT_ROCKER_UP					2
#define		EVT_ROCKER_UPRIGHT				3
#define		EVT_ROCKER_LEFT		    		4
#define		EVT_ROCKER_MIDDLE				5
#define		EVT_ROCKER_RIGHT				6
#define		EVT_ROCKER_LOWERLEFT		    7
#define		EVT_ROCKER_DOWN					8
#define		EVT_ROCKER_LOWERRIGHT			9

#define	ROCKER0				0x31
#define	ROCKER1				0x3A
#define	ROCKER2				0x3B
#define	ROCKER3				0x3C

/*=========================================================
	MACRO definition
===========================================================*/

/* line follow*/
#define  LINEFOLLOW_COLOR_WHITE        5
#define  LINEFOLLOW_COLOR_BLACK        1
#define  LINEFOLLOW_COLOR_RED          2
#define  LINEFOLLOW_COLOR_GREEN        3
#define  LINEFOLLOW_COLOR_BLUE         4

#define  LINEFOLLOW_LINE_ONLINE        1
#define  LINEFOLLOW_LINE_NOLINE        2
#define  LINEFOLLOW_LINE_RIGHT1        3
#define  LINEFOLLOW_LINE_RIGHT2        4
#define  LINEFOLLOW_LINE_LEFT1         5
#define  LINEFOLLOW_LINE_LEFT2         6


