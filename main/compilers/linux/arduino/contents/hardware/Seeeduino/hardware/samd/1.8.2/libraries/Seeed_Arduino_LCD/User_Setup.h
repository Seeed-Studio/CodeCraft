//                            USER DEFINED SETTINGS
//   Set driver type, fonts to be loaded, pins used and SPI control method etc
//
//   See the User_Setup_Select.h file if you wish to be able to define multiple
//   setups and then easily select which setup file is used by the compiler.
//
//   If this file is edited correctly then all the library example sketches should
//   run without the need to make any more changes for a particular hardware setup!
//   Note that some sketches are designed for a particular TFT pixel width/height


// ##################################################################################
//
// Section 1. Call up the right driver file and any options for it
//
// ##################################################################################

// Only define one driver, the other ones must be commented out
#define ILI9341_DRIVER
//#define ST7735_DRIVER      // Define additional parameters below for this display
//#define ILI9163_DRIVER     // Define additional parameters below for this display
//#define S6D02A1_DRIVER
//#define RPI_ILI9486_DRIVER // 20MHz maximum SPI
//#define HX8357D_DRIVER
//#define ILI9481_DRIVER
//#define ILI9486_DRIVER
//#define ILI9488_DRIVER     // WARNING: Do not connect ILI9488 display SDO to MISO if other devices share the SPI bus (TFT SDO does NOT tristate when CS is high)
//#define ST7789_DRIVER      // Full configuration option, define additional parameters below for this display
//#define ST7789_2_DRIVER    // Minimal configuration option, define additional parameters below for this display
//#define R61581_DRIVER

// Some displays support SPI reads via the MISO pin, other displays have a single
// bi-directional SDA pin and the library will try to read this via the MOSI line.
// To use the SDA line for reading data from the TFT uncomment the following line:

// #define TFT_SDA_READ      // This option is for ESP32 ONLY, tested with ST7789 display only

// For ST7789 ONLY, define the colour order IF the blue and red are swapped on your display
// Try ONE option at a time to find the correct colour order for your display

//  #define TFT_RGB_ORDER TFT_RGB  // Colour order Red-Green-Blue
//  #define TFT_RGB_ORDER TFT_BGR  // Colour order Blue-Green-Red

// For M5Stack ESP32 module with integrated ILI9341 display ONLY, remove // in line below

// #define M5STACK

// For ST7789, ST7735 and ILI9163 ONLY, define the pixel width and height in portrait orientation
// #define TFT_WIDTH  80
// #define TFT_WIDTH  128
// #define TFT_WIDTH  240 // ST7789 240 x 240 and 240 x 320
// #define TFT_HEIGHT 160
// #define TFT_HEIGHT 128
// #define TFT_HEIGHT 240 // ST7789 240 x 240
// #define TFT_HEIGHT 320 // ST7789 240 x 320

// For ST7735 ONLY, define the type of display, originally this was based on the
// colour of the tab on the screen protector film but this is not always true, so try
// out the different options below if the screen does not display graphics correctly,
// e.g. colours wrong, mirror images, or tray pixels at the edges.
// Comment out ALL BUT ONE of these options for a ST7735 display driver, save this
// this User_Setup file, then rebuild and upload the sketch to the board again:

// #define ST7735_INITB
// #define ST7735_GREENTAB
// #define ST7735_GREENTAB2
// #define ST7735_GREENTAB3
// #define ST7735_GREENTAB128    // For 128 x 128 display
// #define ST7735_GREENTAB160x80 // For 160 x 80 display (BGR, inverted, 26 offset)
// #define ST7735_REDTAB
// #define ST7735_BLACKTAB
// #define ST7735_REDTAB160x80   // For 160 x 80 display with 24 pixel offset

// If colours are inverted (white shows as black) then uncomment one of the next
// 2 lines try both options, one of the options should correct the inversion.

// #define TFT_INVERSION_ON
// #define TFT_INVERSION_OFF

