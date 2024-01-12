export default (Blockly) => {
    // 数字输入A5  Digital input A5
    function digitalReadForA5(block) {
        Blockly.Arduino.setups_['setup_input_A5'] = 'pinMode(A5, INPUT);';
        return [`digitalRead(A5)`, Blockly.Arduino.ORDER_ATOMIC];
    }

    // 模拟输入  Analog input
    function analogReadForA5(block) {
        Blockly.Arduino.setups_['setup_input_A5'] = 'pinMode(A5, INPUT);';
        return [`analogRead(A5)`, Blockly.Arduino.ORDER_ATOMIC];
    }

    // 按键开关  Button switch
    Blockly.Arduino['motion_grovejoint_magnetic_switch'] = digitalReadForA5;
    // 红外接近  Infrared ray sensor
    Blockly.Arduino['motion_grovejoint_inf_prox_sensor'] = digitalReadForA5;
    // 倾斜传感器  Tilt sensor
    Blockly.Arduino['motion_grovejoint_tilt_sensor'] = digitalReadForA5;
    // 触摸传感器  Touch sensor
    Blockly.Arduino['motion_grovejoint_touch_sensor'] = digitalReadForA5;



    // 光线传感器  Light sensor
    Blockly.Arduino['motion_grovejoint_light_sensor'] = analogReadForA5;
    // 滑动电位开关  Sliding potential switch
    Blockly.Arduino['motion_grovejoint_sli_pot_switch'] = analogReadForA5;
    // 噪音传感器  Noise sensor
    Blockly.Arduino['motion_grovejoint_noise_sensor'] = analogReadForA5;
    // 土壤湿度传感器  Soil moisture sensor
    Blockly.Arduino['motion_grovejoint_soil_moi_sensor'] = analogReadForA5;





    // 多通道触摸传感器  Mutichannel touch sensor
    Blockly.Arduino['motion_grovejoint_mul_channel_touch_sensor'] = function (block) {
        Blockly.Arduino.definitions_['include_wire'] = '#include "Wire.h"';
        Blockly.Arduino.definitions_['include_seeed_i2ctouch'] = '#include "Seeed_I2CTouchSensor.h"';
        Blockly.Arduino.definitions_['var_i2ctouch_a5'] = `I2CTouch i2cTouch_a5;`;
        Blockly.Arduino.setups_['setup_i2ctouch_a5'] = 'i2cTouch_a5.Init();';

        var channel = block.getFieldValue('CHANNEL');
        return [`i2cTouch_a5.I2CTouchRead(${channel})`, Blockly.Arduino.ORDER_ATOMIC]
    }


    // 三轴数字加速度 
    Blockly.Arduino['motion_grovejoint_imu3_dof_get_value'] = function (block) {
        Blockly.Arduino.definitions_['include_wire'] = '#include "Wire.h"';
        Blockly.Arduino.definitions_['include_adxl345'] = '#include "ADXL345.h"';

        Blockly.Arduino.definitions_['var_adxl345_a5'] = `ADXL345 adx_a5;`;
        
        Blockly.Arduino.setups_['setup_adxl345_a5'] = 'adx_a5.init();';


        var xyz = block.getFieldValue('XYZ');
        return [`adx_a5.AxisDigitalAccelerometerRead(5, '${xyz}')`, Blockly.Arduino.ORDER_ATOMIC]
    };


    // 超声波测距  Ultrasonic distance sensor
    Blockly.Arduino['motion_grovejoint_ult_dis_sensor'] = function (block) {
        Blockly.Arduino.definitions_['include_ultrasonic'] = '#include "Ultrasonic.h"';
        Blockly.Arduino.definitions_['var_ultrasonic_a5'] = `Ultrasonic ultrasonic_a5(A5);`;
        return [`ultrasonic_a5.MeasureInCentimeters()`, Blockly.Arduino.ORDER_ATOMIC]
    }


    // 温湿度  Tempreture and humidity
    Blockly.Arduino['motion_grovejoint_tem_hum_get_value'] = function (block) {
        var type = block.getFieldValue('TYPE');
        Blockly.Arduino.definitions_['include_DHT'] = '#include "DHT.h"';
        Blockly.Arduino.definitions_['var_DHTTYPE_11'] = '#define DHTTYPE11 DHT11';
        Blockly.Arduino.definitions_[`var_DHT_11`] = `DHT dht11(A5, DHTTYPE11);`;
        Blockly.Arduino.setups_['setup_dht_11_begin'] = '  dht11.begin();';
        var code = "";
        if (type == 'T') {
            code = `dht11.readTemperature()`;
        } else {
            code = `dht11.readHumidity()`;
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
}