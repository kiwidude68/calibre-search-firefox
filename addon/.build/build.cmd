@echo off
cd ..

python .build\build.py "calibre-search.xpi"
if %ERRORLEVEL% neq 0 goto :ExitPoint

echo Build completed successfully

:ExitPoint
cd .build