import '@testing-library/react-native/extend-expect';
import {server} from './src/msw/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.setTimeout(30000);
