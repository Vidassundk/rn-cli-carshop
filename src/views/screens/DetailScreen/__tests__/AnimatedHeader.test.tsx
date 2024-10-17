import React from 'react';
import {render} from '@testing-library/react-native';
import AnimatedHeader from '../AnimatedHeader';
import {Animated} from 'react-native';

describe('AnimatedHeader', () => {
  const car = {
    photoUrl: 'https://example.com/car.jpg',
  };
  const scrollY = new Animated.Value(0);

  it('renders the animated header correctly', () => {
    const {getByTestId} = render(
      <AnimatedHeader car={car} scrollY={scrollY} HEADER_MAX_HEIGHT={250} />,
    );

    const header = getByTestId('animated-header');
    expect(header).toBeTruthy();
  });

  it('renders the car image correctly', () => {
    const {getByTestId} = render(
      <AnimatedHeader car={car} scrollY={scrollY} HEADER_MAX_HEIGHT={250} />,
    );

    const header = getByTestId('animated-header');
    expect(header).toBeTruthy();

    // Check the image source
    const image = header.findByType(Animated.Image);
    expect(image.props.source.uri).toBe(car.photoUrl);
  });
});
