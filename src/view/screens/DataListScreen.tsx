import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../navigation/AppNavigator';

type DataListScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Data List'
>;

const DataListScreen = () => {
  const navigation = useNavigation<DataListScreenNavigationProp>();

  return (
    <View>
      <Text>Data List Screen</Text>
      <Button
        title="Go to Location"
        onPress={() => navigation.navigate('Location')}
      />
    </View>
  );
};

export default DataListScreen;
