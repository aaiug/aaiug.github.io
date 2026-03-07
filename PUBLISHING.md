# Publishing Articles on Blog AAIUG

This guide explains how to publish a new article on the Blog AAIUG Jekyll site.

---

## Prerequisites

1. Ruby installed on your machine
2. Jekyll and Bundler installed

```bash
gem install jekyll bundler
```

---

## Creating a New Article

### Step 1: Create the Article File

Create a new Markdown file in the `_posts/` directory with the naming convention:

```
YYYY-MM-DD-title-of-your-article.md
```

For example:
```
2026-03-06-getting-started-with-agentic-ai.md
```

### Step 2: Add Front Matter

Every article needs YAML front matter at the top:

```yaml
---
layout: post
title: "Your Article Title"
description: "A brief description for SEO and social sharing"
date: 2026-03-06
author: "Your Name"
author_twitter: "yourhandle"
author_github: "yourhandle"
author_linkedin: "yourprofile"
category: tutorial
tags: [agentic-ai, tutorial, getting-started]
read_time: 5
---
```

### Step 3: Write Your Content

Write your article in Markdown. Here's a basic structure:

```markdown
## Introduction

Your introduction paragraph here.

## Main Section

Your main content here.

### Subsection

More content...

## Conclusion

Your conclusion here.
```

### Step 4: Add Images

Place images in `assets/images/` and reference them in your content:

```markdown
![Image description](/assets/images/your-image.jpg)
```

---

## Front Matter Options

| Field | Required | Description |
|-------|----------|-------------|
| `layout` | Yes | Use `post` for articles |
| `title` | Yes | Article title |
| `description` | No | SEO description (recommended) |
| `date` | Yes | Publication date |
| `author` | No | Author name |
| `author_twitter` | No | Twitter handle |
| `author_github` | No | GitHub username |
| `author_linkedin` | No | LinkedIn username |
| `category` | No | Category (tutorial, deep-dive, etc.) |
| `tags` | No | Array of tags |
| `read_time` | No | Estimated read time in minutes |

---

## Testing Locally

```bash
# Navigate to the project
cd blog-aaiug-org

# Install dependencies
bundle install

# Load chruby
source /opt/homebrew/opt/chruby/share/chruby/chruby.sh
source /opt/homebrew/opt/chruby/share/chruby/auto.sh

# Set Ruby version
chruby ruby-3.4.1

# Start local server
bundle exec jekyll serve

# View at http://localhost:4000
```

---

## Publishing

### Option 1: GitHub Pages (Recommended)

1. Push your changes to the `main` branch
2. Go to repository Settings → Pages
3. Source should be set to "Deploy from a branch"
4. Branch: `main`, Folder: `/ (root)`
5. Your site will be published at `https://blog.aaiug.org`

### Option 2: Custom Domain

1. In GitHub Pages settings, add your custom domain
2. Update DNS records as instructed by GitHub

---

## Article Categories

Use consistent categories:
- `tutorial` - How-to guides
- `deep-dive` - Comprehensive analysis
- `comparison` - Comparing tools/frameworks
- `trends` - Industry trends
- `case-study` - Real-world examples

---

## Tips

1. **Keep titles concise** - Under 60 characters for SEO
2. **Add description** - 150-160 characters for SEO
3. **Use images** - Featured images improve engagement
4. **Add tags** - Helps with searchability
5. **Check links** - Ensure all internal links work

---

## Need Help?

- GitHub: https://github.com/aaiug
- Email: hello@aaiug.org
