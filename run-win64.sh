#!/bin/bash

echo "======check or install runtimes====="
node -v  ||  winget install -h OpenJS.NodeJS.LTS
pnpm -v  ||  npm install pnpm -g
python --version  ||  winget install -h Python.Python.3.13
java --version  || winget install -h Oracle.JDK.24

echo "======start codecraft build====="
project_dir=$(cd $(dirname $0); pwd)

echo "======install gui===="
cd ${project_dir}/gui && pnpm install

echo "======install blocks====="
cd ${project_dir}/blocks && pnpm install
echo "======build blocks====="
cd ${project_dir}/blocks && pnpm build

echo "======install l10n====="
cd ${project_dir}/l10n && pnpm install
echo "======build l10n====="
cd ${project_dir}/l10n && pnpm build

echo "======install vm====="
cd ${project_dir}/vm && pnpm install
echo "======build vm====="
cd ${project_dir}/vm && pnpm build

echo "======build gui====="
cd ${project_dir}/gui && pnpm build-win
cd ${project_dir}/gui && rm -rf ../main/app/gui && cp -r ./build ../main/app/gui

echo "======build app====="
cd ${project_dir}/main/app && pnpm install && ./node_modules/.bin/electron-rebuild serialport
echo "======build main====="
cd ${project_dir}/main && pnpm install && rm -rf build && pnpm publish-win64
