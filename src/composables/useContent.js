import { reactive } from 'vue'
import siteData from '../../content/site.json'
import menuData from '../../content/menu.json'
import rationsData from '../../content/rations.json'

const state = reactive({
  site: siteData,
  menu: menuData,
  rations: rationsData,
})

export function useContent() {
  return state
}
