import React, { FunctionComponent, useCallback, useRef, useState } from 'react'
import { useTextSelection } from '../..'
import { css } from '@emotion/css'
import { createPortal } from 'react-dom'

const Portal: FunctionComponent = ({ children }) => {
  return createPortal(children, document.body)
}

export const Popover = ({ target }: { target?: HTMLElement }) => {
  const { isCollapsed, clientRect } = useTextSelection(target)

  if (clientRect == null || isCollapsed) return null

  const style = css`
    position: absolute;
    left: ${clientRect.left + clientRect.width / 2}px;
    top: ${clientRect.top - 40}px;
    margin-left: -50px;
    width: 100px;
    background: blue;
    text-align: center;
    color: white;
    border-radius: 3px;
  `

  return <Portal>
    <div className={style}>
      share me
    </div>
  </Portal>
}

export const Example = () => {
  const [target, setTarget] = useState<HTMLElement>()
  const ref = useCallback((el) => {
    if (el != null) {
      setTarget(el)
    } else {
      setTarget(undefined)
    }
  }, [])

  return <div>
    <h1><pre>use-text-selection</pre></h1>
    <div ref={ref}>Selecting text anywhere here will trigger the popover</div>
    <Popover target={target}/>
  </div>
}
