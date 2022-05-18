/*
    Grove_LED_Matrix_Driver_HT16K33.cpp
    A library for Grove - Grove - LED Matrix Driver(HT16K33 with 8x8 LED Matrix)

    Copyright (c) 2018 seeed technology inc.
    Website    : www.seeed.cc
    Author     : Jerry Yip
    Create Time: 2018-06
    Version    : 0.1
    Change Log :

    The MIT License (MIT)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

#include "Grove_LED_Matrix_Driver_HT16K33.h"
#include "Seeed_Font.h"


HT16K33::HT16K33() {
}

void HT16K33::init(uint8_t addr) {
    _addr = addr;
    // turn on oscillator
    I2Cdev::writeBytes(_addr, 0x21, 0, (uint8_t*)NULL);
}

void HT16K33::setBrightness(uint8_t brightness) {
    I2Cdev::writeBytes(_addr, (0xE0 | brightness), 0, (uint8_t*)NULL);
}


void HT16K33::setBlinkRate(blink_type_t blink_type) {
    I2Cdev::writeBytes(_addr, (0x80 | 0x01 | (blink_type << 1)), 0, (uint8_t*)NULL);
}

Matrix_8x8::Matrix_8x8() {
    _orientation = DISPLAY_ROTATE_0;
    _offset_x = 0;
    _offset_y = 0;
    _cursor_start = 0;
    _cursor_end = 0;
    _cursor_steps = 1;
    _ms = 100;
}

void Matrix_8x8::setDisplayOffset(int8_t x, int8_t y) {
    if ((x < -8) || (x > 8)) {
        return;
    }
    if ((y < -8) || (y > 8)) {
        return;
    }
    _offset_x = x;
    _offset_y = y;
}

void Matrix_8x8::setDisplayOrientation(uint8_t orientation) {
    _orientation = (orientation_type_t)orientation;
}

// _cursor_end - _cursor_start >= 1
void Matrix_8x8::display() {
    // get data from _big_buffer[] and write to HT16K33
    uint8_t line;

    if (_cursor_start > _cursor_end) {
        uint16_t t;
        t = _cursor_start;
        _cursor_start = _cursor_end;
        _cursor_end = t;
    }

    for (int32_t i = _cursor_start; i <= _cursor_end; i = i + _cursor_steps) {
        for (uint8_t j = 0; j < 8; j++) {
            // test
            line = _big_buffer[(MAX_BIG_BUFFER_SIZE - 8 - i) + j];
            for (uint8_t k = 0; k < 8; k++) {
                if (line & 0x01) {
                    // set 1
                    _buffer[2 * j] |= (1 << k);
                } else {
                    // set 0
                    _buffer[2 * j] &= ~(1 << k);
                }
                line = line >> 1;
            }
        }
        // offset
        if (_offset_y > 0) {
            for (uint8_t i = 0; i < 8; i++) {
                _buffer[2 * i] = (_buffer[2 * i] >> _offset_y);
            }
        } else if (_offset_y < 0) {
            for (uint8_t i = 0; i < 8; i++) {
                _buffer[2 * i] = (_buffer[2 * i] << (-_offset_y));
            }
        }
        if (_offset_x > 0) {
            for (int8_t i = (7 - _offset_x); i >= 0; i--) {
                _buffer[2 * (i + _offset_x)] = _buffer[2 * i];
            }
            for (uint8_t i = 0; i < _offset_x; i++) {
                _buffer[2 * i] = 0;
            }
        } else if (_offset_x < 0) {
            for (uint8_t i = (-_offset_x); i < 8; i++) {
                _buffer[2 * (i + _offset_x)] = _buffer[2 * i];
            }

            for (uint8_t i = (8 + _offset_x); i < 8; i++) {
                _buffer[2 * i] = 0;
            }
        }


        I2Cdev::writeBytes(_addr, 0x00, 16, _buffer);
        delay(_ms);
    }
}

void Matrix_8x8::clear() {
    memset(_big_buffer, 0, MAX_BIG_BUFFER_SIZE);
}

void Matrix_8x8::writePixel(uint8_t x, uint16_t y, bool set_on) {
    if (x > 7) {
        x = 7;
    }
    if (y > (MAX_BIG_BUFFER_SIZE - 1)) {
        y = MAX_BIG_BUFFER_SIZE - 1;
    }

    uint8_t y_mod8 = y % 8;
    // first do spin
    switch (_orientation) {
        case DISPLAY_ROTATE_0: {
                uint8_t t;
                t = x;
                x = y_mod8;
                y_mod8 = t;
                x = 7 - x;
            }
            break;

        // case DISPLAY_ROTATE_90:
        // break;

        case DISPLAY_ROTATE_180: {
                uint8_t t;
                t = x;
                x = y_mod8;
                y_mod8 = t;
                y_mod8 = 7 - y_mod8;
            }
            break;

        case DISPLAY_ROTATE_270:
            y_mod8 = 7 - y_mod8;
            x = 7 - x;
            break;
    }

    if (set_on) {
        _big_buffer[((MAX_BIG_BUFFER_SIZE / 8 - 1) - (y / 8)) * 8 + y_mod8] |= (1 << x);
    } else {
        _big_buffer[((MAX_BIG_BUFFER_SIZE / 8 - 1) - (y / 8)) * 8 + y_mod8] &= ~(1 << x);
    }

}

void Matrix_8x8::writeBar(uint8_t bar) {
    if (bar > 32) {
        bar = 32;
    }
    Matrix_8x8::writeOnePicture(BARS[bar]);
}
void Matrix_8x8::writeIcon(uint8_t num) {
    if (num > 28) {
        num = 28;
    }
    Matrix_8x8::writeOnePicture(ICONS[num]);
}

void Matrix_8x8::writeNumber(int32_t number, uint16_t ms_per_digit) {
    Matrix_8x8::writeString(String(number), ms_per_digit, ACTION_SCROLLING);
}
void Matrix_8x8::writeString(String s, uint16_t ms_per_letter, action_type_t mode) {
    uint8_t pic_number = s.length();
    if (pic_number > (MAX_BIG_BUFFER_SIZE / 8)) {
        pic_number = MAX_BIG_BUFFER_SIZE / 8;
    }
    if (pic_number == 0) {
        return;
    }


    const char* p_string = s.c_str();
    _cursor_start = 0;
    if (mode == ACTION_SCROLLING) {
        _cursor_steps = 1;

        if (pic_number == 1) {
            _cursor_end = 0;
            _ms = ms_per_letter;
        } else {
            _cursor_end = pic_number * 8;
            _ms = ms_per_letter / 8;
        }
    } else {
        if (pic_number == 1) {
            _cursor_end = 0;
        } else {
            _cursor_end = pic_number * 8 - 1;
        }
        _cursor_steps = 8;
        _ms = ms_per_letter;
    }

    uint64_t frame;
    uint8_t line;

    memset(_big_buffer, 0, MAX_BIG_BUFFER_SIZE);

    for (uint8_t m = 0; m < pic_number; m++) {
        frame = ASCII[p_string[m] - 32];
        for (uint8_t i = 0; i < 8; i++) {
            line = (uint8_t)(frame & 0xff);
            for (uint8_t j = 7; j != 255; j--) {
                if (line & 0x01) {
                    Matrix_8x8::writePixel(j, i + m * 8);
                }
                line = line >> 1;
            }
            frame = frame >> 8;
        }
    }
}

void Matrix_8x8::writeOnePicture(const uint8_t *pic) {
    Matrix_8x8::writePictures(pic, 1, 0, ACTION_SHIFT);
}

// uint64_t pic
void Matrix_8x8::writeOnePicture(uint64_t pic) {
    Matrix_8x8::writePictures((uint64_t*)&pic, 1, 0, ACTION_SHIFT);
}

void Matrix_8x8::writePictures(const uint8_t *pic, uint8_t pic_number, uint16_t ms_per_pic, action_type_t mode) {
    if (pic_number > (MAX_BIG_BUFFER_SIZE / 8)) {
        pic_number = MAX_BIG_BUFFER_SIZE / 8;
    }
    if (pic_number == 0) {
        return;
    }
    _cursor_start = 0;
    if (mode == ACTION_SCROLLING) {
        _cursor_steps = 1;
        _ms = ms_per_pic / 8;
        _cursor_end = pic_number * 8;
    } else {
        _cursor_end = pic_number * 8 - 1;
        _cursor_steps = 8;
        _ms = ms_per_pic;
    }

    uint8_t line;

    memset(_big_buffer, 0, MAX_BIG_BUFFER_SIZE);

    for (uint8_t i = 0; i < (8 * pic_number); i++) {
        line = pic[i];
        for (uint8_t j = 0; j < 8; j++) {
            if (line & 0x01) {
                Matrix_8x8::writePixel(j, i);
            }
            line = line >> 1;
        }
    }
}

void Matrix_8x8::writePictures(const uint64_t *pic, uint8_t pic_number, uint16_t ms_per_pic, action_type_t mode) {
    if (pic_number > (MAX_BIG_BUFFER_SIZE / 8)) {
        pic_number = MAX_BIG_BUFFER_SIZE / 8;
    }
    if (pic_number == 0) {
        return;
    }
    _cursor_start = 0;
    if (mode == ACTION_SCROLLING) {
        _cursor_steps = 1;
        _ms = ms_per_pic / 8;
        _cursor_end = pic_number * 8;
    } else {
        _cursor_end = pic_number * 8 - 1;
        _cursor_steps = 8;
        _ms = ms_per_pic;
    }

    uint64_t frame;
    uint8_t line;

    memset(_big_buffer, 0, MAX_BIG_BUFFER_SIZE);

    for (uint8_t m = 0; m < pic_number; m++) {
        frame = pic[m];
        for (uint8_t i = 0; i < 8; i++) {
            line = (uint8_t)(frame & 0xff);
            for (uint8_t j = 7; j != 255; j--) {
                if (line & 0x01) {
                    Matrix_8x8::writePixel(j, i + m * 8);
                }
                line = line >> 1;
            }
            frame = frame >> 8;
        }
    }
}