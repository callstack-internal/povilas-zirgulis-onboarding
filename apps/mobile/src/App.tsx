import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {rootQueryClient} from './utils/queryClient';
import RootNavigator from './RootNavigator';

const App = () => {
  return (
    <QueryClientProvider client={rootQueryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
};

export default App;
