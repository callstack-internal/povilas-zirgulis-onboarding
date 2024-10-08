import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EmptyResultsDisplay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Data Available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});

export default EmptyResultsDisplay;
