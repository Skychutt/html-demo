/**
 * 前端基础教程 - 共享交互脚本
 */
(function () {
  'use strict';

  // 移动端菜单切换
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const sidebar = document.querySelector('.sidebar');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // 侧边栏目录切换（移动端）
  if (sidebar) {
    let tocToggle = document.querySelector('.toc-toggle');
    if (!tocToggle) {
      tocToggle = document.createElement('button');
      tocToggle.className = 'toc-toggle menu-toggle';
      tocToggle.type = 'button';
      tocToggle.textContent = '📑 章节目录';
      tocToggle.style.cssText = 'display:none;width:100%;margin-bottom:0.75rem;';
      sidebar.insertBefore(tocToggle, sidebar.firstChild.nextSibling);
      if (window.matchMedia('(max-width: 900px)').matches) {
        tocToggle.style.display = 'block';
      }
      window.matchMedia('(max-width: 900px)').addEventListener('change', function (e) {
        tocToggle.style.display = e.matches ? 'block' : 'none';
        if (!e.matches) sidebar.classList.remove('open');
      });
    }
    tocToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      tocToggle.textContent = sidebar.classList.contains('open') ? '✕ 关闭目录' : '📑 章节目录';
    });
  }

  // 复制代码按钮
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const block = btn.closest('.code-block');
      const code = block ? block.querySelector('pre') : null;
      if (!code) return;

      navigator.clipboard.writeText(code.textContent).then(function () {
        const original = btn.textContent;
        btn.textContent = '已复制 ✓';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // 目录高亮：滚动时标记当前章节
  const tocLinks = document.querySelectorAll('.toc a');
  const sections = document.querySelectorAll('section[id]');

  if (tocLinks.length && sections.length) {
    function updateActiveToc() {
      let current = '';
      sections.forEach(function (section) {
        const top = section.getBoundingClientRect().top;
        if (top <= 100) {
          current = section.getAttribute('id');
        }
      });

      tocLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveToc, { passive: true });
    updateActiveToc();
  }

  // 点击目录链接后关闭移动端侧边栏
  tocLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (sidebar && window.innerWidth <= 900) {
        sidebar.classList.remove('open');
      }
    });
  });
})();
