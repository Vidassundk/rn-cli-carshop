import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../navigation/AppNavigator';

type SettingsScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Data List'
>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <View>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Location"
        onPress={() => navigation.navigate('Location')}
      />
    </View>
  );
};

export default SettingsScreen;
