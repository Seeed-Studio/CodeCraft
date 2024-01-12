
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

/* codecraft_lib.c -*- mode:C; c-file-style: "eay" -*- */
/*
 * @author Monsoon Song <zhengbin.song@chaihuo.org>
 *
 */


/*************************************************************
 *
 * lib_init, 给初始化函数
 *
 * Parameter: NA
 *
 * Return:
 *
 *************************************************************
 * */
void lib_init (void)
   {

/* NODE初始化
 * */
#if defined(USE_TWINBUTTON_0) && (USE_TWINBUTTON_0 == 1 )
   grovezero->twinbutton->Init ();
#endif
#if defined(USE_TWINBUTTON_1) && (USE_TWINBUTTON_1 == 1 )
   grovezero->twinbutton1->Init ();
#endif

#if defined(USE_TWINBUTTON_2) && (USE_TWINBUTTON_2 == 1 )
   grovezero->twinbutton2->Init ();
#endif

#if defined(USE_TWINBUTTON_3) && (USE_TWINBUTTON_3 == 1 )
   grovezero->twinbutton3->Init ();
#endif

#if defined(USE_TEMPERATURESENSOR) && (USE_TEMPERATURESENSOR == 1 )
   grovezero->temperaturesensor->Init();
#endif

#if defined(USE_IMU9SENSOR) && (USE_IMU9SENSOR == 1 )
   grovezero->imu9->Init();
#endif

#if defined(USE_LIGHTSENSOR) && (USE_LIGHTSENSOR == 1 )
   grovezero->lightsensor->Init();
#endif

#if defined(USE_SOUNDSENSOR) && (USE_SOUNDSENSOR == 1 )
   grovezero->soundsensor->Init();
#endif

#if defined(USE_LEDMATRIX) && (USE_LEDMATRIX == 1 )
   grovezero->ledmatrix->Init();
#endif

#if defined(USE_BUZZER) && (USE_BUZZER == 1 )
   grovezero->buzzer->Init();
#endif

#if defined(USE_PIRMOTION) && (USE_PIRMOTION == 1 )
   grovezero->pirmotion->Init();
#endif    

#if defined(USE_RGBLED) && (USE_RGBLED == 1 )
   grovezero->rgbled->Init();
#endif

#if defined(USE_GESTURE) && (USE_GESTURE == 1 )
   grovezero->gesture->Init();
#endif

#if defined(USE_TEMPERATUREHUMIDITY) && (USE_TEMPERATUREHUMIDITY == 1 )
   grovezero->temperaturehumidity->Init();
#endif

#if defined(USE_MECHKEY_0) && (USE_MECHKEY_0 == 1 )
   grovezero->mechkey->Init();
#endif

#if defined(USE_MECHKEY_1) && (USE_MECHKEY_1 == 1 )
   grovezero->mechkey1->Init();
#endif

#if defined(USE_MECHKEY_2) && (USE_MECHKEY_2 == 1 )
   grovezero->mechkey2->Init();
#endif

#if defined(USE_MECHKEY_3) && (USE_MECHKEY_3 == 1 )
   grovezero->mechkey3->Init();
#endif

#if defined(USE_KNOB_0) && (USE_KNOB_0 == 1 )
   grovezero->knob->Init();
#endif

#if defined(USE_KNOB_1) && (USE_KNOB_1 == 1 )
   grovezero->knob->Init();
#endif

#if defined(USE_KNOB_2) && (USE_KNOB_2 == 1 )
   grovezero->knob->Init();
#endif

#if defined(USE_KNOB_3) && (USE_KNOB_3 == 1 )
   grovezero->knob->Init();
#endif

   grovezero->blecore->Init();

#if defined(USE_SLIDERDIMMER_0) && (USE_SLIDERDIMMER_0 == 1 )
   grovezero->sliderdimmer->Init();
#endif

#if defined(USE_SLIDERDIMMER_1) && (USE_SLIDERDIMMER_1 == 1 )
   grovezero->sliderdimmer1->Init();
#endif

#if defined(USE_SLIDERDIMMER_2) && (USE_SLIDERDIMMER_2 == 1 )
   grovezero->sliderdimmer2->Init();
#endif

#if defined(USE_SLIDERDIMMER_3) && (USE_SLIDERDIMMER_3 == 1 )
   grovezero->sliderdimmer3->Init();
#endif

#if defined(USE_4DIGITDISPLAY) && (USE_4DIGITDISPLAY == 1 )
   grovezero->fourdigitdisplay->Init();
#endif

#if defined(USE_ULTRASONIC) && (USE_ULTRASONIC == 1 )
   grovezero->ultrasonic->Init();
#endif
#if defined(USE_SERVO) && (USE_SERVO == 1 )
   grovezero->servo->Init();
#endif

#if defined(USE_MP3) && (USE_MP3 == 1 )
   grovezero->mp3->Init();
#endif

#if defined(USE_LINEFOLLOW) && (USE_LINEFOLLOW == 1 )
   grovezero->linefollow->Init();
#endif

#if defined(USE_MINIWHEEL) && (USE_MINIWHEEL == 1 )
   grovezero->chassis->Init();
#endif

#if defined(USE_DCMOTOR) && (USE_DCMOTOR == 1 )
   grovezero->dcmotor->Init();
#endif

#if defined(USE_TOUCHPAD_0) && (USE_TOUCHPAD_0 == 1 )
   grovezero->touchpad->Init ();
#endif

#if defined(USE_TOUCHPAD_1) && (USE_TOUCHPAD_1 == 1 )
   grovezero->touchpad1->Init ();
#endif

#if defined(USE_TOUCHPAD_2) && (USE_TOUCHPAD_2 == 1 )
   grovezero->touchpad2->Init ();
#endif

#if defined(USE_TOUCHPAD_3) && (USE_TOUCHPAD_3 == 1 )
   grovezero->touchpad3->Init ();
#endif

#if defined(USE_RGBLEDMATRIX_0) && (USE_RGBLEDMATRIX_0 == 1 )
   grovezero->rgbledmatrix->Init ();
#endif

#if defined(USE_RGBLEDMATRIX_1) && (USE_RGBLEDMATRIX_1 == 1 )
   grovezero->rgbledmatrix1->Init();
#endif

#if defined(USE_RGBLEDMATRIX_2) && (USE_RGBLEDMATRIX_2 == 1 )
   grovezero->rgbledmatrix2->Init();
#endif

#if defined(USE_RGBLEDMATRIX_3) && (USE_RGBLEDMATRIX_3 == 1 )
   grovezero->rgbledmatrix3->Init();
#endif

#if defined(USE_RGBLEDMATRIX_4) && (USE_RGBLEDMATRIX_4 == 1 )
   grovezero->rgbledmatrix4->Init();
#endif

#if defined(USE_RGBLEDMATRIX_5) && (USE_RGBLEDMATRIX_5 == 1 )
   grovezero->rgbledmatrix5->Init();
#endif

#if defined(USE_RGBLEDMATRIX_6) && (USE_RGBLEDMATRIX_6 == 1 )
   grovezero->rgbledmatrix6->Init();
#endif

#if defined(USE_RGBLEDMATRIX_7) && (USE_RGBLEDMATRIX_7 == 1 )
   grovezero->rgbledmatrix7->Init();
#endif

#if defined(USE_RGBLEDMATRIX_8) && (USE_RGBLEDMATRIX_8 == 1 )
   grovezero->rgbledmatrix8->Init();
#endif

#if defined(USE_RGBLEDMATRIX_9) && (USE_RGBLEDMATRIX_9 == 1 )
   grovezero->rgbledmatrix9->Init();
#endif

#if defined(USE_RGBLEDMATRIX_10) && (USE_RGBLEDMATRIX_10 == 1 )
   grovezero->rgbledmatrix10->Init();
#endif

#if defined(USE_RGBLEDMATRIX_11) && (USE_RGBLEDMATRIX_11 == 1 )
   grovezero->rgbledmatrix11->Init();
#endif

#if defined(USE_RGBLEDMATRIX_12) && (USE_RGBLEDMATRIX_12 == 1 )
   grovezero->rgbledmatrix12->Init();
#endif

#if defined(USE_RGBLEDMATRIX_13) && (USE_RGBLEDMATRIX_13 == 1 )
   grovezero->rgbledmatrix13->Init();
#endif

#if defined(USE_RGBLEDMATRIX_14) && (USE_RGBLEDMATRIX_14 == 1 )
   grovezero->rgbledmatrix14->Init();
#endif

#if defined(USE_RGBLEDMATRIX_15) && (USE_RGBLEDMATRIX_15 == 1 )
   grovezero->rgbledmatrix15->Init();
#endif

#if defined(USE_ROCKER_0) && (USE_ROCKER_0 == 1 )
   grovezero->rocker->Init();
#endif

#if defined(USE_ROCKER_1) && (USE_ROCKER_1 == 1 )
   grovezero->rocker1->Init();
#endif

#if defined(USE_ROCKER_2) && (USE_ROCKER_2 == 1 )
   grovezero->rocker2->Init();
#endif

#if defined(USE_ROCKER_3) && (USE_ROCKER_3 == 1 )
   grovezero->rocker3->Init();
#endif
}


