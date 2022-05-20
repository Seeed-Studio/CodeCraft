FROM iteam-harbor.seeed.cn/seeed-csg/python-nodejs-java-ubuntu16-base:1.0.2
RUN echo '\
    deb http://mirrors.aliyun.com/debian/ stretch main non-free contrib \
    deb-src http://mirrors.aliyun.com/debian/ stretch main non-free contrib \
    deb http://mirrors.aliyun.com/debian-security stretch/updates main \
    deb-src http://mirrors.aliyun.com/debian-security stretch/updates main \
    deb http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib \
    deb-src http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib \
    deb http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib \
    deb-src http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib \
    ' > /etc/apt/sources.list

ENV NODE_OPTIONS='--max_old_space_size=10240'

RUN mkdir -p /usr/src/app && apt-get update

# cp source project
COPY . /usr/src/app/

RUN cd /usr/src/app/blocks && npm install -y; exit 0
RUN cd /usr/src/app/blocks && npm run build-mac

RUN cd /usr/src/app/l10n && npm install -y; exit 0
RUN cd /usr/src/app/l10n && npm run build

RUN cd /usr/src/app/vm && npm install -y; exit 0
RUN cd /usr/src/app/vm && npm run build

RUN cd /usr/src/app/gui && npm install -y; exit 0
RUN cd /usr/src/app/gui && npm run build-mac
RUN cd /usr/src/app/gui && rm -rf ../main/app/gui && cp -r ./build ../main/app/gui

RUN cd /usr/src/app/main/app && npm install -y
RUN cd /usr/src/app/main/app/node_modules/serialport/ && ../.bin/electron-rebuild

RUN cd /usr/src/app/main && npm install -y && rm -rf build && npm run publish-mac
