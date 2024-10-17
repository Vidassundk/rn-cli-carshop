import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootStackParamList, RootTabParamList} from '@/navigation/AppNavigator';
import ThemedText from '@/views/components/ThemedText';
import {useAuth} from '@/viewmodels/context/UserContext';
import {useCarDataHandling} from '@/viewmodels/handling/viewCars/useCarDataHandling';
import {useTheme} from '@/viewmodels/context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigableText} from '@/views/components/NavigatableText';
import Loader from '../components/Loader';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {userName} = useAuth();
  const {cars, status} = useCarDataHandling();
  const {spacing, colors, toggleTheme} = useTheme();

  const userCarsCount = cars.filter(car => car.isUserCar).length;

  const navigateTo =
    (
      screen: keyof RootTabParamList | keyof RootStackParamList,
      params?: object,
    ) =>
    () =>
      navigation.navigate(screen as any, params);

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <Loader />
      <ThemedText variant="p">😴 Loading Data...</ThemedText>
    </View>
  );

  const renderErrorState = () => (
    <ThemedText variant="p">
      😥 Error loading data: {status.carsError?.message} {'\n\n'}Make sure you
      have connection to the server...{' '}
      <NavigableText onPress={() => status.refetchCars()}>
        Refresh Data
      </NavigableText>
    </ThemedText>
  );

  const renderUserCarsInfo = () => {
    if (userCarsCount > 0) {
      return (
        <>
          {' '}
          <NavigableText onPress={navigateTo('DataList', {myCars: true})}>
            {`${userCarsCount} of them are yours 🚗`}
          </NavigableText>
          . You can delete them or add new.
        </>
      );
    } else {
      return (
        <>
          {'\n\n'}
          You haven't uploaded any cars yet. You can do so in the{' '}
          <NavigableText onPress={navigateTo('AddDataScreen')}>
            Add Data Screen
          </NavigableText>
          .
        </>
      );
    }
  };

  const renderCarData = () => (
    <ThemedText variant="p">
      There are a total of {cars.length} cars uploaded into our app.
      {renderUserCarsInfo()}
      {'\n\n'}
      All of the cars can be visited in{' '}
      <NavigableText onPress={navigateTo('DataList')}>
        Data List Screen
      </NavigableText>
      .
    </ThemedText>
  );

  return (
    <ScrollView style={{padding: spacing.xl}}>
      <View style={{gap: spacing.lg}}>
        <ThemedText variant="h3">Welcome to Car Shop, {userName}</ThemedText>

        {status.isCarsLoading
          ? renderLoadingState()
          : status.carsError
          ? renderErrorState()
          : renderCarData()}

        <ThemedText variant="p">
          We have{' '}
          <NavigableText onPress={navigateTo('Location')}>
            Geolocation
          </NavigableText>{' '}
          feature to find cars near you, but make sure you agree with location
          tracking.
        </ThemedText>

        <ThemedText variant="p">
          Finally,{' '}
          <NavigableText onPress={navigateTo('Settings')}>
            Settings
          </NavigableText>{' '}
          will allow you to set your personal user name and a{' '}
          <ThemedText
            variant="p"
            onPress={toggleTheme}
            style={{color: colors.primary}}>
            theme
          </ThemedText>
          .
        </ThemedText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default HomeScreen;
