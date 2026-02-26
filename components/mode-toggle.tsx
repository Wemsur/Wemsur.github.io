"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 必须在挂载后运行，否则无法正确读取系统的主题倾向
  useEffect(() => {
    setMounted(true)
  }, [])

  // 切换逻辑
  const toggleTheme = () => {
    // 如果当前真实渲染的是亮色，就切到暗色，反之亦然
    if (resolvedTheme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  // 在组件挂载前，渲染一个占位符，防止首屏闪烁
  if (!mounted) {
    return (
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    )
  }

  return (
      <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full" // 实现你要求的悬浮高亮圆角化
      >
        {/* Sun 图标在亮色模式显示，暗色模式缩放消失并旋转 */}
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        {/* Moon 图标在暗色模式显示，亮色模式缩放消失并旋转 */}
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
  )
}