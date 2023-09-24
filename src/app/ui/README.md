# `Pfui!`

🔮 **P**retty **F**uturistic **U**ser **I**nterface

**_`Pfui!`_** Modern UI framework that grows over time while implementing other projects.

---

## Quickstart

🚨 Don't! Work in progress

```bash
# Ready soon.
```

---

## Architecture

### Atomic Design

| Type     | Example                                          |
| -------- | ------------------------------------------------ |
| Element  | `<a href='#'>Link</a>`                           |
| Alias    | `<Fader />` aka. `<RangeInput vertical />`       |
| Compound | `Tabs` consists of `Nav` + `Section`             |
| Screen   | 2+ elements assembled                            |
| Page     | Multiple E, C and/or Sconsistselements assembled |

### Common Interface

Usage of a common interface to support existing UI frameworks:

There will be support for (among others):

- Bootstrap, Bulma, MUI, NextUI, PrimeReact, SemanticUI, TailwindCSS, TailwindCSS, TamaGui, UiKit

### Isomorphic Hooks

Content to follow

### Headless Components

Content to follow.

---

## 📦 What's in the box?

### Elements

| Name   | Native element    | Description                             |
| ------ | ----------------- | --------------------------------------- |
| Anchor | 'a'               | Link & Anchor                           |
| Dialog | 'dialog'          | interact with the user (e.g. OK/Cancel) |
| Flex   | 'display: "flex"' | Flexbox layout                          |
| Grid   | 'display: "grid"' | Grid Layout                             |
| List   | 'ul' & 'ol'       | Add/remove, sort, select, toggle, etc.  |
| Nav    | 'nav'             | Navigation                              |
| Range  | 'input type=range | Choose a range of values                |

### Compounds

Multiple elements working together to fulfill a specific purpose.

#### Fundamentals

The very basic building blocks.

| Name      | Elements                        | Details                                 |
| --------- | ------------------------------- | --------------------------------------- |
| Accordion | 'details'<br/>'summary'         | -                                       |
| Heading   | 'h1' -'h6'                      | Title, subtitle, etc.                   |
| Message   | 'section'<br/>`Heading`<br/>'p' | Error \| Info \| Log \| Success \| Warn |
| Tabs      | 'nav'<br/>'section`             | -                                       |

#### Audio

🙋‍♂️ _**Consider to put this into another Audio specific repository**_

Audio related compounds, e.g. to build a digital audio workstation

| Name        | Child elements | Details                             |
| ----------- | -------------- | ----------------------------------- |
| DrumSampler | `Grid`         | add/remove, move, resize MIDI notes |
| PianoRoll   | `Grid`         | add/remove, move, resize MIDI notes |

### Screens

Work in progress.
