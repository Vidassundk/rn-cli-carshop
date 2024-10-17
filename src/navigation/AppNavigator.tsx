import React from 'react';
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import HomeScreen from '@/views/screens/HomeScreen';
import DataListScreen from '@/views/screens/DataListScreen';
import GeolocationScreen from '@/views/screens/GeolocationScreen';
import SettingsScreen from '@/views/screens/SettingsScreen';
import AddDataScreen from '@/views/screens/AddDataScreen';
import {useTheme} from '@/viewmodels/context/ThemeContext';
import {Car} from '@/models/entities/Car';
import DetailScreen from '@/views/screens/DetailScreen';
import FilterButton from '@/views/components/FilterButton';

export type RootStackParamList = {
  Main: undefined;
  AddDataScreen: undefined;
  DetailScreen: {car: Car};
};

export type RootTabParamList = {
  Home: undefined;
  DataList: {myCars?: boolean};
  Location: undefined;
  Settings: undefined;
};

export type AppParamList = {
  Main: undefined;
  AddDataScreen: undefined;
  DetailScreen: {car: Car};
  Home: undefined;
  DataList: {myCars?: boolean};
  Location: undefined;
  Settings: undefined;
};

export type AppNavigationProp = NavigationProp<AppParamList>;

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const iconMap: Record<string, {focused: string; unfocused: string}> = {
  Home: {focused: 'home', unfocused: 'home-outline'},
  DataList: {focused: 'list', unfocused: 'list-outline'},
  Location: {focused: 'location', unfocused: 'location-outline'},
  Settings: {focused: 'settings', unfocused: 'settings-outline'},
};

const TabBarIcon = ({
  routeName,
  focused,
  color,
}: {
  routeName: keyof RootTabParamList;
  focused: boolean;
  color: string;
}) => {
  const icons = iconMap[routeName];
  const iconName = focused ? icons.focused : icons.unfocused;
  return <Icon name={iconName} size={24} color={color} />;
};

const createTabBarIcon =
  (routeName: keyof RootTabParamList) =>
  ({focused, color}: {focused: boolean; color: string}) =>
    <TabBarIcon routeName={routeName} focused={focused} color={color} />;

const useScreenOptions = ({
  route,
}: {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
}) => {
  const {colors} = useTheme();

  return {
    tabBarIcon: createTabBarIcon(route.name),
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.text,
    tabBarStyle: {
      paddingBottom: 12,
      paddingTop: 4,
      backgroundColor: colors.card,
      height: 70,
    },
  };
};

const DataListHeaderRight = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <FilterButton
      title="Add New"
      ghost
      style={styles.addButton}
      onPress={() => navigation.navigate('AddDataScreen')}
    />
  );
};

const DataListScreenOptions = {
  headerRight: DataListHeaderRight,
};

const TabNavigator = () => (
  <Tab.Navigator screenOptions={useScreenOptions}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen
      name="DataList"
      component={DataListScreen}
      options={DataListScreenOptions}
    />
    <Tab.Screen name="Location" component={GeolocationScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const {navigationTheme} = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
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
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{title: 'Car Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
});

export default AppNavigator;
