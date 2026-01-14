<template>
  <div class="home">
    <header class="site-header">
      <div class="container">
        <div class="logo">
          <img src="/images/logo.webp" alt="Gimjo Logo" class="logo-image" />
          <span class="logo-text">Gimjo</span>
        </div>
        <nav class="nav" aria-label="Main navigation">
          <a class="nav-link" href="/">Home</a>
          <div class="nav-link" @click="scrollTo('about')">Game Info</div>
          <div class="nav-link" @click="scrollTo('games')">All Games</div>
        </nav>
      </div>
    </header>

    <main>
      <div class="container">
        <section class="game-layout">
          <div
            class="game-content"
            :class="{ 'page-fullscreen': isPageFullscreen, 'is-playing': isPlaying }"
          >
            <section ref="gameRef" class="game-section">
              <h1 class="game-title">Play {{ currentGame?.title || 'Tower Jump' }} Online</h1>
              <p class="game-subtitle">Lightweight, fast, play instantly</p>
              <div class="game-iframe-container">
                <div class="game-iframe-wrapper">
                  <iframe
                    ref="gameIframe"
                    class="game-iframe"
                    :class="{ 'is-visible': isPlaying }"
                    :src="isPlaying ? iframeSrc : undefined"
                    :title="currentGame?.title || 'Tower Jump'"
                    allowfullscreen
                    allow="autoplay; fullscreen; gamepad; microphone; camera; payment; geolocation"
                    @load="onFrameLoad"
                  ></iframe>

                  <div v-if="!isPlaying" class="game-play-overlay" style="z-index: 10">
                    <div class="overlay-backdrop"></div>
                    <div class="overlay-content">
                      <img
                        class="overlay-logo"
                        :src="currentGame?.imageUrl || '/images/logo.png'"
                        alt="Game logo"
                        width="96"
                        height="96"
                      />
                      <button
                        type="button"
                        class="play-button"
                        aria-label="Play game"
                        title="Play"
                        @click="startPlay"
                      >
                        <svg
                          class="play-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M8 5v14l11-7z" fill="currentColor" />
                        </svg>
                        <span class="play-text">PLAY</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 操作栏：左标题，右侧全屏/网页全屏按钮 -->
              <div class="game-controls">
                <div class="controls-title">{{ currentGame?.title || 'Tower Jump' }}</div>
                <div class="controls-actions">
                  <button
                    class="control-btn"
                    @click="toggleFullscreen"
                    title="Fullscreen"
                    aria-label="Fullscreen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </button>
                  <button
                    class="control-btn"
                    @click="togglePageFullscreen"
                    title="Page Fullscreen"
                    aria-label="Page Fullscreen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            <!-- Hot Games 板块 -->
            <section v-if="hotGames.length > 0" class="hot-games-section">
              <h2 class="section-title">Hot Games</h2>
              <div class="hot-games-grid">
                <a
                  v-for="game in hotGames"
                  :key="game.id"
                  :href="getGameUrl(game)"
                  class="hot-game-card"
                >
                  <div class="hot-game-thumb">
                    <img :src="game.imageUrl" :alt="game.imageAlt || game.title" />
                  </div>
                  <div class="hot-game-meta">
                    <h3 class="hot-game-title">{{ game.title }}</h3>
                  </div>
                </a>
              </div>
            </section>

            <section id="about" ref="aboutRef" class="about-section">
              <h2 class="section-title">Game Info: {{ currentGame?.title || 'Tower Jump' }}</h2>
              <div class="about-content" v-html="currentGame?.detailsHtml"></div>
            </section>
          </div>

          <aside class="comments-sidebar">
            <!-- New Games 板块 -->
            <section v-if="newGames.length > 0" class="new-games-section">
              <h3 class="panel-title">New Games</h3>
              <div class="new-games-grid">
                <a
                  v-for="game in newGames"
                  :key="game.id"
                  :href="getGameUrl(game)"
                  class="new-game-card"
                >
                  <div class="new-game-thumb">
                    <img :src="game.imageUrl" :alt="game.imageAlt || game.title" />
                  </div>
                  <div class="new-game-meta">
                    <h4 class="new-game-title">{{ game.title }}</h4>
                  </div>
                </a>
              </div>
            </section>

          </aside>
        </section>

        <section id="games" class="section-games">
          <h2 class="section-title">More Games</h2>
          <GameList />
        </section>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <!-- 左侧：Logo和简介 -->
          <div class="footer-brand">
            <div class="footer-logo-section">
              <img src="/images/logo.webp" alt="Gimjo Logo" class="footer-logo" />
              <div class="footer-brand-text">
                <h3 class="footer-brand-title">Gimjo</h3>
                <p class="footer-description">
                  Play Gimjo and other exciting jumping games instantly in your browser. No
                  download required! Lightweight, fast, and fun for everyone.
                </p>
              </div>
            </div>
          </div>

          <!-- 中间：链接 -->
          <div class="footer-links-section">
            <h4 class="footer-links-title">Quick Links</h4>
            <div class="footer-links">
              <a href="/about-us" class="footer-link">About Us</a>
              <a href="/contact" class="footer-link">Contact Us</a>
              <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
              <a href="/terms-of-service" class="footer-link">Terms of Service</a>
              <a href="/copyright" class="footer-link">Copyright Policy</a>
            </div>
          </div>

          <!-- 右侧：返回顶部 -->
          <div class="footer-action">
            <a href="/" class="back-to-top" aria-label="Back to top" @click.prevent="scrollToTop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
              <span>Back to Top</span>
            </a>
          </div>
        </div>

        <!-- 底部：Copyright -->
        <div class="footer-bottom">
          <p class="copyright">© {{ new Date().getFullYear() }} Gimjo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { games } from '@/data/games.js'
