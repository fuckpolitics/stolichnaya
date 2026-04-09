import { reactive } from 'vue'
import siteData from '../../content/site.json'
import menuData from '../../content/menu.json'
import rationsData from '../../content/rations.json'
import banquetsData from '../../content/banquets.json'

const state = reactive({
  site: siteData,
  menu: menuData,
  rations: rationsData,
  banquets: banquetsData,
})

export function useContent() {
  return state
}
