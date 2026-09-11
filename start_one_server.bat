@echo off
cd /d "%~dp0"
echo Installing/building React...
cd frontend
if not exist node_modules npm install
npm run build
if errorlevel 1 pause & exit /b 1
cd ..
py scripts\build_react_for_django.py
if errorlevel 1 pause & exit /b 1
cd backend
py manage.py migrate
py manage.py runserver
