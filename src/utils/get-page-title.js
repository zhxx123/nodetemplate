import defaultSettings from '@/settings'

const title = defaultSettings.title || 'MassGrid 控制台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
