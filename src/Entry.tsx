import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherListScreen from '@screens/WeatherListScreen';
import {RootStackParamList} from '@utils/navigation.types';

const defaultHeaderStyle = {
  backgroundColor: '#CCCCCC',
};

const Entry = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: defaultHeaderStyle,
        }}>
        <RootStack.Screen
          name="WeatherList"
          component={WeatherListScreen}
          options={{title: 'Weather'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Entry;
