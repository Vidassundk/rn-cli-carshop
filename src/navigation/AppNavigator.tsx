import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import HomeScreen from '../view/screens/HomeScreen';
import DataListScreen from '../view/screens/DataListScreen';
import GeolocationScreen from '../view/screens/GeolocationScreen';
import SettingsScreen from '../view/screens/SettingsScreen';
import AddDataScreen from '../view/screens/AddDataScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export type RootTabParamList = {
  Home: undefined;
  'Data List': undefined;
  Location: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  AddDataScreen: undefined;
};
export type AddDataScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddDataScreen'
>;

export interface AddDataScreenProps {
  navigation: AddDataScreenNavigationProp;
}

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

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
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
  focused: boolean;
  color: string;
}) => {
  const icons = iconMap[route.name];
  const iconName = focused ? icons.focused : icons.unfocused;

  return <Icon name={iconName} size={24} color={color} />;
};

const getScreenOptions = ({
  route,
}: {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
}): BottomTabNavigationOptions => ({
  tabBarIcon: ({focused, color}: {focused: boolean; color: string}) => (
    <TabBarIcon route={route} focused={focused} color={color} />
  ),
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'gray',
});

const TabBarButton = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;

const HeaderRightButton = ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress}>
    <Text style={styles.addButtonText}>Add Car</Text>
  </TouchableOpacity>
);

const TabNavigator = ({navigation}: {navigation: any}) => (
  <Tab.Navigator screenOptions={getScreenOptions}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen
      name="Data List"
      component={DataListScreen}
      options={{
        tabBarButton: props => (
          <TabBarButton onPress={() => navigation.navigate('Data List')}>
            {props.children}
          </TabBarButton>
        ),
        headerRight: () => (
          <HeaderRightButton
            onPress={() => navigation.navigate('AddDataScreen')}
          />
        ),
      }}
    />
    <Tab.Screen name="Location" component={GeolocationScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddDataScreen"
        component={AddDataScreen}
        options={{title: 'Add Car'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  addButton: {
    marginRight: 16,
    backgroundColor: 'lightgray',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 12,
  },
});

export default AppNavigator;
