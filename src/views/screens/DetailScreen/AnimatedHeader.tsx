import React from 'react';
import {Animated, StyleSheet} from 'react-native';

interface AnimatedHeaderProps {
  car: any;
  scrollY: Animated.Value;
  HEADER_MAX_HEIGHT: number;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  car,
  scrollY,
  HEADER_MAX_HEIGHT,
}) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [HEADER_MAX_HEIGHT + 100, HEADER_MAX_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT],
    outputRange: [1, 0.8, 0.5],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      testID="animated-header"
      style={[styles.header, {height: headerHeight}]}>
      <Animated.Image
        source={{uri: car.photoUrl}}
        style={[
          styles.carImage,
          {
            opacity: imageOpacity,
            transform: [{scale: imageScale}],
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default AnimatedHeader;
