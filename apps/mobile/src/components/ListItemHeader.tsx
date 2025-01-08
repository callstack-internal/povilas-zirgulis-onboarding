import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ArrowRightIcon from '@assets/icons/arrow-right.svg';
import TemperaturePill from '@repo/apps/mobile/src/components/TemperaturePill';
import {Weather} from '@repo/packages/shared/src/types';
import {COLOR} from '@repo/apps/mobile/src/utils/colors';

type ListItemHeaderProps = {
  item: Weather | undefined;
  testID?: string;
  hasArrow?: boolean;
};

const ListItemHeader = ({item, hasArrow, testID}: ListItemHeaderProps) => {
  const latestWeather = item?.weather.at(0);

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          src={`https://openweathermap.org/img/wn/${latestWeather?.icon}@2x.png`}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cityText} testID={testID}>
            {item?.name}
          </Text>
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
    backgroundColor: COLOR.white,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grey,
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
    color: COLOR.darkGrey,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default ListItemHeader;
