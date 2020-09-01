import Sound from "react-native-sound";

export interface HookOptions {
  volume?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  onload?: () => void;
}

export interface PlayOptions {
  forceSoundEnabled?: boolean;
}

export type PlayFunction = (options?: PlayOptions) => void;

export interface Data {
  sound: Sound | null;
  stop: () => void;
  pause: () => void;
  isPlaying: boolean;
  duration: number | null;
}

export type ReturnedValue = [PlayFunction, Data];
