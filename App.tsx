import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {rootQueryClient} from './src/utils/queryClient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherListScreen from './src/screens/WeatherListScreen';
import {RootStackParamList} from './src/utils/navigation.types';

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

const App = () => {
  return (
    <QueryClientProvider client={rootQueryClient}>
      <Entry />
    </QueryClientProvider>
  );
};

export default App;
