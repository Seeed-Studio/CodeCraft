#!/usr/bin/env python3

import serial
import struct
import intelhex

port = serial.Serial('/dev/ttyACM0', baudrate=115200)

class SerialDownloader(object):
    HOST_MARKER = 0xa5
    DEVICE_MARKER = 0x5a

    CMD_IDENTIFY   = 0x00
    CMD_BEGINREAD  = 0x01
    CMD_BEGINWRITE = 0x02
    CMD_ERASE      = 0x03
    CMD_READ       = 0x04
    CMD_WRITE      = 0x05
    CMD_RUN        = 0x06

    def __init__(self, port: serial.Serial):
        self.__port = port
    
    def waitResponse(self):
        while True:
            data = self.__port.read()
            if data[0] == SerialDownloader.DEVICE_MARKER:
                break
    
    def readResponse(self):
        return self.__port.read()
    
    def makeCommand(self, command:int, length:int, address:int):
        return struct.pack('<BBxHL', SerialDownloader.HOST_MARKER, command, length, address)
    
    def writeCommand(self, command:int, length:int, address:int):
        data = self.makeCommand(command, length, address)
        self.__port.write(data)

    def identify(self):
        self.writeCommand(SerialDownloader.CMD_IDENTIFY, 0, 0)
        self.waitResponse()
        data = self.__port.read(4)
        return struct.unpack('<BH', data[1:])

    def beginWrite(self):
        self.writeCommand(SerialDownloader.CMD_BEGINWRITE, 0, 0)
        self.waitResponse()
        data = self.__port.read(1)
        return data[0] == SerialDownloader.CMD_BEGINWRITE
    
    def beginRead(self):
        self.writeCommand(SerialDownloader.CMD_BEGINREAD, 0, 0)
        self.waitResponse()
        data = self.__port.read(1)
        return data[0] == SerialDownloader.CMD_BEGINREAD

    def erase(self, address:int):
        self.writeCommand(SerialDownloader.CMD_ERASE, 0, address)
        self.waitResponse()
        data = self.__port.read(1)
        return data[0] == SerialDownloader.CMD_ERASE
    
    def write(self, address:int, data:bytes):
        if len(data) != 256:
            raise ValueError('data must be 256 bytes length')
        self.writeCommand(SerialDownloader.CMD_WRITE, len(data), address)
        self.__port.write(data)
        self.waitResponse()
        data = self.__port.read(1)
        return data[0] == SerialDownloader.CMD_WRITE
    
    def read(self, address:int, length:int):
        if length > 65535:
            return None
        self.writeCommand(SerialDownloader.CMD_READ, length, address)
        self.waitResponse()
        result = self.__port.read(1)
        if result[0] != SerialDownloader.CMD_READ:
            return None
        return self.__port.read(length)
    
    def run(self, address:int):
        self.writeCommand(SerialDownloader.CMD_RUN, 0, address)

downloader = SerialDownloader(port)
print('Identifying the target\n')
rom_id = downloader.identify()
print(f'id: {rom_id}')

import io
with open('/home/kenta/wio_terminal/lcd_backlight_control/lcd_backlight_control.Seeeduino.samd.seeed_wio_terminal.bin', 'rb') as f:
    code = f.read()
    header = struct.unpack('<LL', code[:8])
    print(f'stack top: 0x{header[0]:08X} reset vector: 0x{header[1]:08X}')
    print('Erasing sectors...')
    # Erase sectors
    for sector in range(0, len(code), 4096):
        downloader.erase(sector)
    # Write codes
    print('Writing blocks...')
    for block in range(0, len(code), 256):
        if len(code) - block >= 256:
            downloader.write(block, code[block:block+256])
        else:
            remaining = len(code) - block
            block_with_padding = code[block:block+remaining] + bytes([0xff]*(256 - remaining))
            downloader.write(block, block_with_padding)

    # Verify codes
    print('Verifying blocks...')
    block_size = 512
    verified = True
    for trial in range(2):
        downloader.beginRead()
        for block in range(0, len(code), block_size):
            remaining = len(code) - block
            if remaining > block_size: remaining = block_size
            verify = downloader.read(0x04000000 + block, block_size)
            for i in range(remaining):
                expected = code[block + i]
                actual = verify[i]
                if expected != actual:
                    print(f'Verify failed at 0x{(block+i):06X}: expected 0x{expected:02X} actual 0x{actual:02X}')
                    verified = False
                    break
    
    if verified:
        verify_header = downloader.read(0x04000000, 8)
        header = struct.unpack('<LL', verify_header)
        print(f'stack top: 0x{header[0]:08X} reset vector: 0x{header[1]:08X}')
        if header[0] < 0x20000000 or 0x20040000 < header[0]:
            print('Error: invalid stack top detected.')
        elif header[1] < 0x04000000 or 0x05000000 < header[1]:
            print('Error: invalid reset vector detected.')
        else:
            # Run the code
            print('Booting...')
            downloader.run(0x04000000)
    