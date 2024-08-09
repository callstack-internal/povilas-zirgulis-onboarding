import {COLOR} from '@utils/colors';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type TemperaturePillProps = {
  temperature: number | undefined;
};

const TemperaturePill = ({temperature}: TemperaturePillProps) => {
  if (!temperature) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${temperature} °C`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.blue,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  text: {
    color: COLOR.white,
    fontSize: 16,
  },
});

export default TemperaturePill;
