import {useTheme} from '@/viewmodels/context/ThemeContext';
import React from 'react';
import {Text, TextProps, StyleSheet, TextStyle} from 'react-native';

interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'label';
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'p',
  style,
  ...rest
}) => {
  const {colors} = useTheme();

  const variantStyle: TextStyle = styles[variant];

  return (
    <Text
      style={[variantStyle, {color: colors.text}, style as TextStyle]}
      {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  p: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ThemedText;
