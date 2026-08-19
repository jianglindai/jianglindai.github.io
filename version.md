# 项目版本变更记录

> 每次修改请按日期追加记录，最新记录位于顶部。

---

## 2026-08-19

### 🎉 新增
- 新增 `Others` 主列表页（路径：`/others/`），响应式卡片网格布局，桌面端 3~4 列、平板 2 列、手机 1 列
- 新增七夕浪漫详情页（路径：`/others/qixi/`），包含星空背景、浮动爱心、SVG 主视觉（玫瑰+月夜+人影剪影）、打字机情诗、爱心点击爆炸、脉冲心跳、心动计数器、许愿弹窗等交互
- 新增数据源 `_data/others.json`，集中管理所有小玩意信息，支持卡片动态渲染
- 新增样式文件 `assets/css/others.css`（卡片样式 + 全部七夕动画 keyframes）
- 新增脚本文件 `assets/js/qixi.js`（浮动爱心、点击爆炸、计数器、打字机、许愿弹窗）
- 新增中文项目说明文档 `README_CN.md`

### ⚡ 优化
- 修复 manifest.json 跨域（CORS）问题：将 `_includes/head/custom.html` 中的 manifest 链接从 `{{ base_path }}` 改为根相对路径 `/images/manifest.json`
- 调整顶部导航栏顺序：将 "Teaching" 移至末尾并重命名为 "Others"，指向 `/others/`

### 🗑️ 删除
- 无
