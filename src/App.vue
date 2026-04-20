<template>
  <div id="app">
    <template v-if="!isAdmin">
      <AppHeader />
      <main class="main-content">
        <RouterView />
      </main>
      <AppFooter />
    </template>
    <RouterView v-else />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: { AppHeader, AppFooter },
  setup() {
    const route = useRoute()
    const isAdmin = computed(() => route.path === '/admin')
    return { isAdmin }
  }
}
</script>

