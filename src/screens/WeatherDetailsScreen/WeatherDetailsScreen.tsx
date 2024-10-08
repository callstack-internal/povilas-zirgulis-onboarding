import React from 'react';
import ListItemHeader from '@components/ListItemHeader';
import {StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@utils/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {weatherQueries} from '@services/weather';
import Layout from '@components/Layout';
import LoadingIndicator from '@components/LoadingIndicator';
import ErrorDisplay from '@components/ErrorDisplay';
import EmptyResultsDisplay from '@components/EmptyResultsDisplay';
import {COLOR} from '@utils/colors';

type WeatherDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WeatherDetails'
>;

const WeatherDetailsScreen = () => {
  const route = useRoute<WeatherDetailsScreenProps['route']>();
  const cityId = route.params?.id;

  const cityWeatherQuery = useQuery(weatherQueries.cityWeather(cityId));
  const cityData = cityWeatherQuery.data;

  if (cityWeatherQuery.isLoading) {
    return (
      <Layout>
        <LoadingIndicator />
      </Layout>
    );
  }

  if (cityWeatherQuery.isError) {
    return (
      <Layout>
        <ErrorDisplay
          text="An error occurred while fetching city data"
          onRetry={cityWeatherQuery.refetch}
        />
      </Layout>
    );
  }

  if (!cityWeatherQuery.isLoading && !cityData) {
    return (
      <Layout>
        <EmptyResultsDisplay />
      </Layout>
    );
  }

  return (
    <Layout>
      <ListItemHeader item={cityData} testID="city_name" />

      <View style={styles.textContainer}>
        <Text style={styles.conditionTitle}>Humidity</Text>
        <Text style={styles.conditionText}>{cityData?.main.humidity}%</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.conditionTitle}>Pressure</Text>
        <Text style={styles.conditionText}>{cityData?.main.pressure} hPA</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.conditionTitle}>Wind Speed</Text>
        <Text style={styles.conditionText}>{cityData?.wind.speed} mph</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.conditionTitle}>Cloud Cover</Text>
        <Text style={styles.conditionText}>{cityData?.clouds.all}%</Text>
      </View>
    </Layout>
  );
};

export default WeatherDetailsScreen;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grey,
    justifyContent: 'space-between',
    fontSize: 16,
  },
  conditionTitle: {
    fontSize: 16,
  },
  conditionText: {
    fontSize: 16,
    color: COLOR.darkGrey,
  },
});
