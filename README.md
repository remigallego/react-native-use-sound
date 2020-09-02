# react-native-use-sound

### 🔊 A React Native Hook for playing sounds 🔊

react-native-use-sound is largely based on the work by @joshwcomeau **[use-sound](https://github.com/joshwcomeau/use-sound)**

## Installation

⚠ You must first install `react-native-sound` ⚠

```bash
npm i react-native-sound
cd ios && pod install
```

Then, our Hook can be added:

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
    <Button
      title={!data.isPlaying ? "Play" : "Pause"}
      onPress={onPress}
    ></Button>
  );
};
```

---

## API Documentation

The `useSound` hook takes two arguments:

- A URL to the sound that it will load
- A config object (`HookOptions`)

It produces an array with four values:

- A function you can call to play the sound
- A function you can call to pause the sound
- A function you can call to stop the sound
- An object with additional data and controls (`ExposedData`)

### HookOptions

When calling `useSound`, you can pass it a variety of options:

| Name         | Value   |
| ------------ | ------- |
| volume       | number  |
| interrupt    | boolean |
| soundEnabled | boolean |
| timeRate     | number  |

- `volume` is a number from `0` to `1`, where `1` is full volume and `0` is comletely muted.
- `interrupt` specifies whether or not the sound should be able to "overlap" if the `play` function is called again before the sound has ended.
- `soundEnabled` allows you to pass a value (typically from context or redux or something) to mute all sounds. Note that this can be overridden in the `PlayOptions`, see below
- `timeRate` is the frequency (in milliseconds) at which the `currentTime` value will be updated. Default is 1000,

### ExposedData

The hook produces a tuple with 4 options, the play, pause, stop functions and an `Data` object:

```js
const [play, pause, stop, data] = useSound("/meow.mp3");
//                        ^ What we're talking about
```

| Name         | Value                            |
| ------------ | -------------------------------- |
| sound        | Sound                            |
| seek         | function ((sec: number) => void) |
| isPlaying    | boolean                          |
| duration     | number                           |
| currrentTime | number                           |
| loading      | boolean                          |

- `sound` is an escape hatch. It grants you access to the underlying `Sound` instance.
- `seek` is a function you can use to seek to a position in the sound.
- `isPlaying` lets you know whether this sound is currently playing or not. When the sound reaches the end, or it's interrupted with `stop` or `paused`, this value will flip back to `false`. You can use this to show some UI only while the sound is playing.
- `duration` is the length of the sample, in milliseconds.
- `currentTime` is the current time of the sample, in milliseconds.
- `loading` lets you know whether the current sample is loading.
