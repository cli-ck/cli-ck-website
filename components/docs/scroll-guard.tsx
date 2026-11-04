"use client"

import { useEffect } from "react"

export function ScrollGuard() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    const prevHtmlOverscrollY = html.style.overscrollBehaviorY
    const prevBodyOverscrollY = body.style.overscrollBehaviorY

    html.style.overscrollBehaviorY = "none"
    body.style.overscrollBehaviorY = "none"

    return () => {
      html.style.overscrollBehaviorY = prevHtmlOverscrollY
      body.style.overscrollBehaviorY = prevBodyOverscrollY
    }
  }, [])

  return null
}
