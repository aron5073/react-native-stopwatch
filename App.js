/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity
          onPress={() => alert('hello world')}
          style={styles.button}>
          <Text style={styles.buttonText}> Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderRadius: 5,
    borderColor: 'blue',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 45,
    color: 'blue',
  },
});

// export default App;
