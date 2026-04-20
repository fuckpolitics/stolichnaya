<template>
  <section class="page-hero">
    <div class="container">
      <img src="/images/mascot.png" alt="" class="hero-mascot" aria-hidden="true" />
      <div class="hero-text">
        <h1 class="hero-title">{{ corporate.title }}</h1>
        <p class="hero-subtitle">{{ corporate.description }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="corp-grid">
        <div v-for="item in corporate.items" :key="item.name" class="corp-card">
          <div class="corp-card-header">
            <h3 class="corp-card-name">{{ item.name }}</h3>
            <div class="corp-card-price-block">
              <span class="corp-card-price">{{ item.price }} ₽</span>
              <span v-if="item.priceLabel" class="corp-card-price-label">{{ item.priceLabel }}</span>
            </div>
          </div>
          <p class="corp-card-desc">{{ item.description }}</p>
          <ul class="corp-card-list">
            <li v-for="c in item.contents" :key="c">{{ c }}</li>
          </ul>
          <a :href="'tel:' + site.phones[0]" class="btn btn-outline corp-card-btn">
            Заказать
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container cta-inner">
      <p class="cta-text">{{ corporate.cta }}</p>
      <div class="cta-phones">
        <a v-for="(ph, i) in site.phones" :key="i" :href="'tel:' + ph" class="btn btn-primary">
          {{ formatPhone(ph) }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useContent } from '../composables/useContent'

const { site, corporate } = useContent()

function formatPhone(ph) {
  const d = ph.replace(/\D/g, '')
  if (d.length === 11) {
    return `${d[0]} (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7,9)}-${d.slice(9)}`
  }
  return ph
}
</script>

<style scoped>
.corp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.corp-card {
  background: var(--white);
  border-radius: 12px;
  padding: 28px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.corp-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.corp-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.corp-card-name {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text);
}

.corp-card-price-block {
  text-align: right;
  flex-shrink: 0;
}

.corp-card-price {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--cherry);
  white-space: nowrap;
  line-height: 1;
}

.corp-card-price-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.corp-card-desc {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.corp-card-list {
  list-style: none;
  margin-bottom: 20px;
  flex: 1;
}

.corp-card-list li {
  position: relative;
  padding-left: 20px;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--text);
}

.corp-card-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tan);
}

.corp-card-btn {
  align-self: stretch;
  text-align: center;
  justify-content: center;
}

.cta-section {
  background: var(--tan-light);
  padding: 40px 0;
}

.cta-inner {
  text-align: center;
}

.cta-text {
  font-size: 1.05rem;
  color: var(--text);
  max-width: 600px;
  margin: 0 auto 20px;
  line-height: 1.6;
}

.cta-phones {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .corp-grid {
    grid-template-columns: 1fr;
  }

  .cta-phones {
    flex-direction: column;
    align-items: center;
  }
}
</style>
