import React, {useEffect} from 'react';
import {Provider} from 'react-redux';

import {store} from './store';
import {Navigation} from './navigation';
import {createCommentsTable} from './db';

export default function App(): React.JSX.Element {
  useEffect(() => {
    createCommentsTable();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
