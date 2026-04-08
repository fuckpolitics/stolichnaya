<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-col">
        <h3 class="footer-heading">{{ site.name }}</h3>
        <p class="footer-text">{{ site.tagline }}</p>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">Контакты</h3>
        <p class="footer-text">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {{ site.address }}
        </p>
        <p class="footer-text">
          <a :href="'tel:' + site.phone.replace(/[^+\d]/g, '')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            {{ site.phone }}
          </a>
        </p>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">Режим работы</h3>
        <p class="footer-text">{{ site.workingHours }}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} {{ site.name }}. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useContent } from '../composables/useContent'

const { site } = useContent()
</script>

<style scoped>
.footer {
  background: var(--cherry-dark);
  color: rgba(255, 255, 255, 0.85);
  margin-top: auto;
}

.footer-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 48px var(--gap);
}

.footer-heading {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  color: var(--white);
  margin-bottom: 12px;
}

.footer-text {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 8px;
}

.footer-text svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.footer-text a {
  color: var(--tan-light);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.footer-text a:hover {
  color: var(--white);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding: 16px 0;
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px var(--gap);
  }
}
</style>
