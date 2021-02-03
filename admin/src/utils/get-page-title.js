import defaultSettings from '@/settings'

const title = defaultSettings.title || '设计师后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
