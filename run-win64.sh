#!/bin/bash

echo "======start codecraft build====="
project_dir=$(cd $(dirname $0); pwd)

echo "======install gui===="
cd ${project_dir}/gui && npm install

echo "======install blocks====="
cd ${project_dir}/blocks && npm install
echo "======build blocks====="
cd ${project_dir}/blocks && npm run build

echo "======install l10n====="
cd ${project_dir}/l10n && npm install
echo "======build l10n====="
cd ${project_dir}/l10n && npm run build

echo "======install vm====="
cd ${project_dir}/vm && npm install
echo "======build vm====="
cd ${project_dir}/vm && npm run build

echo "======build gui====="
cd ${project_dir}/gui && npm run build-win
cd ${project_dir}/gui && rm -rf ../main/app/gui && cp -r ./build ../main/app/gui

echo "======build app====="
cd ${project_dir}/main/app && npm install && ./node_modules/.bin/electron-rebuild serialport
echo "======build main====="
cd ${project_dir}/main && npm install && rm -rf build && npm run publish-win64

