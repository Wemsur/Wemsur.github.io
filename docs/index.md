---
layout: home

hero:
  name: Wemsur
  text: 逃离单身啦！
  tagline: 往下看吧...
  image:
    src: /favicon.png
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
    title: 不单身了
    details: 愿天下有情人终成眷属
---

<style>

@import url('https://fonts.googleapis.com/css?family=Cairo');

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


.htitle {
	font-family: "Cairo";
	text-align: center;
	color: #FFF;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	letter-spacing: 1px;
	line-height:2
}

h1 {
	background-image: url(https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif);
	background-size: cover;
	color: transparent;
	-moz-background-clip: text;
	-webkit-background-clip: text;
	text-transform: uppercase;
	font-size: 120px;
	margin: 10px 0;
}
/* styling my button */

.white-mode {
	text-decoration: none;
	padding: 7px 10px;
	background-color: #122;
	border-radius: 3px;
	color: #FFF;
	transition: .35s ease-in-out;
	position: absolute;
	left: 15px;
	bottom: 15px;
	font-family: "Montserrat";
}

.white-mode:hover {
	background-color: #FFF;
	color: #122;
}

/* === removing default button style ===*/
.button {
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
}

/* button styling */
.button {
  --border-right: 6px;
  --text-stroke-color: rgba(255,255,255,0.6);
  --animation-color: #37FF8B;
  --fs-size: 2em;
  letter-spacing: 3px;
  text-decoration: none;
  font-size: var(--fs-size);
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px var(--text-stroke-color);
}
/* this is the text, when you hover on button */
.hover-text {
  position: absolute;
  box-sizing: border-box;
  content: attr(data-text);
  color: var(--animation-color);
  width: 0%;
  inset: 0;
  border-right: var(--border-right) solid var(--animation-color);
  overflow: hidden;
  transition: 0.5s;
  -webkit-text-stroke: 1px var(--animation-color);
}
/* hover */
.button:hover .hover-text {
  width: 100%;
  filter: drop-shadow(0 0 23px var(--animation-color))
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

#



<h1>B站真鸽子</h1>

<a target="_blank" href="http://codepen.io/Moslim/" class="white-mode">OTHER PENS</a>

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

# 服务器倒闭?  <Badge type="warning" text="论我的惨痛经历" />

<br>
<br>

<button class="button" data-text="Awesome">
    <span class="actual-text">&nbsp;See&nbsp;</span>
    <span aria-hidden="true" class="hover-text">&nbsp;See&nbsp;</span>
</button>


### 服务器毁于我手，我心服口服

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
