@echo off
chcp 65001 >nul
echo ========================================
echo       政协委员通开发服务器启动
echo ========================================
echo.

echo 设置端口为3001...
set PORT=3001

echo 正在启动开发服务器...
echo 请稍候...
echo.

echo 启动后请在浏览器中访问: http://localhost:3001
echo 按 Ctrl+C 停止服务器
echo.

call npm start

pause