import React, {useCallback} from 'react';
import {FlatList} from 'react-native';

import {weatherQueries} from '@services/weather';
import {useQuery} from '@tanstack/react-query';
import WeatherListItem from '@components/WeatherListItem';
import Layout from '@components/Layout';
import LoadingIndicator from '@components/LoadingIndicator';
import ErrorDisplay from '@components/ErrorDisplay';
import EmptyResultsDisplay from '@components/EmptyResultsDisplay';
import {locationQueries} from '@services/location';
import {Weather} from '@utils/services.types';
import {isDefined} from '@utils/helpers';

const WeatherListScreen = () => {
  const weatherListQuery = useQuery(weatherQueries.weatherList());
  const currentLocationQuery = useQuery(locationQueries.currentLocation());
  const weatherList = weatherListQuery.data?.list;
  const currentLocation = currentLocationQuery.data;
  const currentLocationWeatherQuery = useQuery(
    weatherQueries.currentLocationWeather(currentLocation),
  );

  const currentLocationWeather = currentLocationWeatherQuery.data;

  const weatherData = [currentLocationWeather, ...(weatherList || [])].filter(
    isDefined,
  );

  const renderItem = useCallback(
    ({item, index}: {item: Weather; index: number}) => (
      <WeatherListItem item={item} index={index} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Weather) => item?.id.toString(), []);

  if (weatherListQuery.isLoading || currentLocationWeatherQuery.isLoading) {
    return (
      <Layout>
        <LoadingIndicator />
      </Layout>
    );
  }

  if (weatherListQuery.error || currentLocationWeatherQuery.error) {
    return (
      <Layout>
        <ErrorDisplay
          text="An error occurred while fetching list data"
          onRetry={weatherListQuery.refetch}
        />
      </Layout>
    );
  }

  if (!weatherListQuery.isLoading && !weatherData?.length) {
    return (
      <Layout>
        <EmptyResultsDisplay />
      </Layout>
    );
  }

  return (
    <Layout>
      <FlatList
        data={weatherData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Layout>
  );
};

export default WeatherListScreen;