import GameList from '@/components/GameList.vue'
import { useSEO } from '@/composables/useSEO.js'

const route = useRoute()
const router = useRouter()

// SEO管理
const { setGameSEO, resetSEO } = useSEO()

// 游戏相关状态
const isPlaying = ref(false)
const iframeSrc = ref('')
const isPageFullscreen = ref(false)
const gameIframe = ref(null)

// 当前游戏（根据路由参数或默认第一个游戏）
const currentGame = ref(null)

// 模板引用
const gameRef = ref(null)
const aboutRef = ref(null)

// 筛选新游戏和热门游戏
const newGames = computed(() => {
  return games.filter((game) => game.isNew === true)
})

const hotGames = computed(() => {
  return games.filter((game) => game.isHot === true)
})

// 生成游戏URL
function getGameUrl(game) {
  if (!game || !game.addressBar) return '#'

  // 第一个游戏使用根路径，其他游戏使用addressBar
  const isFirstGame = games[0] && games[0].addressBar === game.addressBar
  return isFirstGame ? '/' : `/${game.addressBar}`
}

// 游戏切换功能
function switchGame(game) {
  if (!game || !game.addressBar) return

  // 更新URL - 第一个游戏使用根路径，其他游戏直接使用addressBar
  const isFirstGame = games[0] && games[0].addressBar === game.addressBar
  const newPath = isFirstGame ? '/' : `/${game.addressBar}`
  router.push(newPath)

  // 切换游戏
  currentGame.value = game
}

// 初始化当前游戏
function initializeGame() {
  const addressBar = route.params.addressBar || games[0]?.addressBar || ''
  const game = games.find((g) => g.addressBar === addressBar)

  if (game) {
    currentGame.value = game
    // 设置游戏SEO
    setGameSEO(addressBar)
    // 不预先设置 iframe src，只在用户点击播放时加载（提升性能）
    iframeSrc.value = ''
  } else {
    // 如果没找到游戏，使用第一个游戏
    currentGame.value = games[0] || null
    // 设置默认SEO
    resetSEO()
    // 不预先设置 iframe src
    iframeSrc.value = ''
  }
}

