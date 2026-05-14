/* ══════════════════════════════════════════════════════════
   main.js – Giacomo Cappon personal website
   ══════════════════════════════════════════════════════════ */

/* ── Publication filter & show-more ─────────────────────────── */

const INITIAL_SET = [42, 41, 40, 39, 38, 37, 36, 35];
let allShown = false;

/**
 * Returns true if a pub-item belongs to the default visible set.
 * @param {HTMLElement} item
 */
function isInInitialSet(item) {
  const num = parseInt(item.querySelector('.pub-num').textContent.replace('J', ''), 10);
  return INITIAL_SET.includes(num);
}

/**
 * Filter publication list by tag keyword.
 * @param {string}      tag - data-tags value to match, or 'all'
 * @param {HTMLElement} btn - the clicked filter button
 */
function filterPubs(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const items       = document.querySelectorAll('.pub-item');
  const showMoreBtn = document.getElementById('showMoreBtn');

  if (tag === 'all') {
    items.forEach(item => {
      item.style.display = '';
      if (!allShown) {
        item.classList.toggle('pub-hidden', !isInInitialSet(item));
      }
    });
    showMoreBtn.style.display = '';
  } else {
    items.forEach(item => {
      const tags = item.getAttribute('data-tags') || '';
      item.style.display = tags.includes(tag) ? '' : 'none';
      item.classList.remove('pub-hidden');
    });
    showMoreBtn.style.display = 'none';
  }
}

/**
 * Toggle between showing all publications and the initial set.
 */
function toggleAllPubs() {
  allShown = !allShown;
  const btn = document.getElementById('showMoreBtn');

  document.querySelectorAll('.pub-item').forEach(item => {
    item.style.display = '';
    item.classList.remove('pub-hidden');
  });

  if (!allShown) {
    document.querySelectorAll('.pub-item').forEach(item => {
      item.classList.toggle('pub-hidden', !isInInitialSet(item));
    });
    btn.textContent = 'Show all 42 journal papers ↓';
  } else {
    btn.textContent = 'Show fewer ↑';
  }
}
