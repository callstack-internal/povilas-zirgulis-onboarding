import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {rootQueryClient} from './src/utils/queryClient';
import Entry from './src/Entry';

const App = () => {
  return (
    <QueryClientProvider client={rootQueryClient}>
      <Entry />
    </QueryClientProvider>
  );
};

export default App;
