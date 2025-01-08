import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherListScreen from '@repo/apps/mobile/src/screens/WeatherListScreen/WeatherListScreen';
import {RootStackParamList} from '@repo/apps/mobile/src/utils/navigation.types';
import WeatherDetailsScreen from '@repo/apps/mobile/src/screens/WeatherDetailsScreen/WeatherDetailsScreen';
import {StyleSheet} from 'react-native';
import {COLOR} from '@repo/apps/mobile/src/utils/colors';

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTitleAlign: 'center',
        }}>
        <RootStack.Screen
          name="WeatherList"
          component={WeatherListScreen}
          options={{title: 'Weather'}}
        />
        <RootStack.Screen
          name="WeatherDetails"
          component={WeatherDetailsScreen}
          options={{
            title: 'Details',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR.white,
  },
});

export default RootNavigator;
