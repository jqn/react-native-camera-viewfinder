import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

const { height, width } = Dimensions.get('window');

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class FloatingBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: height
    };
  }

  static propTypes = {
    next: PropTypes.func,
    shoot: PropTypes.func,
    remove: PropTypes.func
  };

  static defaultProps = {
    confirmBtnColor: '#FFF',
    cancelBtnColor: '#FFF',
    labelColor: '#FFF',
    buttonTxtColor: '#FFF',
    nextBtnDisabled: false,
    shootBtnDisabled: false,
    removeBtnDisabled: false,
    buttonBorderColor: '#FFF',
    topIcon: (
      <MaterialCommunityIcons
        name="skip-next"
        size={50}
        color="#FFF"
        style={{ alignSelf: 'center' }}
      />
    ),
    middleIcon: (
      <MaterialCommunityIcons
        name="camera-iris"
        size={50}
        color="#FFF"
        style={{ alignSelf: 'center' }}
      />
    ),
    bottomIcon: (
      <MaterialCommunityIcons
        name="repeat"
        size={50}
        color="#FFF"
        style={{ alignSelf: 'center' }}
      />
    ),
    hintTextColor: '#FFF'
  };

  _onLayout = (e) => {
    const {width, height} = Dimensions.get('window');
    this.setState({
      height: height
    });
  }

  render() {
    const {
      onPress,
      icon,
      buttonName,
      buttonBorderColor,
      disabled,
      topIcon,
      middleIcon,
      bottomIcon,
      hintTextColor,
      next,
      shoot,
      remove,
      nextBtnDisabled,
      shootBtnDisabled,
      removeBtnDisabled
    } = this.props;

    return (
      <View
        onLayout={({ nativeEvent: e }) => this._onLayout(e)}
        style={[styles.buttonWrapper, { height: this.state.height }]}
      >
        <TouchableOpacity
          disabled={nextBtnDisabled}
          style={[styles.button, { borderColor: buttonBorderColor }]}
          onPress={next}
        >
          {topIcon}
          <Text style={[styles.hintText, { color: hintTextColor }]}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={shootBtnDisabled}
          style={[styles.button, { borderColor: buttonBorderColor }]}
          onPress={shoot}
        >
          {middleIcon}
        </TouchableOpacity>
        <TouchableOpacity
          disabled={removeBtnDisabled}
          style={[styles.button, { borderColor: buttonBorderColor }]}
          onPress={remove}
        >
          {bottomIcon}
          <Text style={[styles.hintText, { color: hintTextColor }]}>
            Retake
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 8,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hintText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold'
  }
});
