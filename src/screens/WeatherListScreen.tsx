import React from 'react';
import {ScrollView} from 'react-native';

import {weatherQueries} from '../services/weather';
import {useQuery} from '@tanstack/react-query';
import WeatherListItem from '../components/WeatherListItem';
import Layout from '@components/Layout';

const WeatherListScreen = () => {
  const weatherListQuery = useQuery(weatherQueries.weatherList());
  const weatherList = weatherListQuery.data;

  return (
    <Layout>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {weatherList?.map(item => (
          <WeatherListItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </Layout>
  );
};

export default WeatherListScreen;
