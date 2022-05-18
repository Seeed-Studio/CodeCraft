@echo off
setlocal EnableExtensions
setlocal EnableDelayedExpansion

:: Change current directory for 'Run As Admin'
cd %~dp0

setlocal

cd ..\src
:: if not exist library mklink /d library ..\mbedtls\library
if not exist library mkdir library
for %%i in (..\mbedtls\library\*.c) do (
	call :GetFileName fname "%%i"
	set _ignore=
	if /i "!fname!" equ "net_sockets.c" set _ignore=1
	if /i "!fname!" equ "entropy_poll.c" set _ignore=1
	if /i "!fname!" equ "timing.c" set _ignore=1
	:: if /i "!fname!" equ "x509_crt.c" set _ignore=1
	if "!_ignore!" == "" (
		call :FileLink library\!fname! "..\%%i"
	)
)

:: if not exist mbedtls mklink /d mbedtls ..\mbedtls\include\mbedtls
if not exist mbedtls mkdir mbedtls
for %%i in (..\mbedtls\include\mbedtls\*.h) do (
	call :GetFileName fname "%%i"
	set _ignore=
	if /i "!fname!" equ "config.h" set _ignore=1
	if "!_ignore!" == "" (
		call :FileLink mbedtls\!fname! "..\%%i"
	)
)

if not exist Seeed_mbedtls.h echo // Empty file > Seeed_mbedtls.h

:: if not exist port    mklink /d port    ..\port
if not exist port mkdir port
for %%i in (..\port\*.c) do (
	call :GetFileName fname "%%i"
	set _ignore=
	if /i "!fname!" equ "esp_bignum.c" set _ignore=1
	:: if /i "!fname!" equ "esp_hardware.c" set _ignore=1
	if /i "!fname!" equ "esp_sha1.c" set _ignore=1
	if /i "!fname!" equ "esp_sha256.c" set _ignore=1
	if /i "!fname!" equ "esp_sha512.c" set _ignore=1
	if "!_ignore!" == "" (
		call :FileLink port\!fname! "..\%%i"
	)
)

for %%i in (..\port\include\*.h) do (
	call :GetFileName fname "%%i"
	call :FileLink !fname! "%%i"
)

call :FileLink mbedtls\config.h ..\..\port\include\mbedtls\esp_config.h
call :FileLink mbedtls\esp_debug.h ..\..\port\include\mbedtls\esp_debug.h


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

:FileLink
REM --Make a file linkage, could be mklink or copy directly.
	setlocal
	set link=%~1
	set tar=%~2

	:: mklink %link% %tar%

	:: up    link
	:: or
	:: below copy

	set linkpath=%~p1
	set linkname=%~nx1
	cd %linkpath%
	echo copy %tar% %linkname%
	copy %tar% %linkname%
	(
		endlocal & REM -- RETURN VALUES
	)
goto :eof
