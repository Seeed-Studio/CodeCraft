import React from 'react';
import classNames from 'classnames';

import styles from './device-view-more.css';

import { FormattedMessage, injectIntl } from 'react-intl';

import ModalComponent from '../../containers/modal.jsx';

import Button from '../button-special/button.jsx';

import names from '../../lib/libraries/devices/control-special-names.jsx';

import grovezeroIcon from '../../lib/libraries/devices/grove-zero.svg';
import grovearduinoIcon from '../../lib/libraries/devices/grove-arduino.svg';
import microbitIcon from '../../lib/libraries/devices/microbit.svg';
import maixduino from '../../lib/libraries/devices/maixduino.svg'
import grovejointIcon from '../../lib/libraries/devices/grove-joint.svg';
import mPythonIcon from '../../lib/libraries/devices/icon-mpython.svg';
import poweringIcon from '../../lib/libraries/devices/powering.svg';
import opencatIcon from '../../lib/libraries/devices/opencat.svg';
import wioTerminalIcon from '../../lib/libraries/devices/wio-terminal.svg';


import helpDocIcon from './help-doc.svg';

const deviceIcon = (deviceType) => {
  switch (deviceType) {
    case 1000:
    case 1001:
      return grovezeroIcon;
    case 1002:
      return grovearduinoIcon;
    case 1004:
      return microbitIcon;
    case 1005:
      return maixduino;
    case 1006:
      return grovejointIcon;
    case 1007:
      return mPythonIcon;
    case 1008:
      return poweringIcon;
    case 1009:
      return opencatIcon;
    case 1010:
      return wioTerminalIcon;
    default:
      return grovezeroIcon;
  }
}

