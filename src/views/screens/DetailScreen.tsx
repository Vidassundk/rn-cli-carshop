import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../navigation/AppNavigator';

type DetailScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'DataList'
>;

const DetailScreen = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>();

  return (
    <View>
      <Text>Detail Screen</Text>
      <Button
        title="Go to Location"
        onPress={() => navigation.navigate('Location')}
      />
    </View>
  );
};

export default DetailScreen;
