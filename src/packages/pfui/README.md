# `Pfui!`

🔮 **P**retty **F**uturistic **U**ser **I**nterface

**_`Pfui!`_** Modern UI framework that grows over time while implementing other projects.

---

## Quickstart

<span style='background:#ffffcc;padding:.5rem'>🚨 Don't! Work in progress</span>

---

## A

```tsx
<A classNameActive="" href="#'">
  Link
</A>
```

## Accordion

```tsx
<Accordion details={} summary={} />
```

## Avatar

```tsx
<Avatar bordered={true} rounded={true} />
```

## Button

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="normal">Normal</Button>

<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
```

## ButtonGroup

```tsx
<ButtonGroup>
  <Button variant="primary">OK</Button>
  <Button variant="normal">Cancel</Button>
</ButtonGroup>
```

## Dialog

```tsx
<Dialog>
  <h1>Dialog</h1>
  <p>Dialog content</p>
  <ButtonGroup>
    <Button variant="primary">OK</Button>
    <Button variant="normal">Cancel</Button>
  </ButtonGroup>
</Dialog>
```

## Form

### RangeInput

```tsx
<RangeInput />
```

## Layout

### Flex

```tsx
// Will create a vertical flexbox
<Flex vertical={true}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>
```

### Grid

```tsx
// Grid item data
const data = new Array(24).fill("🎶")

// Will create a 3x8 grid
<Grid cols={8} data={data} />
```

## Message

```tsx
// Shows error message
<ErrorMessage />

// Shows info message
<InfoMessage />

// Shows success message
<SuccessMessage />
```

## Nav

```tsx
<Nav>
  <A>1</A>
  <A>2</A>
</Nav>
```

## Shape

### Circle

```tsx
<Circle />
```

## Tabs

TODO TabPanel should be removed

```tsx
<Tabs>
  <Nav>
    <A>1</A>
    <A>2</A>
  </Nav>
  <TabPanel />
  <TabPanel />
</Tabs>
```

---

## Contribution

Please check the [Contribution](../../../README.md) section here.
