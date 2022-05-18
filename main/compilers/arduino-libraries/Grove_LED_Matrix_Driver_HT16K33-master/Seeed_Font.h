/*
    Seeed_Font.h
    A font library for Grove - Grove - LED Matrix Driver(HT16K33 with 8x8 LED Matrix)

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

// start at ascii 32(dec), for example, '0' = ASCII[48-32]
const uint64_t ASCII[] = {
    0x0000000000000000,     // space
    0x180018183c3c1800,     // !
    0x00000000286c6c00,     // "
    0x6c6cfe6cfe6c6c00,     // #
    0x103c403804781000,     // $
    0x60660c1830660600,     // %
    0xfc66a6143c663c00,     // &
    0x0000000c18181800,     // '
    0x6030181818306000,     // (
    0x060c1818180c0600,     // )
    0x006c38fe386c0000,     // *
    0x0010107c10100000,     // +
    0x060c0c0c00000000,     // ,
    0x0000003c00000000,     // -
    0x0606000000000000,     // .
    0x00060c1830600000,     // /
    0x1c2222222222221c,     // 0
    0x1c08080808080c08,     // 1
    0x3e0408102020221c,     // 2
    0x1c2220201820221c,     // 3
    0x20203e2224283020,     // 4
    0x1c2220201e02023e,     // 5
    0x1c2222221e02221c,     // 6
    0x040404081020203e,     // 7
    0x1c2222221c22221c,     // 8
    0x1c22203c2222221c,     // 9
    0x0018180018180000,     // :
    0x0c18180018180000,     // ;
    0x6030180c18306000,     // <
    0x00003c003c000000,     // =
    0x060c1830180c0600,     // >
    0x1800183860663c00,     // ?
    0x003c421a3a221c00,     // @
    0x0033333f33331e0c,     // A
    0x003f66663e66663f,     // B
    0x003c66030303663c,     // C
    0x001f36666666361f,     // D
    0x007f46161e16467f,     // E
    0x000f06161e16467f,     // F
    0x007c66730303663c,     // G
    0x003333333f333333,     // H
    0x001e0c0c0c0c0c1e,     // I
    0x001e333330303078,     // J
    0x006766361e366667,     // K
    0x007f66460606060f,     // L
    0x0063636b7f7f7763,     // M
    0x006363737b6f6763,     // N
    0x001c36636363361c,     // O
    0x000f06063e66663f,     // P
    0x00381e3b3333331e,     // Q
    0x006766363e66663f,     // R
    0x001e33380e07331e,     // S
    0x001e0c0c0c0c2d3f,     // T
    0x003f333333333333,     // U
    0x000c1e3333333333,     // V
    0x0063777f6b636363,     // W
    0x0063361c1c366363,     // X
    0x001e0c0c1e333333,     // Y
    0x007f664c1831637f,     // Z
    0x7818181818187800,     // [
    0x006030180c060000,     // '\'
    0x1e18181818181e00,     // ]
    0x0000008244281000,     // ^
    0x7e00000000000000,     // _
    0x0000000060303000,     // `
    0x006e333e301e0000,     // a
    0x003b66663e060607,     // b
    0x001e3303331e0000,     // c
    0x006e33333e303038,     // d
    0x001e033f331e0000,     // e
    0x000f06060f06361c,     // f
    0x1f303e33336e0000,     // g
    0x006766666e360607,     // h
    0x001e0c0c0c0e000c,     // i
    0x1e33333030300030,     // j
    0x0067361e36660607,     // k
    0x001e0c0c0c0c0c0e,     // l
    0x00636b7f7f330000,     // m
    0x00333333331f0000,     // n
    0x001e3333331e0000,     // o
    0x0f063e66663b0000,     // p
    0x78303e33336e0000,     // q
    0x000f06666e3b0000,     // r
    0x001f301e033e0000,     // s
    0x00182c0c0c3e0c08,     // t
    0x006e333333330000,     // u
    0x000c1e3333330000,     // v
    0x00367f7f6b630000,     // w
    0x0063361c36630000,     // x
    0x1f303e3333330000,     // y
    0x003f260c193f0000,     // z
    0x7018180c18187000,     // {
    0x0008080808080800,     // |
    0x0e18183018180e00,     // }
    0x000000365c000000      // ~
};

const uint64_t ICONS[] = {
    0xffffffffffffffff,     // 0  full screen
    0x383838fe7c381000,     // 1  arrow_up
    0x10387cfe38383800,     // 2  arrow_down
    0x10307efe7e301000,     // 3  arrow_right
    0x1018fcfefc181000,     // 4  arrow_left
    0xfefe7c7c38381000,     // 5  triangle_up
    0x1038387c7cfefe00,     // 6  triangle_down
    0x061e7efe7e1e0600,     // 7  triangle_right
    0xc0f0fcfefcf0c000,     // 8  triangel_left
    0x7c92aa82aa827c00,     // 9  smile_face_1
    0x003c420000660000,     // 10 smile_face_2
    0x10387cfefeee4400,     // 11 hearts
    0x10387cfe7c381000,     // 12 diamonds
    0x381054fe54381000,     // 13 clubs
    0x38107cfe7c381000,     // 14 spades
    0x00387c7c7c380000,     // 15 circle1
    0xffc7838383c7ffff,     // 16 circle2
    0x0038444444380000,     // 17 circle3
    0xffc7bbbbbbc7ffff,     // 18 circle4
    0x0c12129ca0c0f000,     // 19 man
    0x38444438107c1000,     // 20 woman
    0x060e0c0808281800,     // 21 musical_note_1
    0x066eecc88898f000,     // 22 musical_note_2
    0x105438ee38541000,     // 23 snow
    0x1038541054381000,     // 24 up_down
    0x6666006666666600,     // 25 double_!
    0x002844fe44280000,     // 26 left_right
    0xfe8282c66c381000,     // 27 house
    0x002400e7a5bde700      // 28 glasses
};

const uint64_t BARS[] = {
    0x0000000000000000,
    0x1800000000000000,
    0x3c00000000000000,
    0x7e00000000000000,
    0xff00000000000000,
    0xff18000000000000,
    0xff3c000000000000,
    0xff7e000000000000,
    0xffff000000000000,
    0xffff180000000000,
    0xffff3c0000000000,
    0xffff7e0000000000,
    0xffffff0000000000,
    0xffffff1800000000,
    0xffffff3c00000000,
    0xffffff7e00000000,
    0xffffffff00000000,
    0xffffffff18000000,
    0xffffffff3c000000,
    0xffffffff7e000000,
    0xffffffffff000000,
    0xffffffffff180000,
    0xffffffffff3c0000,
    0xffffffffff7e0000,
    0xffffffffffff0000,
    0xffffffffffff1800,
    0xffffffffffff3c00,
    0xffffffffffff7e00,
    0xffffffffffffff00,
    0xffffffffffffff18,
    0xffffffffffffff3c,
    0xffffffffffffff7e,
    0xffffffffffffffff
};
