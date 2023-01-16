// Copyright 2018 Morpx Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#ifndef MUVISIONSENSOR_SRC_MUVISIONSENSOR_H_
#define MUVISIONSENSOR_SRC_MUVISIONSENSOR_H_

#include "mu_vision_sensor_interface.h"

class MuVisionSensor {
 public:
  MuVisionSensor(uint32_t address);
  virtual ~MuVisionSensor();
  MuVisionSensor(const MuVisionSensor&) = delete;
  MuVisionSensor& operator=(const MuVisionSensor &) = delete;

  // Advance Method
  uint8_t begin(void* communication_port,
                MuVsMode mode);
  MuVisionType UpdateResult(MuVisionType vision_type,
                            bool wait_all_result = true);
  uint8_t write(MuVisionType, MuVsObjectInf, uint8_t value);
  uint8_t read(MuVisionType vision_type,
               MuVsObjectInf object_inf,
               uint8_t result_num = 1);

  // Based interface
  uint8_t VisionBegin(MuVisionType);
  uint8_t VisionEnd(MuVisionType);
  int GetValue(MuVisionType vision_type,
               MuVsObjectInf object_inf);

  // Sensor functions
  uint8_t SensorSetRestart(void);
  uint8_t SensorSetDefault(void);

  // LED functions
  uint8_t LedSetMode(MuVsLed led, bool manual, bool hold);
  uint8_t LedSetLevel(uint8_t led1_level,
                      uint8_t led2_level);
  uint8_t LedSetColor(MuVsLed led,
                      MuVsLedColor detected_color,
                      MuVsLedColor undetected_color);

  // Camera functions
  uint8_t CameraSetZoom(MuVsCameraZoom);
  uint8_t CameraSetRotateState(bool enable);
  uint8_t CameraSetFPS(MuVsCameraFPS);
  uint8_t CameraSetAwb(MuVsCameraWhiteBalance);
  MuVsCameraZoom CameraGetZoom(void);
  MuVsCameraWhiteBalance CameraGetAwb(void);
  bool CameraGetRotateState(void);
  MuVsCameraFPS CameraGetFPS(void);

  // Uart functions
  uint8_t UartSetBaudrate(MuVsBaudrate);

  // Vision functions
  uint8_t VisionSetStatus(MuVisionType vision_type, bool enable);
  uint8_t VisionSetOutputMode(MuVsStreamOutputMode mode);
  uint8_t VisionSetOutputEnable(MuVisionType vision_type, bool status);
  uint8_t VisionSetDefault(MuVisionType vision_type);
  uint8_t VisionSetLevel(MuVisionType vision_type,
                         MuVsVisionLevel level);
  bool VisionGetStatus(MuVisionType vision_type);
  MuVsVisionLevel VisionGetLevel(MuVisionType vision_type);
  MuVsStreamOutputMode VisionGetOutputMode(void);

 private:
  uint8_t SensorLockReg(bool lock);
  MuVisionType UartUpdateResult(MuVisionType vision_type, bool wait_all_result);
  bool malloc_vision_buffer(MuVsMessageVisionType);
  bool free_vision_buffer(MuVsMessageVisionType);

  uint8_t address_ = 0;
  MuVsMode mode_ = kSerialMode;
  MuVsMethod* mu_vs_method = nullptr;
  MuVsStreamOutputMode output_mode_ = kCallBackMode;
  MuVsVisionState *vision_state_[kVisionMaxType-1] = {nullptr};
//  MuVsStreamOutputMode output_mode[kVisionMaxType-1];
};


#endif /* ARDUINO_LIB_MUVISIONSENSOR_SRC_MUVISIONSENSOR_H_ */
