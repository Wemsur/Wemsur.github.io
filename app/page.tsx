"use client" // 声明这是一个客户端组件，允许使用 React 钩子 (hooks)

// 引入 UI 组件，这些通常是由 shadcn/ui 自动生成的组件
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// 引入 Lucide 图标库中的各种图标
import { Github, Film, Tv, Video, ChevronsDown } from "lucide-react";

// 引入 Next.js 的内置路由链接组件
import Link from "next/link";

// 引入暗黑/明亮模式切换组件
import { ModeToggle } from "@/components/mode-toggle";

// 引入 React 核心钩子
import { useEffect, useRef, useState } from "react";

// 引入处理 Tailwind CSS 类名合并的工具函数
import { cn } from "@/lib/utils";

export default function Home() {
  // 定义状态：记录页面是否发生向下滚动，用于改变导航栏的样式
  const [isScrolled, setIsScrolled] = useState(false);
  // 创建一个引用：指向首屏 Hero 区域的 DOM 节点
  const heroRef = useRef<HTMLElement>(null);

  // 新增状态：存储当前显示的“一言”内容
  const [hitokoto, setHitokoto] = useState("心中是寂然的轰鸣，像是某种巨大的坍塌。");
  // 新增状态：控制“一言”文字的可见性，用于实现渐隐渐现动画
  const [isVisible, setIsVisible] = useState(true);
  // --- 新增状态：用来检测鼠标是否悬浮在首屏文字区域 ---
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  // 监听窗口滚动事件的效果钩子
  useEffect(() => {
    const handleScroll = () => {
      // 当页面垂直滚动超过 50 像素时，设置 isScrolled 为 true
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 组件挂载时添加滚动事件监听器
    window.addEventListener("scroll", handleScroll);
    // 组件卸载时移除监听器，防止内存泄漏
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // 补充缺失的 ref 和 state
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- 1. 状态定义 ---
  const [videoSrc, setVideoSrc] = useState("");
  const [posterSrc, setPosterSrc] = useState("");
  const [isMounted, setIsMounted] = useState(false); // 新增：标记组件是否已挂载

  useEffect(() => {
    setIsMounted(true);

    const isMobile = window.innerWidth < 768;
    const paths = {
      poster: "/video-cover.jpg",
      lowRes: isMobile ? "/low-res-mobile.mp4" : "/low-res-collection.mp4",
      highRes: isMobile ? "/high-res-mobile.mp4" : "/high-res-collection.mp4"
    };

    // 1. 立即设置初始路径
    setPosterSrc(paths.poster);
    setVideoSrc(paths.lowRes);

    // 2. 预加载高清视频
    const highResVideo = document.createElement('video');
    highResVideo.src = paths.highRes;
    highResVideo.muted = true;
    highResVideo.preload = "auto";
    highResVideo.playsInline = true;

    // 3. 当高清视频准备好时执行切换
    highResVideo.oncanplaythrough = () => {
      const videoElement = videoRef.current;
      // 检查：1. 元素存在； 2. 当前不是高清版； 3. 确实有高清路径
      if (videoElement && !videoElement.src.includes(paths.highRes)) {
        console.log("高清视频已就绪，开始无缝切换...");

        const jumpTime = videoElement.currentTime; // 记录当前播放进度

        const onMetadataLoaded = () => {
          videoElement.currentTime = jumpTime; // 恢复进度
          videoElement.play().catch(e => console.warn("自动播放尝试:", e));
          videoElement.removeEventListener('loadedmetadata', onMetadataLoaded);
        };

        videoElement.addEventListener('loadedmetadata', onMetadataLoaded);

        // 执行切换
        videoElement.src = paths.highRes;
        videoElement.load(); // 强制加载新源
        setVideoSrc(paths.highRes); // 更新状态同步 UI
      }
    };

    // 清理函数：如果组件卸载，停止预加载
    return () => {
      highResVideo.oncanplaythrough = null;
      highResVideo.src = "";
      highResVideo.load();
    };
  }, []); // 保持空依赖数组，仅在挂载时执行一次

  return (
      // 页面最外层容器，设置最小高度铺满屏幕、背景色以及基础字体样式
      <div className="min-h-screen bg-background font-sans antialiased flex flex-col">

        {/* 顶部导航栏 (Navigation) */}
        <header className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300",
            // 如果页面发生了滚动，则应用毛玻璃背景和底部边框；否则保持透明
            isScrolled ? "bg-background/55 backdrop-blur border-b border-border/40 py-2" : "bg-transparent py-4"
        )}>
          <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 justify-between">

            {/* 导航栏左侧：Logo与主要导航链接 */}
            <div className="flex items-center">
              {/* 站点 Logo 链接 */}
              <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-primary transition-transform hover:scale-105">
                <span className="text-xl font-bold">Wemsur</span>
              </Link>
              {/* 桌面端可见的导航菜单 */}
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link href="#about" className="transition-colors hover:text-primary text-foreground/60">
                  简介
                </Link>
                <Link href="#projects" className="transition-colors hover:text-primary text-foreground/60">
                  项目
                </Link>
                <Link href="#contact" className="transition-colors hover:text-primary text-foreground/60">
                  联系平台
                </Link>
              </nav>
            </div>

            {/* 导航栏右侧：社交媒体链接与主题切换按钮 */}
            <div className="flex items-center space-x-2">
              {/* Bilibili 快捷链接 */}
              <Button variant="ghost" size="icon" asChild className="rounded-full">
                <Link href="https://space.bilibili.com/1826712095" target="_blank">
                  <Tv className="h-5 w-5" />
                  <span className="sr-only">Bilibili</span>
                </Link>
              </Button>
              {/* GitHub 快捷链接 */}
              <Button variant="ghost" size="icon" asChild className="rounded-full">
                <Link href="https://github.com/Wemsur" target="_blank">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              {/* 切换亮/暗模式的组件 */}
              <div className="[&_button]:rounded-full">
                <ModeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* 页面主内容区 */}
        <main className="flex-1 w-full">

          {/* 首屏全尺寸横幅区域 (Hero Section) */}
          <section
              ref={heroRef}
              className="relative flex flex-col items-center justify-center min-h-screen w-full text-center px-4 overflow-hidden"
          >
            {/* --- 背景视频 (z-0 层，最底部) --- */}
            {/* --- 背景视频 (z-0 层，最底部) --- */}
            {/* 修改后的视频组件 */}
            {isMounted && (
                <video
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none" // 将 fixed 改为 absolute
                    poster={posterSrc}
                />
            )}
            {/* 删除了内部的 <source> 标签 */}

            {/* --- 动态半透明蒙层 --- */}
            <div
                className={cn(
                    "absolute inset-0 z-10 pointer-events-none transition-all duration-700 ease-in-out",
                    isHeroHovered
                        ? "bg-white/50 dark:bg-black/70 backdrop-blur-[10px]" // 鼠标悬浮时：加重颜色，甚至可以加点轻微的毛玻璃效果
                        : "bg-white/20 dark:bg-black/30 backdrop-blur-none"  // 鼠标移开时：减轻遮罩，让背后的视频透出来
                )}
            />

            {/* 原有的径向渐变也建议做动态处理，增加氛围感 */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-60 dark:opacity-40 pointer-events-none" />

            {/* --- 首屏核心文字与按钮 (z-20 层，最高层，避免被视频遮挡) --- */}
            <div className="relative z-20 space-y-6 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10"
                 onMouseEnter={() => setIsHeroHovered(true)}   // 鼠标移入时触发加深遮罩
                 onMouseLeave={() => setIsHeroHovered(false)}  // 鼠标移出时恢复透明度
            >
              {/* 顶部标签 */}
              <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm border border-primary/20 bg-secondary/50 backdrop-blur-sm">
                视频剪辑 & 内容创作
              </Badge>

              {/* 主标题区 */}
              <h1 className="font-heading font-bold tracking-tighter antialiased flex flex-col items-center">
                {/* 名字部分容器 */}
                <div
                    className={cn(
                        "flex flex-col md:flex-row items-center justify-center", // 手机端纵向，电脑端横向
                        "bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent",
                        "text-7xl md:text-9xl", // 保持你设定的字号
                        "mb-24 md:mb-12" // 手机端 mb-24 确保下方内容显著下移，md 恢复常规
                    )}
                    style={{
                      fontFamily: 'var(--font-custom)',
                      lineHeight: '1.1', // 恢复正常行高，间距由 margin 控制更精准
                    }}
                >
                  {/* 第一行：风尘 */}
                  <span>风尘</span>

                  {/* 中间横杠：手机端隐藏，电脑端显示 */}
                  <span className="hidden md:inline mx-4">-</span>

                  {/* 第二行：Wemsur */}
                  <span className="mt-2 md:mt-0">Wemsur</span>
                </div>

                {/* 一言部分：已被上面的 mb-24 整体推下 */}
                <div className={cn(
                    "text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r text-accent-foreground transition-opacity duration-500 tracking-[-0.02em] font-medium",
                    isVisible ? "opacity-100" : "opacity-0"
                )}>
                  {hitokoto}
                </div>
              </h1>
              {/* 个人简介副标题 - 改成了 text-white/90 以便在深色视频上更清晰 */}
              <p className="max-w-[42rem] mx-auto leading-normal text-white/90 drop-shadow-md sm:text-xl sm:leading-8 font-light">
                Davinci Resolve使用者 | Minecraft/活动集锦视频创作 <br />
                会点编程吗？可能吧
              </p>

              {/* 行动呼吁 (Call to Action) 按钮组 */}
              <div className="space-x-4 pt-4">
                <Button asChild size="lg" className="rounded-full h-12 px-8 text-lg shadow-lg hover:shadow-primary/25 transition-all hover:scale-105">
                  <Link href="#projects" style={{ fontFamily: 'var(--font-secondary)' }} className="tracking-[0.05em] gap-x-0.5">
                    <Film className="mr-2 h-5 w-5 "/> 我的作品
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 text-lg border-2 hover:bg-secondary/50 transition-all bg-background/50 backdrop-blur-sm text-white">
                  <Link href="#contact" style={{ fontFamily: 'var(--font-secondary)' }} className="tracking-[0.05em]">联系我</Link>
                </Button>
              </div>
            </div>

            {/* 底部向下滚动的动态指示器 (z-20 层) */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
              {/* 指示器改为了白色，防止深色模式下被黑色蒙层吞没 */}
              <ChevronsDown className="h-8 w-8 text-white/80" strokeWidth={1.5} />
            </div>
          </section>

          {/* 内容容器：包裹后续的所有页面段落 */}
          <div className="container mx-auto px-4 max-w-screen-2xl space-y-24 py-12">

            {/* 关于我区域 (About Section) */}
            <section id="about" className="scroll-mt-24">
              <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold tracking-[0.05em]" style={{ fontFamily: 'var(--font-secondary)' }}>
                  关于
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                  风尘，又名Wemsur，Minecraft玩家，通常使用达芬奇创作视频，调色爱好者。 <br/>
                  在b站，抖音上发布Minecraft视频，包括生存，高燃剪辑等类型，创作少数赤石科技。<br/>
                  校园电视台 媒体技术部 后期成员<br/>
                  SolarIIX团队成员
                </p>
              </div>

              {/* 使用 CSS Grid 布局展示个人能力卡片 */}
              <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {/* 卡片1：电视台剪辑 */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:bg-primary/10 hover:shadow-primary/20 transition-colors">
                  <CardHeader>
                    <Video className="h-10 w-10 mb-2 text-primary" />
                    <CardTitle>视频剪辑</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      立志做高质量中长视频<br/>
                      b站视频数据惨淡<br/>
                      受神秘的b站推流，不想再做<br/>
                      基本掌握达芬奇的剪辑，调色面板
                    </p>
                  </CardContent>
                </Card>
                {/* 卡片2：B站创作者 */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <img
                        src="/Solariix.png"
                        alt="Minecraft Icon"
                        className="h-10 w-20 mb-2 object-contain"
                    />
                    <CardTitle>Solariix成员</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      在SolarIIX团队中<br/>
                      担任…什么职务呢？<br/>
                      运营？
                    </p>
                  </CardContent>
                </Card>
                {/* 卡片3：视频剪辑技能 */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <img
                        src="/mc.png"
                        alt="Minecraft Icon"
                        className="h-10 w-10 mb-2 object-contain rounded-xl"
                    />
                    <CardTitle>Minecraft玩家</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      生电玩家，pvp技术极低<br/>
                      曾带领像素之源（原wewmem）走向失败<br/>

                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 区域分隔线 */}
            <Separator className="max-w-4xl mx-auto" />

            {/* 项目展示区域 (Projects Section) */}
            <section id="projects" className="scroll-mt-24">
              <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold tracking-[0.05em]" style={{ fontFamily: 'var(--font-secondary)' }}>
                  作品
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                  A showcase of my recent editing projects.
                </p>
              </div>

              {/* 项目展示卡片网格 */}
              <div className="mx-auto grid justify-center gap-8 md:max-w-[70rem] lg:grid-cols-2">

                {/* 项目 1 */}
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors group">
                  {/* 视频播放器包裹器，保证 16:9 比例 */}
                  <div className="aspect-video w-full bg-black relative">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster="/placeholder-video-poster.jpg" // 封面图位置
                    >
                      <source src="/temp.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">Campus News Broadcast</CardTitle>
                    <CardDescription>School TV Station • Editor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Weekly news segment covering student activities and school announcements. Handled multi-cam editing and motion graphics.
                    </p>
                  </CardContent>
                </Card>

                {/* 项目 2 */}
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors group">
                  <div className="aspect-video w-full bg-black relative">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                    >
                      <source src="/temp.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">Minecraft Survival Ep. 1</CardTitle>
                    <CardDescription>Bilibili • Content Creation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The start of a new adventure. Features fast-paced editing, humorous subtitles, and engaging background music.
                    </p>
                  </CardContent>
                </Card>

                {/* 项目 3 */}
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors group">
                  <div className="aspect-video w-full bg-black relative">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                    >
                      <source src="/temp.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">Cinematic Build Showcase</CardTitle>
                    <CardDescription>Minecraft • Visuals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A visual tour of a cyberpunk city build. Focused on smooth camera paths (Replay Mod) and atmospheric color grading.
                    </p>
                  </CardContent>
                </Card>

                {/* 项目 4 */}
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors group">
                  <div className="aspect-video w-full bg-black relative">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                    >
                      <source src="/temp.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">Event Highlight Reel</CardTitle>
                    <CardDescription>Freelance • Event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Highlights from the annual sports festival. Dynamic cuts matched to high-energy music.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 区域分隔线 */}
            <Separator className="max-w-4xl mx-auto" />

            {/* 联系方式区域 (Contact Section) */}
            <section id="contact" className="scroll-mt-24 pb-24">
              <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold">
                  Lets Collaborate
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                  Need an editor for your next video? Send me a message!
                </p>
              </div>

              {/* 表单组件区域 */}
              <div className="mx-auto max-w-[600px] w-full">
                <Card className="border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>Ill get back to you as soon as possible.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 姓名输入框 */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    {/* 邮箱输入框 */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                      <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    {/* 留言内容文本域 */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                      <Textarea id="message" placeholder="Type your message here." />
                    </div>
                  </CardContent>
                  {/* 提交按钮 */}
                  <CardFooter>
                    <Button className="w-full text-lg h-12">Send Message</Button>
                  </CardFooter>
                </Card>
              </div>
            </section>
          </div>
        </main>

        {/* 底部版权信息 (Footer) */}
        <footer className="py-6 md:px-8 md:py-0 border-t bg-muted/30">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by <span className="font-medium underline underline-offset-4 text-primary">Wemsur</span>.
              <br className="md:hidden"/>
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </footer>
      </div>
  );
}