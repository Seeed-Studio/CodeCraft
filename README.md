#简介
TODO: 简要介绍你的项目。通过此节说明此项目的目标或动机。

#入门
1. compile dependencies	
cd blocks
npm install
npm run build-mac or npm run build-win

cd l10n
npm install && npm run build

cd vm
npm install && npm run build

cd gui
npm install
npm run build-mac or npm run build-win
rm -rf ../main/app/gui && cp -r ./build ../main/app/gui

cd app
npm install
cd main/app/node_modules/serialport/  ../.bin/electron-rebuild

cd main
npm install
rm -rf build && npm run publish-mac or win or linux  

2.	软件依赖项
3.	最新发布
4.	API 参考

#生成与测试
TODO: 说明并展示如何生成代码和运行测试。

#投稿
TODO: 说明其他用户和开发人员可如何帮助改善代码。

如果想要深入了解如何创建优秀的自述文件，请参阅以下[指南] (https://www.visualstudio.com/zh-cn/docs/git/create-a-readme)。还可从以下自述文件中寻求灵感:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)