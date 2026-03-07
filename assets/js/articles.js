// Articles filtering and pagination
(function() {
  const POSTS_PER_PAGE = 9;
  let currentCategory = 'all';
  let currentPage = 1;
  let allPosts = [];

  function init() {
    extractPosts();
    renderFilterTabs();
    renderPosts();
    renderPagination();
  }

  function extractPosts() {
    const postElements = document.querySelectorAll('.article-card');
    allPosts = Array.from(postElements).map(el => ({
      element: el,
      category: el.dataset.category || 'article'
    }));
  }

  function getFilteredPosts() {
    if (currentCategory === 'all') {
      return allPosts;
    }
    return allPosts.filter(post => 
      post.category.toLowerCase() === currentCategory.toLowerCase()
    );
  }

  function getPagedPosts(posts) {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return posts.slice(start, end);
  }

  function getTotalPages(posts) {
    return Math.ceil(posts.length / POSTS_PER_PAGE);
  }

  function renderFilterTabs() {
    const tabsContainer = document.getElementById('filter-tabs');
    if (!tabsContainer) return;

    const categories = ['all', ...new Set(allPosts.map(p => p.category.toLowerCase()))];
    
    const categoryLabels = {
      'all': 'All',
      'tutorial': 'Tutorial',
      'deep dive': 'Deep Dive',
      'comparison': 'Comparison',
      'trends': 'Trends',
      'case study': 'Case Study'
    };

    tabsContainer.innerHTML = categories.map(cat => `
      <button 
        class="filter-tab px-4 py-2 rounded-full text-sm font-medium transition ${cat === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}"
        data-category="${cat}"
      >
        ${categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        currentCategory = tab.dataset.category;
        currentPage = 1;
        updateActiveTab();
        renderPosts();
        renderPagination();
      });
    });
  }

  function updateActiveTab() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      if (tab.dataset.category === currentCategory) {
        tab.classList.remove('bg-gray-800', 'text-gray-400');
        tab.classList.add('bg-blue-600', 'text-white');
      } else {
        tab.classList.remove('bg-blue-600', 'text-white');
        tab.classList.add('bg-gray-800', 'text-gray-400');
      }
    });
  }

  function renderPosts() {
    const filtered = getFilteredPosts();
    const paged = getPagedPosts(filtered);

    allPosts.forEach(post => {
      const isVisible = paged.includes(post);
      post.element.style.display = isVisible ? '' : 'none';
    });
  }

  function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const filtered = getFilteredPosts();
    const totalPages = getTotalPages(filtered);

    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let html = '';

    html += `
      <button 
        class="page-btn px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-400 hover:text-white transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
        data-page="prev"
        ${currentPage === 1 ? 'disabled' : ''}
      >
        ← Prev
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <button 
          class="page-btn px-4 py-2 rounded-lg text-sm font-medium transition ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}"
          data-page="${i}"
        >
          ${i}
        </button>
      `;
    }

    html += `
      <button 
        class="page-btn px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-400 hover:text-white transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
        data-page="next"
        ${currentPage === totalPages ? 'disabled' : ''}
      >
        Next →
      </button>
    `;

    paginationContainer.innerHTML = html;

    paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        const filtered = getFilteredPosts();
        const total = getTotalPages(filtered);

        if (page === 'prev' && currentPage > 1) {
          currentPage--;
        } else if (page === 'next' && currentPage < total) {
          currentPage++;
        } else if (page !== 'prev' && page !== 'next') {
          currentPage = parseInt(page);
        }

        renderPosts();
        renderPagination();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
