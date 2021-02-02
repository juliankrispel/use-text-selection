import { useCallback, useLayoutEffect, useState } from 'react'

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
 */
export function useTextSelection(target?: HTMLElement) {
  const [clientRect, setRect] = useState<ClientRect>()
  const [isCollapsed, setIsCollapsed] = useState<boolean>()
  const [textContent, setText] = useState<string>()

  const reset = useCallback(() => {
    setRect(undefined)
    setIsCollapsed(undefined)
    setText(undefined)
  }, [])

  const handler = useCallback(() => {
    let newRect: ClientRect
    const selection = window.getSelection()

    if (selection == null || !selection.rangeCount) {
      reset()
      return
    } 

    const range = selection.getRangeAt(0)

    if (target != null && !target.contains(range.commonAncestorContainer)) {
      reset()
      return
    }

    if (range == null) {
      reset()
      return
    }

    const contents = range.cloneContents()

    if (contents.textContent != null) setText(contents.textContent)

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
        return newRect
      }
      return oldRect
    })
    setIsCollapsed(range.collapsed)
  }, [])

  useLayoutEffect(() => {
    document.addEventListener('selectionchange', handler)
    document.addEventListener('keydown', handler)
    document.addEventListener('keyup', handler)
    window.addEventListener('resize', handler)

    return () => {
      document.removeEventListener('selectionchange', handler)
      document.removeEventListener('keydown', handler)
      document.removeEventListener('keyup', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  return {
    clientRect,
    isCollapsed,
    textContent
  }
}
