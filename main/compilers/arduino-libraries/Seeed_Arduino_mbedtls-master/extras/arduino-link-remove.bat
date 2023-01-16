@echo off
setlocal EnableExtensions
setlocal EnableDelayedExpansion

:: Change current directory for 'Run As Admin'
cd %~dp0

setlocal

cd ..\src
:: if not exist library mkdir library
for %%i in (..\mbedtls\library\*.c) do (
	call :GetFileName fname "%%i"
	set _ignore=
	if "!_ignore!" == "" (
		del library\!fname!
	)
)

:: if not exist mbedtls mklink /d mbedtls ..\mbedtls\include\mbedtls
if not exist mbedtls mkdir mbedtls
for %%i in (..\mbedtls\include\mbedtls\*.h) do (
	call :GetFileName fname "%%i"
	set _ignore=
	if /i "!fname!" equ "config.h" set _ignore=1
	if "!_ignore!" == "" (
		del mbedtls\!fname!
	)
)

:: if not exist port    mklink /d port    ..\port
if not exist port mkdir port
for %%i in (..\port\*.c) do (
	call :GetFileName fname "%%i"
	set _ignore=
	if "!_ignore!" == "" (
		del port\!fname!
	)
)

for %%i in (..\port\include\*.h) do (
	call :GetFileName fname "%%i"
	del !fname!
)

del mbedtls\config.h
del mbedtls\esp_debug.h

goto :eof



:GetFileName
REM --Get the file name in the path
	setlocal
	set filename=%~nx2
	(
		endlocal & REM -- RETURN VALUES
		if "%~1" neq "" (
			set %~1=%filename%
		)
	)
goto :eof
