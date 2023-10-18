# Hooks

## <span style="font-size:1rem;background:orange;color:#fff;padding:.5rem;">Deprecated</span> useActiveState

The generic `useActiveState<T>` can be used to handle any type of active state.

```tsx
// 😱 Looks like useState only for 'active' state
const initialActive = 0;
const { active, setActive } = useActiveState<number>(initialActive);
```
