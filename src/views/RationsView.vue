<template>
  <section class="rations-hero">
    <div class="container">
      <h1 class="rations-hero-title">{{ rations.title }}</h1>
      <p class="rations-hero-subtitle">{{ rations.description }}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="rations-grid">
        <div v-for="item in rations.items" :key="item.name" class="ration-card">
          <div class="ration-card-header">
            <h3 class="ration-card-name">{{ item.name }}</h3>
            <span class="ration-card-price">{{ item.price }} ₽</span>
          </div>
          <p class="ration-card-desc">{{ item.description }}</p>
          <ul class="ration-card-list">
            <li v-for="c in item.contents" :key="c">{{ c }}</li>
          </ul>
          <a :href="'tel:' + site.phone.replace(/[^+\d]/g, '')" class="btn btn-outline ration-card-btn">
            Заказать по телефону
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-bar">
    <div class="container cta-bar-inner">
      <div>
        <p class="cta-bar-title">Заказ и доставка рационов</p>
        <p class="cta-bar-text">Позвоните — и мы соберём рацион к нужному времени</p>
      </div>
      <a :href="'tel:' + site.phone.replace(/[^+\d]/g, '')" class="btn btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        {{ site.phone }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { useContent } from '../composables/useContent'

const { site, rations } = useContent()
</script>

<style scoped>
.rations-hero {
  background: linear-gradient(135deg, var(--cherry) 0%, var(--cherry-dark) 100%);
  color: var(--white);
  padding: 48px 0;
  text-align: center;
}

.rations-hero-title {
  font-size: 2.2rem;
  color: var(--white);
  margin-bottom: 8px;
}

.rations-hero-subtitle {
  font-size: 1.05rem;
  opacity: 0.85;
  max-width: 560px;
  margin: 0 auto;
}

.rations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.ration-card {
  background: var(--white);
  border-radius: 12px;
  padding: 28px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ration-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.ration-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.ration-card-name {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text);
}

.ration-card-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--cherry);
  white-space: nowrap;
}

.ration-card-desc {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.ration-card-list {
  list-style: none;
  margin-bottom: 20px;
  flex: 1;
}

.ration-card-list li {
  position: relative;
  padding-left: 20px;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--text);
}

.ration-card-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tan);
}

.ration-card-btn {
  align-self: stretch;
  text-align: center;
  justify-content: center;
}

.cta-bar {
  background: var(--tan-light);
  padding: 32px 0;
}

.cta-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.cta-bar-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.cta-bar-text {
  font-size: 0.95rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .rations-hero {
    padding: 32px 0;
  }

  .rations-hero-title {
    font-size: 1.6rem;
  }

  .rations-grid {
    grid-template-columns: 1fr;
  }

  .cta-bar-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
