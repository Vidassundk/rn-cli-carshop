import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@/viewmodels/context/ThemeContext'; // Assuming you are using a custom theme
import PickerModal from './PickerModal'; // Assuming the PickerModal is already created
import ThemedText from './ThemedText';

interface PickerFieldProps {
  label: string;
  value: string | null;
  options: {label: string; value: string}[];
  modalVisible: boolean;
  onPress: () => void;
  onValueChange: (value: string | number | null) => void;
  onClose: () => void;
  disabled?: boolean;
}

const PickerField: React.FC<PickerFieldProps> = ({
  label,
  value,
  options,
  modalVisible,
  onPress,
  onValueChange,
  onClose,
  disabled,
}) => {
  const {spacing, colors} = useTheme();

  return (
    <View style={{opacity: disabled ? 0.6 : 1}}>
      <ThemedText variant="p" style={{marginBottom: spacing.xs}}>
        {label}
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.modalTrigger,
          {
            padding: spacing.md,
            marginBottom: spacing.md,
            borderColor: colors.border,
          },
        ]}
        onPress={onPress}
        disabled={disabled}>
        <ThemedText>{value || `Select ${label}`}</ThemedText>
      </TouchableOpacity>

      {modalVisible && (
        <PickerModal
          testID="picker-modal"
          visible={modalVisible}
          options={options}
          selectedValue={value}
          onValueChange={newValue => onValueChange(newValue)}
          onRequestClose={onClose}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalTrigger: {
    borderWidth: 1.5,
    borderRadius: 4,
  },
});

export default PickerField;
