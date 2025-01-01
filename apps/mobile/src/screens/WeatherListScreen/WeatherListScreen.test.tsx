import {fireEvent, render, screen} from '@testing-library/react-native';
import {generateWeatherListMockData} from '@utils/mockData';
import {
  setupEmptyResultsHandler,
  setErrorWeatherListHandler,
  setSuccessWeatherListHandler,
} from './WeatherListScreen.msw';
import React from 'react';
import {rootQueryClient} from '@utils/queryClient';
import {QueryClientProvider} from '@tanstack/react-query';
import RootNavigator from '../../RootNavigator';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const mockWeatherListData = generateWeatherListMockData();

describe('WeatherDetailsList', () => {
  describe('when successful backend response', () => {
    beforeEach(() => setSuccessWeatherListHandler(mockWeatherListData));

    it('renders correctly', async () => {
      render(
        <QueryClientProvider client={rootQueryClient}>
          <RootNavigator />
        </QueryClientProvider>,
      );

      expect(
        await screen.findByText(mockWeatherListData.list[0].name),
      ).toBeTruthy();

      expect(screen.getByTestId('city_name_0')).toHaveTextContent(
        mockWeatherListData.list[0].name,
      );
      expect(screen.getByTestId('city_name_1')).toHaveTextContent(
        mockWeatherListData.list[1].name,
      );
    });

    it('navigates to WeatherDetails on list item press', async () => {
      render(
        <QueryClientProvider client={rootQueryClient}>
          <RootNavigator />
        </QueryClientProvider>,
      );

      fireEvent.press(
        await screen.findByText(mockWeatherListData.list[0].name),
      );

      expect(mockNavigate).toHaveBeenCalledWith('WeatherDetails', {
        id: mockWeatherListData.list[0].id,
      });
    });
  });

  describe('when backend returns error', () => {
    beforeEach(() => setErrorWeatherListHandler());

    it('displays error message', async () => {
      render(
        <QueryClientProvider client={rootQueryClient}>
          <RootNavigator />
        </QueryClientProvider>,
      );

      expect(
        await screen.findByText('An error occurred while fetching list data'),
      ).toBeTruthy();
    });
  });

  describe('when backend returns empty data', () => {
    beforeEach(() => setupEmptyResultsHandler());

    it('displays empty results message', async () => {
      render(
        <QueryClientProvider client={rootQueryClient}>
          <RootNavigator />
        </QueryClientProvider>,
      );

      expect(await screen.findByText('No Data Available')).toBeTruthy();
    });
  });
});
