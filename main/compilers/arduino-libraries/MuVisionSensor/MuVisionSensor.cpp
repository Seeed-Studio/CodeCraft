/*
 * MU.cpp
 *
 *  Created on: 2018年8月3日
 *      Author: ysq
 */

#include "MuVisionSensor.h"
#include "mu_vision_sensor_uart_hw_interface.h"
#include "mu_vision_sensor_i2c_hw_interface.h"
#include <Arduino.h>

MuVisionSensor::MuVisionSensor(uint32_t address)
    : address_(address) {
}

MuVisionSensor::~MuVisionSensor() {
  if (mu_vs_method) {
    delete mu_vs_method;
  }
  for (int i = 1; i < kVisionMaxType; i++) {
    free_vision_buffer(MuVsMessageVisionType(i));
  }
}

uint8_t MuVisionSensor::begin(void* communication_port,
                              MuVsMode mode = kSerialMode) {
  if (mu_vs_method) {
    delete mu_vs_method;
    mu_vs_method = nullptr;
  }
  mode_ = mode;
  switch (mode) {
    case kSerialMode:
      if (mu_vs_method == nullptr) {
        mu_vs_method = new MuVisionSensorUart((MuVsUart *)communication_port,
                                              address_);
      }
      break;
    case kI2CMode:
      if (mu_vs_method == nullptr) {
        mu_vs_method = new MuVisionSensorI2C((MuVsI2C *)communication_port,
                                              address_);
      }
      break;
    default:
      return MU_ERROR_FAIL;
  }
  // check vs2 protocol version
  uint8_t protocol_version = 0;
  int err_count = 0;
  while (mu_vs_method->Get(kRegProtocolVersion, &protocol_version)
      || protocol_version != MU_PROTOCOL_VERSION) {
    ++err_count;
    if (err_count > 50) {
      delete mu_vs_method;
      mu_vs_method = nullptr;
      return MU_ERROR_UNSUPPROT_PROTOCOL;
    }
  }

  return MU_OK;
}

//Advance interface
uint8_t MuVisionSensor::VisionBegin(MuVisionType vision_type) {
  mu_err_t err;
  err = VisionSetDefault(vision_type);
  if (err) return err;
  err = VisionSetStatus(vision_type, true);
  if (err) return err;
  err = VisionSetOutputMode(kCallBackMode);
  if (err) return err;
  return MU_OK;
}

uint8_t MuVisionSensor::VisionEnd(MuVisionType vision_type) {
  return VisionSetStatus(vision_type, false);
}

int MuVisionSensor::GetValue(MuVisionType vision_type,
                             MuVsObjectInf object_inf) {
  uint8_t vision_pointer = 0;
  MuVisionType vision_type_src = vision_type;
  while ((vision_type & 0x01) == 0 && vision_pointer < 8) {
    vision_type = vision_type >> 1;
    vision_pointer++;
  }
  if (vision_state_[vision_pointer] == nullptr) return -1;
  if (object_inf == kStatus) {
    while((UpdateResult(vision_type_src, true)&vision_type_src) == 0);
  }
  return (int)read(vision_type_src, object_inf);
}

//uint8_t MuVisionSensor::VisionSetEnable(MuVisionType vision_type,
//                                        MuVsStreamOutputMode mode) {
//  mu_err_t err;
//  output_mode_ = mode;
//  MuVsVisionConfig1 vision_config1;
//  for (int i = 1; i < kVisionMaxType; i++) {
//    err = mu_vs_method->Set(kRegVisionId, i);
//    if(err) return err;
//    err = mu_vs_method->Get(kRegVisionConfig1, &vision_config1.vision_config_reg_value);
//    uint8_t status = (vision_type&BIT(i-1)) ? 1:0;
//    if (vision_config1.status != status
//        || vision_config1.output_mode != mode) {
//      vision_config1.status = status;
//      vision_config1.output_mode = mode;
//      err = mu_vs_method->Set(kRegVisionConfig1,
//                              vision_config1.vision_config_reg_value);
//      if (err) return err;
//    }
//    if (status) {
//      malloc_vision_buffer(MuVsMessageVisionType(i));
//    } else {
//      free_vision_buffer(MuVsMessageVisionType(i));
//    }
////    output_mode[i-1] = vision_config1.output_mode;
//  }
//  return err;
//}

