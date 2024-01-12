export default (Blockly) => {

    const listmelody = [0,
        131, 147, 165, 175, 196, 220, 247,  //#3, 1 - 7
        262, 294, 330, 349, 392, 440, 494,  //#4, 8 - 14
        523, 587, 659, 698, 784, 880, 988,  //#5, 15 - 21
        
        139, //# C#3, 22
        156, //# Eb3, 23
        185, //# F#3, 24
        208, //# G#3, 25
        233, //# Bb3, 26
        
        277, //# C#4, 27
        311, //# Eb4, 28
        370, //# F#4, 29
        415, //# G#4, 30
        466, //# Bb4, 31
        
        555, //# C#5, 32
        622, //# Eb5, 33
        740, //# F#5, 34
        831, //# G#5, 35
        932, //# Bb5, 36
    ];

    const tflite_include = function () {
      Blockly.Arduino.definitions_['include_tflite'] = 
`#undef min
#undef max
#include <TensorFlowLite.h>
#include <tensorflow/lite/micro/all_ops_resolver.h>
#include <tensorflow/lite/micro/micro_error_reporter.h>
#include <tensorflow/lite/micro/micro_interpreter.h>
#include <tensorflow/lite/schema/schema_generated.h>
`;
    }

    const tflite_define = function (size) {
      Blockly.Arduino.definitions_['var_tflite_define'] = 
`tflite::MicroErrorReporter tflErrorReporter;
tflite::AllOpsResolver tflOpsResolver;
const tflite::Model* tflModel = nullptr;
tflite::MicroInterpreter* tflInterpreter = nullptr;
TfLiteTensor* tflInputTensor = nullptr;
TfLiteTensor* tflOutputTensor = nullptr;
constexpr int tensorArenaSize = ${size};
byte tensorArena[tensorArenaSize];`;
    }

    const tflite_setup = function () {
      Blockly.Arduino.setups_['setup_tflite'] = 
`  tflModel = tflite::GetModel(model);
  if (tflModel->version() != TFLITE_SCHEMA_VERSION) {
    Serial.println("Model schema mismatch!");
    while (1);
  }
  tflInterpreter = new tflite::MicroInterpreter(tflModel, tflOpsResolver, tensorArena, tensorArenaSize, &tflErrorReporter);
  tflInterpreter->AllocateTensors();
  tflInputTensor = tflInterpreter->input(0);
  tflOutputTensor = tflInterpreter->output(0);
`;
    }

    Blockly.Arduino['system_wioterminal_setup_loop'] = Blockly.Arduino['motion_arduino_setup_loop'];

    Blockly.Arduino['math_cc_min_0_max_240_number'] = Blockly.Arduino['math_number'];
    Blockly.Arduino['math_cc_min_0_max_320_number'] = Blockly.Arduino['math_number'];
    Blockly.Arduino['math_cc_number'] = Blockly.Arduino['math_number'];

    Blockly.Arduino['system_wioterminal_speaker_playnote'] = function (block) {
        Blockly.Arduino.setups_['setup_analog_buzzer'] = '  pinMode(WIO_BUZZER, OUTPUT);';

        let note = block.getFieldValue('NOTE');
        let beat = block.getFieldValue('BEAT');
        let time = 1000 * parseFloat(beat);
        let tone = listmelody[note];
        
        var code = `tone(WIO_BUZZER,${tone});\n`;
        code += `delay(${time});\n`;
        code += 'noTone(WIO_BUZZER);\n';
        return code;
    };

    Blockly.Arduino['system_wioterminal_3_axis_accelerometer'] = function (block) {
        Blockly.Arduino.definitions_['include_lis'] = '#include"LIS3DHTR.h"';
        Blockly.Arduino.definitions_['var_lis'] = `LIS3DHTR<TwoWire> lis;`;
        Blockly.Arduino.setups_['setup_lis_begin'] = 
`  lis.begin(Wire1);
  lis.setOutputDataRate(LIS3DHTR_DATARATE_100HZ);
  lis.setFullScaleRange(LIS3DHTR_RANGE_4G);
`;
        let xyz = block.getFieldValue('XYZ');
        let code;
        if (xyz=='0') {
            code = 'lis.getAccelerationX()';
        }else if (xyz=='1') {
            code = 'lis.getAccelerationY()';
        }else if (xyz=='2') {
            code = 'lis.getAccelerationZ()';
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['system_wioterminal_light_sensor'] = function (block) {
        Blockly.Arduino.setups_['setup_analog_light'] = '  pinMode(WIO_LIGHT, INPUT);';
        var code = 'analogRead(WIO_LIGHT)';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['system_wioterminal_button_pressed'] = function (block) {
        let key = block.getFieldValue('KEY');
        let value = '';
        if (key == 'A') {
            value = 'WIO_KEY_A';
        }else if (key == 'B') {
            value = 'WIO_KEY_B';
        }else if (key == 'C') {
            value = 'WIO_KEY_C';
        }
        Blockly.Arduino.setups_['setup_button_' + key] = '  pinMode(' + value + ', INPUT_PULLUP);';
        var code = `digitalRead(${value}) == LOW`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['system_wioterminal_5way_switch_pressed'] = function (block) {
        let direct = block.getFieldValue('DIRECT');
        let value = '';
        if (direct == 'up') {
            value = 'WIO_5S_UP';
        }else if (direct == 'down') {
            value = 'WIO_5S_DOWN';
        }else if (direct == 'left') {
            value = 'WIO_5S_LEFT';
        }else if (direct == 'right') {
            value = 'WIO_5S_RIGHT';
        }else if (direct == 'pressed') {
            value = 'WIO_5S_PRESS';
        }
        Blockly.Arduino.setups_['setup_5way_' + direct] = '  pinMode(' + value + ', INPUT_PULLUP);';
        var code = `digitalRead(${value}) == LOW`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['system_wioterminal_infrared_send'] = function (block) {
        Blockly.Arduino.definitions_['include_ir_SendBase'] = '#include <IRLibSendBase.h>';
        Blockly.Arduino.definitions_['include_ir_P01_NEC'] = '#include <IRLib_P01_NEC.h>';
        Blockly.Arduino.definitions_['include_ir_P02_Sony'] = '#include <IRLib_P02_Sony.h>';
        Blockly.Arduino.definitions_['include_ir_P07_NECx'] = '#include <IRLib_P07_NECx.h>';
        Blockly.Arduino.definitions_['include_ir_P05_Panasonic'] = '#include <IRLib_P05_Panasonic_Old.h>';
        Blockly.Arduino.definitions_['include_ir_Combo'] = '#include <IRLibCombo.h>';

        Blockly.Arduino.definitions_[`var_ir_send`] = `IRsend mySender;`;
        let control = block.getFieldValue('CONTROL');
        let address = Blockly.Arduino.valueToCode(block, 'ADDRESS', Blockly.Arduino.ORDER_NONE) || '';
        address = address.replace(/"/g, '');
        let bit = Blockly.Arduino.valueToCode(block, 'BIT', Blockly.Arduino.ORDER_NONE) || '';

        let code = `mySender.send(${control},${address},${bit});`;
        return code;
    };

    Blockly.Arduino['system_wioterminal_sound_sensor'] = function (block) {
        Blockly.Arduino.setups_['setup_analog_mic'] = '  pinMode(WIO_MIC, INPUT);';
        var code = 'analogRead(WIO_MIC)';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['acquireData_menu_labelList'] = function (block) {
        var branch = block.getFieldValue('labelList');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };
    
    //三轴传感器
    Blockly.Arduino['acquireData_readData_accelerometer'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include "TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        Blockly.Arduino.setups_['setup_tft_rotation'] = '  tft.setRotation(3);';
        Blockly.Arduino.setups_['setup_edgeimpulse_serial_begin'] = '  Serial.begin(9600);';
        Blockly.Arduino.definitions_['include_lis'] = '#include"LIS3DHTR.h"';
        Blockly.Arduino.definitions_['var_lis'] = `LIS3DHTR<TwoWire> lis;`;
        Blockly.Arduino.definitions_['var_convert_g_to_ms2'] = `#define CONVERT_G_TO_MS2    9.80665f`;

        Blockly.Arduino.setups_['setup_lis_begin'] = 
`  lis.begin(Wire1);
  lis.setOutputDataRate(LIS3DHTR_DATARATE_100HZ);
  lis.setFullScaleRange(LIS3DHTR_RANGE_4G);
`;
        let xSensor = 'lis.getAccelerationX()*CONVERT_G_TO_MS2';
        let ySensor = 'lis.getAccelerationY()*CONVERT_G_TO_MS2';
        let zSensor = 'lis.getAccelerationZ()*CONVERT_G_TO_MS2';
        let label = Blockly.Arduino.valueToCode(block, 'LABEL_PARAM', Blockly.Arduino.ORDER_NONE) || '';
        let time = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_NONE) || 1;
        let frequency = 62.5;
        let frequencyInt = parseInt(frequency);
        let t = parseInt(frequency*time);
        let code = 
`Serial.println("c:(start,1,${label})");
tft.fillScreen(0x0000);
tft.setTextSize(2);
tft.setTextColor(0xF800);
for (int i = 0; i < ${t}; i++) {
  delay(${1000/frequency});
  Serial.println("c:("+String(${xSensor})+","+String(${ySensor})+","+String(${zSensor})+")");
  if (i%${frequencyInt} == 0) {
    tft.fillScreen(0x0000);
    tft.drawString("${label} data sampling...", 0, 0);
    tft.drawCircle(160, 120, 30, 0xF800);
    tft.fillCircle(160, 120, 30, 0xF800);
  }
}
Serial.println("c:(end,1,${label})");
tft.fillScreen(0x0000);
tft.setTextColor(0x7E8);
tft.setTextSize(4);
tft.drawString("OK", 120, 100);\n`
        return code;
    }

    //光敏传感器
    Blockly.Arduino['acquireData_readData_light'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include "TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        Blockly.Arduino.setups_['setup_tft_rotation'] = '  tft.setRotation(3);';
        Blockly.Arduino.setups_['setup_edgeimpulse_serial_begin'] = '  Serial.begin(9600);';
        Blockly.Arduino.setups_['setup_analog_light'] = '  pinMode(WIO_LIGHT, INPUT);';
        let sensor = 'analogRead(WIO_LIGHT)';

        let label = Blockly.Arduino.valueToCode(block, 'LABEL_PARAM', Blockly.Arduino.ORDER_NONE) || '';
        let time = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_NONE) || 1;
        let frequency = 100;
        let t = parseInt(frequency*time);
        let code = 
`Serial.println("c:(start,2,${label})");
tft.fillScreen(0x0000);
tft.setTextSize(2);
tft.setTextColor(0xF800);
for (int i = 0; i < ${t}; i++) {
  delay(${1000/frequency});
  Serial.println("c:("+String(${sensor})+")");
  if (i%${frequency} == 0) {
    tft.fillScreen(0x0000);
    tft.drawString("${label} data sampling...", 0, 0);
    tft.drawCircle(160, 120, 30, 0xF800);
    tft.fillCircle(160, 120, 30, 0xF800);
  }
}
Serial.println("c:(end,2,${label})");
tft.fillScreen(0x0000);
tft.setTextColor(0x7E8);
tft.setTextSize(4);
tft.drawString("OK", 120, 100);\n`
        return code;
    }
    
    //麦克风
    Blockly.Arduino['acquireData_readData_sound'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include "TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.definitions_['include_sound_read_head'] = 
`uint32_t samples = 16000*5;
enum {ADC_BUF_LEN = 1600};    
int16_t recording_buf[16000*5];

typedef struct {
  uint16_t btctrl;
  uint16_t btcnt;
  uint32_t srcaddr;
  uint32_t dstaddr;
  uint32_t descaddr;
} dmacdescriptor;

volatile uint8_t recording = 0;
uint16_t adc_buf_0[ADC_BUF_LEN];   
uint16_t adc_buf_1[ADC_BUF_LEN];    
volatile dmacdescriptor wrb[DMAC_CH_NUM] __attribute__ ((aligned (16)));          
dmacdescriptor descriptor_section[DMAC_CH_NUM] __attribute__ ((aligned (16)));    
dmacdescriptor descriptor __attribute__ ((aligned (16)));                         

class FilterBuHp1{
  public:
  FilterBuHp1(){
    v[0] = 0.0;
  }
  private:
  float v[2];
  public:
  float step(float x)
  {
    v[0] = v[1];
    v[1] = (9.621952458291035404e-1f * x) + (0.92439049165820696974f * v[0]);
    return (v[1] - v[0]);
  }
};
FilterBuHp1 filter;

static void audio_rec_callback(uint16_t *buf, uint32_t buf_len) {
  static uint32_t idx = 0;
  if (recording) {
    for (uint32_t i = 0; i < buf_len; i++) {
      recording_buf[idx++] = filter.step(((int16_t)buf[i] - 1024) * 16);
      if (idx >= samples) {
        idx = 0;
        recording = 0;
        break;
      }
    }
  }
}

void DMAC_1_Handler() {
  static uint8_t count = 0;
  if (DMAC->Channel[1].CHINTFLAG.bit.SUSP) {
    DMAC->Channel[1].CHCTRLB.reg = DMAC_CHCTRLB_CMD_RESUME;
    DMAC->Channel[1].CHINTFLAG.bit.SUSP = 1;
    if (count) {
      audio_rec_callback(adc_buf_0, ADC_BUF_LEN);
    }else {
      audio_rec_callback(adc_buf_1, ADC_BUF_LEN);
    }
    count = (count + 1) % 2;
  }
}

void config_dma_adc() {
  DMAC->BASEADDR.reg = (uint32_t)descriptor_section;
  DMAC->WRBADDR.reg = (uint32_t)wrb;
  DMAC->CTRL.reg = DMAC_CTRL_DMAENABLE | DMAC_CTRL_LVLEN(0xf);
  DMAC->Channel[1].CHCTRLA.reg = DMAC_CHCTRLA_TRIGSRC(TC5_DMAC_ID_OVF) |
                                 DMAC_CHCTRLA_TRIGACT_BURST;

  descriptor.descaddr = (uint32_t)&descriptor_section[1];
  descriptor.srcaddr = (uint32_t)&ADC1->RESULT.reg;
  descriptor.dstaddr = (uint32_t)adc_buf_0 + sizeof(uint16_t) * ADC_BUF_LEN;
  descriptor.btcnt = ADC_BUF_LEN;
  descriptor.btctrl = DMAC_BTCTRL_BEATSIZE_HWORD |
                      DMAC_BTCTRL_DSTINC |
                      DMAC_BTCTRL_VALID |
                      DMAC_BTCTRL_BLOCKACT_SUSPEND;
  memcpy(&descriptor_section[0], &descriptor, sizeof(descriptor));

  descriptor.descaddr = (uint32_t)&descriptor_section[0];
  descriptor.srcaddr = (uint32_t)&ADC1->RESULT.reg;
  descriptor.dstaddr = (uint32_t)adc_buf_1 + sizeof(uint16_t) * ADC_BUF_LEN;
  descriptor.btcnt = ADC_BUF_LEN;
  descriptor.btctrl = DMAC_BTCTRL_BEATSIZE_HWORD |
                      DMAC_BTCTRL_DSTINC |
                      DMAC_BTCTRL_VALID |
                      DMAC_BTCTRL_BLOCKACT_SUSPEND;
  memcpy(&descriptor_section[1], &descriptor, sizeof(descriptor));

  NVIC_SetPriority(DMAC_1_IRQn, 0);
  NVIC_EnableIRQ(DMAC_1_IRQn);

  DMAC->Channel[1].CHINTENSET.reg = DMAC_CHINTENSET_SUSP;

  ADC1->INPUTCTRL.bit.MUXPOS = ADC_INPUTCTRL_MUXPOS_AIN12_Val;
  while (ADC1->SYNCBUSY.bit.INPUTCTRL);
  ADC1->SAMPCTRL.bit.SAMPLEN = 0x00;
  while (ADC1->SYNCBUSY.bit.SAMPCTRL);
  ADC1->CTRLA.reg = ADC_CTRLA_PRESCALER_DIV128;
  ADC1->CTRLB.reg = ADC_CTRLB_RESSEL_12BIT |
                    ADC_CTRLB_FREERUN;
  while (ADC1->SYNCBUSY.bit.CTRLB);
  ADC1->CTRLA.bit.ENABLE = 1;
  while (ADC1->SYNCBUSY.bit.ENABLE);
  ADC1->SWTRIG.bit.START = 1;
  while (ADC1->SYNCBUSY.bit.SWTRIG);
  DMAC->Channel[1].CHCTRLA.bit.ENABLE = 1;
  GCLK->PCHCTRL[TC5_GCLK_ID].reg = GCLK_PCHCTRL_CHEN |
                                   GCLK_PCHCTRL_GEN_GCLK1;
  TC5->COUNT16.WAVE.reg = TC_WAVE_WAVEGEN_MFRQ;
  TC5->COUNT16.CC[0].reg = 3000 - 1;
  while (TC5->COUNT16.SYNCBUSY.bit.CC0);
  TC5->COUNT16.CTRLA.bit.ENABLE = 1;
  while (TC5->COUNT16.SYNCBUSY.bit.ENABLE);
}`;
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        Blockly.Arduino.setups_['setup_tft_rotation'] = '  tft.setRotation(3);';
        Blockly.Arduino.setups_['setup_edgeimpulse_serial_begin_115200'] = '  Serial.begin(115200);';
        Blockly.Arduino.setups_['setup_analog_reference'] = 
`  analogReference(AR_INTERNAL2V23);
  recording_buf[0]=0x00;
`
        Blockly.Arduino.setups_['setup_config_dma_adc'] = '  config_dma_adc();';
        let label = Blockly.Arduino.valueToCode(block, 'LABEL_PARAM', Blockly.Arduino.ORDER_NONE) || '';
        let time = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_NONE) || 1;
        if (time > 5) {
            time = 5;
        }
        Blockly.Arduino.define_fun['sound_record'] =
`void sound_record(uint8_t time, String label) {
  samples = 16000*time;
  if (!recording) {
    recording = 1;
    while(recording_buf[0]==0x00) {
      delay(10);
    }
    Serial.println("c:(start,3,"+label+")");
    tft.fillScreen(0x0000);
    tft.setTextSize(2);
    tft.setTextColor(0xF800);
    for (int i = 0; i < samples; i++) {
      Serial.println("c:("+String(recording_buf[i])+")");
      if (i%16000 == 0) {
        tft.fillScreen(0x0000);
        tft.drawString(label+" data sampling...", 0, 0);
        tft.drawCircle(160, 120, 30, 0xF800);
        tft.fillCircle(160, 120, 30, 0xF800);
      }
    }
    recording_buf[0]=0x00;
    Serial.println("c:(end,3,"+label+")");
    tft.fillScreen(0x0000);
    tft.setTextColor(0x7E8);
    tft.setTextSize(4);
    tft.drawString("OK", 120, 100);
  }
}`
        let code = `sound_record(${time},"${label}");\n`
        return code;
    }

    //气味传感器
    Blockly.Arduino['acquireData_readData_gas'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include "TFT_eSPI.h"';
        Blockly.Arduino.definitions_['include_gas'] = '#include <Multichannel_Gas_GMXXX.h>';
        Blockly.Arduino.definitions_['include_wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['var_gas'] = 'GAS_GMXXX<TwoWire> gas;';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        Blockly.Arduino.setups_['setup_tft_rotation'] = '  tft.setRotation(3);';
        Blockly.Arduino.setups_['setup_gas'] = '  gas.begin(Wire, 0x08);';

        Blockly.Arduino.setups_['setup_edgeimpulse_serial_begin'] = '  Serial.begin(9600);';

        let NO2Sensor = 'gas.getGM102B()';//NO2
        let C2H5CHSensor = 'gas.getGM302B()';//C2H5CH
        let VOCSensor = 'gas.getGM502B()';//VOC
        let COSensor = 'gas.getGM702B()';//CO
        let label = Blockly.Arduino.valueToCode(block, 'LABEL_PARAM', Blockly.Arduino.ORDER_NONE) || '';
        let time = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_NONE) || 1;
        let frequency = 10;
        let t = parseInt(frequency*time);
        let code = 
`Serial.println("c:(start,5,${label})");
tft.fillScreen(0x0000);
tft.setTextSize(2);
tft.setTextColor(0xF800);
for (int i = 0; i < ${t}; i++) {
  delay(${1000/frequency});
  Serial.println("c:("+String(${NO2Sensor})+","+String(${C2H5CHSensor})+","+String(${VOCSensor})+","+String(${COSensor})+")");
  if (i%${frequency} == 0) {
    tft.fillScreen(0x0000);
    tft.drawString("${label} data sampling...", 0, 0);
    tft.drawCircle(160, 120, 30, 0xF800);
    tft.fillCircle(160, 120, 30, 0xF800);
  }
}
Serial.println("c:(end,5,${label})");
tft.fillScreen(0x0000);
tft.setTextColor(0x7E8);
tft.setTextSize(4);
tft.drawString("OK", 120, 100);\n`
        return code;
    }    

    /**
     * modelDeployment
     */
    Blockly.Arduino['modelDeployment_menu_labelList'] = function (block) {
        var branch = block.getFieldValue('labelList');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['modelDeployment_runClassifier_accelerometer'] = function (block) {
        let edgeimpulseAuthInfoStr = localStorage.getItem('edgeimpulseAuthInfo');
        let edgeimpulseAuthInfo = edgeimpulseAuthInfoStr ? JSON.parse(edgeimpulseAuthInfoStr) : {};
        let projectId = edgeimpulseAuthInfo.selectedProjectId;
        tflite_include();
        Blockly.Arduino.definitions_['include_tensorflow_model'] = `#include "model_${projectId}.h"`;
        Blockly.Arduino.definitions_['include_lis'] = '#include "LIS3DHTR.h"';
        Blockly.Arduino.definitions_['var_lis'] = 'LIS3DHTR<TwoWire> lis;';
        Blockly.Arduino.definitions_['var_convert_g_to_ms2'] = '#define CONVERT_G_TO_MS2    9.80665f';
        Blockly.Arduino.definitions_['var_num_labels'] = '#define NUM_LABELS (sizeof(LABELS) / sizeof(LABELS[0]))';
        Blockly.Arduino.definitions_['var_num_samples'] = 'const int numSamples = 312;';
        Blockly.Arduino.definitions_['var_max_confidence_label'] = 'const char* maxConfidenceLabel;';
        tflite_define(30 * 1024);
        Blockly.Arduino.setups_['setup_lis_begin'] = 
`  lis.begin(Wire1);
  lis.setOutputDataRate(LIS3DHTR_DATARATE_100HZ);
  lis.setFullScaleRange(LIS3DHTR_RANGE_4G);
`;      
        tflite_setup();
        Blockly.Arduino.define_fun['func_runClassifier'] = 
`void runClassifier()
{
  for (int i = 0; i < numSamples; i++) {
    delay(16);
    tflInputTensor->data.f[i * 3 + 0] = lis.getAccelerationX() * CONVERT_G_TO_MS2;
    tflInputTensor->data.f[i * 3 + 1] = lis.getAccelerationY() * CONVERT_G_TO_MS2;
    tflInputTensor->data.f[i * 3 + 2] = lis.getAccelerationZ() * CONVERT_G_TO_MS2;
  }
  TfLiteStatus invokeStatus = tflInterpreter->Invoke();
  if (invokeStatus != kTfLiteOk) {
    return;
  }
  float maxValue = 0;
  for (int i = 0; i < NUM_LABELS; i++) {
    float value = tflOutputTensor->data.f[i];
    const char *label = LABELS[i];
    if (value > maxValue) {
      maxValue = value;
      maxConfidenceLabel = label;
    }
  }
}`
        var code = 'runClassifier();\n';
        return code;
    };

    Blockly.Arduino['modelDeployment_runClassifier_light'] = function (block) {
        let edgeimpulseAuthInfoStr = localStorage.getItem('edgeimpulseAuthInfo');
        let edgeimpulseAuthInfo = edgeimpulseAuthInfoStr ? JSON.parse(edgeimpulseAuthInfoStr) : {};
        let projectId = edgeimpulseAuthInfo.selectedProjectId;
        tflite_include();
        Blockly.Arduino.definitions_['include_tensorflow_model'] = `#include "model_${projectId}.h"`;
        Blockly.Arduino.definitions_['var_num_labels'] = '#define NUM_LABELS (sizeof(LABELS) / sizeof(LABELS[0]))';
        Blockly.Arduino.definitions_['var_num_samples'] = 'const int numSamples = 1000;';
        Blockly.Arduino.definitions_['var_max_confidence_label'] = 'const char* maxConfidenceLabel;';
        tflite_define(30 * 1024);
        tflite_setup();
        Blockly.Arduino.define_fun['func_runClassifier'] = `
void runClassifier()
{
    for (int i = 0; i < numSamples; i++)
    {
        delay(10);
        tflInputTensor->data.f[i] = analogRead(WIO_LIGHT);
    }
    TfLiteStatus invokeStatus = tflInterpreter->Invoke();
    if (invokeStatus != kTfLiteOk)
    {
        return;
    }
    float maxValue = 0;
    for (int i = 0; i < NUM_LABELS; i++)
    {
        float value = tflOutputTensor->data.f[i];
        const char *label = LABELS[i];
        if (value > maxValue)
        {
            maxValue = value;
            maxConfidenceLabel = label;
        }
    }
}`
        var code = `runClassifier();\n`;
        return code;
    };

    Blockly.Arduino['modelDeployment_runClassifier_sound'] = function (block) {
        let edgeimpulseAuthInfoStr = localStorage.getItem('edgeimpulseAuthInfo');
        let edgeimpulseAuthInfo = edgeimpulseAuthInfoStr ? JSON.parse(edgeimpulseAuthInfoStr) : {};
        let projectId = edgeimpulseAuthInfo.selectedProjectId;
        tflite_include();
        Blockly.Arduino.definitions_['include_mfcc'] = `#include "mfcc.h"`;
        Blockly.Arduino.definitions_['include_tensorflow_model'] = `#include "model_${projectId}.h"`;
        Blockly.Arduino.definitions_['var_num_labels'] = '#define NUM_LABELS (sizeof(LABELS) / sizeof(LABELS[0]))';
        Blockly.Arduino.definitions_['var_mfcc'] = 
`#define NUM_SEC 10
#define NUM_FRAMES NUM_SEC / 0.1
#define NUM_MFCC_COEFFS 13
#define FRAME_LEN ((int16_t)(16000 * 0.001 * 100))
#define FRAME_SHIFT 0
#define CLASSIFIER_SLICE_SIZE 1600        
`
        Blockly.Arduino.definitions_['var_max_confidence_label'] = 'const char* maxConfidenceLabel;';
        tflite_define(30 * 1024);
        Blockly.Arduino.definitions_['var_sound_classifier_head'] = 
`enum
{
    ADC_BUF_LEN = 1600
};
typedef struct
{
    uint16_t btctrl;
    uint16_t btcnt;
    uint32_t srcaddr;
    uint32_t dstaddr;
    uint32_t descaddr;
} dmacdescriptor;
typedef struct
{
    signed short *buffers[2];
    unsigned char buf_select;
    unsigned char buf_ready;
    unsigned int buf_count;
    unsigned int n_samples;
} inference_t;
volatile uint8_t recording = 0;
uint16_t adc_buf_0[ADC_BUF_LEN];
uint16_t adc_buf_1[ADC_BUF_LEN];
volatile dmacdescriptor wrb[DMAC_CH_NUM] __attribute__((aligned(16)));
dmacdescriptor descriptor_section[DMAC_CH_NUM] __attribute__((aligned(16)));
dmacdescriptor descriptor __attribute__((aligned(16)));
static inference_t inference;
class FilterBuHp1
{
public:
    FilterBuHp1()
    {
        v[0] = 0.0;
    }
private:
    float v[2];
public:
    float step(float x)
    {
        v[0] = v[1];
        v[1] = (9.621952458291035404e-1f * x) + (0.92439049165820696974f * v[0]);
        return (v[1] - v[0]);
    }
};
FilterBuHp1 filter;
int num_frames = NUM_FRAMES;
int num_mfcc_features = NUM_MFCC_COEFFS;
float *mfcc_buffer = new float[num_frames * 13];
MFCC *mfcc = new MFCC(NUM_MFCC_COEFFS, FRAME_LEN, 4);

int recording_win = NUM_FRAMES;
static void audio_rec_callback(uint16_t *buf, uint32_t buf_len)
{
    if (recording)
    {
        for (uint32_t i = 0; i < buf_len; i++)
        {
            inference.buffers[inference.buf_select][inference.buf_count++] = filter.step(((int16_t)buf[i] - 1024) * 16);
            if (inference.buf_count >= inference.n_samples)
            {
                int32_t mfcc_buffer_head = (num_frames - recording_win) * num_mfcc_features;
                mfcc->mfcc_compute(inference.buffers[inference.buf_select], &mfcc_buffer[mfcc_buffer_head]);
                inference.buf_select ^= 1;
                inference.buf_count = 0;
                inference.buf_ready = 1;
            }
        }
        recording_win--;
    }
}
void DMAC_1_Handler()
{
    static uint8_t count = 0;
    if (DMAC->Channel[1].CHINTFLAG.bit.SUSP)
    {
        DMAC->Channel[1].CHCTRLB.reg = DMAC_CHCTRLB_CMD_RESUME;
        DMAC->Channel[1].CHINTFLAG.bit.SUSP = 1;
        if (count)
        {
            audio_rec_callback(adc_buf_0, ADC_BUF_LEN);
        }
        else
        {
            audio_rec_callback(adc_buf_1, ADC_BUF_LEN);
        }
        count = (count + 1) % 2;
    }
}

void config_dma_adc()
{
    DMAC->BASEADDR.reg = (uint32_t)descriptor_section;
    DMAC->WRBADDR.reg = (uint32_t)wrb;
    DMAC->CTRL.reg = DMAC_CTRL_DMAENABLE | DMAC_CTRL_LVLEN(0xf);
    DMAC->Channel[1].CHCTRLA.reg = DMAC_CHCTRLA_TRIGSRC(TC5_DMAC_ID_OVF) |
                                   DMAC_CHCTRLA_TRIGACT_BURST;
    descriptor.descaddr = (uint32_t)&descriptor_section[1];
    descriptor.srcaddr = (uint32_t)&ADC1->RESULT.reg;
    descriptor.dstaddr = (uint32_t)adc_buf_0 + sizeof(uint16_t) * ADC_BUF_LEN;
    descriptor.btcnt = ADC_BUF_LEN;
    descriptor.btctrl = DMAC_BTCTRL_BEATSIZE_HWORD |
                        DMAC_BTCTRL_DSTINC |
                        DMAC_BTCTRL_VALID |
                        DMAC_BTCTRL_BLOCKACT_SUSPEND;
    memcpy(&descriptor_section[0], &descriptor, sizeof(descriptor));
    descriptor.descaddr = (uint32_t)&descriptor_section[0];
    descriptor.srcaddr = (uint32_t)&ADC1->RESULT.reg;
    descriptor.dstaddr = (uint32_t)adc_buf_1 + sizeof(uint16_t) * ADC_BUF_LEN;
    descriptor.btcnt = ADC_BUF_LEN;
    descriptor.btctrl = DMAC_BTCTRL_BEATSIZE_HWORD |
                        DMAC_BTCTRL_DSTINC |
                        DMAC_BTCTRL_VALID |
                        DMAC_BTCTRL_BLOCKACT_SUSPEND;
    memcpy(&descriptor_section[1], &descriptor, sizeof(descriptor));

    NVIC_SetPriority(DMAC_1_IRQn, 0);
    NVIC_EnableIRQ(DMAC_1_IRQn);

    DMAC->Channel[1].CHINTENSET.reg = DMAC_CHINTENSET_SUSP;

    ADC1->INPUTCTRL.bit.MUXPOS = ADC_INPUTCTRL_MUXPOS_AIN12_Val;
    while (ADC1->SYNCBUSY.bit.INPUTCTRL)
        ;
    ADC1->SAMPCTRL.bit.SAMPLEN = 0x00;
    while (ADC1->SYNCBUSY.bit.SAMPCTRL)
        ;
    ADC1->CTRLA.reg = ADC_CTRLA_PRESCALER_DIV128;
    ADC1->CTRLB.reg = ADC_CTRLB_RESSEL_12BIT |
                      ADC_CTRLB_FREERUN;
    while (ADC1->SYNCBUSY.bit.CTRLB)
        ;
    ADC1->CTRLA.bit.ENABLE = 1;
    while (ADC1->SYNCBUSY.bit.ENABLE)
        ;
    ADC1->SWTRIG.bit.START = 1;
    while (ADC1->SYNCBUSY.bit.SWTRIG)
        ;
    DMAC->Channel[1].CHCTRLA.bit.ENABLE = 1;
    GCLK->PCHCTRL[TC5_GCLK_ID].reg = GCLK_PCHCTRL_CHEN |
                                     GCLK_PCHCTRL_GEN_GCLK1;
    TC5->COUNT16.WAVE.reg = TC_WAVE_WAVEGEN_MFRQ;
    TC5->COUNT16.CC[0].reg = 3000 - 1;
    while (TC5->COUNT16.SYNCBUSY.bit.CC0)
        ;
    TC5->COUNT16.CTRLA.bit.ENABLE = 1;
    while (TC5->COUNT16.SYNCBUSY.bit.ENABLE)
        ;
}
`       
        tflite_setup();
        Blockly.Arduino.setups_['setup_tflite_begin'] = 
`    inference.buffers[0] = (int16_t *)malloc(CLASSIFIER_SLICE_SIZE * sizeof(int16_t));
    inference.buffers[1] = (int16_t *)malloc(CLASSIFIER_SLICE_SIZE * sizeof(int16_t));
    inference.buf_select = 0;
    inference.buf_count = 0;
    inference.n_samples = CLASSIFIER_SLICE_SIZE;
    inference.buf_ready = 0;
    recording = 1;
    recording_win = NUM_FRAMES;
    config_dma_adc();
`;
        Blockly.Arduino.define_fun['func_runClassifier'] = 
`void runClassifier()
{
    while (recording_win > 0)
    {
        delay(1);
    }
    recording = 0;
    for (uint16_t j = 0; j < num_frames * num_mfcc_features; j++)
    {
        tflInputTensor->data.f[j] = mfcc_buffer[j];
    }
    TfLiteStatus invokeStatus = tflInterpreter->Invoke();
    if (invokeStatus != kTfLiteOk)
    {
        return;
    }
    float maxValue = 0;
    for (int i = 0; i < NUM_LABELS; i++)
    {

        float value = tflOutputTensor->data.f[i];
        const char *label = LABELS[i];
        if (value > maxValue)
        {
            maxValue = value;
            maxConfidenceLabel = label;
        }
    }
    recording = 1;
    recording_win = NUM_FRAMES;
}`
        var code = `runClassifier();\n`;
        return code;
    };

    Blockly.Arduino['modelDeployment_runClassifier_gas'] = function (block) {
        let edgeimpulseAuthInfoStr = localStorage.getItem('edgeimpulseAuthInfo');
        let edgeimpulseAuthInfo = edgeimpulseAuthInfoStr ? JSON.parse(edgeimpulseAuthInfoStr) : {};
        let projectId = edgeimpulseAuthInfo.selectedProjectId;
        tflite_include();
        Blockly.Arduino.definitions_['include_tensorflow_model'] = `#include "model_${projectId}.h"`;
        Blockly.Arduino.definitions_['var_num_labels'] = '#define NUM_LABELS (sizeof(LABELS) / sizeof(LABELS[0]))';
        Blockly.Arduino.definitions_['var_num_samples'] = 'const int numSamples = 100;';
        Blockly.Arduino.definitions_['var_max_confidence_label'] = 'const char* maxConfidenceLabel;';
        tflite_define(30 * 1024);
        tflite_setup();
        Blockly.Arduino.definitions_['include_gas'] = '#include <Multichannel_Gas_GMXXX.h>';
        Blockly.Arduino.definitions_['include_wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['var_gas'] = 'GAS_GMXXX<TwoWire> gas;';
        Blockly.Arduino.setups_['setup_gas'] = '  gas.begin(Wire, 0x08);';
        Blockly.Arduino.define_fun['func_runClassifier'] = `
void runClassifier()
{
    for (int i = 0; i < numSamples; i++)
    {
        delay(100);
        tflInputTensor->data.f[i * 4 + 0] = gas.getGM102B();
        tflInputTensor->data.f[i * 4 + 1] = gas.getGM302B();
        tflInputTensor->data.f[i * 4 + 2] = gas.getGM502B();
        tflInputTensor->data.f[i * 4 + 3] = gas.getGM702B();
    }
    TfLiteStatus invokeStatus = tflInterpreter->Invoke();
    if (invokeStatus != kTfLiteOk)
    {
        return;
    }
    float maxValue = 0;
    for (int i = 0; i < NUM_LABELS; i++)
    {
        float value = tflOutputTensor->data.f[i];
        const char *label = LABELS[i];
        if (value > maxValue)
        {
            maxValue = value;
            maxConfidenceLabel = label;
        }
    }
}`
        var code = `runClassifier();\n`;
        return code;
    };    

    Blockly.Arduino['modelDeployment_getConfidenceValue'] = function (block) {
        Blockly.Arduino.define_fun['func_getLabelConfidence'] =       
`float getLabelConfidence(char *label)
{
  float value = 0;
  for (int i = 0; i < NUM_LABELS; i++) {
    if (label == LABELS[i]) {
      value = tflOutputTensor->data.f[i];
    }
  }
  return value;
}`      
        let label = Blockly.Arduino.valueToCode(block, 'LABEL_PARAM', Blockly.Arduino.ORDER_NONE) || '';
        let code = `getLabelConfidence("${label}")`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino['modelDeployment_getRecognitionResult'] = function (block) {
        let code = `maxConfidenceLabel`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino['modelDeployment_whichLabel'] = function (block) {
        let label = Blockly.Arduino.valueToCode(block, 'LABEL_PARAM', Blockly.Arduino.ORDER_NONE) || '';
        let code = `maxConfidenceLabel == "${label}"`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    
}