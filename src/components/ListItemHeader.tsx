import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ArrowRightIcon from '@assets/icons/arrow-right.svg';
import TemperaturePill from '@components/TemperaturePill';
import {Weather} from '@utils/services.types';

type ListItemHeaderProps = {
  item: Weather;
  hasArrow?: boolean;
};

const ListItemHeader = ({item, hasArrow}: ListItemHeaderProps) => {
  const latestWeather = item?.weather.at(0);

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          src={`https://openweathermap.org/img/wn/${latestWeather?.icon}@2x.png`}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cityText}>{item?.name}</Text>
          <Text style={styles.conditionText}>{latestWeather?.main}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <TemperaturePill temperature={item?.main.temp} />

        {hasArrow && <ArrowRightIcon width={20} height={20} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flexDirection: 'column',
  },
  cityText: {
    fontSize: 16,
  },
  conditionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#908f8f',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default ListItemHeader;
