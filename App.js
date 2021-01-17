import React from 'react';
import Navigation from './src/Navigation';
import {BlogProvider} from './src/context';

const App = () => {
  return (
    <BlogProvider>
      <Navigation />
    </BlogProvider>
  );
};

export default App;
