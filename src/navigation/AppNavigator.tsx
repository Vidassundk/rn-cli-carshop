import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../view/screens/HomeScreen';
import DataListScreen from '../view/screens/DataListScreen';
import GeolocationScreen from '../view/screens/GeolocationScreen';
import SettingsScreen from '../view/screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export type RootTabParamList = {
  Home: undefined;
  'Data List': undefined;
  Location: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const iconMap: Record<string, {focused: string; unfocused: string}> = {
  Home: {focused: 'home', unfocused: 'home-outline'},
  'Data List': {focused: 'list', unfocused: 'list-outline'},
  Location: {focused: 'location', unfocused: 'location-outline'},
  Settings: {focused: 'settings', unfocused: 'settings-outline'},
};

const TabBarIcon = ({
  route,
  focused,
  color,
}: {
  route: any;
  focused: boolean;
  color: string;
}) => {
  const icons = iconMap[route.name];
  const iconName = focused ? icons.focused : icons.unfocused;

  return <Icon name={iconName} size={20} color={color} />;
};

const screenOptions = ({route}: {route: any}) => ({
  tabBarIcon: ({focused, color}: {focused: boolean; color: string}) => (
    <TabBarIcon route={route} focused={focused} color={color} />
  ),
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'gray',
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Data List" component={DataListScreen} />
        <Tab.Screen name="Location" component={GeolocationScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
