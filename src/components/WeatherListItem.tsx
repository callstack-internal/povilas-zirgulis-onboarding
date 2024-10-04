import React from 'react';
import {Pressable} from 'react-native';
import ListItemHeader from '@components/ListItemHeader';
import {Weather} from '@utils/services.types';
import {useNavigation} from '@react-navigation/native';

type WeatherListItemProps = {
  item: Weather;
  testID: string;
};

const WeatherListItem = ({item, testID}: WeatherListItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('WeatherDetails', {id: item.id});
  };

  return (
    <Pressable onPress={onPress}>
      <ListItemHeader item={item} hasArrow testID={testID} />
    </Pressable>
  );
};

export default WeatherListItem;
