import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import ThemedText from '@/views/components/ThemedText';

interface FilterButtonProps extends TouchableOpacityProps {
  title: string;
  hidden?: boolean;
  textStyle?: StyleProp<TextStyle>;
  ghost?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  style,
  textStyle,
  hidden,
  ghost = false,
  disabled = false,
  ...props
}) => {
  const {colors} = useTheme();

  if (hidden) {
    return null;
  }

  const buttonStyles: StyleProp<ViewStyle>[] = [
    styles.button,
    !ghost && {backgroundColor: colors.card}, // If ghost is true, no background
    style,
    disabled && styles.disabledButton,
  ];

  const combinedTextStyles: StyleProp<TextStyle>[] = [
    styles.text,
    ghost && {color: colors.primary, fontWeight: 'bold'}, // Ghost variant uses primary color and bold text
    textStyle,
  ];

  return (
    <TouchableOpacity disabled={disabled} style={buttonStyles} {...props}>
      <ThemedText variant="label" style={combinedTextStyles}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontWeight: '300',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default FilterButton;
