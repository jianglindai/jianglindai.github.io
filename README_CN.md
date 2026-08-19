# 个人学术主页项目说明

本项目是一个基于 **Jekyll** 静态网站生成器和 **Academic Pages** 模板构建的个人学术主页，部署于 GitHub Pages，访问地址：<https://jianglindai.github.io>。

## 一、技术栈

| 技术 | 用途 |
|------|------|
| Jekyll | 静态网站生成器（Ruby 实现） |
| Liquid | Jekyll 模板语言，用于页面逻辑 |
| Markdown / Kramdown | 内容编写 |
| SCSS / Sass | 样式编写与压缩 |
| JavaScript (jQuery) | 交互脚本 |
| GitHub Pages | 站点托管与自动部署 |
| Docker（可选） | 本地开发环境容器化 |

## 二、核心配置文件

| 文件 | 作用 |
|------|------|
| `_config.yml` | Jekyll 主配置文件：站点信息、作者资料、集合、插件、默认布局等 |
| `_config_docker.yml` | Docker 环境下的覆盖配置 |
| `Gemfile` | Ruby 依赖声明（Jekyll 及插件） |
| `package.json` | Node.js 依赖与 JS 构建脚本（压缩合并 JS） |
| `Dockerfile` / `docker-compose.yaml` | 容器化本地开发环境 |
| `.github/workflows/scrape_talks.yml` | GitHub Actions 工作流（自动抓取 talks） |

## 三、目录结构

```
jianglindai.github.io/
├── _config.yml                # Jekyll 主配置
├── _data/                     # 站点数据文件
│   ├── navigation.yml         #   顶部导航栏链接配置
│   ├── cv.json                #   简历数据（JSON 格式）
│   ├── authors.yml            #   作者信息
│   ├── ui-text.yml            #   UI 文案
│   └── comments/              #   评论数据（Staticman）
│
├── _includes/                 # 可复用 HTML 片段（Liquid include）
│   ├── head/                  #   <head> 区域片段
│   │   └── custom.html        #     自定义 head 内容（favicon、manifest、MathJax）
│   ├── footer/                #   页脚片段
│   ├── analytics-providers/   #   分析工具集成
│   ├── comments-providers/    #   评论系统集成
│   ├── base_path              #   计算 site.url + site.baseurl 的工具片段
│   ├── head.html              #   <head> 主入口
│   ├── masthead.html          #   顶部导航栏
│   ├── author-profile.html    #   侧边栏作者资料
│   ├── seo.html               #   SEO 元信息
│   └── ...                    #   其他组件（分页、目录、社交分享等）
│
├── _layouts/                  # 页面布局模板
│   ├── default.html           #   默认布局（页面骨架）
│   ├── single.html            #   单页内容布局
│   ├── archive.html           #   归档列表布局
│   ├── archive-taxonomy.html  #   分类/标签归档布局
│   ├── talk.html              #   讲座详情布局
│   ├── cv-layout.html         #   简历布局
│   ├── compress.html          #   HTML 压缩布局
│   └── splash.html            #   启动页布局
│
├── _pages/                    # 顶层页面（Markdown/HTML）
│   ├── about.md               #   关于页
│   ├── publications.html      #   论文列表页
│   ├── talks.html             #   讲座列表页
│   ├── teaching.html          #   教学页（导航中显示为 "Others"）
│   ├── portfolio.html         #   作品集页
│   ├── year-archive.html      #   博客按年归档
│   ├── cv.md / cv-json.md     #   简历页（Markdown / JSON 版本）
│   ├── markdown.md            #   Markdown 指南页
│   ├── 404.md                 #   404 页面
│   └── ...
│
├── _posts/                    # 博客文章（按日期命名）
├── _publications/             # 论文条目（集合）
├── _talks/                    # 讲座条目（集合）
├── _teaching/                 # 教学条目（集合）
├── _portfolio/                # 作品集条目（集合）
├── _drafts/                   # 草稿
│
├── _sass/                     # SCSS 样式源码
│   ├── layout/                #   布局相关样式
│   ├── theme/                 #   主题（默认/暗色）
│   ├── vendor/                #   第三方样式（Font Awesome、Susy 等）
│   └── _themes.scss           #   主题入口
│
├── assets/                    # 静态资源
│   ├── css/                   #   编译后的 CSS
│   ├── js/                    #   JavaScript（含压缩后的 main.min.js）
│   ├── fonts/                 #   字体文件
│   └── webfonts/              #   Web 字体（Font Awesome）
│
├── images/                    # 图片资源
│   ├── profile.png            #   个人头像
│   ├── favicon.*              #   网站图标
│   ├── manifest.json          #   PWA 清单文件
│   └── ...
│
├── files/                     # 可下载文件（PDF、BibTeX 等）
├── markdown_generator/        # 从 TSV/BibTeX 生成 Markdown 的脚本
├── scripts/                   # CV Markdown 转 JSON 等辅助脚本
├── talkmap/                   # 讲座地图（Leaflet）
└── talkmap.py / .ipynb        # 生成讲座地图数据的脚本
```

## 四、Jekyll 集合（Collections）

在 `_config.yml` 中定义了以下集合，每个集合对应一个同名目录（前缀 `_`），条目自动生成页面：

| 集合 | 目录 | 用途 |
|------|------|------|
| `teaching` | `_teaching/` | 教学经历 |
| `publications` | `_publications/` | 发表论文 |
| `portfolio` | `_portfolio/` | 作品集 |
| `talks` | `_talks/` | 讲座与报告 |

## 五、导航配置

顶部导航栏顺序由 [`_data/navigation.yml`](_data/navigation.yml) 控制，当前顺序为：

1. Publications
2. Talks
3. Portfolio
4. Blog Posts
5. CV
6. Guide
7. Others（指向 `/teaching/`）

## 六、本地运行

### 方式一：原生 Ruby 环境

```bash
bundle install                       # 安装 Ruby 依赖
jekyll serve -l -H localhost         # 启动本地服务，访问 http://localhost:4000
```

### 方式二：Docker

```bash
docker-compose up                    # 启动容器，访问 http://localhost:4000
```

## 七、部署

代码推送到 GitHub 的 `master`/`main` 分支后，GitHub Pages 会自动构建并部署到 <https://jianglindai.github.io>。

## 八、常用自定义入口

| 需求 | 修改位置 |
|------|----------|
| 站点标题、作者信息、社交链接 | `_config.yml` |
| 顶部导航栏 | `_data/navigation.yml` |
| 自定义 `<head>` 内容（favicon、统计等） | `_includes/head/custom.html` |
| 自定义页脚 | `_includes/footer/custom.html` |
| 简历内容 | `_pages/cv.md`、`_data/cv.json` |
| 头像 | `images/profile.png` |
| PWA 清单 | `images/manifest.json` |

## 九、内容生成工具

- `markdown_generator/`：从 `publications.tsv`、`talks.tsv` 或 BibTeX 文件批量生成 `_publications/` 与 `_talks/` 下的 Markdown 条目。
- `scripts/cv_markdown_to_json.py`：将 `_pages/cv.md` 转换为 `_data/cv.json`。
- `talkmap.py`：根据 talks 数据生成讲座地图。

---

更多模板信息可参考：<https://academicpages.github.io/>
