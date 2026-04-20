import { reactive } from 'vue'
import siteData from '../../content/site.json'
import menuData from '../../content/menu.json'
import barData from '../../content/bar.json'
import rationsData from '../../content/rations.json'
import corporateData from '../../content/corporate.json'
import banquetsData from '../../content/banquets.json'

const state = reactive({
  site: siteData,
  menu: menuData,
  bar: barData,
  rations: rationsData,
  corporate: corporateData,
  banquets: banquetsData,
})

export function useContent() {
  return state
}
