<template>
  <section class="menu-hero">
    <div class="container">
      <h1 class="menu-hero-title">Наше меню</h1>
      <p class="menu-hero-subtitle">Готовим каждый день из свежих продуктов</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <nav class="category-nav">
        <button
          v-for="(cat, i) in menu.categories"
          :key="i"
          class="category-tab"
          :class="{ active: activeCategory === i }"
          @click="activeCategory = i"
        >
          {{ cat.name }}
        </button>
      </nav>

      <div class="menu-grid">
        <div v-for="item in menu.categories[activeCategory].items" :key="item.name" class="menu-card">
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
  </section>

  <section class="cta-bar">
    <div class="container cta-bar-inner">
      <p>Хотите заказать? Позвоните нам:</p>
      <a :href="'tel:' + site.phone.replace(/[^+\d]/g, '')" class="btn btn-primary">{{ site.phone }}</a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useContent } from '../composables/useContent'

const { site, menu } = useContent()
const activeCategory = ref(0)
</script>

<style scoped>
.menu-hero {
  background: linear-gradient(135deg, var(--cherry) 0%, var(--cherry-dark) 100%);
  color: var(--white);
  padding: 48px 0;
  text-align: center;
}

.menu-hero-title {
  font-size: 2.2rem;
  color: var(--white);
  margin-bottom: 8px;
}

.menu-hero-subtitle {
  font-size: 1.05rem;
  opacity: 0.85;
}

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
  gap: 12px;
}

.menu-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.menu-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
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
}

.menu-card-meta {
  display: flex;
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
  font-size: 1.15rem;
  font-weight: 600;
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
  .menu-hero {
    padding: 32px 0;
  }

  .menu-hero-title {
    font-size: 1.6rem;
  }

  .category-nav {
    gap: 6px;
  }

  .category-tab {
    padding: 6px 14px;
    font-size: 0.82rem;
  }

  .menu-card {
    padding: 16px;
    flex-direction: column;
    gap: 8px;
  }

  .menu-card-meta {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
}
</style>
