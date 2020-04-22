/**
 * @format
 */

import React from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import configStore from './src/redux/store';

const store = configStore();

class Klit extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Klit);
