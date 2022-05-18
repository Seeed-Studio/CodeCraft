@echo off

set OsVersion=0
set OsProcessor=0

::判断系统位数
if /i "%processor_architecture%" equ "x86" (
set OsProcessor="x86"
) else (
if /i "%processor_architecture%" equ "amd64" (
set OsProcessor="amd64"
)
)
echo %processor_architecture%
echo 操作系统版本:
ver|findstr /r /i " [版本 5.1.*]" > NUL && goto WindowsXP
ver|findstr /r /i " [版本 6.1.*]" > NUL && goto Windows7
goto UnknownVersion

::判断系统版本
:WindowsXP
set OsVersion="WindowsXP"
goto install

:Windows7
set OsVersion="Windows7"
goto install

:UnknownVersion
set OsVersion="UnknownVersion"
goto install

::安装win10、win7、winxp驱动
:install
start ./dpinst-%OsProcessor%.exe
goto end

:end