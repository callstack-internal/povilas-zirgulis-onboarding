import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {rootQueryClient} from './src/utils/queryClient';
import RootNavigator from './src/RootNavigator';

const App = () => {
  return (
    <QueryClientProvider client={rootQueryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
};

export default App;
