import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export const LoadingState: React.FC = () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Loading...</Text>
  </View>
);

export const ErrorState: React.FC<{error: Error}> = ({error}) => (
  <View style={styles.centered}>
    <Text style={styles.errorText}>Error: {error.message}</Text>
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
