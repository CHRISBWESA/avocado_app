@echo off
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot
set ANDROID_HOME=C:\Users\MEMBER CO\AppData\Local\Android\Sdk
set PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%
set GRADLE_OPTS=-Xmx1024m -Dorg.gradle.daemon=false

cd /d "C:\Users\MEMBER CO\Downloads\parachichi-20260805T191206Z-1-001\avocado-app\android"
call gradlew.bat --no-daemon assembleRelease
pause
