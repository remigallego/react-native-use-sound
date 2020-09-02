/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';

import useSound from 'react-native-use-sound';
import {toHHMMSS} from './utils';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const path =
    'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3';

  const [animatedValue] = useState(new Animated.Value(0));

  const [play, pause, stop, data] = useSound(path, {
    timeRate: 100,
  });

  const onPress = () => {
    if (!data.isPlaying) play();
    else pause();
  };

  useEffect(() => {
    if (data.currentTime === 0) {
      animatedValue.setValue(0);
    } else
      Animated.timing(animatedValue, {
        toValue: data.currentTime,
        duration: 100,
        useNativeDriver: true,
      }).start();
  }, [data.currentTime]);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => onPress()}>
            <Text
              style={{
                fontSize: 40,
                paddingBottom: 18,
              }}>
              {data.loading && <ActivityIndicator size={'large'} />}
              {!data.loading && <>{data.isPlaying ? 'Pause' : 'Play'}</>}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: 300,
              height: 10,
              backgroundColor: 'black',
              overflow: 'hidden',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 99,
              }}
              activeOpacity={0.9}
              onPress={(e) => {
                console.log(e.nativeEvent.locationX);
                console.log((e.nativeEvent.locationX * data.duration) / 300);
                data.seek((e.nativeEvent.locationX * data.duration) / 300);
              }}></TouchableOpacity>
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: 'red',
                width: 300,
                transform: [
                  {
                    translateX: animatedValue.interpolate({
                      inputRange: [0, data?.duration ?? 0],
                      outputRange: [-300, 0],
                    }),
                  },
                ],
              }}></Animated.View>
          </View>
          <Text>
            {toHHMMSS(data?.currentTime)}/{toHHMMSS(data?.duration)}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
