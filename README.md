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

const BoopButton = () => {
  const boopSfx = "https://s3.us-west-2.amazonaws.com/boopSfx.mp3";
  const [play, pause, stop, data] = useSound(boopSfx);

  const handlePlay = () => {
    if(!data.isPlaying) play()
    else pause()
  }

  return <Button onPress={handlePlay}>Boop!</Button>;
};
```

---

## API Documentation

See the **[use-sound](https://github.com/joshwcomeau/use-sound)** documentation.
