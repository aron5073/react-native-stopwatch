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
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    color: '#000',
    fontSize: 90,
  },
  picker: {
    width: 50,

    // using spread operator it will return array containg objects
    marginLeft: 10,
  },
  pickerItems: {
    color: '#000',
    fontSize: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//if its 3 it will become 03 if its 10 it will become 010 butb by using slice we will take only 2 digit 10 => 10
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {minutes: formatNumber(minutes), seconds: formatNumber(seconds)};
};

const createArray = length => {
  //will give minute and seconds through available minute /second array
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

export default class App extends React.Component {
  state = {
    remaningSeconds: 5,
    isRunning: false,
    selectedMinutes: '0',
    selectedSeconds: '5',
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
      remaningSeconds:
        parseInt(state.selectedMinutes) * 60 + parseInt(state.selectedSeconds),
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
      remaningSeconds: 5, //had to make it dynamic
      isRunning: false,
    });
  };

  renderPickers = () => {
    return (
      <View style={styles.pickerContainer}>
        {/* here view work as div as if you want to store picker then one then you had to use view here */}
        {/* for our minute part */}
        <Picker
          selctedValue={this.state.selectedMinutes}
          style={styles.picker}
          itemStyle={styles.pickerItems}
          onValueChange={itemValue => {
            //will change timer dynamically here
            this.setState({selectedMinutes: itemValue});
          }}
          // by default its dialog so we making it dropdown to look cool
          mode="dropdown">
          {AVAILABLE_MINUTES.map((
            value, //TODO: WHY WE HAD USED () INSTEAD OF {} WHILE MAKING THE ARROW FUNCTION
          ) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}

          {/* manually we can do this 
        <Picker.Item key="1" label="1" value="1" />
        <Picker.Item key="2" label="2" value="2" />
        <Picker.Item key="3" label="3" value="3" />
        <Picker.Item key="4" label="4" value="4" />
        <Picker.Item key="5" label="5" value="5" /> */}
        </Picker>
        <Text style={styles.pickerItems}>Minutes</Text>
        {/* for our seconds part */}
        <Picker
          selctedValue={this.state.selectedSeconds}
          style={styles.picker}
          itemStyle={styles.pickerItems}
          onValueChange={itemValue => {
            //will change timer dynamically here
            this.setState({selectedSeconds: itemValue});
          }}
          mode="dropdown">
          {AVAILABLE_SECONDS.map((
            value, //TODO: WHY WE HAD USED () INSTEAD OF {} WHILE MAKING THE ARROW FUNCTION
          ) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
          {/* manually we can do this 
      <Picker.Item key="1" label="1" value="1" />
      <Picker.Item key="2" label="2" value="2" />
      <Picker.Item key="3" label="3" value="3" />
      <Picker.Item key="4" label="4" value="4" />
      <Picker.Item key="5" label="5" value="5" /> */}
        </Picker>
        <Text style={styles.pickerItems}>Seconds</Text>
      </View>
    );

    //items to be included in the picker are written here
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
