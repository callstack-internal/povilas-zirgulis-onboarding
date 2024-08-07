import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ErrorDisplay = ({text, onRetry}: {text: string; onRetry: () => void}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={onRetry} style={styles.retryButton}>
        <Text style={styles.text}>Retry</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 36,
  },
  retryButton: {
    backgroundColor: '#a4c5e3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default ErrorDisplay;
