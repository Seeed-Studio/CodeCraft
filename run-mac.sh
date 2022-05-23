#!/bin/bash

echo "======start codecraft build====="
script_dir="/root/workspace/seeed-codecraft_2f88"
export CSC_IDENTITY_AUTO_DISCOVERY=false
export NODE_OPTIONS='--max_old_space_size=10240'

echo "======build gui-first time====="
cd ${script_dir}/gui && npm install -y --unsafe-perm=true

echo "======build blocks====="
cd ${script_dir}/blocks && npm install -y --unsafe-perm=true
cd ${script_dir}/blocks && npm run build-mac

echo "======build l10n====="
cd ${script_dir}/l10n && npm install -y --unsafe-perm=true
cd ${script_dir}/l10n && npm run build

echo "======build vm====="
cd ${script_dir}/vm && npm install -y --unsafe-perm=true
cd ${script_dir}/vm && npm run build

echo "======build gui-second time====="
cd ${script_dir}/gui && npm install -y --unsafe-perm=true
cd ${script_dir}/gui && npm run build-mac
cd ${script_dir}/gui && rm -rf ../main/app/gui && cp -r ./build ../main/app/gui

echo "======build app====="
cd ${script_dir}/main/app && npm install -y --unsafe-perm=true
cd ${script_dir}/main/app/node_modules/serialport/ && ../.bin/electron-rebuild
cd ${script_dir}/main && npm install -y --unsafe-perm=true && rm -rf build && npm run publish-mac

