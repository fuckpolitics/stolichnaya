<template>
  <section class="page-hero">
    <div class="container">
      <img src="/images/mascot.png" alt="" class="hero-mascot" aria-hidden="true" />
      <div class="hero-text">
        <h1 class="hero-title">Барное меню</h1>
        <p class="hero-subtitle">Напитки на любой вкус</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <nav class="category-nav">
        <button
          v-for="(cat, i) in bar.categories"
          :key="i"
          class="category-tab"
          :class="{ active: activeCategory === i }"
          @click="activeCategory = i"
        >
          {{ cat.name }}
        </button>
      </nav>

      <div class="menu-grid">
        <div
          v-for="item in bar.categories[activeCategory].items"
          :key="item.name"
          class="menu-card"
          :class="{ 'has-image': item.image }"
        >
          <div v-if="item.image" class="menu-card-img-wrap">
            <img :src="imgSrc(item.image)" :alt="item.name" class="menu-card-img" loading="lazy" />
          </div>
          <div class="menu-card-content">
            <div class="menu-card-body">
              <h3 class="menu-card-name">{{ item.name }}</h3>
              <p v-if="item.description" class="menu-card-desc">{{ item.description }}</p>
            </div>
            <div class="menu-card-meta">
              <span v-if="item.weight" class="menu-card-weight">{{ item.weight }}</span>
              <span class="menu-card-price">{{ item.price }} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-bar">
    <div class="container cta-bar-inner">
      <p>Хотите заказать? Позвоните нам:</p>
      <a v-for="(ph, i) in site.phones" :key="i" :href="'tel:' + ph" class="btn btn-primary">{{ formatPhone(ph) }}</a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useContent } from '../composables/useContent'

const { site, bar } = useContent()
const activeCategory = ref(0)

function formatPhone(ph) {
  const d = ph.replace(/\D/g, '')
  if (d.length === 11) {
    return `${d[0]} (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7,9)}-${d.slice(9)}`
  }
  return ph
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '')
function imgSrc(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return base + path
}
</script>

<style scoped>
.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.category-tab {
  padding: 8px 20px;
  border: 2px solid var(--tan);
  border-radius: 24px;
  background: transparent;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.category-tab:hover {
  border-color: var(--cherry);
  color: var(--cherry);
}

.category-tab.active {
  background: var(--cherry);
  border-color: var(--cherry);
  color: var(--white);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.menu-card {
  background: var(--white);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.25s, transform 0.25s;
  display: flex;
  flex-direction: column;
}

.menu-card:not(.has-image) {
  flex-direction: row;
  align-items: flex-start;
}

.menu-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.menu-card-img-wrap {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  flex-shrink: 0;
}

.menu-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.menu-card:hover .menu-card-img {
  transform: scale(1.05);
}

.menu-card-content {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
}

.menu-card:not(.has-image) .menu-card-content {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.menu-card-body {
  flex: 1;
  min-width: 0;
}

.menu-card-name {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.menu-card-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.menu-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.menu-card:not(.has-image) .menu-card-meta {
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.menu-card-weight {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.menu-card-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--cherry);
  white-space: nowrap;
}

.cta-bar {
  background: var(--tan-light);
  padding: 28px 0;
}

.cta-bar-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  text-align: center;
}

.cta-bar-inner p {
  font-size: 1.05rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .category-nav {
    gap: 6px;
  }

  .category-tab {
    padding: 6px 14px;
    font-size: 0.82rem;
  }

  .menu-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .menu-card-content {
    padding: 14px 16px;
  }

  .cta-bar-inner {
    flex-direction: column;
  }
}
</style>