// 游戏播放控制
function startPlay() {
  if (isPlaying.value) return

  // 设置 iframe src（延迟加载，只在用户点击时加载）
  iframeSrc.value = currentGame.value?.iframeUrl || '/TowerJump.html'

  isPlaying.value = true
}

// 浏览器全屏（iframe 元素）
function toggleFullscreen() {
  if (!gameIframe.value) return
  if (!document.fullscreenElement) {
    gameIframe.value.requestFullscreen?.().catch(() => {})
  } else {
    document.exitFullscreen?.()
  }
}

// 网页全屏（铺满视口）
function togglePageFullscreen() {
  if (isPageFullscreen.value) {
    exitPageFullscreen()
  } else {
    enterPageFullscreen()
  }
}

async function enterPageFullscreen() {
  isPageFullscreen.value = true
  document.body.style.overflow = 'hidden'
  await nextTick()
  // 调整 iframe 样式以适应视口
  setTimeout(() => {
    if (gameIframe.value) {
      gameIframe.value.style.width = '100%'
      gameIframe.value.style.height = '100%'
      gameIframe.value.style.objectFit = 'contain'
    }
  }, 50)
}

async function exitPageFullscreen() {
  isPageFullscreen.value = false
  document.body.style.overflow = 'auto'
  await nextTick()
  setTimeout(() => {
    if (gameIframe.value) {
      gameIframe.value.style.width = '100%'
      gameIframe.value.style.height = '100%'
      gameIframe.value.style.objectFit = 'cover'
    }
  }, 50)
}

function onFrameLoad(event) {
  const el = event?.target
  if (el && el.classList) {
    el.classList.add('is-loaded')
  }
}


// 滚动到指定部分
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null
const supportsSmooth =
  typeof document !== 'undefined' &&
  document.documentElement &&
  'scrollBehavior' in document.documentElement.style

function getHeaderHeight() {
  const header = document.querySelector('.site-header')
  return header ? header.getBoundingClientRect().height : 0
}

function scrollTo(name) {
  // 使用ID选择器查找目标元素
  const element = document.querySelector(`#${name}`)
  if (!element) return

  const rect = element.getBoundingClientRect()
  const top = rect.top + window.scrollY - getHeaderHeight() - 8
  const behavior = prefersReducedMotion?.matches || !supportsSmooth ? 'auto' : 'smooth'
  window.scrollTo({ top, behavior })
}

function scrollToTop() {
  const behavior = prefersReducedMotion?.matches || !supportsSmooth ? 'auto' : 'smooth'
  window.scrollTo({ top: 0, behavior })
}

// 监听路由变化
watch(
  () => route.params.addressBar,
  (newAddressBar) => {
    if (newAddressBar) {
      const game = games.find((g) => g.addressBar === newAddressBar)
      if (game) {
        currentGame.value = game
        // 更新SEO
        setGameSEO(newAddressBar)
        // 如果游戏切换，重置播放状态和iframe src
        isPlaying.value = false
        iframeSrc.value = ''
      }
    } else {
      // 回到首页，使用默认SEO
      currentGame.value = games[0] || null
      resetSEO()
      // 如果切换到第一个游戏，重置播放状态
      isPlaying.value = false
      iframeSrc.value = ''
    }
  }
)

onMounted(async () => {
  // 初始化游戏
  initializeGame()
})

onUnmounted(() => {
  if (isPageFullscreen.value) exitPageFullscreen()
})
</script>

