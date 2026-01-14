<template>
  <div class="page">
    <div class="content">
      <h1>Terms of Service</h1>
      <p class="updated">Last updated: September 26, 2025</p>
      
      <h2>General Information</h2>
      <p>These Terms of Service govern your use of the Gimjo website. By using this website, you agree to be bound by these terms. If you do not agree, please do not use the website.</p>
      <p><strong>You must be at least 16 years old to use this website.</strong></p>

      <h2>Changes to Terms</h2>
      <p>We may update these terms from time to time. Changes will be posted on this page. Continued use of the website after changes are posted constitutes acceptance of the updated terms.</p>

      <h2>User Conduct</h2>
      <p>When using our website, you agree to:</p>
      <ul>
        <li>Not post threatening, harassing, or unlawful content</li>
        <li>Not use the website for unauthorized commercial purposes</li>
        <li>Not interfere with the website's operation</li>
        <li>Not reproduce or distribute content without permission</li>
        <li>Respect the rights of others</li>
      </ul>

      <h2>Privacy</h2>
      <p>Your use of the website is also governed by our <a href="/privacy-policy">Privacy Policy</a>. Please review it to understand how we collect and use your information.</p>

      <h2>Third-Party Content</h2>
      <p>The website may provide access to third-party content, including games and advertisements. We do not control or endorse third-party content and are not responsible for its accuracy or legality. Use of third-party content is at your own risk.</p>

      <h2>Disclaimer</h2>
      <p>The website and all content are provided "as is" without warranties of any kind. We do not guarantee that the website will always be correct, secure, or uninterrupted.</p>

      <h2>Copyright</h2>
      <p>If you believe materials on the website violate your copyright, please contact us at <a href="mailto:contact@gimjo.com">contact@gimjo.com</a>.</p>

      <h2>Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Gimjo shall not be liable for any damages arising from your use of the website.</p>

      <h2>Contact</h2>
      <p>If you have questions about these Terms of Service, please contact us at <a href="mailto:contact@gimjo.com">contact@gimjo.com</a>.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Terms of Service - Gimjo'
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
  margin-bottom: 10px;
  color: #e8e8ee;
}

.content .updated {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 30px;
  font-style: italic;
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

.content strong {
  color: #f3f4f6;
  font-weight: 600;
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
