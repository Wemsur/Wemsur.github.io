---
layout: home

hero:
  name: Wemsur
  text: b站鸽子，倒闭腐竹，minecraft菜鸟
  tagline: 往下看吧...
  image:
    src: /favicon.jpg
    alt: VitePress
  actions:
    - theme: brand
      text: 来 像素之缘 看看
      link: https://qm.qq.com/q/vHZVLbQaEU
    - theme: alt
      text: QQ
      link: https://qm.qq.com/q/m3LNoDjY0U
features:
  - icon: 🕊️
    title: 做一只安静的鸽子
    details: 作为一个课业繁重的初中生，更新视频的时间少之又少，仅作为娱乐  

  - icon: 🖥️
    title: 一个服务器倒闭n次的腐竹
    details: 因为种种原因，开的minecraft服务器倒闭n次，现心灰意冷，不再开服

  - icon: 🕹️
    title: 玩Minecraft的菜鸟
    details: 起床战争从来没赢过，pvp从来都是输

  - icon: 😀
    title: 乐观的Modrinth整合包开发者
    details: 每天登录都在审核ing，不知道审核员跑哪去了
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>

<br>
<h1></h1>
<br>
<br>
<br>
<br>

---

<br>
<br>
<br>
<br>

# 主页   

## 什么？你问我在b站干什么？  

### 刷minecraft视频，发minecraft视频……没了……

作为一个想玩生电的mc菜鸟，各种机器教程肯定少不了  
每天翻翻视频，总能找到一些没啥用的东西    

发视频发一些没用的小东西，从来不管播放数据

::: info Tips：
除了正事以外什么都干
:::

> b站拥有30多粉丝的UP就是那么任性！   
> 但还是需要你的三连！😁  

::: warning 你的三连就是我更新的动力！
鸽子也是有信仰的！
:::

<br>
<br>
<br>
<br>

---

<br>
<br>
<br>
<br>
<br>

# 想知道为什么服务器倒闭?  <Badge type="warning" text="论我的惨痛经历" />  

### [来这看看](/badserver.html)     


### 你可能觉得开一个服务器很难，实际上并不简单
### 技术不是难点，人际关系是。
### 你不需要聪明，但是我太不聪明了
### 服务器毁于我手，我心服口服
### 我再也不开服了！

<br>
<br>
<br>
<br>

---

<br>
<br>
<br>
<br>
<br>


<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://hiluobo.flarum.cloud/assets/files/2024-02-25/1708826723-647468-bf7c1b10-a322-4042-999f-b22407c5e15d.jpg',
    name: 'lruri',
    title: '网友&同学',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://hiluobo.flarum.cloud/assets/files/2024-02-25/1708826723-647468-bf7c1b10-a322-4042-999f-b22407c5e15d.jpg',
    name: 'zane',
    title: '网友&朋友',
    links: [
      { icon: 'github', link: 'https://chzane.github.io' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  }
]
</script>

# 为数不多的朋友


<VPTeamMembers size="small" :members="members" />
