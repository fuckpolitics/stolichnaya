<template>
  <div class="admin-page">

    <!-- PIN screen -->
    <div v-if="!authenticated" class="auth-screen">
      <div class="auth-card">
        <h1 class="auth-title">Панель управления</h1>
        <p class="auth-subtitle">Введите PIN-код для доступа</p>
        <form @submit.prevent="checkPin">
          <input
            v-model="pinInput"
            type="password"
            class="auth-input"
            placeholder="PIN"
            autocomplete="current-password"
          />
          <p v-if="pinError" class="auth-error">Неверный PIN</p>
          <button type="submit" class="btn-primary">Войти</button>
        </form>
      </div>
    </div>

    <!-- Main CMS -->
    <div v-else class="cms-layout">
      <header class="cms-header">
        <h1 class="cms-logo">CMS — Столичная</h1>
        <button class="btn-logout" @click="logout">Выйти</button>
      </header>

      <div class="cms-body">

        <!-- GitHub token setup -->
        <section v-if="!tokenConfirmed" class="token-section card">
          <h2>Подключение к GitHub</h2>
          <p class="hint">
            Нужен Personal Access Token с правом <code>contents: write</code>.
            <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noopener">Создать токен</a>
          </p>
          <div class="token-row">
            <input
              v-model="githubToken"
              type="password"
              class="token-input"
              placeholder="github_pat_xxxxxxxx"
            />
            <button class="btn-primary" :disabled="tokenChecking" @click="confirmToken">
              {{ tokenChecking ? 'Проверка...' : 'Подключить' }}
            </button>
          </div>
          <p v-if="tokenError" class="auth-error">{{ tokenError }}</p>
        </section>

        <template v-else>
          <!-- Tabs -->
          <div class="tabs">
            <button
              class="tab"
              :class="{ active: activeTab === 'settings' }"
              @click="activeTab = 'settings'"
            >Настройки</button>
            <button
              class="tab"
              :class="{ active: activeTab === 'menu' }"
              @click="activeTab = 'menu'"
            >Меню</button>
            <button
              class="tab"
              :class="{ active: activeTab === 'bar' }"
              @click="activeTab = 'bar'"
            >Бар</button>
            <button
              class="tab"
              :class="{ active: activeTab === 'rations' }"
              @click="activeTab = 'rations'"
            >Рационы</button>
            <button
              class="tab"
              :class="{ active: activeTab === 'corporate' }"
              @click="activeTab = 'corporate'"
            >Корп. обеды</button>
            <button
              class="tab"
              :class="{ active: activeTab === 'banquets' }"
              @click="activeTab = 'banquets'"
            >Банкеты</button>
          </div>

          <!-- Settings tab -->
          <div v-if="activeTab === 'settings'" class="content-editor">
            <div class="card content-section">
              <h3 class="content-section-title">Контакты</h3>
              <div class="field-group">
                <label>Название заведения</label>
                <input v-model="site.name" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Слоган</label>
                <input v-model="site.tagline" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Адрес</label>
                <input v-model="site.address" type="text" class="field-input" />
              </div>
              <div class="content-two-col">
                <div class="field-group">
                  <label>Телефон 1</label>
                  <input v-model="site.phones[0]" type="text" class="field-input" />
                </div>
                <div class="field-group">
                  <label>Телефон 2</label>
                  <input v-model="site.phones[1]" type="text" class="field-input" />
                </div>
              </div>
              <div class="field-group">
                <label>Email</label>
                <input v-model="site.email" type="email" class="field-input" />
              </div>
              <div class="field-group">
                <label>Часы работы</label>
                <input v-model="site.workingHours" type="text" class="field-input" />
              </div>
            </div>

            <div class="card content-section">
              <h3 class="content-section-title">Главная страница</h3>
              <div class="field-group">
                <label>Заголовок</label>
                <input v-model="site.heroTitle" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Подзаголовок</label>
                <textarea v-model="site.heroSubtitle" class="field-input field-textarea" rows="3" />
              </div>
              <div class="field-group">
                <label>Заголовок «О нас»</label>
                <input v-model="site.aboutTitle" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Текст «О нас»</label>
                <textarea v-model="site.aboutText" class="field-input field-textarea" rows="4" />
              </div>
            </div>
          </div>

          <!-- Menu tab -->
          <div v-if="activeTab === 'menu'" class="content-editor">
            <div
              v-for="(cat, catIdx) in menu.categories"
              :key="catIdx"
              class="card content-section"
            >
              <div class="category-header">
                <h3 class="content-section-title" style="margin-bottom:0; border:none; padding:0">
                  {{ cat.name || 'Новая категория' }}
                </h3>
                <button class="btn-delete-small" @click="deleteCategory(catIdx)">Удалить</button>
              </div>
              <div class="field-group">
                <label>Название категории</label>
                <input v-model="cat.name" type="text" class="field-input" />
              </div>

              <div
                v-for="(item, itemIdx) in cat.items"
                :key="itemIdx"
                class="menu-item-editor"
              >
                <div class="menu-item-header">
                  <span class="menu-item-num">{{ itemIdx + 1 }}.</span>
                  <button class="btn-delete-tiny" @click="deleteMenuItem(cat, itemIdx)">✕</button>
                </div>
                <div class="content-two-col">
                  <div class="field-group">
                    <label>Название</label>
                    <input v-model="item.name" type="text" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Описание</label>
                    <input v-model="item.description" type="text" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Вес / объём</label>
                    <input v-model="item.weight" type="text" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Цена (₽)</label>
                    <input v-model.number="item.price" type="number" class="field-input" />
                  </div>
                </div>
                <div class="field-group">
                  <label>Фото (путь или URL)</label>
                  <div class="image-field-row">
                    <input v-model="item.image" type="text" class="field-input" placeholder="/images/menu/photo.jpg" />
                  </div>
                  <div v-if="item.image" class="image-preview">
                    <img :src="resolveImg(item.image)" :alt="item.name" />
                    <button class="btn-delete-tiny image-remove" @click="item.image = ''">✕</button>
                  </div>
                </div>
              </div>

              <button class="btn-add" @click="addMenuItem(cat)">+ Добавить блюдо</button>
            </div>
            <button class="btn-add" @click="addCategory">+ Добавить категорию</button>
          </div>

          <!-- Bar tab -->
          <div v-if="activeTab === 'bar'" class="content-editor">
            <div
              v-for="(cat, catIdx) in bar.categories"
              :key="catIdx"
              class="card content-section"
            >
              <div class="category-header">
                <h3 class="content-section-title" style="margin-bottom:0; border:none; padding:0">
                  {{ cat.name || 'Новая категория' }}
                </h3>
                <button class="btn-delete-small" @click="deleteBarCategory(catIdx)">Удалить</button>
              </div>
              <div class="field-group">
                <label>Название категории</label>
                <input v-model="cat.name" type="text" class="field-input" />
              </div>

              <div
                v-for="(item, itemIdx) in cat.items"
                :key="itemIdx"
                class="menu-item-editor"
              >
                <div class="menu-item-header">
                  <span class="menu-item-num">{{ itemIdx + 1 }}.</span>
                  <button class="btn-delete-tiny" @click="deleteBarItem(cat, itemIdx)">✕</button>
                </div>
                <div class="content-two-col">
                  <div class="field-group">
                    <label>Название</label>
                    <input v-model="item.name" type="text" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Описание</label>
                    <input v-model="item.description" type="text" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Объём</label>
                    <input v-model="item.weight" type="text" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Цена (₽)</label>
                    <input v-model.number="item.price" type="number" class="field-input" />
                  </div>
                </div>
                <div class="field-group">
                  <label>Фото (путь или URL)</label>
                  <div class="image-field-row">
                    <input v-model="item.image" type="text" class="field-input" placeholder="/images/menu/photo.jpg" />
                  </div>
                  <div v-if="item.image" class="image-preview">
                    <img :src="resolveImg(item.image)" :alt="item.name" />
                    <button class="btn-delete-tiny image-remove" @click="item.image = ''">✕</button>
                  </div>
                </div>
              </div>

              <button class="btn-add" @click="addBarItem(cat)">+ Добавить позицию</button>
            </div>
            <button class="btn-add" @click="addBarCategory">+ Добавить категорию</button>
          </div>

          <!-- Rations tab -->
          <div v-if="activeTab === 'rations'" class="content-editor">
            <div class="card content-section">
              <h3 class="content-section-title">Общие настройки</h3>
              <div class="field-group">
                <label>Заголовок страницы</label>
                <input v-model="rations.title" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Описание</label>
                <textarea v-model="rations.description" class="field-input field-textarea" rows="2" />
              </div>
            </div>

            <div
              v-for="(item, idx) in rations.items"
              :key="idx"
              class="card content-section"
            >
              <div class="category-header">
                <h3 class="content-section-title" style="margin-bottom:0; border:none; padding:0">
                  {{ item.name || 'Новый рацион' }}
                </h3>
                <button class="btn-delete-small" @click="deleteRation(idx)">Удалить</button>
              </div>
              <div class="field-group">
                <label>Название</label>
                <input v-model="item.name" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Описание</label>
                <textarea v-model="item.description" class="field-input field-textarea" rows="2" />
              </div>
              <div class="field-group">
                <label>Цена (₽)</label>
                <input v-model.number="item.price" type="number" class="field-input field-input--short" />
              </div>
              <div class="field-group">
                <label>Состав (каждый пункт с новой строки)</label>
                <textarea
                  :value="item.contents.join('\n')"
                  class="field-input field-textarea"
                  rows="4"
                  @input="item.contents = $event.target.value.split('\n').filter(s => s.trim())"
                />
              </div>
            </div>
            <button class="btn-add" @click="addRation">+ Добавить рацион</button>
          </div>

          <!-- Corporate tab -->
          <div v-if="activeTab === 'corporate'" class="content-editor">
            <div class="card content-section">
              <h3 class="content-section-title">Общие настройки</h3>
              <div class="field-group">
                <label>Заголовок страницы</label>
                <input v-model="corporate.title" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Описание</label>
                <textarea v-model="corporate.description" class="field-input field-textarea" rows="2" />
              </div>
              <div class="field-group">
                <label>Текст внизу (призыв к действию)</label>
                <textarea v-model="corporate.cta" class="field-input field-textarea" rows="2" />
              </div>
            </div>

            <div
              v-for="(item, idx) in corporate.items"
              :key="idx"
              class="card content-section"
            >
              <div class="category-header">
                <h3 class="content-section-title" style="margin-bottom:0; border:none; padding:0">
                  {{ item.name || 'Новый вариант' }}
                </h3>
                <button class="btn-delete-small" @click="deleteCorporateItem(idx)">Удалить</button>
              </div>
              <div class="content-two-col">
                <div class="field-group">
                  <label>Название</label>
                  <input v-model="item.name" type="text" class="field-input" />
                </div>
                <div class="field-group">
                  <label>Описание</label>
                  <input v-model="item.description" type="text" class="field-input" />
                </div>
                <div class="field-group">
                  <label>Цена (₽)</label>
                  <input v-model.number="item.price" type="number" class="field-input" />
                </div>
                <div class="field-group">
                  <label>Подпись цены</label>
                  <input v-model="item.priceLabel" type="text" class="field-input" placeholder="на персону" />
                </div>
              </div>
              <div class="field-group">
                <label>Состав (каждый пункт с новой строки)</label>
                <textarea
                  :value="item.contents.join('\n')"
                  class="field-input field-textarea"
                  rows="4"
                  @input="item.contents = $event.target.value.split('\n').filter(s => s.trim())"
                />
              </div>
            </div>
            <button class="btn-add" @click="addCorporateItem">+ Добавить вариант</button>
          </div>

          <!-- Banquets tab -->
          <div v-if="activeTab === 'banquets'" class="content-editor">
            <div class="card content-section">
              <h3 class="content-section-title">Общие настройки</h3>
              <div class="field-group">
                <label>Заголовок страницы</label>
                <input v-model="banquets.title" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Описание страницы</label>
                <textarea v-model="banquets.description" class="field-input field-textarea" rows="3" />
              </div>
              <div class="field-group">
                <label>Текст внизу страницы (призыв к действию)</label>
                <textarea v-model="banquets.cta" class="field-input field-textarea" rows="2" />
              </div>
            </div>

            <div
              v-for="(section, secIdx) in banquets.sections"
              :key="secIdx"
              class="card content-section"
            >
              <div class="category-header">
                <h3 class="content-section-title" style="margin-bottom:0; border:none; padding:0">
                  {{ section.title || 'Новый раздел' }}
                </h3>
                <button class="btn-delete-small" @click="deleteBanquetSection(secIdx)">Удалить</button>
              </div>
              <div class="field-group">
                <label>Заголовок</label>
                <input v-model="section.title" type="text" class="field-input" />
              </div>
              <div class="field-group">
                <label>Описание</label>
                <textarea v-model="section.description" class="field-input field-textarea" rows="3" />
              </div>

              <div
                v-for="(item, itemIdx) in section.items"
                :key="itemIdx"
                class="menu-item-editor"
              >
                <div class="menu-item-header">
                  <span class="menu-item-num">{{ itemIdx + 1 }}.</span>
                  <button class="btn-delete-tiny" @click="section.items.splice(itemIdx, 1)">✕</button>
                </div>
                <div class="content-two-col">
                  <div class="field-group">
                    <label>Название</label>
                    <input v-model="item.name" type="text" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Описание</label>
                    <input v-model="item.description" type="text" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Цена (₽)</label>
                    <input v-model.number="item.price" type="number" class="field-input" />
                  </div>
                  <div class="field-group">
                    <label>Мин. гостей</label>
                    <input v-model.number="item.minGuests" type="number" class="field-input" />
                  </div>
                </div>
                <div class="field-group">
                  <label>Состав (каждый пункт с новой строки)</label>
                  <textarea
                    :value="(item.contents || []).join('\n')"
                    class="field-input field-textarea"
                    rows="3"
                    @input="item.contents = $event.target.value.split('\n').filter(s => s.trim())"
                  />
                </div>
              </div>

              <button class="btn-add" @click="addBanquetItem(section)">+ Добавить вариант</button>
            </div>
            <button class="btn-add" @click="addBanquetSection">+ Добавить раздел</button>
          </div>

          <!-- Save bar -->
          <div class="save-bar">
            <div v-if="saveStatus" class="save-status" :class="saveStatus.type">
              {{ saveStatus.message }}
            </div>
            <button class="btn-save" :disabled="saving || !hasChanges" @click="saveAll">
              {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { GitHubApi } from '../utils/githubApi.js'
import siteSource from '../../content/site.json'
import menuSource from '../../content/menu.json'
import barSource from '../../content/bar.json'
import rationsSource from '../../content/rations.json'
import corporateSource from '../../content/corporate.json'
import banquetsSource from '../../content/banquets.json'

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || 'admin'
const GH_OWNER = import.meta.env.VITE_GITHUB_OWNER || ''
const GH_REPO = import.meta.env.VITE_GITHUB_REPO || ''
const SESSION_KEY = 'cms_auth'

export default {
  name: 'AdminView',

  data() {
    return {
      authenticated: sessionStorage.getItem(SESSION_KEY) === '1',
      pinInput: '',
      pinError: false,

      githubToken: '',
      tokenConfirmed: false,
      tokenChecking: false,
      tokenError: '',
      api: null,

      site: JSON.parse(JSON.stringify(siteSource)),
      menu: JSON.parse(JSON.stringify(menuSource)),
      bar: JSON.parse(JSON.stringify(barSource)),
      rations: JSON.parse(JSON.stringify(rationsSource)),
      corporate: JSON.parse(JSON.stringify(corporateSource)),
      banquets: JSON.parse(JSON.stringify(banquetsSource)),

      activeTab: 'settings',
      saving: false,
      saveStatus: null,
      _initialSignature: null
    }
  },

  computed: {
    _stateSignature() {
      return JSON.stringify({
        site: this.site,
        menu: this.menu,
        bar: this.bar,
        rations: this.rations,
        corporate: this.corporate,
        banquets: this.banquets
      })
    },
    hasChanges() {
      return this._stateSignature !== this._initialSignature
    }
  },

  created() {
    this.$nextTick(() => {
      this._initialSignature = this._stateSignature
    })
  },

  methods: {
    resolveImg(path) {
      if (!path) return ''
      if (path.startsWith('http')) return path
      const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
      return base + path
    },

    checkPin() {
      if (this.pinInput === ADMIN_PIN) {
        this.authenticated = true
        this.pinError = false
        sessionStorage.setItem(SESSION_KEY, '1')
      } else {
        this.pinError = true
        this.pinInput = ''
      }
    },

    logout() {
      this.authenticated = false
      sessionStorage.removeItem(SESSION_KEY)
    },

    async confirmToken() {
      if (!this.githubToken.trim()) {
        this.tokenError = 'Введите токен'
        return
      }
      this.tokenChecking = true
      this.tokenError = ''
      try {
        this.api = new GitHubApi(this.githubToken.trim(), GH_OWNER, GH_REPO)
        const ok = await this.api.validateToken()
        if (ok) {
          this.tokenConfirmed = true
        } else {
          this.tokenError = 'Токен недействителен или нет прав на этот репозиторий'
          this.api = null
        }
      } catch (e) {
        this.tokenError = 'Ошибка соединения: ' + e.message
        this.api = null
      } finally {
        this.tokenChecking = false
      }
    },

    // Menu helpers
    addCategory() {
      this.menu.categories.push({ name: '', items: [] })
    },
    deleteCategory(idx) {
      if (!confirm('Удалить категорию и все её блюда?')) return
      this.menu.categories.splice(idx, 1)
    },
    addMenuItem(cat) {
      cat.items.push({ name: '', description: '', weight: '', price: 0, image: '' })
    },
    deleteMenuItem(cat, idx) {
      cat.items.splice(idx, 1)
    },

    // Bar helpers
    addBarCategory() {
      this.bar.categories.push({ name: '', items: [] })
    },
    deleteBarCategory(idx) {
      if (!confirm('Удалить категорию и все её позиции?')) return
      this.bar.categories.splice(idx, 1)
    },
    addBarItem(cat) {
      cat.items.push({ name: '', description: '', weight: '', price: 0, image: '' })
    },
    deleteBarItem(cat, idx) {
      cat.items.splice(idx, 1)
    },

    // Rations helpers
    addRation() {
      this.rations.items.push({ name: '', description: '', price: 0, contents: [] })
    },
    deleteRation(idx) {
      if (!confirm('Удалить рацион?')) return
      this.rations.items.splice(idx, 1)
    },

    // Corporate helpers
    addCorporateItem() {
      this.corporate.items.push({ name: '', description: '', price: 0, priceLabel: 'на персону', contents: [] })
    },
    deleteCorporateItem(idx) {
      if (!confirm('Удалить вариант?')) return
      this.corporate.items.splice(idx, 1)
    },

    // Banquets helpers
    addBanquetSection() {
      this.banquets.sections.push({ title: '', description: '', items: [] })
    },
    deleteBanquetSection(idx) {
      if (!confirm('Удалить раздел?')) return
      this.banquets.sections.splice(idx, 1)
    },
    addBanquetItem(section) {
      section.items.push({ name: '', description: '', price: 0, minGuests: 10, contents: [] })
    },

    // Save
    async saveAll() {
      if (!this.api) {
        this.saveStatus = { type: 'error', message: 'Не подключён GitHub токен' }
        return
      }
      this.saving = true
      this.saveStatus = null

      try {
        await this.api.updateAllContent(this.site, this.menu, this.bar, this.rations, this.corporate, this.banquets)
        this._initialSignature = this._stateSignature
        this.saveStatus = { type: 'success', message: 'Сохранено! Деплой запущен, изменения появятся через ~2 минуты.' }
      } catch (e) {
        if (e.message && e.message.includes('422')) {
          this._initialSignature = this._stateSignature
          this.saveStatus = { type: 'success', message: 'Сохранено! Деплой запущен, изменения появятся через ~2 минуты.' }
        } else {
          this.saveStatus = { type: 'error', message: 'Ошибка: ' + e.message }
        }
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #f4f5f7;
  font-family: var(--font-body, 'Montserrat', sans-serif);
}

/* Auth */
.auth-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.auth-card {
  background: white;
  border-radius: 16px;
  padding: 48px 40px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--cherry);
  margin-bottom: 8px;
}

.auth-subtitle {
  color: #666;
  margin-bottom: 28px;
  font-size: 15px;
}

.auth-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 4px;
  box-sizing: border-box;
  outline: none;
  margin-bottom: 14px;
  transition: border-color 0.2s;
}

.auth-input:focus {
  border-color: var(--cherry);
}

.auth-error {
  color: #e53935;
  font-size: 14px;
  margin-bottom: 10px;
}

/* CMS layout */
.cms-header {
  background: var(--cherry);
  color: white;
  padding: 0 32px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.cms-logo {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.cms-body {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 20px 80px;
}

/* Card */
.card {
  background: white;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.07);
  padding: 24px;
  margin-bottom: 20px;
}

/* Token */
.token-section h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--cherry);
}

.hint {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.hint a {
  color: var(--cherry);
}

.token-row {
  display: flex;
  gap: 12px;
}

.token-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  font-family: monospace;
}

.token-input:focus {
  border-color: var(--cherry);
}

/* Tabs */
.tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.tab {
  padding: 9px 20px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  background: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--cherry);
  color: var(--cherry);
}

