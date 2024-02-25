// .vitepress/config.js

export default {
  // 网页设置
  lang: 'zh-cmn-Hans',
  title: 'Wemsur的个人主页',
  description: 'b站UP Wemsur的个人主页',
  head: [['link', { rel: 'icon', href: 'https://wemsur.github.io/favicon.jpg' }]],
  base: '/',
  outDir: 'dist',

  themeConfig: {
    // theme-level options
    logo: '/favicon.jpg',
    nav: [
      { text: 'QQ', link: 'https://qm.qq.com/q/m3LNoDjY0U' },
      { text: 'bilibili', link: 'https://space.bilibili.com/1826712095' },
      { text: 'Github', link: 'https://github.com/Wemsur' }
    ]
  }
}

