@echo off
cd ..

web-ext build --overwrite-dest
if %ERRORLEVEL% neq 0 goto :ExitPoint

echo Build completed successfully

:ExitPoint
cd .build
