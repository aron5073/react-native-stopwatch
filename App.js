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
    marginTop: 30,
  },
  buttonText: {
    fontSize: 45,
    color: 'blue',
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
  },
});

//if its 3 it will become 03 if its 10 it will become 010 butb by using slice we will take only 2 digit 10 => 10
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {minutes: formatNumber(minutes), seconds: formatNumber(seconds)};
};

export default class App extends React.Component {
  state = {
    remaningSeconds: 5,
  };

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  //its gonna depriciate the time
  start = () => {
    // this.setState(state => ({
    //   remaningSeconds: state.remaningSeconds - 1,
    // }));

    this.interval = setInterval(() => {
      this.setState(state => ({
        remaningSeconds: state.remaningSeconds - 1,
      }));
    }, 1000);
  };

  //function for stoping the time to not go into minus

  render() {
    const {minutes, seconds} = getRemaining(this.state.remaningSeconds);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        <TouchableOpacity onPress={this.start} style={styles.button}>
          <Text style={styles.buttonText}> Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
