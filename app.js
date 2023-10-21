import React, { useState, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import { SvgXml } from 'react-native-svg';
import logoSvg from './shanti.svg';

export default function App() {
  const [fadeIn] = useState(new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Animated.View style={{ opacity: fadeIn }}>
        <SvgXml xml={logoSvg} width={200} height={200} />
      </Animated.View>
    </View>
  );
}
