import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface FilterButtonProps extends TouchableOpacityProps {
  title: string;
  hidden?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  style,
  hidden,
  disabled,
  ...props
}) => {
  if (hidden) {
    return null;
  }

  const buttonStyles = [
    styles.button,
    style,
    disabled && styles.disabledButton,
  ];

  return (
    <TouchableOpacity disabled={disabled} style={buttonStyles} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },

  disabledButton: {
    opacity: 0.5,
  },
});

export default FilterButton;
