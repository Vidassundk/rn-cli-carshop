import React from 'react';
import {View, Modal, Button, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface FilterModalProps<T> {
  visible: boolean;
  onRequestClose: () => void;
  selectedValue: T | null;
  onValueChange: (value: T | null) => void;
  options: {label: string; value: T | null}[];
}

const FilterModal = <T extends unknown>({
  visible,
  onRequestClose,
  selectedValue,
  onValueChange,
  options,
}: FilterModalProps<T>) => {
  const handleValueChange = (value: T | number) => {
    onValueChange(value === 'null' ? null : (value as T));
  };

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Picker
            selectedValue={selectedValue ?? undefined}
            onValueChange={handleValueChange}>
            {options.map(option => (
              <Picker.Item
                key={String(option.value) || 'null'}
                label={option.label}
                value={option.value === null ? 'null' : option.value}
              />
            ))}
          </Picker>
          <Button title="Apply" onPress={onRequestClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
});

export default FilterModal;
