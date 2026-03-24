---
layout: default
title: Blog
description: Insights, tutorials, and articles on Agentic AI and autonomous agents
---

<header class="relative pt-32 pb-16 px-6 text-center overflow-hidden">
  <div class="hero-glow"></div>
  <div class="max-w-4xl mx-auto">
    <div class="inline-block px-4 py-1.5 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mono">
      The Agentic AI Blog
    </div>
    <h1 class="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
      Articles & <span class="text-gradient">Insights</span>
    </h1>
    <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
      Deep dives, tutorials, and latest developments in Agentic AI, autonomous agents, and AI engineering.
    </p>
  </div>
</header>

<section class="max-w-7xl mx-auto px-6 py-12">
  <!-- Filter Tabs -->
  <div id="filter-tabs" class="flex flex-wrap gap-2 mb-8 justify-center">
    <!-- Tabs rendered by JavaScript -->
  </div>

  <!-- Articles Grid -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {% for post in site.posts %}
    <div class="article-card p-6 border border-gray-800 rounded-2xl bg-gray-900/50 card-hover" data-category="{{ post.category | default: 'Article' }}">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs text-gray-500">{{ post.category | default: "Article" }}</span>
        <span class="text-xs text-gray-600">•</span>
        <span class="text-xs text-gray-500">{{ post.read_time | default: 5 }} min read</span>
      </div>
      <h3 class="text-xl font-bold mb-2 text-white">{{ post.title }}</h3>
      <p class="text-gray-400 text-sm mb-4 leading-relaxed">
        {{ post.description }}
      </p>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">{{ post.date | date: "%B %d, %Y" }}</span>
        <a href="{{ post.url }}" class="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition">
          Read Article →
        </a>
      </div>
    </div>
    {% endfor %}
  </div>

  <!-- Pagination -->
  <div id="pagination" class="flex justify-center gap-2 mt-12">
    <!-- Pagination rendered by JavaScript -->
  </div>
</section>

<section class="max-w-4xl mx-auto px-6 py-16 text-center">
  <div class="border border-gray-800 rounded-2xl bg-gray-900/50 p-8">
    <h2 class="text-2xl font-bold mb-4 text-white">Want to Contribute?</h2>
    <p class="text-gray-400 mb-6">
      Share your knowledge with the Agentic AI community. We're always looking for guest authors.
    </p>
    <a
      href="mailto:write4us@aaiug.org"
      class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition"
    >
      Write for Us
    </a>
  </div>
</section>

<script src="{{ site.baseurl }}/assets/js/articles.js"></script>
