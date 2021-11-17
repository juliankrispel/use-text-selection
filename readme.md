# use-text-selection

[React hook](https://reactjs.org/docs/hooks-reference.html) for tracking the state of the current text selection.

Useful when building any kind of UI that is displayed in relation to your text-selection. For example:
- Floating toolbars for richt text editing or content sharing.
- Autocomplete/suggestion featues in editors.

## Basic usage

```tsx
import { useRef } from 'react'
import { useTextSelection } from 'use-text-selection'

export const AutoComplete = () => {
  const { clientRect, isCollapsed } = useTextSelection()
  // to constrain text selection events to an element
  // just add the element as a an argument like `useTextSelection(myElement)`

  if (clientRect == null) return null

  return (
    <div
      style={{
        left: clientRect.x,
        top: clientRect.y + clientRect.height,
        position: 'absolute',
      }}
    >
      Autocomplete
    </div>
  );
}}
```

### Constraining text selection events to an element

`useTextSelection` takes one argument called, which would be a dom element which constrains updates to inside the dom element.

Retrieve a reference to this dom element with the `querySelector` api or with React refs (recommended).

Here's an example:

```tsx
const MyTextSelectionComponent = () => {
  const [ref, setRef] = useRef()
  const { clientRect, isCollapsed } = useTextSelection(ref.current)

  if (clientRect == null) return null

  return (
    <>
      <div ref={(el) => setRef(el)}>
        <MyOtherComponent>
      </div>

      <div
        style={{
          left: clientRect.x,
          top: clientRect.y + clientRect.height,
          position: 'absolute',
        }}
      >
        Autocomplete
      </div>
    </>
  );
}
```

### Accessing the Common Ancestor

You can access the closest, common ancestor to all elements within the selection with the `closestAncestor` return value. This is forwarded directly from the [commonAncestorContainer](https://developer.mozilla.org/en-US/docs/Web/API/Range/commonAncestorContainer) from the text range.

```tsx
const { clientRect, isCollapsed, commonAncestor } = useTextSelection(ref.current);
```

## Work with me?

I build editors for companies, or help their teams do so. Hit me up on [my website](http://jkrsp.com) to get in touch about a project.
