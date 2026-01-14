<template>
  <div class="game-list">
    <div class="grid">
      <a v-for="game in displayedGames" :key="game.id" :href="getGameUrl(game)" class="card">
        <div class="thumb">
          <img :src="game.imageUrl" :alt="game.imageAlt || game.title" />
        </div>
        <div class="meta">
          <h3 class="title">{{ game.title }}</h3>
          <p v-if="game.publishDate" class="date">{{ formatDate(game.publishDate) }}</p>
        </div>
      </a>
    </div>
    <div v-if="!showAll && games.length > initialLimit" class="load-more-container">
      <button @click="loadMore" class="load-more-btn">
        More Games
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// 通用游戏列表组件（可移植）
// 中文提示：如需跨项目自定义列数、卡片信息或点击行为，可在此组件扩展 props 与样式

import { games } from '@/data/games.js'

const initialLimit = 16 // 默认显示2行16个游戏（每行8个）
const showAll = ref(false)

// 计算显示的游戏列表
const displayedGames = computed(() => {
  return showAll.value ? games : games.slice(0, initialLimit)
})

// 加载更多
function loadMore() {
  showAll.value = true
}

// 生成游戏URL
function getGameUrl(game) {
  if (!game || !game.addressBar) return '#'
  
  // 第一个游戏使用根路径，其他游戏使用addressBar
  const isFirstGame = games[0] && games[0].addressBar === game.addressBar
  return isFirstGame ? '/' : `/${game.addressBar}`
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (e) {
    return dateString
  }
}
</script>

<style scoped>
/* 中性样式（易于跨项目复用） */
.game-list {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
}

.thumb {
  aspect-ratio: 1/1;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.meta {
  padding: 5px;
}

.title {
  font-size: 12px;
  line-height: 1.4;
  color: #111827;
  margin: 0 0 6px 0;
  font-weight: 600;
}

.date {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.load-more-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.load-more-btn:active {
  transform: translateY(0);
}

@media (prefers-color-scheme: dark) {
  .card {
    background: #111215;
    border-color: #2a2b31;
  }
  .card:hover {
    border-color: #3a3b42;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
  }
  .thumb {
    background: #16171b;
  }
  .title {
    color: #e5e7eb;
  }
  .date {
    color: #9ca3af;
  }
  
  .load-more-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .load-more-btn:hover {
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
}
</style>


