import { ref, watch } from 'vue'
import { games } from '@/data/games.js'

// 基础网站信息
const SITE_INFO = {
  name: 'Gimjo',
  url: 'https://gimjo.com',
  description: 'Play exciting games instantly in your browser. No download required!',
  image: 'https://gimjo.com/images/logo.webp',
  twitter: '@gimjo',
  locale: 'en_US'
}

// 默认SEO数据
const defaultSEO = {
  title: 'Tower Jump - Play Instantly Online',
  description: 'Play Tower Jump and other exciting jumping games instantly in your browser. No download required!',
  keywords: 'Tower Jump, jumping game, online game, casual game, HTML5 game, browser game',
  canonical: SITE_INFO.url,
  ogTitle: 'Tower Jump - Play Instantly Online',
  ogDescription: 'Play Tower Jump and other exciting jumping games instantly in your browser. No download required!',
  ogImage: SITE_INFO.image,
  ogUrl: SITE_INFO.url,
  twitterTitle: 'Tower Jump - Play Instantly Online',
  twitterDescription: 'Play Tower Jump and other exciting jumping games instantly in your browser. No download required!',
  twitterImage: SITE_INFO.image
}

// 当前SEO状态
const currentSEO = ref({ ...defaultSEO })

/**
 * SEO Composable
 * 用于动态设置页面的SEO信息
 */
export function useSEO() {
  /**
   * 设置SEO信息
   * @param {Object} seoData - SEO数据对象
   * @param {string} seoData.title - 页面标题
   * @param {string} seoData.description - 页面描述
   * @param {string} seoData.keywords - 关键词
   * @param {string} seoData.canonical - 规范链接
   * @param {string} seoData.ogTitle - Open Graph标题
   * @param {string} seoData.ogDescription - Open Graph描述
   * @param {string} seoData.ogImage - Open Graph图片
   * @param {string} seoData.ogUrl - Open Graph链接
   * @param {string} seoData.twitterTitle - Twitter标题
   * @param {string} seoData.twitterDescription - Twitter描述
   * @param {string} seoData.twitterImage - Twitter图片
   */
  const setSEO = (seoData) => {
    const mergedSEO = {
      ...defaultSEO,
      ...seoData,
      // 确保URL是完整的
      canonical: seoData.canonical ? 
        (seoData.canonical.startsWith('http') ? seoData.canonical : `${SITE_INFO.url}${seoData.canonical}`) : 
        defaultSEO.canonical,
      ogUrl: seoData.ogUrl ? 
        (seoData.ogUrl.startsWith('http') ? seoData.ogUrl : `${SITE_INFO.url}${seoData.ogUrl}`) : 
        defaultSEO.ogUrl
    }
    
    currentSEO.value = mergedSEO
    updateDocumentHead()
  }

  /**
   * 根据游戏数据设置SEO
   * @param {string} addressBar - 游戏地址栏标识
   */
  const setGameSEO = (addressBar) => {
    const game = games.find(g => g.addressBar === addressBar)
    
    if (!game) {
      // 如果找不到游戏，使用默认SEO
      setSEO(defaultSEO)
      return
    }

    const gameUrl = games[0] && games[0].addressBar === addressBar ? SITE_INFO.url : `${SITE_INFO.url}/${addressBar}`
    const gameImage = game.imageUrl.startsWith('http') ? game.imageUrl : `${SITE_INFO.url}${game.imageUrl}`

    const gameSEO = {
      title: game.seo?.title || `${game.title} - Play Instantly Online`,
      description: game.seo?.description || game.keywords,
      keywords: game.seo?.keywords || game.keywords,
      canonical: gameUrl,
      ogTitle: game.seo?.title || `${game.title} - Play Instantly Online`,
      ogDescription: game.seo?.description || game.keywords,
      ogImage: gameImage,
      ogUrl: gameUrl,
      twitterTitle: game.seo?.title || `${game.title} - Play Instantly Online`,
      twitterDescription: game.seo?.description || game.keywords,
      twitterImage: gameImage
    }

    setSEO(gameSEO)
  }

  /**
   * 更新文档头部标签
   */
  const updateDocumentHead = () => {
    if (typeof document === 'undefined') return

    const seo = currentSEO.value

    // 更新基础标签
    updateMetaTag('title', seo.title, 'title')
    updateMetaTag('description', seo.description, 'name')
    updateMetaTag('keywords', seo.keywords, 'name')
    updateMetaTag('canonical', seo.canonical, 'link', 'href')

    // 更新Open Graph标签
    updateMetaTag('og:title', seo.ogTitle, 'property')
    updateMetaTag('og:description', seo.ogDescription, 'property')
    updateMetaTag('og:image', seo.ogImage, 'property')
    updateMetaTag('og:url', seo.ogUrl, 'property')
    updateMetaTag('og:type', 'website', 'property')
    updateMetaTag('og:site_name', SITE_INFO.name, 'property')
    updateMetaTag('og:locale', SITE_INFO.locale, 'property')

    // 更新Twitter标签
    updateMetaTag('twitter:card', 'summary_large_image', 'name')
    updateMetaTag('twitter:title', seo.twitterTitle, 'name')
    updateMetaTag('twitter:description', seo.twitterDescription, 'name')
    updateMetaTag('twitter:image', seo.twitterImage, 'name')
    updateMetaTag('twitter:site', SITE_INFO.twitter, 'name')
  }

  /**
   * 更新或创建meta标签
   * @param {string} name - 标签名称
   * @param {string} content - 标签内容
   * @param {string} attribute - 属性名称 (name, property, etc.)
   * @param {string} linkAttribute - 链接属性名称 (href, etc.)
   */
  const updateMetaTag = (name, content, attribute = 'name', linkAttribute = null) => {
    if (typeof document === 'undefined') return

    if (name === 'title') {
      document.title = content
      return
    }

    if (name === 'canonical') {
      // 处理canonical链接
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = content
      return
    }

    // 处理其他meta标签
    let meta = document.querySelector(`meta[${attribute}="${name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(attribute, name)
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  /**
   * 重置为默认SEO
   */
  const resetSEO = () => {
    setSEO(defaultSEO)
  }

  /**
   * 获取当前SEO信息
   */
  const getCurrentSEO = () => {
    return { ...currentSEO.value }
  }

  return {
    currentSEO,
    setSEO,
    setGameSEO,
    resetSEO,
    getCurrentSEO
  }
}