// If a backlight control signal is available then define the TFT_BL pin in Section 2
// below. The backlight will be turned ON when tft.begin() is called, but the library
// needs to know if the LEDs are ON with the pin HIGH or LOW. If the LEDs are to be
// driven with a PWM signal or turned OFF/ON then this must be handled by the user
// sketch. e.g. with digitalWrite(TFT_BL, LOW);

// #define TFT_BACKLIGHT_ON HIGH  // HIGH or LOW are options

// ##################################################################################
//
// Section 2. Define the pins that are used to interface with the display here
//
// ##################################################################################

// We must use hardware SPI, a minimum of 3 GPIO pins is needed.
// Typical setup for ESP8266 NodeMCU ESP-12 is :
//
// Display SDO/MISO  to NodeMCU pin D6 (or leave disconnected if not reading TFT)
// Display LED       to NodeMCU pin VIN (or 5V, see below)
// Display SCK       to NodeMCU pin D5
// Display SDI/MOSI  to NodeMCU pin D7
// Display DC (RS/AO)to NodeMCU pin D3
// Display RESET     to NodeMCU pin D4 (or RST, see below)
// Display CS        to NodeMCU pin D8 (or GND, see below)
// Display GND       to NodeMCU pin GND (0V)
// Display VCC       to NodeMCU 5V or 3.3V
//
// The TFT RESET pin can be connected to the NodeMCU RST pin or 3.3V to free up a control pin
//
// The DC (Data Command) pin may be labeled AO or RS (Register Select)
//
// With some displays such as the ILI9341 the TFT CS pin can be connected to GND if no more
// SPI devices (e.g. an SD Card) are connected, in this case comment out the #define TFT_CS
// line below so it is NOT defined. Other displays such at the ST7735 require the TFT CS pin
// to be toggled during setup, so in these cases the TFT_CS line must be defined and connected.
//
// The NodeMCU D0 pin can be used for RST
//
//
// Note: only some versions of the NodeMCU provide the USB 5V on the VIN pin
// If 5V is not available at a pin you can use 3.3V but backlight brightness
// will be lower.


// ###### EDIT THE PIN NUMBERS IN THE LINES FOLLOWING TO SUIT YOUR BOARD SETUP ######

// For seeed samd21
//#define HASSPI 1
//#define SPICOM SPI
//#define TFT_CS   5
//#define TFT_DC   6
//#define TFT_RST  -1    // Set TFT_RST to -1 if the display RESET is connected to RST or 3.3V

// For K210 -
//#define HASSPI 1
//#define SPICOM SPI
//#define TFT_CS   29
//#define TFT_DC   25
//#define TFT_RST  33
//#define TFT_RST  -1    // Set TFT_RST to -1 if the display RESET is connected to RST or 3.3V

//For seeed GroveUI - u
#if  defined(ARDUINO_ARCH_SAMD) && defined(SEEED_GROVE_UI_WIRELESS)
#define HASSPI 1
#define SPICOM   LCD_SPI
#define TFT_CS   LCD_SS_PIN
#define TFT_DC   LCD_DC
#define TFT_RST  LCD_RESET  //Set TFT_RST to -1 if the display RESET is connected to RST or 3.3V
#define TFT_BL   LCD_BACKLIGHT
#define TFT_BACKLIGHT_ON HIGH
#define TFT_BACKLINGT_V 2000
#elif defined(ARDUINO_ARCH_SAMD)
#define HASSPI 1
#define SPICOM SPI
#define TFT_CS   5
#define TFT_DC   6
#define TFT_RST  -1    // Set TFT_RST to -1 if the display RESET is connected to RST or 3.3V
#else
    #error "you need to config in USer_Setup.h"
#endif


//For GD32
// #define TFT_RST PE1
// #define TFT_BL PD12
// #define TFT_BACKLIGHT_ON LOW

// ##################################################################################
//
// Section 3. Define the touch function
//
// ##################################################################################

// #define TOUCH