uint8_t MuVisionSensor::VisionSetStatus(MuVisionType vision_type, bool enable) {
  mu_err_t err;
  MuVsVisionConfig1 vision_config1;
  for (int i = 1; i < kVisionMaxType; i++) {
    if (vision_type & BIT(i-1)) {
      err = mu_vs_method->Set(kRegVisionId, i);
      if(err) return err;
      err = mu_vs_method->Get(kRegVisionConfig1, &vision_config1.vision_config_reg_value);
      if(err) return err;
      if (vision_config1.status != enable) {
        vision_config1.status = enable;
        err = mu_vs_method->Set(kRegVisionConfig1,
                                vision_config1.vision_config_reg_value);
        if (err) return err;
      }
      if (enable) {
        malloc_vision_buffer(MuVsMessageVisionType(i));
      } else {
        free_vision_buffer(MuVsMessageVisionType(i));
      }
//      output_mode[i-1] = vision_config1.output_mode;
      output_mode_ = vision_config1.output_mode;
    }
  }
  return MU_OK;
}

//uint8_t MuVisionSensor::VisionSetOutputMode(MuVisionType vision_type,
//                                            MuVsStreamOutputMode mode) {
//  mu_err_t err;
//  MuVsVisionConfig1 vision_config1;
//  output_mode_ = mode;
//  for (int i = 1; i < kVisionMaxType; i++) {
////    if (vision_type & BIT(i-1)) {
//    if (output_mode[i-1] != mode) {
//      output_mode[i-1] = mode;
//      err = mu_vs_method->Set(kRegVisionId, i);
//      if(err) return err;
//      err = mu_vs_method->Get(kRegVisionConfig1, &vision_config1.vision_config_reg_value);
//      if (err) return err;
//      vision_config1.output_mode = mode;
//      err = mu_vs_method->Set(kRegVisionConfig1,
//                              vision_config1.vision_config_reg_value);
//      if (err) return err;
//    }
////    }
//  }
//  return MU_OK;
//}

uint8_t MuVisionSensor::VisionSetOutputMode(MuVsStreamOutputMode mode) {
  mu_err_t err;
  MuVsVisionConfig1 vision_config1;
  output_mode_ = mode;
  for (int i = 1; i < kVisionMaxType; ++i) {
    if (vision_state_[i-1] != nullptr) {
      err = mu_vs_method->Set(kRegVisionId, i);
      if(err) return err;
      err = mu_vs_method->Get(kRegVisionConfig1, &vision_config1.vision_config_reg_value);
      if (err) return err;
      if (vision_config1.output_mode != mode) {
        vision_config1.output_mode = mode;
        err = mu_vs_method->Set(kRegVisionConfig1,
                                vision_config1.vision_config_reg_value);
        if (err) return err;
      }
    }
  }
  return MU_OK;
}

uint8_t MuVisionSensor::VisionSetOutputEnable(MuVisionType vision_type, bool status) {
  mu_err_t err;
  MuVsVisionConfig1 vision_config1;
  for (int i = 1; i < kVisionMaxType; ++i) {
    if (vision_type & BIT(i-1)) {
      err = mu_vs_method->Set(kRegVisionId, i);
      if(err) return err;
      err = mu_vs_method->Get(kRegVisionConfig1, &vision_config1.vision_config_reg_value);
      if (err) return err;
      if (vision_config1.output_enable != status) {
        vision_config1.output_enable = status;
        err = mu_vs_method->Set(kRegVisionConfig1,
                                vision_config1.vision_config_reg_value);
        if (err) return err;
      }
    }
  }
  return MU_OK;
}

uint8_t MuVisionSensor::VisionSetDefault(MuVisionType vision_type) {
  mu_err_t err;
  MuVsVisionConfig1 vision_config1;
  for (int i = 1; i < kVisionMaxType; ++i) {
    if (vision_type & BIT(i-1)) {
      err = mu_vs_method->Set(kRegVisionId, i);
      if(err) return err;
      err = mu_vs_method->Get(kRegVisionConfig1, &vision_config1.vision_config_reg_value);
      if (err) return err;
      vision_config1.default_setting = 1;
      err = mu_vs_method->Set(kRegVisionConfig1,
                              vision_config1.vision_config_reg_value);
      if (err) return err;
    }
  }
  return MU_OK;
}

