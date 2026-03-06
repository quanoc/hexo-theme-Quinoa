# URL 优化指南

> 解决中文 URL 过长、不利于分享的问题

## 问题背景

Hexo 默认使用文章标题作为 URL，对于中文标题会产生以下问题：

- URL 过长：`/wiki/如何使用-Hexo-搭建个人博客/`
- 中文字符编码：`/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8/`
- 不利于 SEO 和分享

## 解决方案

### 方案 1：短链接（hexo-abbrlink）

| 方案 | 示例 URL |
|------|----------|
| 原始（中文标题） | `/wiki/如何使用-Hexo-搭建个人博客/` |
| 短链接 | `/wiki/a3f8b2d/` |

### 方案 2：短链接 + 拼音（推荐中文用户）

| 方案 | 示例 URL | 说明 |
|------|----------|------|
| 完整拼音 | `/wiki/a3f8b2d/ru-he-shi-yong-hexo-da-jian-ge-ren-bo-ke/` | 自动生成，较长 |
| 精简拼音 | `/wiki/a3f8b2d/hexo-guide/` | 手动指定 slug |
| 首字母缩写 | `/wiki/a3f8b2d/rhsy-hexo/` | 手动指定 slug |

### 安装步骤

```bash
# 在 Hexo 站点目录下安装插件
npm install hexo-abbrlink --save
```

### 配置说明

#### 1. 修改站点 `_config.yml`

```yaml
# URL 结构 - 使用短链接
permalink: wiki/:abbrlink/

# 短链接配置
abbrlink:
  alg: crc32      # 算法：crc16 (默认) 或 crc32
  rep: hex        # 格式：hex (十六进制) 或 dec (十进制)
  drafts: false   # 是否处理草稿文章
```

#### 2. 生成短链接

```bash
# 清理缓存（首次配置必须执行）
hexo clean

# 生成静态文件
hexo generate

# 启动本地服务器查看效果
hexo server
```

### 工作原理

1. **自动生成**：插件基于文章标题自动生成唯一短 ID
2. **固定不变**：短 ID 存储在文章 front-matter 中，修改标题不影响 URL
3. **唯一性保证**：使用 CRC 算法确保每篇文章有唯一标识

### 文章 front-matter 示例

```markdown
---
title: 如何使用 Hexo 搭建个人博客
date: 2024-03-07 10:00:00
abbrlink: a3f8b2d    # 自动生成的短链接 ID
---

文章内容...
```

### 配置选项详解

| 参数 | 可选值 | 说明 | 推荐 |
|------|--------|------|------|
| `alg` | `crc16` / `crc32` | 生成算法 | `crc32`（冲突更少） |
| `rep` | `hex` / `dec` | 输出格式 | `hex`（更短） |
| `drafts` | `true` / `false` | 处理草稿 | `false` |

### 不同配置的效果

```yaml
# 配置 A：crc32 + hex（推荐）
abbrlink:
  alg: crc32
  rep: hex
# 结果：/wiki/a3f8b2d/

# 配置 B：crc16 + dec
abbrlink:
  alg: crc16
  rep: dec
# 结果：/wiki/12345/
```

## 迁移现有文章

### 步骤 1：备份

```bash
# 备份站点
cp -r your-hexo-site your-hexo-site-backup
```

### 步骤 2：安装插件并配置

按上述安装步骤操作。

### 步骤 3：批量生成短链接

```bash
hexo clean
hexo generate
```

插件会自动为所有文章生成 `abbrlink` 字段。

### 步骤 4：处理旧链接（可选）

如果已有外部链接指向旧 URL，可以设置重定向：

```yaml
# 在文章 front-matter 中添加
redirect_from:
  - /旧的中文标题/
```

或使用服务器级别的 301 重定向。

## 进阶用法

### 结合自定义 slug（精简拼音）

对于中文标题，可以手动指定精简的拼音或英文 slug：

```yaml
# _config.yml
permalink: wiki/:abbrlink/:slug/
```

```markdown
---
title: 如何使用 Hexo 搭建个人博客
abbrlink: a3f8b2d
slug: hexo-guide    # 手动指定精简 slug
---
```

**URL 结果**：`/wiki/a3f8b2d/hexo-guide/`

#### 精简策略对比

| 策略 | 示例 | 适用场景 |
|------|------|---------|
| 完整拼音 | `ru-he-shi-yong-hexo-da-jian-ge-ren-bo-ke` | 自动生成，无需干预 |
| 关键词提取 | `hexo-da-jian` | 提取核心关键词 |
| 首字母缩写 | `rhsy-hexo-djgrbk` | 极短 URL |
| 英文意译 | `hexo-setup-guide` | 国际化，SEO 最佳 |

**推荐做法**：
- 普通文章：使用完整拼音（自动生成）
- 重要文章：手动指定英文或精简拼音 slug
- 系列文章：统一前缀，如 `hexo-01`, `hexo-02`...

### 按年份组织

```yaml
# _config.yml
permalink: wiki/:year/:abbrlink/
```

**URL 结果**：`/wiki/2024/a3f8b2d/`

## 常见问题

### Q1：短链接会影响 SEO 吗？

**不会**。短链接对 SEO 更友好：
- 加载速度更快
- 易于分享和传播
- 避免中文编码问题

### Q2：修改标题后 URL 会变吗？

**不会**。`abbrlink` 一旦生成就固定不变，修改标题不影响 URL。

### Q3：如何查看文章的短链接？

在文章文件的 front-matter 中查看 `abbrlink` 字段：

```markdown
---
title: 我的文章
abbrlink: 8f3a9b2    # 这就是短链接 ID
---
```

### Q4：可以手动指定短链接吗？

**可以**。直接在 front-matter 中设置：

```markdown
---
title: 我的文章
abbrlink: my-custom-id
---
```

**URL 结果**：`/wiki/my-custom-id/`

### Q5：短链接会冲突吗？

概率极低。CRC32 算法产生冲突的概率约为 1/2^32，对于个人博客几乎可以忽略。

## 总结

| 特性 | 评价 |
|------|------|
| 安装难度 | ⭐ 简单 |
| 维护成本 | ⭐ 极低（自动生成） |
| 分享友好度 | ⭐⭐⭐ 优秀 |
| SEO 友好度 | ⭐⭐⭐ 优秀 |
| 迁移难度 | ⭐⭐ 中等（需处理旧链接） |

**推荐所有用户启用短链接功能**，特别是对于中文内容的博客。
