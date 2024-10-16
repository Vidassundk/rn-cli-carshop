import React from 'react';
import {View, Modal, Button, StyleSheet, ModalProps} from 'react-native';
import PickerComponent from './PickerComponent';
import {PickerItemProps} from '@react-native-picker/picker';

interface PickerModalProps extends ModalProps {
  selectedValue: string | number | null;
  onValueChange: (value: string | number | null) => void;
  options: PickerItemProps[];
}

const PickerModal: React.FC<PickerModalProps> = ({
  visible,
  onRequestClose,
  selectedValue,
  onValueChange,
  options,
  ...modalProps
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      {...modalProps}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <PickerComponent
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            options={options}
            {...modalProps}
          />
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

export default PickerModal;
