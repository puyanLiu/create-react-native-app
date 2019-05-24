/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, StatusBar, Text } from 'react-native';
// 引入react-redux
import { Provider } from 'react-redux';
// 引入store文件
import { store } from './store';
import HomeIndex from './containers/HomeIndex';

declare const global: any;
if (!__DEV__) {
  // 去掉console
  global.console = {
    log: () => {},
    info: () => {},
    error: () => {},
    warn: () => {},
    group: () => {},
    groupEnd: () => {},
    groupCollapsed: () => {},
  };
}

interface IAppProps {}
interface IAppState {
}

const initialProgress = 0.1;

class App extends Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      initialized: true,
      modalVisible: false,
      isMandatory: false,
      progress: initialProgress,
    };
  }

  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <View style={styles.container}>
            <StatusBar
              translucent
              backgroundColor={'transparent'}
              showHideTransition={'fade'}
              barStyle={'light-content'}
            />
           <Text>HelloWorld Hello</Text>
           <HomeIndex />
          </View>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});
