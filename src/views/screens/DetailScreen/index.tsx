import React, {useRef} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {useTheme} from '@/viewmodels/context/ThemeContext';
import AnimatedHeader from './AnimatedHeader';

const HEADER_MAX_HEIGHT = 250;

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

const DetailScreen = ({route}: {route: DetailScreenRouteProp}) => {
  const {car} = route.params;
  const {colors, spacing} = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <AnimatedHeader
        car={car}
        scrollY={scrollY}
        HEADER_MAX_HEIGHT={HEADER_MAX_HEIGHT}
      />

      <Animated.ScrollView
        testID="scroll-view"
        style={styles.scrollView}
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <View
          style={[
            styles.detailsContainer,
            {
              backgroundColor: colors.card,
              padding: spacing.md,
            },
          ]}>
          <Text
            style={[
              styles.carTitle,
              {
                color: colors.text,
                marginBottom: spacing.md,
              },
            ]}>
            {car.brand} {car.model} ({car.makeYear})
          </Text>

          <Text
            style={[
              styles.detailText,
              {
                color: colors.text,
                marginBottom: spacing.xs,
              },
            ]}>
            Gearbox: {car.gearbox}
          </Text>
          <Text
            style={[
              styles.detailText,
              {
                color: colors.text,
                marginBottom: spacing.xs,
              },
            ]}>
            Color: {car.color}
          </Text>
          <Text
            style={[
              styles.detailText,
              {
                color: colors.text,
                marginBottom: spacing.xs,
              },
            ]}>
            Year: {car.makeYear}
          </Text>
          <Text
            style={[
              styles.detailText,
              {
                color: colors.text,
                marginBottom: spacing.xs,
              },
            ]}>
            Date Posted: {new Date(car.datePosted).toLocaleDateString()}
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  detailsContainer: {},
  carTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
  },
});

export default DetailScreen;
