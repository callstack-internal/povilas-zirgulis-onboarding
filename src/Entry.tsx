import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherListScreen from '@screens/WeatherListScreen';
import {RootStackParamList} from '@utils/navigation.types';
import WeatherDetailsScreen from '@screens/WeatherDetailsScreen';
import {StyleSheet} from 'react-native';
import {COLOR} from '@utils/colors';

const Entry = () => {
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

export default Entry;
