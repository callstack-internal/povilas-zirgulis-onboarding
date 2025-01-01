import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const LoadingIndicator = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#CCCCCC" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default LoadingIndicator;
