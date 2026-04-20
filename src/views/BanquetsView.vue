<template>
  <section class="page-hero">
    <div class="container">
      <img src="/images/mascot.png" alt="" class="hero-mascot" aria-hidden="true" />
      <div class="hero-text">
        <h1 class="hero-title">{{ banquets.title }}</h1>
        <p class="hero-subtitle">{{ banquets.description }}</p>
      </div>
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

const { site, banquets } = useContent()

function formatPhone(ph) {
  const d = ph.replace(/\D/g, '')
  if (d.length === 11) {
    return `${d[0]} (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7,9)}-${d.slice(9)}`
  }
  return ph
}
</script>

<style scoped>
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

.cta-phones {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .banquet-grid {
    grid-template-columns: 1fr;
  }

  .banquet-card {
    padding: 20px 18px;
  }

  .cta-phones {
    flex-direction: column;
    align-items: center;
  }
}
</style>
