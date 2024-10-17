import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = () => {
  const {colors} = useTheme();

  return <ActivityIndicator color={colors.primary} />;
};

export default Loader;
