<template>
  <section class="hero">
    <div class="container hero-inner">
      <img src="/images/mascot.png" alt="" class="hero-mascot" aria-hidden="true" />
      <div class="hero-text">
        <h1 class="hero-title">{{ site.heroTitle }}</h1>
        <p class="hero-subtitle">{{ site.heroSubtitle }}</p>
        <div class="hero-actions">
          <RouterLink to="/menu" class="btn btn-primary">Посмотреть меню</RouterLink>
          <RouterLink to="/rations" class="btn btn-outline hero-btn-outline">Готовые рационы</RouterLink>
          <RouterLink to="/banquets" class="btn btn-outline hero-btn-outline">Банкеты</RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="section about">
    <div class="container">
      <h2 class="section-title">{{ site.aboutTitle }}</h2>
      <p class="about-text">{{ site.aboutText }}</p>
    </div>
  </section>

  <section class="section features">
    <div class="container">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3>Каждый день свежее</h3>
          <p>Готовим с утра — меню обновляется ежедневно</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <h3>Готовые рационы</h3>
          <p>Бизнес-ланчи и комплексные обеды по выгодной цене</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3>Банкеты и обеды</h3>
          <p>Организуем банкеты, юбилеи и поминальные обеды</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h3>Заказ по телефону</h3>
          <p>Позвоните — и мы приготовим к нужному времени</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="container cta-inner">
      <h2 class="cta-title">Хотите заказать?</h2>
      <p class="cta-text">Позвоните нам — примем заказ и приготовим к нужному времени</p>
      <div class="cta-phones">
        <a v-for="(ph, i) in site.phones" :key="i" :href="'tel:' + ph" class="btn btn-tan cta-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          {{ formatPhone(ph) }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useContent } from '../composables/useContent'

const { site } = useContent()

function formatPhone(ph) {
  const d = ph.replace(/\D/g, '')
  if (d.length === 11) {
    return `${d[0]} (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7,9)}-${d.slice(9)}`
  }
  return ph
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--cherry) 0%, var(--cherry-dark) 100%);
  color: var(--white);
  padding: 56px 0;
  overflow: hidden;
}

.hero-inner {
  display: flex;
  align-items: center;
  gap: 24px;
}

.hero-text {
  flex: 1;
  text-align: center;
}

.hero-title {
  font-size: 2.8rem;
  margin-bottom: 20px;
  color: var(--white);
}

.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.7;
  max-width: 640px;
  margin: 0 auto 36px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn-outline {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.5);
}

.hero-btn-outline:hover {
  background: var(--white);
  color: var(--cherry);
  border-color: var(--white);
}

.about-text {
  font-size: 1.05rem;
  line-height: 1.8;
  max-width: 800px;
  color: var(--text-muted);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-card {
  background: var(--white);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--tan-light);
  color: var(--cherry);
}

.feature-card h3 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  margin-bottom: 8px;
  color: var(--text);
}

.feature-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.cta {
  background: var(--tan-light);
  padding: 56px 0;
  text-align: center;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--cherry);
  margin-bottom: 12px;
}

.cta-text {
  font-size: 1.05rem;
  color: var(--text-muted);
  margin-bottom: 28px;
}

.cta-phones {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  font-size: 1.1rem;
  padding: 14px 36px;
}

@media (max-width: 768px) {
  .hero {
    padding: 32px 0;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .hero-actions .btn {
    padding: 10px 20px;
    font-size: 0.85rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }

  .cta-phones {
    flex-direction: column;
    align-items: center;
  }

  .cta-btn {
    font-size: 0.95rem;
    padding: 12px 28px;
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
