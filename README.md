# Codecraft
**Codecraft is a graphical programming software which is based on Scratch 3.0. It targets teenagers of age 7-16, compatible with WIN/MAC.**  

[Codecraft help online](https://www.yuque.com/tinkergen-help-en/codecraft?language=en-us)

### Support Devices
Grove Zero，Arduino Uno/Mega，micro:bit，M.A.R.K(CyberEye)，Grove Joint，GLINT，Bittle

## Download

You can download the latest version from [the download page from our website](https://ide.tinkergen.com/download/en/)

## Getting started

### Prerequisites

This project requires:
- [Node.js](https://nodejs.org/)
- [Python 2.x](https://www.python.org/downloads/release/python-272/), and make it as the default version

### Building

The following steps will help you build the project locally. It will generate a installer after the building is done.

Linux/Mac:

    bash run-mac.sh
Windows:

    bash run-win64.sh

You can also build the project manually:

    cd blocks
    npm install && npm run build

    cd ../l10n
    npm install && npm run build

    cd ../vm
    npm install && npm run build

    cd ../gui
    npm install
    // for mac or linux
    npm run build-mac
    // for win
    npm run build-win
    rm -r ../main/app/gui && cp -r ./build ../main/app/gui

    cd ../main/app
    npm install
    ./node_modules/.bin/electron-rebuild serialport

    // If the error message “script is prohibited on this system” appears on the Windows   
    // system, you need to open powershell as an administrator, and then execute 
    // Set-ExecutionPolicy RemoteSigned

    cd ..
    npm install
    rm -r build 
    // Mac
    npm run publish-mac
    // Linux
    npm run publish-linux
    // Windows
    npm run publish-win64

Once you finish building, you can find the installer under main/build/

## Architecture

## Contribution

We'd love to have people in open source communities help Codecraft grow. If you are interested in contributing, please read this guide.

## License

The code contained in this repository and the executable distributions are licensed under the terms of the Apache License 2.0. The executable distributions contain third-party code licensed under other compatible licenses such as BSD-3.
