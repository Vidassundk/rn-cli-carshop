import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../navigation/AppNavigator';

type GeolocationScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Data List'
>;

const GeolocationScreen = () => {
  const navigation = useNavigation<GeolocationScreenNavigationProp>();

  return (
    <View>
      <Text>Geolocation Screen</Text>
      <Button
        title="Go to Location"
        onPress={() => navigation.navigate('Location')}
      />
    </View>
  );
};

export default GeolocationScreen;
