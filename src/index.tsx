import React, { useCallback, useLayoutEffect, useState } from 'react'

type ClientRect = Record<keyof Omit<DOMRect, "toJSON">, number>

function roundValues(_rect: ClientRect) {
  const rect = {
    ..._rect
  }
  for (const key of Object.keys(rect)) {
    // @ts-ignore
    rect[key] = Math.round(rect[key])
  }
  return rect
}

function shallowDiff(prev: any, next: any) {
  if (prev != null && next != null) {
    for (const key of Object.keys(next)) {
      if (prev[key] != next[key]) {
        return true
      }
    }
  } else if (prev != next) {
    return true
  }
  return false
}

/**
 * useTextSelection(ref)
 * 
 * @description
 * hook to get information about the current text selection
 * 
 * @returns
 * { rect, isCollapsed }
 */
export function useTextSelection(ref?: React.RefObject<HTMLElement>) {
  const [rect, setRect] = useState<ClientRect>()
  const [isCollapsed, setIsCollapsed] = useState<boolean>()
  const target = ref?.current != null ? ref.current : document

  const handler = useCallback(() => {
    let newRect: ClientRect
    const selection = window.getSelection()
    if (selection == null || !selection.rangeCount) return 
    const range = selection.getRangeAt(0)
    if (range == null) return
    const rects = range.getClientRects()
    if (rects.length === 0 && range.commonAncestorContainer != null) {
      const el = range.commonAncestorContainer as HTMLElement
      newRect = roundValues(el.getBoundingClientRect().toJSON())
    } else {
      if (rects.length < 1) return
      newRect = roundValues(rects[0].toJSON())
    }
    setRect(oldRect => {
      if (shallowDiff(oldRect, newRect)) {
        console.log('it is different')
        return newRect
      }
      return oldRect
    })
    setIsCollapsed(range.collapsed)
  }, [])

  console.log('render', rect)

  useLayoutEffect(() => {
    target.addEventListener('selectionchange', handler)
    document.addEventListener('keydown', handler)
    target.addEventListener('keyup', handler)
    window.addEventListener('resize', handler)

    return () => {
      target.removeEventListener('selectionchange', handler)
      document.removeEventListener('keydown', handler)
      target.removeEventListener('keyup', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  return {
    rect,
    isCollapsed
  }
}
