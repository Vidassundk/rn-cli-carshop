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
  ...props
}) => {
  if (hidden) {
    return;
  }

  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
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
});

export default FilterButton;