//for four wire touch
//#define FOURWIRETOUCH
//#define YP A2   // must be an analog pin, use "An" notation!
//#define XM A1   // must be an analog pin, use "An" notation!
//#define XP A3   // can be a digital pin,

//for adx

// #define XPT2046TOUCH
// #define XPT_CS  PD13
// #define XPT_MOSI PE2
// #define XPT_MISO PE3
// #define XPT_CLK PE0
// #define XPT_PENIRQ PE4



// ##################################################################################
//
// Section 4. Define the fonts that are to be used here
//
// ##################################################################################

// Comment out the #defines below with // to stop that font being loaded
// The ESP8366 and ESP32 have plenty of memory so commenting out fonts is not
// normally necessary. If all fonts are loaded the extra FLASH space required is
// about 17Kbytes. To save FLASH space only enable the fonts you need!

#define LOAD_GLCD   // Font 1. Original Adafruit 8 pixel font needs ~1820 bytes in FLASH
#define LOAD_FONT2  // Font 2. Small 16 pixel high font, needs ~3534 bytes in FLASH, 96 characters
#define LOAD_FONT4  // Font 4. Medium 26 pixel high font, needs ~5848 bytes in FLASH, 96 characters
#define LOAD_FONT6  // Font 6. Large 48 pixel font, needs ~2666 bytes in FLASH, only characters 1234567890:-.apm
#define LOAD_FONT7  // Font 7. 7 segment 48 pixel font, needs ~2438 bytes in FLASH, only characters 1234567890:-.
#define LOAD_FONT8  // Font 8. Large 75 pixel font needs ~3256 bytes in FLASH, only characters 1234567890:-.
//#define LOAD_FONT8N // Font 8. Alternative to Font 8 above, slightly narrower, so 3 digits fit a 160 pixel TFT
#define LOAD_GFXFF  // FreeFonts. Include access to the 48 Adafruit_GFX free fonts FF1 to FF48 and custom fonts

// Comment out the #define below to stop the SPIFFS filing system and smooth font code being loaded
// this will save ~20kbytes of FLASH
//#define SMOOTH_FONT


// ##################################################################################
//
// Section 5. Other options
//
// ##################################################################################

// Define the SPI clock frequency, this affects the graphics rendering speed. Too
// fast and the TFT driver will not keep up and display corruption appears.
// With an ILI9341 display 40MHz works OK, 80MHz sometimes fails
// With a ST7735 display more than 27MHz may not work (spurious pixels and lines)
// With an ILI9163 display 27 MHz works OK.
// The RPi typically only works at 20MHz maximum.

// #define SPI_FREQUENCY   1000000
// #define SPI_FREQUENCY   5000000
// #define SPI_FREQUENCY  10000000
// #define SPI_FREQUENCY  20000000
#define SPI_FREQUENCY  50000000 // Actually sets it to 26.67MHz = 80/3
// #define SPI_FREQUENCY  40000000 // Maximum to use SPIFFS
// #define SPI_FREQUENCY  80000000

// Optional reduced SPI frequency for reading TFT
#define SPI_READ_FREQUENCY  20000000

// The XPT2046 requires a lower SPI clock rate of 2.5MHz so we define that here:
#define SPI_TOUCH_FREQUENCY  2500000

// The ESP32 has 2 free SPI ports i.e. VSPI and HSPI, the VSPI is the default.
// If the VSPI port is in use and pins are not accessible (e.g. TTGO T-Beam)
// then uncomment the following line:
//#define USE_HSPI_PORT

// Comment out the following #define if "SPI Transactions" do not need to be
// supported. When commented out the code size will be smaller and sketches will
// run slightly faster, so leave it commented out unless you need it!

// Transaction support is needed to work with SD library but not needed with TFT_SdFat
// Transaction support is required if other SPI devices are connected.

// Transactions are automatically enabled by the library for an ESP32 (to use HAL mutex)
// so changing it here has no effect

#define SUPPORT_TRANSACTIONS