uint8_t MuVisionSensor::VisionSetLevel(MuVisionType vision_type,
                                       MuVsVisionLevel level) {
  mu_err_t err;
  MuVsVisionConfig1 vision_config1;
  for (int i = 1; i < kVisionMaxType; ++i) {
    if (vision_type & BIT(i-1)) {
      err = mu_vs_method->Set(kRegVisionId, i);
      if(err) return err;
      err = mu_vs_method->Get(kRegVisionConfig1, &vision_config1.vision_config_reg_value);
      if (err) return err;
      if (vision_config1.level != level) {
        vision_config1.level = level;
        err = mu_vs_method->Set(kRegVisionConfig1,
                                vision_config1.vision_config_reg_value);
        if (err) return err;
      }
    }
  }
  return MU_OK;
}

bool MuVisionSensor::VisionGetStatus(MuVisionType vision_type) {
  uint8_t vision_status1 = 0;
  mu_vs_method->Get(kRegVisionConfig1, &vision_status1);
  return vision_type&vision_status1;
}

MuVsVisionLevel MuVisionSensor::VisionGetLevel(MuVisionType vision_type) {
  MuVsVisionConfig1 vision_config1;
  for (int i = 1; i < kVisionMaxType; ++i) {
    if (vision_type & BIT(i-1)) {
      mu_vs_method->Set(kRegVisionId, i);
      mu_vs_method->Get(kRegVisionConfig1, &vision_config1.vision_config_reg_value);
      return vision_config1.level;
    }
  }
  return kLevelAuto;
}

MuVsStreamOutputMode MuVisionSensor::VisionGetOutputMode(void) {
  return output_mode_;
}

MuVisionType MuVisionSensor::UpdateResult(MuVisionType vision_type,
                                          bool wait_all_result) {
  switch (mode_) {
    case kSerialMode:
      return UartUpdateResult(vision_type, wait_all_result);
    case kI2CMode: {
      mu_err_t err;
      MuVisionType vision_type_output = 0;
      MuVsVisionState vision_state;
        SensorLockReg(false);     //TODO Patch
      err = mu_vs_method->Get(kRegFrameCount, &vision_state.frame);
      if (err) return vision_type_output;
        //TODO Patch
        if (vision_state.frame == 0) {
          return vision_type_output;
        }
      for (uint8_t i = 1; i < kVisionMaxType; ++i) {
        if ((vision_type & BIT(i-1)) && vision_state_[i-1]) {
          if (vision_state.frame != vision_state_[i-1]->frame) {
            SensorLockReg(true);
            err = ((MuVisionSensorI2C *) mu_vs_method)->Read(
                (MuVsMessageVisionType) i, &vision_state);
            if (err) return vision_type_output;
            SensorLockReg(false);
            *vision_state_[i-1] = vision_state;
            vision_type_output = vision_type_output | BIT(i-1);
          }
        }
      }
      return vision_type_output;
    }
    default:
      return UartUpdateResult(vision_type, wait_all_result);
      break;
  }
}

MuVisionType MuVisionSensor::UartUpdateResult(MuVisionType vision_type,
                                              bool wait_all_result) {
  MuVisionType vision_detect = 0;
  MuVsVisionState vision_state;
  uint8_t mu_address;
  MuVsMessageVisionType mu_vision_type;
  mu_err_t err;
  switch(output_mode_) {
    case kCallBackMode: {
      for (int i = 1; i < kVisionMaxType; ++i) {
        if ((vision_type & BIT(i-1)) && vision_state_[i-1]) {
          ((MuVsUartMethod *)mu_vs_method)->GetMessage((MuVsMessageVisionType)i);
          do {
            err = ((MuVsUartMethod *)mu_vs_method)->Read(&mu_address, &mu_vision_type, &vision_state);
            if (err) return vision_detect;
            if (mu_address == address_
                && (vision_type & BIT(mu_vision_type-1))
                && vision_state_[mu_vision_type-1]->frame != vision_state.frame
                && mu_vision_type
                && mu_vision_type < kVisionMaxType) {
              *vision_state_[mu_vision_type-1] = vision_state;
//              vision_state_[mu_vision_type-1]->detect = vision_state.detect;
//              vision_state_[mu_vision_type-1]->frame = vision_state.frame;
//              for (int i = 0; i < vision_state.detect; i++) {
//                vision_state_[mu_vision_type-1]->vision_result[i] = vision_state.vision_result[i];
//              }
              vision_type = vision_type&(~BIT(mu_vision_type-1));
              vision_detect = vision_detect | BIT(mu_vision_type-1);
              if (mu_vision_type == i && !wait_all_result) return vision_detect;
            }
          } while (mu_address != address_ || mu_vision_type != i);
        }
      }
      break;
    }
    case kDataFlowMode:
    case kEventMode:
      while (vision_type) {
        err = ((MuVsUartMethod *)mu_vs_method)->Read(&mu_address, &mu_vision_type, &vision_state);
        if (err) return vision_detect;
        if (mu_address == address_
            && (vision_type & BIT(mu_vision_type-1))
            && mu_vision_type
            && mu_vision_type < kVisionMaxType
            && vision_state_[mu_vision_type-1]) {
          vision_state_[mu_vision_type-1]->detect = vision_state.detect;
          vision_state_[mu_vision_type-1]->frame = vision_state.frame;
          for (int i = 0; i < vision_state.detect; i++) {
            vision_state_[mu_vision_type-1]->vision_result[i] = vision_state.vision_result[i];
          }
          vision_type = vision_type&(~BIT(mu_vision_type-1));
          vision_detect = vision_detect | BIT(mu_vision_type-1);
          if (!wait_all_result) return vision_detect;
        }
      }
      break;
    default:
      return vision_detect;
  }
  return vision_detect;
}

