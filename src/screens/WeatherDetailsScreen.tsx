import React from 'react';
import ListItemHeader from '../components/ListItemHeader';
import {StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../utils/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {weatherQueries} from '@services/weather';
import Layout from '@components/Layout';

type WeatherDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WeatherDetails'
>;

const WeatherDetailsScreen = () => {
  const route = useRoute<WeatherDetailsScreenProps['route']>();
  const cityId = route.params?.id;

  const cityWeatherQuery = useQuery(weatherQueries.cityWeather(cityId));
  const cityData = cityWeatherQuery.data;

  return (
    <Layout>
      <ListItemHeader item={cityData} />

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
    borderBottomColor: '#CCCCCC',
    justifyContent: 'space-between',
    fontSize: 16,
  },
  conditionTitle: {
    fontSize: 16,
  },
  conditionText: {
    fontSize: 16,
    color: '#908f8f',
  },
});
