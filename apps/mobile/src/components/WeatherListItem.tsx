import React from 'react';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ListItemHeader from '@repo/apps/mobile/src/components/ListItemHeader';
import {Weather} from '@repo/packages/shared/src/types';

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
