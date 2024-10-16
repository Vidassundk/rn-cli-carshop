import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PickerModal from './PickerModal'; // Assuming the PickerModal is already created

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
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity
      style={styles.modalTrigger}
      onPress={onPress}
      disabled={disabled}>
      <Text>{value || `Select ${label}`}</Text>
    </TouchableOpacity>

    {modalVisible && (
      <PickerModal
        visible={modalVisible}
        options={options}
        selectedValue={value}
        onValueChange={newValue => onValueChange(newValue)}
        onRequestClose={onClose}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalTrigger: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default PickerField;