uint8_t MuVisionSensor::write(MuVisionType vision_type,
                              MuVsObjectInf object_inf,
                              uint8_t value) {
  mu_err_t err;
  MuVsRegAddress address;
  uint8_t vs_type = 1;
  while ((vision_type&0x01) == 0
      && vs_type < kVisionMaxType) {
    ++vs_type;
    vision_type >>= 1;
  }
  switch(object_inf) {
    case kXValue:
      address = kRegParamValue1;
      break;
    case kYValue:
      address = kRegParamValue2;
      break;
    case kWidthValue:
      address = kRegParamValue3;
      break;
    case kHeightValue:
      address = kRegParamValue4;
      break;
    default:
      return MU_ERROR_FAIL;
  }
  err = mu_vs_method->Set(kRegVisionId, vs_type);
  if (err) return err;
  return mu_vs_method->Set(address, value);
}

uint8_t MuVisionSensor::read(MuVisionType vision_type,
                             MuVsObjectInf object_inf,
                             uint8_t result_num) {
  result_num = result_num ? (result_num-1):1;
  result_num = result_num>MU_MAX_RESULT ? MU_MAX_RESULT:result_num;
  uint8_t vision_pointer = 0;
  while ((vision_type&0x01) == 0) {
    vision_type = vision_type>>1;
    vision_pointer++;
  }
  if (!vision_pointer || vision_pointer >= kVisionMaxType) return 0;
  switch(object_inf) {
    case kStatus:
      return vision_state_[vision_pointer]->detect;
    case kXValue:
      return vision_state_[vision_pointer]->vision_result[result_num].x_value;
    case kYValue:
      return vision_state_[vision_pointer]->vision_result[result_num].y_value;
    case kWidthValue:
      return vision_state_[vision_pointer]->vision_result[result_num].width;
    case kHeightValue:
      return vision_state_[vision_pointer]->vision_result[result_num].height;
    case kLabel:
      return vision_state_[vision_pointer]->vision_result[result_num].lable;
    case kChannelGValue:
      return vision_state_[vision_pointer]->vision_result[result_num].color_g_value;
    case kChannelRValue:
      return vision_state_[vision_pointer]->vision_result[result_num].color_r_value;
    case kChannelBValue:
      return vision_state_[vision_pointer]->vision_result[result_num].color_b_value;
    default:
      return 0;
  }
}

//uint8_t MuVisionSensor::SensorSetStatus(MuVsSensorStatus status) {
//  MuVsSensorConfig1 sensor_config1;
//  mu_err_t err;
//  err = mu_vs_method->Get(kRegSensorConfig1, &sensor_config1.sensor_config_reg_value);
//  if (err) return err;
//  if (sensor_config1.status != status) {
//    sensor_config1.status = status;
//    err = mu_vs_method->Set(kRegSensorConfig1, sensor_config1.sensor_config_reg_value);
//    if (err) return err;
//  }
//  return MU_OK;
//}

uint8_t MuVisionSensor::SensorSetRestart(void) {
//  MuVsSensorConfig1 sensor_config1;
  uint8_t reg_restart = 0;
  mu_err_t err;
//  sensor_config1.restart = 1;
  err = mu_vs_method->Set(kRegRestart, 1);
  return err;
}