const DeviceViewMoreModal = (props) => {

  const {
    intl: {
      locale = 'en'
    },
    onOpenUrl,
    deviceType,
    onRequestClose
  } = props;

  const groveZeroDescription = (
    <FormattedMessage
      defaultMessage="Grove Zero is a line of programmable electronic building blocks that combine easy magnetic connections with graphical programming software to implement functional and basic designs. Grove Zero is a great tool both for developing a child's creativity and for teaching STEM concepts."
      description=""
      id="gui.deviceInfo.groveZero.description"
    />
  );

  const microbitDescription = (
    <FormattedMessage
      defaultMessage="BBC micro:bit is a programmable micro-computer that can fit in the palm of your hand. It offers endless possibilities for implementing a wide range of creative ideas, ranging from robots to musical instruments.To learn more about the micro:bit,visit the official website: https://microbit.org"
      description=""
      id="gui.deviceInfo.microbit.description"
    />
  );

  const cyberEyeDescription = (
    <FormattedMessage
      defaultMessage="Make A Robot Kit, also known as “M.A.R.K.” is a versatile intelligent car designed for learning about Artificial Intelligence. Using the AI controller which comes with MARK, a child can implement track identification, traffic sign identification, and other AI features to put together a self-driving car."
      description=""
      id="gui.deviceInfo.cyberEye.description"
    />
  );

  const glintDescription = (
    <FormattedMessage
      defaultMessage="GLINT is a beginner’s wearable versatile product for kids to do programming with an elegant appearance. Its lightweight interactive interface consists of 12 programmable RGB LEDs, a Push Button and build-in accelerometer,  extremely reduces kids’ psychological threshold to accept programming teaching aids. Since the product is easy to use, both the product experience and diversified interaction methods allow kids to learn and play simultaneously, so as to enable them to fully display their programming creativity."
      description=""
      id="gui.deviceInfo.glint.description"
    />
  );

  const arduinoDescription = (
    <FormattedMessage
      defaultMessage="Codecraft currently supports classic Arduino development boards, such as Arduino Uno, as well as improved compatible versions based on Arduino, such as: Seeeduino V4.2, Seeeduino Mega, Seeeduino Lotus V1.1, etc. At the same time, it has also widely supported the well-known Grove series sensor modules in the Arduino ecosystem."
      description=""
      id="gui.deviceInfo.arduino.description"
    />
  );

  const groveJointDescription = (
    <FormattedMessage
      defaultMessage="Grove-Joint has many similarities with Seeeduino Lotus. This is a miniature ATMEGA328 microcontroller development board. It uses Atmel ATMEGA328P-MU and CH340 chips. You can use it to match the Grove module to make interesting applications conveniently and quickly."
      description=""
      id="gui.deviceInfo.groveJoint.description"
    />
  );

  const noDescription = (
    <FormattedMessage
      defaultMessage="No introduction"
      description=""
      id="gui.deviceInfo.noDescriptionText"
    />
  );

  const deviceDescription = (deviceType) => {
    if (1001 == deviceType) {
      return groveZeroDescription;
    }
    if (1002 == deviceType) {
      return arduinoDescription;
    }
    if (1005 == deviceType) {
      return cyberEyeDescription;
    }
    if (1004 == deviceType) {
      return microbitDescription;
    }
    if (1006 == deviceType) {
      return groveJointDescription;
    }
    if (1008 == deviceType) {
      return glintDescription;
    }
    if (1010 == deviceType) {
      return arduinoDescription;
    }
    return noDescription;
  }

  const helpDocLink = (deviceType, locale) => {
    if (1001 == deviceType && 'zh-cn' == locale) {
      return 'https://www.yuque.com/tinkergen-help-cn/grovezero?language=zh-cn';
    }
    // if (1001 == deviceType && 'zh-cn' != locale) {
    //   return 'https://www.yuque.com/tinkergen-help-en/grovezero?language=en-us';
    // }
    if (1002 == deviceType && 'zh-cn' == locale) {
      return 'https://www.yuque.com/tinkergen-help-cn/codecraft/arduino?language=zh-cn';
    }
    if (1002 == deviceType && 'zh-cn' != locale) {
      return 'https://www.yuque.com/tinkergen-help-en/codecraft/arduino?language=en-us';
    }
    // if (1004 == deviceType && 'zh-cn' == locale) {
    //   return 'https://www.yuque.com/tinkergen-help-cn/microbit?language=zh-cn';
    // }
    // if (1004 == deviceType && 'zh-cn' != locale) {
    //   return 'https://www.yuque.com/tinkergen-help-en/microbit?language=en-us';
    // }
    if (1005 == deviceType && 'zh-cn' == locale) {
      return 'https://www.yuque.com/tinkergen-help-cn/mark?language=zh-cn';
    }
    if (1005 == deviceType && 'zh-cn' != locale) {
      return 'https://www.yuque.com/tinkergen-help-en/mark?language=en-us';
    }
    if (1006 == deviceType && 'zh-cn' == locale) {
      return 'https://www.yuque.com/tinkergen-help-cn/codecraft/grove_joint?language=zh-cn';
    }
    if (1006 == deviceType && 'zh-cn' != locale) {
      return 'https://www.yuque.com/tinkergen-help-en/codecraft/grove_joint?language=en-us';
    }
    if (1008 == deviceType && 'zh-cn' == locale) {
      return 'https://www.yuque.com/tinkergen-help-cn/glint?language=zh-cn';
    }
    if (1008 == deviceType && 'zh-cn' != locale) {
      return 'https://www.yuque.com/tinkergen-help-en/glint?language=en-us';
    }
    // if (1009 == deviceType && 'zh-cn' == locale) {
    //   return 'https://www.yuque.com/tinkergen-help-cn/bittle?language=zh-cn';
    // }
    // if (1009 == deviceType && 'zh-cn' != locale) {
    //   return 'https://www.yuque.com/tinkergen-help-en/bittle?language=en-us';
    // }
    return null;
  }

  const buyGoodsLink = (deviceType, locale) => {
    if (1001 == deviceType && 'zh-cn' == locale) {
      return 'https://shop559494460.taobao.com/category-1480745905.htm?spm=a1z10.1-c-s.w5002-22043094341.3.4daba054n5q4Tp&search=y&catName=Grove+Zero';
    }
    if (1001 == deviceType && 'zh-cn' != locale) {
      return 'https://shop.tinkergen.com/grove-zero.html?p=1l';
    }
    if (1004 == deviceType && 'zh-cn' == locale) {
      return 'https://shop559494460.taobao.com/index.htm?spm=a1z10.5-c-s.w5002-22043094341.2.81a05b60H9jFVN';
    }
    if (1004 == deviceType && 'zh-cn' != locale) {
      return 'https://shop.tinkergen.com/micro-bit.html';
    }
    if (1008 == deviceType && 'zh-cn' == locale) {
      return 'https://item.taobao.com/item.htm?spm=a2oq0.12575281.0.0.16c11debMYinWj&ft=t&id=618794816261';
    }
    if (1008 == deviceType && 'zh-cn' != locale) {
      return 'https://shop.tinkergen.com/glint.html';
    }
    return null;
  }

  const helpDoc = (
    <FormattedMessage
      defaultMessage="See Documentation"
      description=""
      id="gui.deviceInfo.helpDoc"
    />
  );

  const btnBuy = (
    <FormattedMessage
      defaultMessage="SHOP NOW"
      description=""
      id="gui.deviceInfo.buy"
    />
  );

  const logo = deviceIcon(deviceType);
  const deviceName = names[deviceType].name;
  const description = deviceDescription(deviceType);

  const docLink = helpDocLink(deviceType, locale);
  const goodsLink = buyGoodsLink(deviceType, locale);
  const canBuy = !!goodsLink;

  return (
    <ModalComponent
      id='view-more'
      contentLabel='view-more'
      isOpen={true}
      visiableTitle={false}
      className={styles.viewMoreContent}
      showClose={true}
      onRequestClose={onRequestClose}
    >
      <div className={styles.viewMoreHeader}>
        {
          docLink &&
          <div className={styles.viewMoreLeft}>
            <img src={helpDocIcon} />
            <div className={styles.docLinkText} onClick={() => onOpenUrl(docLink)}>{helpDoc}</div>
          </div>
        }
      </div>
      <div className={styles.viewMoreTitle}>
        {deviceName}
      </div>
      <div className={styles.viewMoreLogo}>
        <img src={logo} />
      </div>

      <div className={styles.viewMoreDes}>
        <div className={styles.viewMoreDesContent}>
          {description}
        </div>
      </div>
      <div className={styles.viewMoreButtons}>
        <Button
          className={styles.viewMoreButton}
          disabled={!canBuy}
          onClick={() => onOpenUrl(goodsLink)}>
          {btnBuy}
        </Button>
      </div>
    </ModalComponent>
  );

}

export default injectIntl(DeviceViewMoreModal);