# react-native-use-sound

### 🔊 A React Native Hook for playing sounds 🔊

react-native-use-sound is largely based on the work by @joshwcomeau **[use-sound](https://github.com/joshwcomeau/use-sound)**

## Installation

⚠ You must first install `react-native-sound`

```bash
yarn add react-native-sound
cd ios && pod install
```

```bash
npm i react-native-sound
cd ios && pod install
```

Then, our Hook can be added:

```bash
yarn add react-native-use-sound
```

```bash
npm install react-native-use-sound
```

## Examples

### Basic Example

```js
import useSound from "react-native-use-sound";

const BoopButton = () => {
  const coolMusic =
    "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3";
  const [play, pause, stop, data] = useSound(coolMusic);

  const handlePlay = () => {
    if (!data.isPlaying) play();
    else pause();
  };

  return (
    <Button onPress={handlePlay}>{!data.isPlaying ? "Play" : "Pause"}</Button>
  );
};
```

---

## API Documentation

See the **[use-sound](https://github.com/joshwcomeau/use-sound)** documentation.
