# Layout

## Flex (alpha)

```tsx
// Will create a vertical flexbox
<Flex vertical={true}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>
```

## Grid (alpha)

```tsx
// Grid item data
const data = new Array(24).fill("🎶")

// Will create a 3x8 grid
<Grid cols={8} data={data} />
```
