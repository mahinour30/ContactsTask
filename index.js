import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import store from './redux/store'

const persistedStore = persistStore(store)

const contactsApp = () =>
  <Provider store={store}>
    <PersistGate persistor={persistedStore} loading={null}>
    <App />
    </PersistGate>
  </Provider>

AppRegistry.registerComponent(appName, () => contactsApp);