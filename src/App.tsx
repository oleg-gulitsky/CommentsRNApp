import React from 'react';
import {Provider} from 'react-redux';

import {store} from './store';
import {Navigation} from './navigation';

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
