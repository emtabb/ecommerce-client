@echo off
TITLE Modifying your NETWORK file
COLOR F0
ECHO.

:LOOP
SET Choice=
SET /P Choice="Do you want to modify VPN NETWORK SETTINGS ? (Y/N)"

IF NOT '%Choice%'=='' SET Choice=%Choice:~0,1%

ECHO.
IF /I '%Choice%'=='Y' GOTO ACCEPTED
IF /I '%Choice%'=='N' GOTO REJECTED
ECHO Please type Y (for Yes) or N (for No) to proceed!
ECHO.
GOTO Loop


:REJECTED
ECHO Your HOSTS file was left unchanged>>%systemroot%\Temp\hostFileUpdate.log
ECHO Finished.
GOTO END


:ACCEPTED
SET NEWLINE=^& echo.
ECHO Carrying out requested modifications to your HOSTS file
FIND /C /I "espace.izanami.service.com" C:\Windows\System32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 0 ECHO %NEWLINE%>>%WINDIR%\System32\drivers\etc\hosts
IF %ERRORLEVEL% NEQ 0 ECHO 35.234.47.214 espace.izanami.service.com>>C:\Windows\System32\drivers\etc\hosts
ECHO Finished
GOTO END
