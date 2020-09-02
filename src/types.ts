import Sound from "react-native-sound";

export interface HookOptions {
  volume?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  timeRate?: number;
}

export interface PlayOptions {
  forceSoundEnabled?: boolean;
}

export type PlayFunction = (options?: PlayOptions) => void;
export type PauseFunction = (options?: PlayOptions) => void;
export type StopFunction = (options?: PlayOptions) => void;

export interface Data {
  sound: Sound | null;
  seek: (seconds: number) => void;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  loading: boolean;
}

export type ReturnedValue = [PlayFunction, PauseFunction, StopFunction, Data];

export type SoundData = Sound;
