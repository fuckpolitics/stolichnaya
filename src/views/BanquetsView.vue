<template>
  <section class="banquets-hero">
    <div class="container">
      <h1 class="banquets-hero-title">{{ banquets.title }}</h1>
      <p class="banquets-hero-subtitle">{{ banquets.description }}</p>
    </div>
  </section>

  <section
    v-for="(section, secIdx) in banquets.sections"
    :key="secIdx"
    class="section"
  >
    <div class="container">
      <h2 class="section-title">{{ section.title }}</h2>
      <p class="section-desc">{{ section.description }}</p>

      <div class="banquet-grid">
        <div
          v-for="item in section.items"
          :key="item.name"
          class="banquet-card"
        >
          <div class="banquet-card-top">
            <h3 class="banquet-card-name">{{ item.name }}</h3>
            <p v-if="item.description" class="banquet-card-desc">{{ item.description }}</p>
          </div>

          <ul class="banquet-contents">
            <li v-for="line in item.contents" :key="line">{{ line }}</li>
          </ul>

          <div class="banquet-card-bottom">
            <div class="banquet-price">
              <span class="banquet-price-value">{{ item.price }} ₽</span>
              <span class="banquet-price-label">на персону</span>
            </div>
            <div v-if="item.minGuests" class="banquet-min">
              от {{ item.minGuests }} гостей
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container cta-inner">
      <p class="cta-text">{{ banquets.cta }}</p>
      <a :href="'tel:' + site.phone.replace(/[^+\d]/g, '')" class="btn btn-primary">
        {{ site.phone }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { useContent } from '../composables/useContent'

const { site, banquets } = useContent()
</script>

<style scoped>
.banquets-hero {
  background: linear-gradient(135deg, var(--cherry) 0%, var(--cherry-dark) 100%);
  color: var(--white);
  padding: 48px 0;
  text-align: center;
}

.banquets-hero-title {
  font-size: 2.2rem;
  color: var(--white);
  margin-bottom: 12px;
}

.banquets-hero-subtitle {
  font-size: 1.05rem;
  opacity: 0.88;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.section-desc {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 32px;
  max-width: 700px;
  line-height: 1.6;
}

.banquet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.banquet-card {
  background: var(--white);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.25s, transform 0.25s;
}

.banquet-card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.banquet-card-top {
  margin-bottom: 16px;
}

.banquet-card-name {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--cherry);
  margin-bottom: 6px;
}

.banquet-card-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.banquet-contents {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

.banquet-contents li {
  position: relative;
  padding: 6px 0 6px 20px;
  font-size: 0.92rem;
  color: var(--text);
  border-bottom: 1px solid var(--tan-light);
}

.banquet-contents li:last-child {
  border-bottom: none;
}

.banquet-contents li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--tan);
  font-weight: 700;
  font-size: 1.1rem;
}

.banquet-card-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 2px solid var(--tan-light);
}

.banquet-price-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--cherry);
  line-height: 1;
}

.banquet-price-label {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.banquet-min {
  font-size: 0.85rem;
  color: var(--text-muted);
  white-space: nowrap;
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

@media (max-width: 768px) {
  .banquets-hero {
    padding: 32px 0;
  }

  .banquets-hero-title {
    font-size: 1.6rem;
  }

  .banquet-grid {
    grid-template-columns: 1fr;
  }

  .banquet-card {
    padding: 20px 18px;
  }
}
</style>
