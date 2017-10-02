/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import ViewFinder from './ViewFinder';
import FloatingBtn from './FloatingBtn';

export default class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ color: 'white', fontSize: 18 }}>Instructions</Text>
        </View>
        <ViewFinder
          hintText={<Text>More instructions</Text>}
        />
        <View style={[styles.buttonsContainer, styles.bottomMenuStyle]} />
        <FloatingBtn/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0
  },
  bottomMenuStyle: {
    backgroundColor: '#000000B3',
    height: 100,
    justifyContent: 'center'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000B3',
    height: 56,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
