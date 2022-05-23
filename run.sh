#!/bin/bash

echo "======start codecraft build====="
script_dir="/root/workspace/seeed-codecraft_2f88"
export CSC_IDENTITY_AUTO_DISCOVERY=false
export NODE_OPTIONS='--max_old_space_size=10240'

RUN cd ${script_dir}/main && rm -rf build

RUN echo "======build gui-first time====="
RUN cd ${script_dir}/gui && npm install -y --unsafe-perm=true

RUN echo "======build blocks====="
RUN cd ${script_dir}/blocks && npm install -y --unsafe-perm=true
RUN cd ${script_dir}/blocks && npm run build-mac

RUN echo "======build l10n====="
RUN cd ${script_dir}/l10n && npm install -y --unsafe-perm=true
RUN cd ${script_dir}/l10n && npm run build

RUN echo "======build vm====="
RUN cd ${script_dir}/vm && npm install -y --unsafe-perm=true
RUN cd ${script_dir}/vm && npm run build

RUN echo "======build gui-second time====="
RUN cd ${script_dir}/gui && npm install -y --unsafe-perm=true
RUN cd ${script_dir}/gui && npm run build-mac
RUN cd ${script_dir}/gui && rm -rf ../main/app/gui && cp -r ./build ../main/app/gui

RUN echo "======build app====="
RUN cd ${script_dir}/main/app && npm install -y --unsafe-perm=true
RUN cd ${script_dir}/main/app/node_modules/serialport/ && ../.bin/electron-rebuild
RUN cd ${script_dir}/main && npm install -y --unsafe-perm=true && rm -rf build && npm run publish-mac
