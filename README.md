# 上城区政协委员通 Web 应用

基于 React 和 React Router 的上城区政协委员信息管理与履职平台。

## 功能模块

1. **首页** - 系统概览和平台统计
2. **委员之家** - 委员基本信息与档案管理
3. **街道委员小组** - 14个街道委员小组组织管理
4. **界别基本情况** - 16个政协界别信息与活动管理
5. **委员履职平台** - 50个委员工作室履职记录与统计（基于实际数据）
6. **政协界别委员联系界别群众实践** - 南城发展专题
7. **星级委员评定** - 委员履职星级评定管理
8. **2026年度履职计划** - 年度工作计划与目标管理

## 技术栈

- React 18
- TypeScript
- React Router 6
- CSS3 (Flexbox/Grid)
- 实际数据集成（JSON）

## 项目结构

```
政协委员通-web/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.tsx                    # 主组件，包含完整路由配置
│   ├── App.css                    # 主样式文件
│   ├── index.tsx                  # 应用入口
│   ├── index.css                  # 全局样式
│   └── data/
│       ├── performanceData.json   # 履职平台实际数据（50个委员工作室）
│       ├── types.ts               # TypeScript类型定义
│       └── mockData.ts            # 模拟数据
├── package.json
├── tsconfig.json
├── README.md
├── start.html                     # 快速启动指南
└── 启动项目.bat                   # 一键启动脚本
```

## 数据来源

项目集成了实际的上城区政协数据：
- **委员履职平台数据**：包含50个委员工作室的详细信息
- **街道委员小组**：14个街道全覆盖
- **政协界别**：16个界别分类
- **星级评定**：2025年度评定结果（25个五星、17个四星、4个三星）

## 安装和运行

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm start
   ```

3. 构建生产版本：
   ```bash
   npm run build
   ```

## 路由配置

应用使用 React Router 6 进行路由管理：

- `/` - 首页
- `/committee-home` - 委员之家
- `/street-committee` - 街道委员小组
- `/category-info` - 界别基本情况
- `/performance-platform` - 委员履职平台

## 设计特点

- 响应式设计，支持移动端和桌面端
- 蓝色主题，符合政务系统风格
- 清晰的导航结构
- 模块化的页面布局