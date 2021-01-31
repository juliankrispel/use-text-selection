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

  return <MyComponent
    style={{ left: clientRect.x, top: clientRect.y }}
  />
}
```
