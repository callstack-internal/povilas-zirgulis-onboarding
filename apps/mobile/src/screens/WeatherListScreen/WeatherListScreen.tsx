import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {Weather} from '@repo/packages/shared/src/types';
import {weatherQueries} from '@repo/packages/shared/src/api/weatherApi';

import WeatherListItem from '@repo/apps/mobile/src/components/WeatherListItem';
import Layout from '@repo/apps/mobile/src/components/Layout';
import LoadingIndicator from '@repo/apps/mobile/src/components/LoadingIndicator';
import ErrorDisplay from '@repo/apps/mobile/src/components/ErrorDisplay';
import EmptyResultsDisplay from '@repo/apps/mobile/src/components/EmptyResultsDisplay';
import {locationQueries} from '@repo/apps/mobile/src/services/location';
import {isDefined} from '@repo/apps/mobile/src/utils/helpers';

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
      <WeatherListItem item={item} testID={`city_name_${index}`} />
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
