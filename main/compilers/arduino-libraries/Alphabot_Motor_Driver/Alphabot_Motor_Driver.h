

int LMotorSpeedPin = 5;  //根据硬件连接,将控制左边电机速度的引脚设置为d5
int LMotorForward = A0;  //根据硬件连接,将控制左边电机转动方向的引脚1设置为a0
int LMotorBackward = A1 ; //根据硬件连接,将控制左边电机转动方向的引脚2设置为a1

int RMotorSpeedPin = 6;  //根据硬件连接,将控制右边电机速度的引脚设置为d6
int RMotorForward = A3;  //根据硬件连接,将控制右边电机转动方向的引脚1设置为a3
int RMotorBackward = A2;  //根据硬件连接,将控制右边电机转动方向的引脚2设置为a2


void car_init()
{                
	pinMode(LMotorSpeedPin,OUTPUT);  //将连接到主控板的LMotorSpeedPin引脚设置为输出模式                 
	pinMode(LMotorForward,OUTPUT);   //将连接到主控板的引脚LMotorForward设置为输出模式         
	pinMode(LMotorBackward,OUTPUT); //将连接到主控板的引脚LMotorBackward设置为输出模式     

	pinMode(RMotorSpeedPin,OUTPUT);  //将连接到主控板的引脚RMotorSpeedPin设置为输出模式           
	pinMode(RMotorForward,OUTPUT);  //将连接到主控板的引脚RMotorForward设置为输出模式         
	pinMode(RMotorBackward,OUTPUT); //将连接到主控板的引脚RMotorBackward设置为输出模式    

	
	digitalWrite(LMotorForward,LOW);  //将主控板上引脚A0，设置为高电平
	digitalWrite(LMotorBackward,LOW);    //将主控板上引脚A1，设置为低电平
	digitalWrite(RMotorForward,LOW);  //将主控板上引脚A2，设置为高电平
	digitalWrite(RMotorBackward,LOW);    //将主控板上引脚A3，设置为低电平

}

void motor_control (bool motor, int speed){
	
	if(motor)
	{
		if (speed >=0){     //当速度大于0时,左边电机往前转动,速度为speed
		digitalWrite(LMotorForward,HIGH);         
		digitalWrite(LMotorBackward,LOW);
		analogWrite(LMotorSpeedPin,speed);
		}else {        //否则,当速度小于零时,左边电机往后转动,速度为speed
		digitalWrite(LMotorForward,LOW);
		digitalWrite(LMotorBackward,HIGH); 
		analogWrite(LMotorSpeedPin,-speed);   
		}		
	}else
	{
		if (speed >=0){      //当速度大于零时，右边电机往前转动,速度为speed
		digitalWrite(RMotorForward,HIGH);
		digitalWrite(RMotorBackward,LOW);
		analogWrite(RMotorSpeedPin,speed);
		}else {         //否则,当速度小于零时,右边电机往后转动,速度为speed
		digitalWrite(RMotorForward,LOW);
		digitalWrite(RMotorBackward,HIGH);   
		analogWrite(RMotorSpeedPin,-speed);     
		}		
	}
}


