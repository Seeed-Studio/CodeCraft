#!/bin/bash

script_dir=$(cd $(dirname $0);pwd)

cd ${script_dir}/blocks && npm install -y; exit 0
cd ${script_dir}/blocks && npm run build-mac

cd ${script_dir}/l10n && npm install -y; exit 0
cd ${script_dir}/l10n && npm run build

cd ${script_dir}/vm && npm install -y; exit 0
cd ${script_dir}/vm && npm run build

cd ${script_dir}/gui && npm install -y; exit 0
cd ${script_dir}/gui && npm run build-mac
cd ${script_dir}/gui && rm -rf ../main/app/gui && cp -r ./build ../main/app/gui

cd ${script_dir}/main/app && npm install -y
cd ${script_dir}/main/app/node_modules/serialport/ && ../.bin/electron-rebuild

cd ${script_dir}/main && npm install -y && rm -rf build && npm run publish-mac

