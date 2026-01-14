<template>
  <div class="page">
    <div class="content">
      <h1>Contact Us</h1>
      
      <p>We'd love to hear from you! If you have any questions, suggestions, or feedback, please don't hesitate to reach out.</p>

      <h2>Email</h2>
      <p>Email: <a href="mailto:contact@gimjo.com">contact@gimjo.com</a></p>
      <p>We typically respond within 24-48 hours.</p>

      <h2>What We Can Help With</h2>
      <p>We can assist you with:</p>
      <ul>
        <li>Game-related questions</li>
        <li>Website feedback and suggestions</li>
        <li>Technical issues</li>
        <li>General inquiries</li>
      </ul>

      <h2>Thank You</h2>
      <p>Thank you for visiting Gimjo. Your feedback helps us improve our platform and provide a better experience for all users.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Contact Us - Gimjo'
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

.content ul {
  margin-bottom: 20px;
  padding-left: 30px;
}

.content li {
  font-size: 16px;
  color: #e8e8ee;
  margin-bottom: 10px;
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

  .content p,
  .content li {
    font-size: 14px;
  }
}
</style>
