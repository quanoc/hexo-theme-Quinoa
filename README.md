<div align="center">

# 📚 hexo-theme-Quinoa

<p align="center">
  <a href="https://waisec.cn/" target="_blank">
    <img src="./source/images/SitePreview2.jpg" alt="Quinoa Preview" width="800">
  </a>
</p>

<p align="center">
  <a href="./README_zh-CN.md">🇨🇳 中文文档</a> •
  <a href="https://waisec.cn/">🌐 Live Demo</a> •
  <a href="#-quick-start">🚀 Quick Start</a> •
  <a href="#-features">✨ Features</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hexo-3.6+-0e83cd?style=flat-square&logo=hexo" alt="Hexo Version">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Node-v18+-339933?style=flat-square&logo=nodedotjs" alt="Node Version">
</p>

> **A modern, elegant Hexo theme designed for personal knowledge management and documentation.**
> 
> Built for thinkers, writers, and knowledge builders who value clarity and seamless navigation.

</div>

---

## ✨ Features

### 🧭 Dual-Mode Routing System
- **Full-Site Mode (SPA)**: Hash-based navigation with smooth transitions, sidebar navigation, and full wiki experience. Access via `?fullpage=1` parameter
- **Single-Page Mode (Standalone)**: Clean, shareable pages without parameters - perfect for external linking and embedding
- **Seamless Toggle**: Switch between modes instantly without losing context

### 📖 Knowledge-First Design
- **Hierarchical Categories**: Multi-level category tree in sidebar with expandable/collapsible sections
- **Full-Text Search**: Lightning-fast client-side search powered by Insight Search
- **Wiki-Style Navigation**: Designed specifically for interconnected knowledge bases, not just blogs

### 📱 Responsive & Mobile-Optimized
- **Mobile-First Approach**: Collapsible sidebar, touch-friendly interface
- **Adaptive Layout**: Optimized reading experience across all devices
- **Smart Toolbar**: Context-aware actions for mobile users

### 🎨 Modern Aesthetics
- **Clean Typography**: Optimized for long-form reading
- **Code Highlighting**: Syntax highlighting with multiple themes
- **Image Gallery**: Built-in lightbox and justified gallery support
- **Dark Mode Ready**: Easy to customize color schemes

### 🔧 Developer-Friendly
- **Version Control Integration**: GitHub/GitLab history tracking per article
- **Plugin Ecosystem**: MathJax, Mermaid diagrams, music player, encrypted posts
- **SEO Optimized**: Sitemap, RSS feeds, Open Graph meta tags
- **Analytics Ready**: Google Analytics, Baidu Analytics, Busuanzi visitor stats

### 🤖 AI-Ready Architecture
- **Markdown Native**: Perfect for AI content generation and processing
- **Static Site**: Easy for AI crawlers to index and build knowledge bases
- **Git Workflow**: AI can participate in content review and version control
- **Data Sovereignty**: Complete ownership of your knowledge data

---

## 🆚 Quinoa vs Notion

> **Why choose Quinoa over Notion?** Here's the comparison:

| Feature | **Quinoa** | **Notion** |
|---------|------------|------------|
| **Data Ownership** | ✅ Full control (Git-managed) | ⚠️ Hosted on Notion servers |
| **AI-Friendly** | ✅ Markdown native, static HTML | ⚠️ Proprietary format |
| **SEO** | ✅ Search engine optimized | ⚠️ Limited SEO capabilities |
| **Embedding** | ✅ Clean standalone pages (default) | ⚠️ Branded embeds |
| **Cost** | ✅ Free (domain + server only) | 💰 Paid for advanced features |
| **Offline Access** | ✅ Full static files | ⚠️ Requires caching |
| **Real-time Collab** | ❌ Git workflow | ✅ Multiplayer editing |
| **Database** | ❌ File-based | ✅ Built-in databases |

**Choose Quinoa when:** You want full data control, AI-ready content, SEO optimization, and the ability to embed clean pages anywhere.

**Choose Notion when:** You need real-time collaboration and built-in databases.

---

## 🚀 Quick Start

### Prerequisites
- **Hexo**: v3.6 or higher
- **Node.js**: v18+ recommended
- **npm**: v10+ recommended

### Installation

```bash
# 1. Navigate to your Hexo site directory
cd your-hexo-site

# 2. Clone the theme
git clone https://github.com/quanoc/hexo-theme-Quinoa.git themes/Quinoa

# 3. Copy required template files
cp -rf themes/Quinoa/_source/* source/
cp -rf themes/Quinoa/_scaffolds/* scaffolds/

# 4. Create theme configuration
cp themes/Quinoa/_config.yml.example themes/Quinoa/_config.yml

# 5. Install required plugins
npm install --save hexo-autonofollow hexo-directory-category hexo-generator-feed hexo-generator-json-content hexo-generator-sitemap hexo-abbrlink hexo-permalink-pinyin pinyin
```

### Enable the Theme

Edit your site's `_config.yml`:

```yaml
theme: Quinoa
```

### Start Writing

```bash
hexo new "My Knowledge Article"
hexo server
```

---

## ⚙️ Configuration

### Site Configuration (`_config.yml`)

