# use-text-selection

[React hook](https://reactjs.org/docs/hooks-reference.html) for tracking the state of the current text selection.

Useful when building any kind of UI that is displayed in relation to your text-selection. For example:
- Floating toolbars for richt text editing or content sharing.
- Autocomplete/suggestion featues in editors.

## Basic usage

```tsx
import { useTextSelection } from 'use-text-selection'

const MyTextSelectionComponent = () => {
  const { clientRect, isCollapsed } = useTextSelection()
  // to constrain text selection events to an element
  // just add the element as a an argument like `useTextSelection(myElement)`

  return <MyComponent
    style={{ left: clientRect.x, top: clientRect.y }}
  />
}
```

### Constraining text selection events to an element

`useTextSelection` takes one argument called, which would be a dom element which constrains updates to inside the dom element.

Retrieve a reference to this dom element with the `querySelector` api or with React refs (recommended).

Here's an example:

```tsx
const MyTextSelectionComponent = () => {
  const [ref, setRef] = useRef()
  const { clientRect, isCollapsed } = useTextSelection(ref.current)

  return <div>
    <div ref={(el) => setRef(el)}>
      <MyOtherComponent>
    </div>
    <MyComponent
      style={{ left: clientRect.x, top: clientRect.y }}
    />
  </div>
}
```
