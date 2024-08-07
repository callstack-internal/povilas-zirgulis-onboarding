import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {weatherQueries} from '../services/weather';
import {useQuery} from '@tanstack/react-query';
import WeatherListItem from '../components/WeatherListItem';

const WeatherListScreen = () => {
  const weatherListQuery = useQuery(weatherQueries.weatherList());

  const backgroundStyle = {
    flex: 1,
    backgroundColor: '#fff',
  };

  const weatherList = weatherListQuery.data;

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {weatherList?.map(item => (
          <WeatherListItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherListScreen;
