/**
 * 七夕浪漫页面交互脚本
 * 功能：浮动爱心、点击爆炸、心跳计数、打字机文案、许愿弹窗
 */
(function () {
  'use strict';

  /* ---------- 工具函数 ---------- */

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  /* ---------- 1. 星空背景 ---------- */

  function createStars(count) {
    var container = document.getElementById('qixi-stars');
    if (!container) return;
    for (var i = 0; i < count; i++) {
      var star = document.createElement('div');
      star.className = 'qixi-star';
      var size = rand(1, 3);
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = rand(0, 100) + '%';
      star.style.top = rand(0, 100) + '%';
      star.style.setProperty('--twinkle-duration', rand(2, 5) + 's');
      star.style.animationDelay = rand(0, 3) + 's';
      container.appendChild(star);
    }
  }

  /* ---------- 2. 浮动爱心 ---------- */

  var heartEmojis = ['💗', '💕', '💖', '💝', '❤️', '🌹'];
  var heartsContainer = null;
  var floatTimer = null;

  function spawnFloatingHeart() {
    if (!heartsContainer) return;
    var heart = document.createElement('span');
    heart.className = 'qixi-heart';
    heart.textContent = heartEmojis[randInt(0, heartEmojis.length - 1)];
    heart.style.left = rand(0, 100) + '%';
    heart.style.setProperty('--heart-size', rand(16, 36) + 'px');
    heart.style.setProperty('--float-duration', rand(6, 12) + 's');
    heart.style.setProperty('--drift-x', rand(-60, 60) + 'px');
    heart.style.setProperty('--heart-opacity', rand(0.4, 0.9));
    heartsContainer.appendChild(heart);
    setTimeout(function () {
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 12000);
  }

  function startFloatingHearts() {
    heartsContainer = document.getElementById('qixi-hearts');
    if (!heartsContainer) return;
    // 初始批量
    for (var i = 0; i < 5; i++) {
      setTimeout(spawnFloatingHeart, i * 400);
    }
    // 持续生成
    floatTimer = setInterval(spawnFloatingHeart, 800);
  }

  /* ---------- 3. 点击爆炸爱心 ---------- */

  function createBurst(x, y) {
    var count = randInt(6, 10);
    for (var i = 0; i < count; i++) {
      var heart = document.createElement('span');
      heart.className = 'qixi-burst-heart';
      heart.textContent = heartEmojis[randInt(0, heartEmojis.length - 1)];
      heart.style.left = x + 'px';
      heart.style.top = y + 'px';
      var angle = (Math.PI * 2 * i) / count + rand(-0.3, 0.3);
      var distance = rand(50, 120);
      heart.style.setProperty('--burst-x', Math.cos(angle) * distance + 'px');
      heart.style.setProperty('--burst-y', Math.sin(angle) * distance + 'px');
      heart.style.setProperty('--burst-size', rand(16, 30) + 'px');
      document.body.appendChild(heart);
      (function (h) {
        setTimeout(function () {
          if (h.parentNode) h.parentNode.removeChild(h);
        }, 800);
      })(heart);
    }
  }

  /* ---------- 4. 心动计数器 ---------- */

  var counter = 0;
  var counterEl = null;

  function bumpCounter() {
    counter++;
    if (!counterEl) return;
    counterEl.textContent = counter;
    counterEl.classList.remove('bump');
    void counterEl.offsetWidth; // 触发重绘
    counterEl.classList.add('bump');
  }

  /* ---------- 5. 打字机文案 ---------- */

  function typewriter(element, text, speed, callback) {
    if (!element) return;
    var i = 0;
    element.textContent = '';
    var cursor = document.createElement('span');
    cursor.className = 'qixi-cursor';
    element.appendChild(cursor);

    function type() {
      if (i < text.length) {
        cursor.insertAdjacentText('beforebegin', text.charAt(i));
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(function () {
          if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
          if (callback) callback();
        }, 2000);
      }
    }
    type();
  }

  /* ---------- 6. 许愿弹窗 ---------- */

  function initWishModal() {
    var modal = document.getElementById('qixi-wish-modal');
    var openBtn = document.getElementById('qixi-wish-btn');
    var closeBtn = document.getElementById('qixi-wish-cancel');
    var submitBtn = document.getElementById('qixi-wish-submit');
    var textarea = document.getElementById('qixi-wish-text');
    var formView = document.getElementById('qixi-wish-form');
    var resultView = document.getElementById('qixi-wish-result');

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', function () {
      modal.classList.add('active');
      formView.style.display = 'block';
      resultView.classList.remove('show');
      if (textarea) textarea.value = '';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        modal.classList.remove('active');
      });
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('active');
    });

    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        var wish = textarea ? textarea.value.trim() : '';
        var messages = [
          '🌟 你的愿望已化作星光，飘向了银河深处……',
          '💫 愿望已送达月老案前，静待缘分降临～',
          '🏮 心诚则灵，你的心愿已被星空收录！',
          '🌙 今夜的星空，为你多亮了一颗星。'
        ];
        resultView.textContent = messages[randInt(0, messages.length - 1)];
        formView.style.display = 'none';
        resultView.classList.add('show');
        // 爆发爱心庆祝
        var rect = submitBtn.getBoundingClientRect();
        createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        bumpCounter();
      });
    }
  }

  /* ---------- 7. 点击页面任意位置产生爱心 ---------- */

  function initClickHearts() {
    document.addEventListener('click', function (e) {
      // 排除按钮和链接
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('textarea')) return;
      createBurst(e.clientX, e.clientY);
      bumpCounter();
    });
  }

  /* ---------- 初始化 ---------- */

  function init() {
    createStars(80);
    startFloatingHearts();

    counterEl = document.getElementById('qixi-counter-num');
    var poemEl = document.getElementById('qixi-poem');
    var poemText = '迢迢牵牛星，皎皎河汉女。\n纤纤擢素手，札札弄机杼。\n终日不成章，泣涕零如雨。\n河汉清且浅，相去复几许。\n盈盈一水间，脉脉不得语。';

    // 延迟启动打字机，让页面先渲染
    setTimeout(function () {
      typewriter(poemEl, poemText, 120);
    }, 600);

    initWishModal();
    initClickHearts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
