import React from 'react';
import {View, Modal, Button, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface FilterModalProps {
  visible: boolean;
  onRequestClose: () => void;
  selectedValue: string | number | null;
  onValueChange: (value: string | number | null) => void;
  options: {label: string; value: (string | number) | null}[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onRequestClose,
  selectedValue,
  onValueChange,
  options,
}) => {
  const handleValueChange = (value: string | number) => {
    onValueChange(value === 'null' ? null : value);
  };

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Picker
            selectedValue={selectedValue ?? 'null'}
            onValueChange={handleValueChange}>
            {options.map(option => (
              <Picker.Item
                key={option.value !== null ? String(option.value) : 'null'}
                label={option.label}
                value={option.value !== null ? option.value : 'null'}
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
