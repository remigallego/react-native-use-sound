# react-native-use-sound

### 🔊 A React Native Hook for playing sounds 🔊

react-native-use-sound is largely based on the work by @joshwcomeau **[use-sound](https://github.com/joshwcomeau/use-sound)**

## Installation

Package can be added using **yarn**:

```bash
yarn add react-native-use-sound
cd ios && pod install
```

Or, use NPM:

```bash
npm install react-native-use-sound
cd ios && pod install
```

## Examples

### Play sound on press

```js
import useSound from "react-native-use-sound";

import boopSfx from "https://www.youramazingwebsite.com/boopSfx.mp3";

const BoopButton = () => {
  const [play] = useSound(boopSfx);

  return <Button onPress={play}>Boop!</Button>;
};
```

---

## API Documentation

See the **[use-sound](https://github.com/joshwcomeau/use-sound)** documentation.
