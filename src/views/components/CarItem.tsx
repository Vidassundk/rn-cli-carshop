import React, {memo} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Car} from '@/models/entities/Car';
import ThemedText from '@/views/components/ThemedText';
import {useTheme} from '@/viewmodels/context/ThemeContext';

interface CarItemProps {
  car: Car;
  onPressDelete?: (id: Car['id']) => void;
  onPress?: (car: Car) => void;
  style?: StyleProp<ViewStyle>; // Accepting additional styles for TouchableOpacity
}

const CarItem: React.FC<CarItemProps> = ({
  car,
  onPressDelete,
  onPress,
  style,
}) => {
  const {colors, spacing} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          padding: spacing.md,
          marginVertical: spacing.sm,
          borderRadius: spacing.sm,
        },
        style, // Applying additional styles
      ]}
      onPress={() => onPress && onPress(car)}
      activeOpacity={0.8}>
      <Image
        source={{uri: car.photoUrl}}
        style={[
          styles.image,
          {
            borderRadius: spacing.sm,
          },
        ]}
      />
      <View style={[styles.button, {marginLeft: spacing.md}]}>
        <ThemedText
          style={[
            styles.title,
            {
              color: colors.text,
              marginBottom: spacing.xs,
            },
          ]}>
          {car.brand} {car.model} ({car.makeYear})
        </ThemedText>
        <ThemedText
          style={[
            styles.detail,
            {
              color: colors.text,
              marginBottom: spacing.xs,
            },
          ]}>
          Color: {car.color}
        </ThemedText>
        <ThemedText
          style={[
            styles.detail,
            {
              color: colors.text,
              marginBottom: spacing.xs,
            },
          ]}>
          Gearbox: {car.gearbox}
        </ThemedText>
        <ThemedText
          style={[
            styles.detail,
            {
              color: colors.text,
              marginBottom: spacing.xs,
            },
          ]}>
          Date Posted: {new Date(car.datePosted).toLocaleDateString()}
        </ThemedText>
        {onPressDelete && (
          <TouchableOpacity
            style={[
              styles.deleteButton,
              {
                backgroundColor: colors.notification,
                marginTop: spacing.sm,
                paddingVertical: spacing.xs,
                paddingHorizontal: spacing.md,
                borderRadius: spacing.sm,
              },
            ]}
            onPress={() => onPressDelete(car.id)}>
            <ThemedText>Delete</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    alignItems: 'center',
  },
});

export default memo(CarItem);
