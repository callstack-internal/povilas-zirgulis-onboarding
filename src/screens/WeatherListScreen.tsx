import React from 'react';
import {ScrollView} from 'react-native';

import {weatherQueries} from '../services/weather';
import {useQuery} from '@tanstack/react-query';
import WeatherListItem from '../components/WeatherListItem';
import Layout from '@components/Layout';
import LoadingIndicator from '@components/LoadingIndicator';
import ErrorDisplay from '@components/ErrorDisplay';
import EmptyResultsDisplay from '@components/EmptyResultsDisplay';

const WeatherListScreen = () => {
  const weatherListQuery = useQuery(weatherQueries.weatherList());
  const weatherList = weatherListQuery.data;

  if (weatherListQuery.isLoading) {
    return (
      <Layout>
        <LoadingIndicator />
      </Layout>
    );
  }

  if (weatherListQuery.error) {
    return (
      <Layout>
        <ErrorDisplay
          text="An error occurred while fetching list data"
          onRetry={weatherListQuery.refetch}
        />
      </Layout>
    );
  }

  if (!weatherListQuery.isLoading && !weatherList?.length) {
    return (
      <Layout>
        <EmptyResultsDisplay />
      </Layout>
    );
  }

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
