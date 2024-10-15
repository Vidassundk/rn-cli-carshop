import React from 'react';
import {
  Picker,
  PickerProps,
  PickerItemProps,
} from '@react-native-picker/picker';

interface PickerComponentProps extends Omit<PickerProps<any>, 'onValueChange'> {
  options: PickerItemProps[];
  onValueChange: (value: string | number) => void;
}

const PickerComponent: React.FC<PickerComponentProps> = ({
  selectedValue,
  onValueChange,
  options,
  ...pickerProps
}) => {
  return (
    <Picker
      selectedValue={selectedValue ?? undefined}
      onValueChange={value => onValueChange(value)}
      {...pickerProps}>
      {options.map(option => (
        <Picker.Item
          key={String(option.value)}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  );
};

export default PickerComponent;
