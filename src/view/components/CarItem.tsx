import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {Car} from '../../models/Car';

interface CarItemProps {
  car: Car;
  onDelete: (id: number) => void;
}

const CarItem: React.FC<CarItemProps> = ({car, onDelete}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: car.photoUrl}} style={styles.image} />
      <Text>
        {car.brand} {car.model} ({car.makeYear})
      </Text>
      <Text>Color: {car.color}</Text>
      <Text>Gearbox: {car.gearbox}</Text>
      <Button title="Delete" onPress={() => onDelete(car.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  image: {width: 100, height: 100},
});

export default CarItem;
