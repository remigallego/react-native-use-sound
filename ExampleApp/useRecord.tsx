import {useEffect, useState, useCallback} from 'react';
import Sound from 'react-native-sound';
import {HookOptions, PlayFunction, PlayOptions, ReturnedValue} from './types';

const useRecord = (
  url: string,
  {volume = 1, soundEnabled = true, interrupt = false}: HookOptions = {},
) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Sound | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const handleSetSound = (sound: Sound) => {
    setSound(sound);
    setDuration(sound.getDuration());
  };

  useEffect(() => {
    Sound.setCategory('Playback');
    let isCancelled = false;
    const sound = new Sound(url, '', () => {
      if (!isCancelled) {
        handleSetSound(sound);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (sound) {
      stop();
      setSound(null);
      const sound = new Sound(url, '', () => {
        handleSetSound(sound);
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

  const returnedValue: ReturnedValue = [
    play,
    {
      sound,
      stop,
      pause,
      isPlaying,
      duration,
    },
  ];
  return returnedValue;
};

export default useRecord;
