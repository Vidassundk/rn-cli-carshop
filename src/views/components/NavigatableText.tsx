import {useTheme} from '@/viewmodels/context/ThemeContext';
import ThemedText from './ThemedText';
import React from 'react';

export const NavigableText: React.FC<{
  onPress: () => void;
  children: React.ReactNode;
}> = ({onPress, children}) => {
  const {colors} = useTheme();
  return (
    <ThemedText variant="p" onPress={onPress} style={{color: colors.primary}}>
      {children}
    </ThemedText>
  );
};
