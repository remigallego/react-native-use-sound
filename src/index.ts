import { useEffect, useState, useCallback, useRef } from "react";
import Sound from "react-native-sound";
import useInterval from "@use-it/interval";
import { HookOptions, ReturnedValue, PlayFunction, PlayOptions } from "./types";
import { validURL } from "./utils";

const useSound = (
  url: string,
  {
    volume = 1,
    soundEnabled = true,
    interrupt = false,
    timeRate = 1000,
    numberOfLoops = 0,
  }: HookOptions = {}
) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Sound | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState(0);

  const durationRef = useRef();
  // @ts-ignore
  durationRef.current = duration;

  const handleSetSound = (_sound: Sound) => {
    setSound(_sound);
    setDuration(_sound.getDuration());
    setCurrentTime(0);
    setLoading(false);
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
    if (sound) {
      sound.setNumberOfLoops(numberOfLoops);
    }
  }, [sound, numberOfLoops]);

  useEffect(() => {
    setLoading(true);
    Sound.setCategory("Playback");
    let isCancelled = false;
    let basePath = "";
    if (!validURL(url)) {
      basePath = Sound.MAIN_BUNDLE;
    }
    const _sound = new Sound(url, basePath, () => {
      if (!isCancelled) {
        handleSetSound(_sound);
      } else {
        setLoading(false);
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
      let basePath = "";
      if (!validURL(url)) {
        basePath = Sound.MAIN_BUNDLE;
      }
      const _sound = new Sound(url, basePath, () => {
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
    [sound, soundEnabled, interrupt]
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
    [sound]
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
