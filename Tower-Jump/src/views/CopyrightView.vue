<template>
  <div class="page">
    <div class="content">
      <h1>Copyright</h1>
      
      <h2>Copyright Statement</h2>
      <p>All content on Gimjo, including text, graphics, images, and website design, is the property of Gimjo and is protected by international copyright laws. Unauthorized use, reproduction, or distribution of this content is strictly prohibited.</p>

      <h2>What We Own</h2>
      <p>We own all original content, website design, original images, and code developed for this platform.</p>

      <h2>Third-Party Content</h2>
      <p>We respect the intellectual property rights of others. Some content on our website may include references or information related to various games, which belongs to their respective owners.</p>

      <h2>Fair Use</h2>
      <p>We support fair use of our content for educational and personal purposes. However, commercial use requires explicit permission.</p>

      <h2>DMCA Compliance</h2>
      <p>We comply with the Digital Millennium Copyright Act (DMCA). If you believe your copyrighted work has been used without permission, please contact us immediately.</p>

      <h2>Contact</h2>
      <p>For copyright inquiries, please contact us at <a href="mailto:contact@gimjo.com">contact@gimjo.com</a>.</p>

      <h2>Updates</h2>
      <p>This copyright notice may be updated periodically. Continued use of our website constitutes acceptance of any changes.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Copyright - Gimjo'
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
