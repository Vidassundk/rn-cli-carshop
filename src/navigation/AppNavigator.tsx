import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../view/screens/HomeScreen';
import DataListScreen from '../view/screens/DataListScreen';
import GeolocationScreen from '../view/screens/GeolocationScreen';
import SettingsScreen from '../view/screens/SettingsScreen';

export type RootTabParamList = {
  Home: undefined;
  'Data List': undefined;
  Location: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarIcon: () => <></>,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Data List" component={DataListScreen} />
        <Tab.Screen name="Location" component={GeolocationScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
