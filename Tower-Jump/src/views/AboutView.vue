<template>
  <div class="page">
    <div class="content">
      <h1>About Us</h1>
      
      <h2>Who We Are</h2>
      <p>Gimjo is an online gaming platform that provides high-quality HTML5 games. We offer a collection of fun and engaging games that you can play instantly in your browser without any downloads or installations.</p>

      <h2>Our Mission</h2>
      <p>Our mission is to provide users with easy access to entertaining games. We focus on creating a simple, fast, and enjoyable gaming experience for everyone.</p>

      <h2>What We Offer</h2>
      <p>We offer a variety of online games. All games are playable directly in your browser, making them accessible on desktop and mobile devices.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, please contact us at <a href="mailto:contact@gimjo.com">contact@gimjo.com</a>.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'About Us - Gimjo'
})
</script>

<style scoped>
.page {
  background: #0f0f14;
  color: #e8e8ee;
  min-height: 100vh;
  padding: 40px 20px;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

.content h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #e8e8ee;
}

.content h2 {
  font-size: 24px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #e8e8ee;
}

.content p {
  font-size: 16px;
  color: #e8e8ee;
  margin-bottom: 20px;
}

.content a {
  color: #60a5fa;
  text-decoration: none;
}

.content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .content {
    padding: 0 10px;
  }

  .content h1 {
    font-size: 28px;
  }

  .content h2 {
    font-size: 20px;
  }

  .content p {
    font-size: 14px;
  }
}
</style>
