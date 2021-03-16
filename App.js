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
  Picker,
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
  buttonStop: {
    borderColor: '#FF851B',
  },
  buttonText: {
    fontSize: 45,
    color: 'blue',
  },
  buttonTextStop: {
    color: '#FF851B',
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
    isRunning: false,
  };

  interval = null;

  componentDidUpdate(prevProp, prevState) {
    if (this.state.remaningSeconds === 0 && prevState != 0) this.stop();
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  //its gonna depriciate the time
  start = () => {
    this.setState(state => ({
      remaningSeconds: state.remaningSeconds - 1,
      isRunning: true,
    }));

    this.interval = setInterval(() => {
      this.setState(state => ({
        remaningSeconds: state.remaningSeconds - 1,
      }));
    }, 1000);
  };

  //function for stoping the time to not go into minus
  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      remaningSeconds: 5,
      isRunning: false,
    });
  };

  renderPickers = () => {
    return null;
  };

  render() {
    const {minutes, seconds} = getRemaining(this.state.remaningSeconds);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {this.state.isRunning ? (
          <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        ) : (
          this.renderPickers()
        )}

        {this.state.isRunning ? (
          <TouchableOpacity
            onPress={this.stop}
            style={[styles.button, styles.buttonStop]}>
            <Text style={[styles.buttonText, styles.buttonTextStop]}>
              {' '}
              Stop
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.start} style={styles.button}>
            <Text style={styles.buttonText}> Start</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