uint8_t MuVisionSensor::SensorSetDefault(void) {
  MuVsSensorConfig1 sensor_config1;
  mu_err_t err;
  sensor_config1.default_setting = 1;
  err = mu_vs_method->Set(kRegSensorConfig1, sensor_config1.sensor_config_reg_value);
  return err;
}

//uint8_t MuVisionSensor::SensorSaveSetting(void) {
//  MuVsSensorConfig1 sensor_config1;
//  mu_err_t err;
//  err = mu_vs_method->Get(kRegSensorConfig1, &sensor_config1.sensor_config_reg_value);
//  if (err) return err;
//  sensor_config1.save = 1;
//  err = mu_vs_method->Set(kRegSensorConfig1, sensor_config1.sensor_config_reg_value);
//  return err;
//}

//MuVsSensorStatus MuVisionSensor::SensorGetStatus(void) {
//  MuVsSensorConfig1 sensor_config1;
//  mu_vs_method->Get(kRegSensorConfig1, &sensor_config1.sensor_config_reg_value);
//  return sensor_config1.status;
//}

uint8_t MuVisionSensor::SensorLockReg(bool lock) {
  mu_err_t err;
  err = mu_vs_method->Set(kRegLock, lock);
  return err;
//  MuVsSensorConfig1 sensor_config1;
//  mu_err_t err;
//  err = mu_vs_method->Get(kRegSensorConfig1, &sensor_config1.sensor_config_reg_value);
//  if (err) return err;
//  if (sensor_config1.lock != lock) {
//    sensor_config1.lock = lock;
//    err = mu_vs_method->Set(kRegSensorConfig1, sensor_config1.sensor_config_reg_value);
//    if (err) return err;
//  }
//  return MU_OK;
}

//LED functions
uint8_t MuVisionSensor::LedSetMode(MuVsLed led, bool manual, bool hold) {
  MuVsLedConfig led_config;
  MuVsRegAddress address;
  mu_err_t err;
  switch(led) {
    case kLed1:
      address = kRegLed1;
      break;
    case kLed2:
      address = kRegLed2;
      break;
    default:
      return MU_ERROR_FAIL;
  }
  err = mu_vs_method->Get(address, &led_config.led_reg_value);
  if (err) return err;
  if (led_config.manual != manual
      || led_config.hold != hold) {
    led_config.manual = manual;
    led_config.hold = hold;
    err = mu_vs_method->Set(address, led_config.led_reg_value);
    if (err) return err;
  }

  return err;
}

uint8_t MuVisionSensor::LedSetLevel(uint8_t led1_level,
                                    uint8_t led2_level) {
  MuVsLedConfig led_config;
  MuVsRegAddress address;
  mu_err_t err;
  uint8_t value = (led1_level&0x0F)|(led2_level<<4);
  return mu_vs_method->Set(kRegLedLevel, value);
}

uint8_t MuVisionSensor::LedSetColor(MuVsLed led,
                    MuVsLedColor detected_color,
                    MuVsLedColor undetected_color) {
  MuVsLedConfig led_config;
  MuVsRegAddress address;
  mu_err_t err;
  switch(led) {
    case kLed1:
      address = kRegLed1;
      break;
    case kLed2:
      address = kRegLed2;
      break;
    default:
      return MU_ERROR_FAIL;
  }
  err = mu_vs_method->Get(address, &led_config.led_reg_value);
  if (err) return err;
  if (led_config.detected_color != detected_color
      || led_config.undetected_color != undetected_color) {
    led_config.detected_color = detected_color;
    led_config.undetected_color = undetected_color;
    err = mu_vs_method->Set(address, led_config.led_reg_value);
    if (err) return err;
  }

  return err;
}

//Camera functions
uint8_t MuVisionSensor::CameraSetZoom(MuVsCameraZoom zoom) {
  MuVsCameraConfig1 camera_config1;
  mu_err_t err;
  err = mu_vs_method->Get(kRegCameraConfig1, &camera_config1.camera_reg_value);
  if (camera_config1.zoom != zoom) {
    camera_config1.zoom = zoom;
    err = mu_vs_method->Set(kRegCameraConfig1, camera_config1.camera_reg_value);
  }
  return err;
}