<style scoped>
.home {
  position: relative;
  background: #0f0f14;
  color: #e8e8ee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* 背景装饰 - 网格图案 */
.home::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

/* 背景装饰 - 光晕效果（右侧） */
.home::after {
  content: '';
  position: fixed;
  top: -50%;
  right: -20%;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(
    circle,
    rgba(255, 107, 107, 0.25) 0%,
    rgba(255, 107, 107, 0.1) 40%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(40px);
  opacity: 0.5;
}

/* 背景装饰 - 光晕效果（左侧） */
.home > main::before {
  content: '';
  position: fixed;
  bottom: -30%;
  left: -15%;
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.2) 0%,
    rgba(255, 215, 0, 0.1) 40%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(40px);
  opacity: 0.4;
}

/* 背景装饰 - 额外的光晕效果（中间顶部） */
.home > main::after {
  content: '';
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(100, 150, 255, 0.15) 0%,
    rgba(100, 150, 255, 0.05) 40%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(30px);
  opacity: 0.3;
}

/* 确保内容在背景之上 */
.home > * {
  position: relative;
  z-index: 1;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 15, 20, 0.95);
  /* 游戏运行时禁用 backdrop-filter 以提升性能 */
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* 游戏运行时禁用 header 的模糊效果 */
.game-content.is-playing ~ .site-header,
.game-content.page-fullscreen ~ .site-header {
  backdrop-filter: none;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo-image {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.logo-text {
  font-size: 18px;
  background: linear-gradient(135deg, #ff6b6b, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: #cfd3ff;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%);
  color: #fff;
  transform: translateY(-1px);
}

/* 游戏布局 */
.game-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
  padding: 20px 0;
  min-height: calc(100vh - 64px);
}

.game-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.section {
  padding: 56px 0;
}

.game-section .game-title {
  font-size: 28px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}
.game-section .game-subtitle {
  font-size: 14px;
  color: #e8e8ee;
  margin-bottom: 20px;
}

.subtitle {
  opacity: 0.8;
  margin-top: 6px;
  margin-bottom: 16px;
}

.game-iframe-container {
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 520px;
  border-radius: 14px;
  overflow: hidden;
  background: #111319;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.game-iframe-wrapper {
  position: absolute;
  inset: 0;
}

.game-iframe-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.game-iframe {
  opacity: 0;
  transition: opacity 0.3s ease-out;
  pointer-events: auto;
}

.game-iframe.is-visible {
  opacity: 1;
}

.game-iframe.is-loaded {
  opacity: 1;
}

.game-iframe.is-visible {
  opacity: 1;
}

/* 游戏控制栏 */
.game-controls {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 游戏运行时禁用控制栏的模糊效果 */
.game-content.is-playing .game-controls,
.game-content.page-fullscreen .game-controls {
  backdrop-filter: none;
}

.controls-title {
  font-weight: 600;
  color: #e8e8ee;
  font-size: 14px;
}

.controls-actions {
  display: flex;
  gap: 8px;
}

.control-btn {
  height: 36px;
  min-width: 36px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  color: #e8e8ee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

/* 游戏运行时禁用按钮的模糊效果 */
.game-content.is-playing .control-btn,
.game-content.page-fullscreen .control-btn {
  backdrop-filter: none;
}

.control-btn:hover {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 215, 0, 0.15) 100%);
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.control-btn:active {
  transform: translateY(0);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 网页全屏样式 */
.game-content.page-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #0f0f14;
  padding: 8px;
  border-radius: 0;
}

.game-content.page-fullscreen .game-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-content.page-fullscreen .game-title,
.game-content.page-fullscreen .game-subtitle {
  display: none;
}

.game-content.page-fullscreen .game-iframe-container {
  height: calc(100vh - 60px);
  border-radius: 8px;
  flex: 1;
}

.game-content.page-fullscreen .game-iframe-wrapper {
  height: 100%;
}

.game-content.page-fullscreen .game-iframe {
  height: 100%;
  object-fit: contain;
}

/* 网页全屏时隐藏其他内容 */
.game-content.page-fullscreen .about-section {
  display: none;
}

/* 网页全屏时隐藏右侧评论栏 */
.game-content.page-fullscreen ~ .comments-sidebar {
  display: none;
}

/* 网页全屏时隐藏游戏列表 */
.game-content.page-fullscreen ~ .section-games {
  display: none;
}

.game-play-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(17, 19, 25, 0.45);
  z-index: 2;
}

.overlay-backdrop {
  position: absolute;
  inset: 0;
  backdrop-filter: saturate(140%) blur(20px);
  -webkit-backdrop-filter: saturate(140%) blur(20px);
  z-index: 1;
  background: radial-gradient(circle at center, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
}

/* 游戏运行时禁用 overlay 的模糊效果（虽然 overlay 已隐藏） */
.game-content.is-playing .overlay-backdrop {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.overlay-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 3;
}

.overlay-logo {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  object-fit: cover;
}

.play-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 56px;
  padding: 0 24px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  color: #1b1120;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 24px rgba(255, 107, 107, 0.4), 0 0 20px rgba(255, 215, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.play-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.play-button:hover::before {
  left: 100%;
}

.play-button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.5), 0 0 30px rgba(255, 215, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.play-button:active {
  transform: translateY(0) scale(0.98);
}

.play-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.35), 0 10px 24px rgba(255, 107, 107, 0.4);
}

.play-button .play-icon {
  width: 20px;
  height: 20px;
}

.section-title,
.panel-title {
  font-size: 24px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.lead {
  line-height: 1.9;
  opacity: 0.97;
  max-width: 65ch;
  margin-bottom: 10px;
}

.feature-list {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.feature-list li {
  position: relative;
  list-style: none;
  padding: 10px 12px 10px 10px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  line-height: 1.8;
  font-weight: 550;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.feature-list li:hover {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%);
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.section-faq {
  padding-top: 40px;
}

.faq-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 12px;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.faq-item:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.faq-q {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}

.faq-content {
  margin-top: 8px;
  opacity: 0.95;
  line-height: 1.8;
}

/* 评论评分侧栏 */
.comments-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* New Games 板块样式 */
.new-games-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* 游戏运行时禁用 New Games 板块模糊效果 */
.game-content.is-playing ~ * .new-games-section,
.game-content.page-fullscreen ~ * .new-games-section {
  backdrop-filter: none;
}

.new-games-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.new-game-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: block;
}

.new-game-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  color: inherit;
}

.new-game-thumb {
  aspect-ratio: 1/1;
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.new-game-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.new-game-card:hover .new-game-thumb img {
  transform: scale(1.05);
}

.new-game-meta {
  padding: 10px;
}

.new-game-title {
  font-size: 14px;
  font-weight: 600;
  color: #e8e8ee;
  margin: 0;
  line-height: 1.4;
  text-align: center;
}

/* Hot Games 板块样式 */
.hot-games-section {
  margin: 20px 0;
}

.hot-games-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.hot-game-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: block;
  backdrop-filter: blur(5px);
}

/* 游戏运行时禁用卡片模糊效果 */
.game-content.is-playing ~ * .hot-game-card,
.game-content.page-fullscreen ~ * .hot-game-card {
  backdrop-filter: none;
}

.hot-game-card:hover {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%);
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  color: inherit;
}

.hot-game-thumb {
  aspect-ratio: 1/1;
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.hot-game-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.hot-game-card:hover .hot-game-thumb img {
  transform: scale(1.1);
}

.hot-game-meta {
  padding: 5px;
}

.hot-game-title {
  font-size: 12px;
  font-weight: 600;
  color: #e8e8ee;
  margin: 0;
  line-height: 1.4;
  text-align: center;
}

.comments-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  color: #e8e8ee;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.comments-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #cfd3ff;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.rating-score {
  font-size: 24px;
  font-weight: 700;
  color: #ff7aa2;
}

.rating-stars .star {
  color: #d1d5db;
  font-size: 18px;
  margin-right: 2px;
}

.rating-stars .star.filled {
  color: #f59e0b;
}

.rating-count {
  font-size: 14px;
  color: #9ca3af;
}

.rating-distribution {
  margin-top: 12px;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}

.rating-label {
  width: 30px;
  color: #9ca3af;
}

.bar-container {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: #f59e0b;
  transition: width 0.3s ease;
}

.rating-count {
  width: 20px;
  text-align: right;
  color: #9ca3af;
}

/* 表单样式 */
.form-field {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #cfd3ff;
  margin-bottom: 8px;
  font-weight: 500;
}

.required {
  color: #ff7aa2;
}

.form-input,
.form-textarea {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #e8e8ee;
  font-size: 14px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #ff7aa2;
  background: rgba(255, 255, 255, 0.08);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}

.stars-input {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}

.stars-input .star {
  font-size: 20px;
  color: #d1d5db;
  cursor: pointer;
  transition: color 0.2s;
}

.stars-input .star.filled {
  color: #f59e0b;
}

.stars-input .star.hover {
  color: #fbbf24;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #ff7aa2;
  color: #1b1120;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #ff6b9d;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* 评论列表样式 */
.reviews-list {
  max-height: 400px;
  overflow-y: auto;
}

.review-item {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 12px;
  margin-top: 12px;
}

.review-item:first-child {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.review-name {
  color: #cfd3ff;
  font-weight: 600;
  font-size: 14px;
}

.review-date {
  color: #9ca3af;
  font-size: 12px;
}

.review-rating {
  margin-bottom: 8px;
}

.review-stars {
  display: flex;
  gap: 2px;
}

.review-stars .star {
  font-size: 14px;
  color: #d1d5db;
}

.review-stars .star.filled {
  color: #f59e0b;
}

.review-text {
  color: #e8e8ee;
  line-height: 1.6;
  font-size: 14px;
}

.loading-text {
  text-align: center;
  color: #9ca3af;
  padding: 20px;
  font-style: italic;
}

.no-reviews {
  text-align: center;
  color: #9ca3af;
  padding: 20px;
  font-style: italic;
}

/* 页脚样式 */
.site-footer {
  margin-top: auto;
  padding: 48px 0 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, transparent 0%, rgba(15, 15, 20, 0.8) 100%);
  backdrop-filter: blur(10px);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr;
  gap: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* 左侧：Logo和简介 */
.footer-brand {
  display: flex;
  flex-direction: column;
}

.footer-logo-section {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.footer-logo {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.footer-brand-text {
  flex: 1;
}

.footer-brand-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
}

/* 中间：链接 */
.footer-links-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-links-title {
  font-size: 16px;
  font-weight: 600;
  color: #e8e8ee;
  margin: 0 0 16px 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.footer-link {
  color: #cfd3ff;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  padding: 4px 0;
  width: fit-content;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff6b6b, #ffd700);
  transition: width 0.3s ease;
}

.footer-link:hover {
  color: #fff;
  transform: translateX(4px);
}

.footer-link:hover::after {
  width: 100%;
}

/* 右侧：返回顶部 */
.footer-action {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #cfd3ff;
  text-decoration: none;
  font-size: 14px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.back-to-top:hover {
  color: #fff;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 215, 0, 0.15) 100%);
  border-color: rgba(255, 107, 107, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.back-to-top svg {
  transition: transform 0.3s ease;
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

/* 底部：Copyright */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
}

.copyright {
  color: #6b7280;
  font-size: 13px;
  margin: 0;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .game-layout {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .comments-sidebar {
    max-height: none;
  }

  .header-inner {
    height: 56px;
  }

  .section {
    padding: 40px 0;
  }

  .game-iframe-container {
    height: 65vh;
    min-height: 460px;
  }

  .overlay-logo {
    width: 84px;
    height: 84px;
  }

  .play-button {
    height: 52px;
    padding: 0 22px;
    font-size: 15px;
  }

  /* Hot Games 响应式 */
  .hot-games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  /* New Games 响应式 */
  .new-games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 10px;
  }

  .section {
    padding: 20px 0;
  }

  .logo {
    width: 120px;
  }

  .logo-text {
    font-size: 14px;
  }

  .game-section .game-title {
    font-size: 24px;
  }

  .section-title {
    font-size: 20px;
  }

  .faq-q {
    font-size: 16px;
  }

  .lead,
  .faq-content {
    font-size: 12px;
  }

  .nav-link,
  .back-to-top {
    font-size: 12px;
  }

  .nav-link {
    padding: 5px;
  }

  .game-section .game-subtitle{
    font-size: 12px;
  }

  .footer-links {
    gap: 15px;
  }

  .footer-link {
    font-size: 12px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  /* Footer 响应式 */
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }

  .footer-logo-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-description {
    max-width: 100%;
  }

  .footer-links {
    align-items: center;
  }

  .footer-link {
    width: auto;
  }

  .footer-action {
    justify-content: center;
  }

  .game-iframe-container {
    height: 60vh;
    min-height: 380px;
  }

  .overlay-logo {
    width: 72px;
    height: 72px;
  }

  .play-button {
    height: 48px;
    padding: 0 20px;
    font-size: 14px;
  }

  .comments-panel {
    padding: 12px;
  }

  .comments-title {
    font-size: 14px;
  }

  /* Hot Games 移动端响应式 */
  .hot-games-section {
    margin: 10px 0;
  }

  .hot-games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .hot-game-title {
    font-size: 14px;
  }

  /* New Games 移动端响应式 */
  .new-games-section {
    padding: 12px;
    margin-bottom: 12px;
  }

  .new-games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .new-game-title {
    font-size: 12px;
  }
}

.rating {
  font-size: 18px;
  color: #333;
}

.muted {
  color: #666;
  /* 次要文字 */
}

.small {
  font-size: 12px;
}

.reviews {
  display: grid;
  gap: 8px;
  padding-left: 18px;
}

.review-skeleton {
  color: #333;
}

.btn.wide {
  width: 100%;
  margin-top: 8px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-text {
  text-align: center;
  color: #666;
  padding: 10px;
  font-size: 14px;
}

.no-reviews {
  text-align: center;
  color: #666;
  padding: 20px;
  font-style: italic;
}

.quick-rating {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.quick-rating-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.quick-rating-stars {
  display: flex;
  gap: 4px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.2s;
  padding: 2px;
}

.star-btn:hover {
  opacity: 0.7;
}

.star-btn.active {
  opacity: 1;
}

.star-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* 评分分布样式 */
.rating-distribution {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}

.rating-label {
  width: 30px;
  color: #666;
}

.bar-container {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: #f59e0b;
  transition: width 0.3s ease;
}

.rating-count {
  width: 20px;
  text-align: right;
  color: #666;
}

/* 无评分数据样式 */
.no-ratings {
  text-align: center;
  padding: 12px;
  color: #666;
  font-style: italic;
}

/* 评分选择提示 */
.rating-selected {
  margin-top: 6px;
  font-size: 12px;
  color: #059669;
  font-weight: 500;
}

/* 评论中的评分显示 */
.review-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 0;
  font-size: 12px;
}

.review-rating-label {
  color: #666;
}

.review-stars {
  display: flex;
  gap: 2px;
}

/* 自适应 */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

/* 深色模式下也保持浅灰背景与 #333 文本，确保风格一致 */
@media (prefers-color-scheme: dark) {
  .main,
  .panel,
  .btn,
  .controls,
  .iframe-wrap,
  .player {
    background: #f3f4f6;
    border-color: #2a2b31;
  }

  .controls .title,
  .rating,
  .review-skeleton,
  .about {
    color: #333;
  }

  .muted {
    color: #666;
  }
}

/* v-html 内容样式 */
.about-content {
  color: #e8e8ee;
  line-height: 1.7;
  font-size: 16px;
}

.about-content :deep(h1),
.about-content :deep(h2),
.about-content :deep(h3),
.about-content :deep(h4),
.about-content :deep(h5),
.about-content :deep(h6) {
  color: #e8e8ee;
  margin-bottom: 15px;
  font-weight: 600;
  line-height: 1.3;
}

.about-content :deep(h1) {
  font-size: 28px;
  border-bottom: 2px solid #333;
  padding-bottom: 8px;
}

.about-content :deep(h2) {
  font-size: 24px;
  border-bottom: 1px solid #333;
  padding-bottom: 6px;
}

.about-content :deep(h3) {
  font-size: 20px;
  color: #d1d5db;
}

.about-content :deep(h4) {
  font-size: 18px;
  color: #d1d5db;
}

.about-content :deep(h5) {
  font-size: 16px;
  color: #d1d5db;
}

.about-content :deep(h6) {
  font-size: 14px;
  color: #d1d5db;
}

.about-content :deep(p) {
  margin-bottom: 15px;
  color: #e8e8ee;
  line-height: 1.7;
}

.about-content :deep(ul),
.about-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.about-content :deep(li) {
  margin-bottom: 5px;
  color: #e8e8ee;
  line-height: 1.6;
}

.about-content :deep(strong),
.about-content :deep(b) {
  color: #f3f4f6;
  font-weight: 600;
}

.about-content :deep(em),
.about-content :deep(i) {
  color: #d1d5db;
  font-style: italic;
}

.about-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
  color: #fbbf24;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.about-content :deep(pre) {
  background: rgba(0, 0, 0, 0.3);
  color: #e8e8ee;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid #333;
}

.about-content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
}

.about-content :deep(blockquote) {
  border-left: 4px solid #333;
  margin: 16px 0;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.02);
  color: #d1d5db;
  font-style: italic;
}

.about-content :deep(a) {
  color: #60a5fa;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.about-content :deep(a:hover) {
  color: #93c5fd;
  border-bottom-color: #60a5fa;
}

.about-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.about-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  overflow: hidden;
}

.about-content :deep(th),
.about-content :deep(td) {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #333;
}

.about-content :deep(th) {
  background: rgba(255, 255, 255, 0.05);
  color: #f3f4f6;
  font-weight: 600;
}

.about-content :deep(td) {
  color: #e8e8ee;
}

.about-content :deep(tr:hover) {
  background: rgba(255, 255, 255, 0.03);
}

/* FAQ 特定样式 */
.about-content :deep(.faq-item) {
  margin: 20px 0;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
}

.about-content :deep(.faq-q) {
  margin: 0;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  color: #f3f4f6;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.about-content :deep(.faq-q:hover) {
  background: rgba(255, 255, 255, 0.08);
}

.about-content :deep(.faq-content) {
  padding: 16px 20px;
  color: #e8e8ee;
  line-height: 1.6;
}

.about-content :deep(.faq-content p) {
  margin: 0 0 12px 0;
}

.about-content :deep(.faq-content p:last-child) {
  margin-bottom: 0;
}

/* 特色列表样式 */
.about-content :deep(.feature-list) {
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
}

.about-content :deep(.feature-list li) {
  position: relative;
  padding-left: 24px;
  margin: 12px 0;
  color: #e8e8ee;
}

.about-content :deep(.feature-list li::before) {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
  font-size: 16px;
}

/* 段落样式 */
.about-content :deep(.lead) {
  font-size: 18px;
  line-height: 1.6;
  color: #d1d5db;
  margin: 20px 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border-left: 4px solid #60a5fa;
}

@media (max-width: 768px) {
  .about-content :deep(p){
    font-size: 12px;
    margin-bottom: 10px;
  }

  .about-content :deep(h2){
    font-size: 18px;
  }
  .about-content :deep(h3){
    font-size: 16px;
  }
  .about-content :deep(h4){
    font-size: 14px;
  }
  .about-content :deep(h5){
    font-size: 12px;
  }

  .about-content :deep(.faq-q){
    padding: 5px 10px;
  }

  .about-content :deep(.faq-content){
    padding: 5px 10px;
  }

  .about-content :deep(ul),
  .about-content :deep(ol){
    margin: 10px 0;
  }

  .about-content :deep(li){
    margin-bottom: 5px;
  }
}
</style>