```yaml
# URL Structure (Wiki-style permalinks)
# Option 1: Short ID (Recommended) - Clean, shareable URLs
permalink: wiki/:abbrlink/:slug/

# Option 2: Short ID + Pinyin (Readable) - Good for Chinese content
# permalink: wiki/:abbrlink/:pinyin_title/

# Option 3: Title-based (Original) - May contain Chinese characters
# permalink: wiki/:title/

# Skip rendering for special files
skip_render:
  - README.md
  - '_posts/**/embed_page/**'

# Writing settings
new_post_name: :title.md

# Markdown rendering
marked:
  gfm: true

# Search configuration
jsonContent:
  meta: false
  pages:
    title: true
    date: true
    path: true
    text: true
  posts:
    title: true
    date: true
    path: true
    text: true
    tags: true
    categories: true
  ignore:
    - 404.html

# SEO
sitemap:
  path: sitemap.xml

nofollow:
  enable: true
  exclude:
    - your-domain.com

# Short URL Configuration (requires hexo-abbrlink)
abbrlink:
  alg: crc32      # Algorithm: crc16 (default) or crc32
  rep: hex        # Format: hex (default) or dec
  drafts: false   # Process draft posts

# Pinyin URL Configuration (requires hexo-permalink-pinyin)
# Auto-generates readable pinyin slugs for Chinese titles
permalink_pinyin:
  enable: true
  separator: '-'     # Separator between pinyin words
  lowercase: true    # Convert to lowercase
  transform: title   # Transform title to pinyin
  # Note: For abbreviated pinyin (e.g., rhsy-hexo), manually specify slug in front-matter:
  # ---
  # title: 如何使用 Hexo
  # slug: rhsy-hexo
  # ---
```

### Theme Configuration (`themes/Quinoa/_config.yml`)

> ⚠️ **Important**: Replace personal information with your own!

```yaml
# Customize your site identity
customize:
    sidebar: left              # Sidebar position: left | right
    category_perExpand: false  # Auto-expand categories
    default_index_file: index.md  # Use specific page as homepage
    
    # Social links
    social_links:
        github: https://github.com/yourname
        rss: /atom.xml

# Widgets (sidebar components)
widgets:
    - category
    # - recent_posts
    # - archive
    # - tag
    # - tagcloud
    # - links

# Git version control integration
history_control:
    enable: true
    server_link: https://github.com
    user: <your-github-username>
    repertory: <your-repo-name>
    branch: master

# Search
search:
    insight: true    # Requires hexo-generator-json-content
    
# Analytics
plugins:
    busuanzi_count: true    # Visitor statistics
    google_analytics:       # GA tracking ID
    baidu_analytics:        # Baidu tracking ID
```

---

## 🖼️ Screenshots

<div align="center">

| Desktop View | Mobile View |
|:------------:|:-----------:|
| ![Desktop](./source/images/SitePreview2.jpg) | ![Mobile](./source/images/mobile1.jpg) |

</div>

---

## 📚 Documentation

### Core Concepts

| Feature | Description |
|---------|-------------|
| **SPA Routing** | Hash-based navigation via `?fullpage=1` for seamless browsing without page reloads |
| **Standalone Mode** | Clean, shareable pages without parameters - perfect for external linking |
| **Category Tree** | Hierarchical organization with expandable sidebar navigation |
| **Full-Text Search** | Instant search across all your content |

### Writing Tips

1. **Organize with Categories**: Use directory structure for automatic categorization
2. **Link Freely**: Internal links work seamlessly in both SPA and standalone modes
3. **Embed Media**: Support for images, videos, code blocks, and interactive diagrams
4. **Version Control**: Enable `history_control` to track changes via Git

### 🤖 AI Agent Use Cases

Quinoa's architecture is perfectly suited for AI-powered workflows:

#### 1. **AI Knowledge Base Builder**
```bash
# Workflow: AI-Assisted Documentation
AI generates content → Markdown files → Git commit → Hexo build → Quinoa deploy
```
- Use ChatGPT/Claude to generate technical docs
- Store in Git for version control
- Auto-deploy via CI/CD pipeline

#### 2. **RAG (Retrieval-Augmented Generation) Source**
- Static HTML pages are easily crawled by AI
- Build vector databases from your Quinoa site
- Use as knowledge source for AI assistants

#### 3. **AI Chatbot Integration**
```html
<!-- Embed clean standalone pages in AI chat interfaces -->
<iframe src="https://your-wiki.com/article/"></iframe>
```
- Single-page mode provides context to AI agents
- No navigation clutter for AI parsing

#### 4. **Automated Content Pipeline**
```yaml
# Example: GitHub Actions + AI
1. AI monitors code changes
2. Auto-generates documentation
3. Creates pull request
4. Merges → Auto-deploys to Quinoa site
```

#### 5. **Personal AI Second Brain**
- Write notes in Markdown (AI-friendly)
- Organize hierarchically with categories
- Full-text search enables quick retrieval
- Git history tracks idea evolution

---

## 🔄 Updates

```bash
cd themes/Quinoa
git pull origin master
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

**Made with ❤️ for knowledge builders**

[⬆ Back to Top](#-hexo-theme-quinoa)

</div>
