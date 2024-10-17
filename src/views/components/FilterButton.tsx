import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import ThemedText from '@/views/components/ThemedText';

interface FilterButtonProps extends TouchableOpacityProps {
  title: string;
  hidden?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  style,
  hidden,
  disabled = false,
  ...props
}) => {
  const {colors} = useTheme();

  if (hidden) {
    return null;
  }

  const buttonStyles = [
    styles.button,
    {backgroundColor: colors.card},
    style,
    disabled && styles.disabledButton,
  ];

  return (
    <TouchableOpacity disabled={disabled} style={buttonStyles} {...props}>
      <ThemedText variant="label" style={styles.text}>
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
