<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink to="/" class="header-logo">
        <span class="header-logo-sub">закусочная</span>
        <span class="header-logo-main">Столичная</span>
      </RouterLink>

      <button class="burger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Меню">
        <span /><span /><span />
      </button>

      <nav class="header-nav" :class="{ open: menuOpen }">
        <RouterLink to="/" @click="menuOpen = false">Главная</RouterLink>
        <RouterLink to="/menu" @click="menuOpen = false">Меню</RouterLink>
        <RouterLink to="/bar" @click="menuOpen = false">Бар</RouterLink>
        <RouterLink to="/rations" @click="menuOpen = false">Рационы</RouterLink>
        <RouterLink to="/corporate" @click="menuOpen = false">Корп. обеды</RouterLink>
        <RouterLink to="/banquets" @click="menuOpen = false">Банкеты</RouterLink>
      </nav>

      <div class="header-contacts">
        <a v-for="(ph, i) in site.phones" :key="i" :href="'tel:' + ph" class="header-phone">
          <svg v-if="i === 0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          {{ formatPhone(ph) }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useContent } from '../composables/useContent'

const { site } = useContent()
const menuOpen = ref(false)

function formatPhone(ph) {
  const d = ph.replace(/\D/g, '')
  if (d.length === 11) {
    return `${d[0]} (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7,9)}-${d.slice(9)}`
  }
  return ph
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--cherry);
  height: var(--header-height);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.header-inner {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 24px;
}

.header-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  line-height: 1;
}

.header-logo-sub {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 4px;
}

.header-logo-main {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 3px;
}

.header-logo:hover .header-logo-sub {
  color: var(--tan-light);
}

.header-logo:hover .header-logo-main {
  color: var(--tan-light);
}

.header-nav {
  display: flex;
  gap: 28px;
  margin-left: auto;
}

.header-nav a {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  font-size: 1.25rem;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.header-nav a:hover,
.header-nav a.router-link-exact-active {
  color: var(--white);
  border-bottom-color: var(--tan);
}

.header-contacts {
  margin-left: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.header-phone {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--white);
  font-weight: 600;
  font-size: 1.2rem;
  white-space: nowrap;
}

.header-phone:hover {
  color: var(--tan-light);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}

.burger span {
  display: block;
  width: 28px;
  height: 3px;
  background: var(--white);
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}

.burger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.burger.open span:nth-child(2) {
  opacity: 0;
}

.burger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .burger {
    display: flex;
    order: 3;
  }

  .header-nav {
    display: none;
    position: absolute;
    top: var(--header-height);
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--cherry-dark);
    padding: 16px var(--gap);
    gap: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 200;
  }

  .header-nav.open {
    display: flex;
  }

  .header-nav a {
    padding: 12px 0;
    font-size: 1.05rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header-nav a:last-child {
    border-bottom: none;
  }

  .header-contacts {
    display: none;
  }

  .header-logo-sub {
    font-size: 0.7rem;
    letter-spacing: 2px;
  }

  .header-logo-main {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }
}
</style>
