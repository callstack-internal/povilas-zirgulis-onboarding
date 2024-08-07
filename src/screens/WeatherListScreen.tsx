import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';

import {weatherQueries} from '../services/weather';
import {useQuery} from '@tanstack/react-query';

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
          <Text key={item.id}>{item.id} </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherListScreen;
