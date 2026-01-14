<template>
  <div class="page">
    <div class="content">
      <h1>Privacy Policy</h1>
      <p class="updated">Last updated: September 26, 2025</p>
      
      <h2>General Information</h2>
      <p>At Gimjo, we are committed to protecting your privacy. This Privacy Policy applies to all services and products offered by gimjo.com. By using this website, you agree to this Privacy Policy.</p>
      <p>The website is intended for visitors aged 16 and above. If you are under 16, please do not use this website.</p>
      <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:contact@gimjo.com">contact@gimjo.com</a>.</p>

      <h2>Data We Collect</h2>
      <p>We only process personal data you voluntarily provide, such as when you submit comments or contact us. This may include:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Any other information you choose to provide</li>
      </ul>
      <p>We may also collect certain data automatically, such as IP address, browser type, and device information for analytics and security purposes.</p>

      <h2>Why We Collect Data</h2>
      <p>We collect and process personal data to:</p>
      <ul>
        <li>Provide and improve our services</li>
        <li>Respond to your inquiries</li>
        <li>Ensure website security</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Data Retention</h2>
      <p>We retain personal data only as long as necessary to fulfill the purposes described in this policy, unless retention is required by law.</p>

      <h2>Your Rights</h2>
      <p>You have the right to access, update, or delete your personal data. You may also opt out of communications at any time by contacting us.</p>
      <p>If you are a resident of the European Economic Area (EEA), you have additional rights under GDPR, including the right to data portability and the right to object to processing.</p>

      <h2>Cookies</h2>
      <p>We use cookies to enhance your experience on our website. Cookies are small files stored on your device that help websites remember preferences and improve functionality.</p>
      <p>You can manage or disable cookies via your browser settings. However, disabling cookies may affect website functionality.</p>

      <h2>Security</h2>
      <p>We implement reasonable security measures to protect your personal data. We do not sell or rent your personal information to third parties.</p>

      <h2>Contact Information</h2>
      <p>If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:contact@gimjo.com">contact@gimjo.com</a>.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Privacy Policy - Gimjo'
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
