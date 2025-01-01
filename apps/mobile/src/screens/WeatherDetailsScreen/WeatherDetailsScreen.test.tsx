import {render, screen, waitFor} from '@testing-library/react-native';

import React from 'react';
import {rootQueryClient} from '@utils/queryClient';
import {QueryClientProvider} from '@tanstack/react-query';
import {getWeatherMockData} from '@utils/mockData';
import {
  setErrorCityWeatherHandler,
  setSuccessCityWeatherHandler,
  setupEmptyResultsHandler,
} from './WeatherDetailsScreen.msw';
import {NavigationContainer} from '@react-navigation/native';
import WeatherDetailsScreen from './WeatherDetailsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@utils/navigation.types';

const mockCityWeatherData = getWeatherMockData();

const RootStack = createNativeStackNavigator<RootStackParamList>();

describe('WeatherDetails', () => {
  describe('when successful backend response', () => {
    beforeEach(() => setSuccessCityWeatherHandler(mockCityWeatherData));

    it('renders correctly', async () => {
      render(
        <QueryClientProvider client={rootQueryClient}>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen
                name="WeatherDetails"
                component={WeatherDetailsScreen}
                initialParams={{id: mockCityWeatherData.id}}
                options={{
                  title: 'Details',
                }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('city_name')).toHaveTextContent(
          mockCityWeatherData.name,
        );
      });
    });
  });

  describe('when backend returns error', () => {
    beforeEach(() => setErrorCityWeatherHandler());

    it('displays error', async () => {
      render(
        <QueryClientProvider client={rootQueryClient}>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen
                name="WeatherDetails"
                component={WeatherDetailsScreen}
                initialParams={{id: mockCityWeatherData.id}}
                options={{
                  title: 'Details',
                }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>,
      );

      await waitFor(async () => {
        expect(
          await screen.findByText('An error occurred while fetching city data'),
        ).toBeTruthy();
      });
    });
  });

  describe('when backend returns empty data', () => {
    beforeEach(() => setupEmptyResultsHandler());

    it('displays empty results message', async () => {
      render(
        <QueryClientProvider client={rootQueryClient}>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen
                name="WeatherDetails"
                component={WeatherDetailsScreen}
                initialParams={{id: mockCityWeatherData.id}}
                options={{
                  title: 'Details',
                }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>,
      );

      await waitFor(async () => {
        expect(await screen.findByText('No Data Available')).toBeTruthy();
      });
    });
  });
});