.tab.active {
  background: var(--cherry);
  border-color: var(--cherry);
  color: white;
}

/* Fields */
.field-group {
  margin-bottom: 16px;
}

.field-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}

.field-input:focus {
  border-color: var(--cherry);
}

.field-textarea {
  resize: vertical;
  min-height: 70px;
}

.field-input--short {
  width: 140px;
}

/* Content editor */
.content-editor {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-section {
  padding: 20px 24px;
}

.content-section-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--cherry);
  margin: 0 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(123,32,64,0.12);
}

.content-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}

/* Category & menu item helpers */
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(123,32,64,0.12);
}

.menu-item-editor {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item-editor:last-of-type {
  border-bottom: none;
}

.menu-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.menu-item-num {
  font-size: 14px;
  font-weight: 700;
  color: #999;
}

/* Image field */
.image-field-row {
  display: flex;
  gap: 8px;
}

.image-preview {
  position: relative;
  margin-top: 8px;
  width: 160px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e0e0e0;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-remove {
  position: absolute;
  top: 4px;
  right: 4px;
}

/* Buttons */
.btn-primary {
  background: var(--cherry);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.85;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-logout {
  background: rgba(255,255,255,0.15);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-logout:hover {
  background: rgba(255,255,255,0.25);
}

.btn-save {
  background: var(--cherry);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-save:hover:not(:disabled) {
  opacity: 0.85;
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-add {
  align-self: flex-start;
  background: none;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.btn-add:hover {
  border-color: var(--cherry);
  color: var(--cherry);
  background: rgba(123,32,64,0.03);
}

.btn-delete-small {
  background: none;
  border: 1px solid #e53935;
  color: #e53935;
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-delete-small:hover {
  background: #ffebee;
}

.btn-delete-tiny {
  background: rgba(229,57,53,0.85);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-delete-tiny:hover {
  background: #e53935;
}

/* Save bar */
.save-bar {
  position: sticky;
  bottom: 0;
  background: white;
  border-top: 1px solid #eee;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.save-status {
  font-size: 14px;
  padding: 8px 14px;
  border-radius: 8px;
}

.save-status.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.save-status.error {
  background: #ffebee;
  color: #c62828;
}

@media (max-width: 600px) {
  .content-two-col {
    grid-template-columns: 1fr;
  }

  .cms-header {
    padding: 0 16px;
  }

  .cms-body {
    padding: 16px 12px 80px;
  }

  .token-row {
    flex-direction: column;
  }
}
</style>
