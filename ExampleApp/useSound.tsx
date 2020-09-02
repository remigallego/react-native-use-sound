import {useEffect, useState, useCallback, useRef} from 'react';
import Sound from 'react-native-sound';
import useInterval from '@use-it/interval';

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

const useSound = (
  url: string,
  {
    volume = 1,
    soundEnabled = true,
    interrupt = false,
    timeRate = 1000,
  }: HookOptions = {},
) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Sound | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);

  const durationRef = useRef();
  // @ts-ignore
  durationRef.current = duration;

  const handleSetSound = (_sound: Sound) => {
    setSound(_sound);
    setDuration(_sound.getDuration());
    setCurrentTime(0);
  };

  useInterval(() => {
    if (sound?.isPlaying()) {
      sound?.getCurrentTime((sec) => {
        if (sec > duration) {
          setCurrentTime(duration);
        } else setCurrentTime(sec);
      });
    }
  }, timeRate);

  useEffect(() => {
    setLoading(true);
    Sound.setCategory('Playback');
    let isCancelled = false;
    const _sound = new Sound(url, '', () => {
      setLoading(false);
      if (!isCancelled) {
        handleSetSound(_sound);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (sound) {
      setLoading(true);
      stop();
      setSound(null);
      const _sound = new Sound(url, '', () => {
        setLoading(false);
        handleSetSound(_sound);
      });
    }
  }, [url]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(volume);
    }
  }, [volume]);

  const play: PlayFunction = useCallback(
    (options?: PlayOptions) => {
      if (!sound || (!soundEnabled && !options?.forceSoundEnabled)) {
        return;
      }
      if (interrupt) {
        sound.stop();
      }

      sound.play(() => {
        setIsPlaying(false);
        //@ts-ignore
        setCurrentTime(durationRef.current);
      });
      setIsPlaying(true);
    },
    [sound, soundEnabled, interrupt],
  );

  const stop = useCallback(() => {
    if (!sound) {
      return;
    }
    sound.stop(() => setIsPlaying(false));
  }, [sound]);

  const pause = useCallback(() => {
    if (!sound) {
      return;
    }
    sound.pause(() => {
      setIsPlaying(false);
    });
  }, [sound]);

  const seek = useCallback(
    (sec) => {
      if (!sound) {
        return;
      }
      sound.setCurrentTime(sec);
      setCurrentTime(sec);
    },
    [sound],
  );

  const returnedValue: ReturnedValue = [
    play,
    pause,
    stop,
    {
      seek,
      sound,
      isPlaying,
      duration,
      currentTime,
      loading,
    },
  ];
  return returnedValue;
};

export default useSound;
