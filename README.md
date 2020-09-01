# useSound

### A React Native Hook for Sound Effects

React Native Use Sound is largely based on the work by @joshwcomeau **[use-sound](https://github.com/joshwcomeau/use-sound)**

---

## Installation

Package can be added using **yarn**:

```bash
yarn add react-native-use-sound
```

Or, use NPM:

```bash
npm install react-native-use-sound
```

---

## Demo

---

## Examples

### Play sound on click

```js
import useSound from "react-native-use-sound";

import boopSfx from "../../sounds/boop.mp3";

const BoopButton = () => {
  const [play] = useSound(boopSfx);

  return <Button onClick={play}>Boop!</Button>;
};
```

---

## API Documentation

See the **[use-sound](https://github.com/joshwcomeau/use-sound)** documentation.
