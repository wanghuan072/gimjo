import { games } from '../src/data/games.js'
import fs from 'fs'
import path from 'path'

// 生成站点地图
function generateSitemap() {
  const baseUrl = 'https://gimjo.com'
  const currentDate = new Date().toISOString()
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
`

  // 游戏页面
  games.forEach(game => {
    const isFirstGame = games[0] && games[0].addressBar === game.addressBar
    const url = isFirstGame ? baseUrl : `${baseUrl}/${game.addressBar}`
    const priority = isFirstGame ? 1.0 : 0.8
    const changefreq = isFirstGame ? 'daily' : 'weekly'
    const lastmod = game.publishDate ? new Date(game.publishDate).toISOString() : currentDate
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`
  })

  sitemap += `</urlset>`

  // 写入文件 - 同时写入 public 和 dist 目录
  const publicPath = path.join(process.cwd(), 'public')
  const distPath = path.join(process.cwd(), 'dist')
  
  // 写入 public 目录（开发时可用，构建时会自动复制到 dist）
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true })
  }
  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap)
  
  // 如果 dist 目录存在，也写入一份（构建后）
  if (fs.existsSync(distPath)) {
    fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap)
  }
  
  console.log('✅ 站点地图生成成功！')
  console.log(`📄 包含 ${games.length} 个页面`)
  console.log(`📁 已保存到: public/sitemap.xml${fs.existsSync(distPath) ? ' 和 dist/sitemap.xml' : ''}`)
  console.log('🔗 页面列表:', games.map(g => {
    const isFirst = games[0] && games[0].addressBar === g.addressBar
    return isFirst ? baseUrl : `${baseUrl}/${g.addressBar}`
  }))
}

generateSitemap()
