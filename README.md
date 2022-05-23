#简介
TODO: 简要介绍你的项目。通过此节说明此项目的目标或动机。

# compile dependencies	

cd blocks
npm install
```for mac or linux
npm run build-mac
```for win
npm run build-win

cd l10n
npm install && npm run build

cd vm
npm install && npm run build

cd gui
npm install
```for mac or linux
npm run build-mac
```for win
npm run build-win
rm -rf ../main/app/gui && cp -r ./build ../main/app/gui

cd app
npm install
./node_modules/.bin/electron-rebuild serialport

If the error message “script is prohibited on this system” appears on the Windows system, you need to open powershell as an administrator, and then execute Set-ExecutionPolicy RemoteSigned

cd main
npm install
rm -rf build && npm run publish-mac or win or linux  

2.	软件依赖项
3.	最新发布
4.	API 参考

