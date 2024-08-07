import React from 'react';
import {Pressable} from 'react-native';
import ListItemHeader from '@components/ListItemHeader';
import {Weather} from '@utils/services.types';

type WeatherListItemProps = {
  item: Weather;
};

const WeatherListItem = ({item}: WeatherListItemProps) => {
  return (
    <Pressable onPress={() => {}}>
      <ListItemHeader item={item} hasArrow />
    </Pressable>
  );
};

export default WeatherListItem;