uint8_t MuVisionSensor::CameraSetRotateState(bool enable) {
  MuVsCameraConfig1 camera_config1;
  mu_err_t err;
  err = mu_vs_method->Get(kRegCameraConfig1, &camera_config1.camera_reg_value);
  if (camera_config1.rotate != enable) {
    camera_config1.rotate = enable;
    err = mu_vs_method->Set(kRegCameraConfig1, camera_config1.camera_reg_value);
  }
  return err;
}

uint8_t MuVisionSensor::CameraSetFPS(MuVsCameraFPS fps) {
  MuVsCameraConfig1 camera_config1;
  mu_err_t err;
  err = mu_vs_method->Get(kRegCameraConfig1, &camera_config1.camera_reg_value);
  if (camera_config1.fps != fps) {
    camera_config1.fps = fps;
    err = mu_vs_method->Set(kRegCameraConfig1, camera_config1.camera_reg_value);
  }
  return err;
}

uint8_t MuVisionSensor::CameraSetAwb(MuVsCameraWhiteBalance awb) {
  MuVsCameraConfig1 camera_config1;
  mu_err_t err;
  err = mu_vs_method->Get(kRegCameraConfig1, &camera_config1.camera_reg_value);
  if (camera_config1.white_balance != awb) {
    camera_config1.white_balance = awb;
    err = mu_vs_method->Set(kRegCameraConfig1, camera_config1.camera_reg_value);
  }
  return err;
}

MuVsCameraZoom MuVisionSensor::CameraGetZoom(void) {
  MuVsCameraConfig1 camera_config1;
  mu_vs_method->Get(kRegCameraConfig1, &camera_config1.camera_reg_value);
  return camera_config1.zoom;
}

MuVsCameraWhiteBalance MuVisionSensor::CameraGetAwb(void) {
  MuVsCameraConfig1 camera_config1;
  mu_vs_method->Get(kRegCameraConfig1, &camera_config1.camera_reg_value);
  return camera_config1.white_balance;
}

bool MuVisionSensor::CameraGetRotateState(void) {
  MuVsCameraConfig1 camera_config1;
  mu_vs_method->Get(kRegCameraConfig1, &camera_config1.camera_reg_value);
  return camera_config1.rotate;
}

MuVsCameraFPS MuVisionSensor::CameraGetFPS(void) {
  MuVsCameraConfig1 camera_config1;
  mu_vs_method->Get(kRegCameraConfig1, &camera_config1.camera_reg_value);
  return camera_config1.fps;
}

//Uart functions
uint8_t MuVisionSensor::UartSetBaudrate(MuVsBaudrate baud) {
  mu_err_t err;
  MuVsUartConfig uart_config;
  err = mu_vs_method->Get(kRegUart, &uart_config.uart_reg_value);
  if (uart_config.baudrate != baud) {
    uart_config.baudrate = baud;
    mu_vs_method->Set(kRegUart, uart_config.uart_reg_value);
  }
  return err;
}

//bool MuVisionSensor::CheckVisionOutputMode(MuVsMessageVisionType vision_type) {
//  MuVsVisionConfig1 vision_state;
//  switch (output_mode[vision_type-1]) {
//    case kCallBackMode:
//      mu_vs_method->Set(kRegVisionId, vision_type);
//      mu_vs_method->Get(kRegVisionConfig1,
//                        &vision_state.vision_config_reg_value);
//      vision_state.output_enable = 1;
//      mu_vs_method->Set(kRegVisionConfig1,
//                        vision_state.vision_config_reg_value);
//      break;
//    case kEventMode:
//    case kDataFlowMode:
//      break;
//    default:
//      mu_vs_method->Set(kRegVisionId, vision_type);
//      mu_vs_method->Get(kRegVisionConfig1,
//                        &vision_state.vision_config_reg_value);
//      output_mode[vision_type-1] = vision_state.output_mode;
//      return false;
//  }
//  return true;
//}

bool MuVisionSensor::malloc_vision_buffer(MuVsMessageVisionType vision_type) {
  if (vision_type
      && vision_type < kVisionMaxType
      && vision_state_[vision_type-1] == nullptr) {
    vision_state_[vision_type-1] = new MuVsVisionState;
    vision_state_[vision_type-1]->detect = 0;
    vision_state_[vision_type-1]->frame = 0;
  }
  return true;
}

bool MuVisionSensor::free_vision_buffer(MuVsMessageVisionType vision_type) {
  if (vision_type
      && vision_type < kVisionMaxType
      && vision_state_[vision_type-1]) {
    vision_state_[vision_type-1] = new MuVsVisionState;
  }
  return true;
}



