import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {Car} from '../../models/entities/Car';

interface CarItemProps {
  car: Car;
  onClickDelete?: (id: Car['id']) => void;
}

const CarItem: React.FC<CarItemProps> = ({car, onClickDelete}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: car.photoUrl}} style={styles.image} />
      <Text>
        {car.brand} {car.model} ({car.makeYear})
      </Text>
      <Text>Color: {car.color}</Text>
      <Text>Gearbox: {car.gearbox}</Text>
      {onClickDelete && (
        <Button title="Delete" onPress={() => onClickDelete(car.id)} />
      )}
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
