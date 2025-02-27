import React from 'react';
import {Pressable} from 'react-native';
import ListItemHeader from '@components/ListItemHeader';
import {Weather} from '@utils/services.types';
import {useNavigation} from '@react-navigation/native';

type WeatherListItemProps = {
  item: Weather;
  index: number;
};

const WeatherListItem = ({item, index}: WeatherListItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('WeatherDetails', {id: item.id});
  };

  return (
    <Pressable onPress={onPress} testID="WeatherListItem-pressable">
      <ListItemHeader item={item} hasArrow testID={`city_name_${index}`} />
    </Pressable>
  );
};

export default WeatherListItem;
