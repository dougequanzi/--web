@echo off
chcp 65001 >nul
echo ========================================
echo       政协委员通 React 项目启动器
echo ========================================
echo.

echo 项目目录: %~dp0
echo.

echo 请选择要执行的操作:
echo 1. 安装依赖 (npm install)
echo 2. 启动开发服务器 (npm start)
echo 3. 构建生产版本 (npm run build)
echo 4. 查看项目结构
echo 5. 打开快速启动指南
echo 6. 退出
echo.

set /p choice="请输入选项 (1-6): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto start
if "%choice%"=="3" goto build
if "%choice%"=="4" goto structure
if "%choice%"=="5" goto guide
if "%choice%"=="6" goto exit

:install
echo.
echo 正在安装依赖...
call npm install
if %errorlevel% equ 0 (
    echo 依赖安装成功！
) else (
    echo 依赖安装失败，请检查网络连接。
)
pause
goto :eof

:start
echo.
echo 正在启动开发服务器...
echo 启动后请在浏览器中访问: http://localhost:3000
echo 按 Ctrl+C 停止服务器
echo.
call npm start
pause
goto :eof

:build
echo.
echo 正在构建生产版本...
call npm run build
if %errorlevel% equ 0 (
    echo 构建成功！文件位于 build/ 目录
) else (
    echo 构建失败。
)
pause
goto :eof

:structure
echo.
echo 项目结构:
echo.
dir /b /a
echo.
echo src/ 目录:
dir /b /a src
echo.
echo src/data/ 目录:
dir /b /a src\data
pause
goto :eof

:guide
echo.
echo 正在打开快速启动指南...
start start.html
echo 快速启动指南已在浏览器中打开。
pause
goto :eof

:exit
echo.
echo 再见！
pause
exit /b 0