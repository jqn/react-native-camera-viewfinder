/**
 * Scanner Mask Component
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  StyleSheet,
  View,
  Animated,
  Easing,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './Styles';

export default class ViewFinder extends Component {
  static defaultProps = {
    maskColor: 'rgba(0,0,0,0.3)',
    cornerColor: '#22ff00',
    borderColor: '#000000',
    rectHeight: 200,
    rectWidth: 200,
    borderWidth: 0,
    cornerBorderWidth: 4,
    cornerBorderLength: 20,
    isLoading: false,
    cornerOffsetSize: 0,
    isCornerOffset: false,
    bottomMenuHeight: 0,
    topMenuHeight: 0,
    scanBarAnimateTime: 2500,
    scanBarColor: '#22ff00',
    scanBarImage: null,
    scanBarHeight: 1.5,
    scanBarMargin: 6,
    hintText: <Text />,
    hintTextStyle: styles.hintText,
    hintTextPosition: 130,
    showScanBar: true
  };

  constructor(props) {
    super(props);

    this.getBackgroundColor = this.getBackgroundColor.bind(this);
    this.getRectSize = this.getRectSize.bind(this);
    this.getCornerSize = this.getCornerSize.bind(this);
    this.renderLoadingIndicator = this.renderLoadingIndicator.bind(this);

    this.state = {
      topWidth: 0,
      topHeight: 0,
      leftWidth: 0,
      animatedValue: new Animated.Value(0)
    };
  }

  getBackgroundColor() {
    return {
      backgroundColor: this.props.maskColor
    };
  }

  getRectSize() {
    return {
      height: this.props.rectHeight,
      width: this.props.rectWidth
    };
  }

  getBorderSize() {
    if (this.props.isCornerOffset) {
      return {
        height: this.props.rectHeight - this.props.cornerOffsetSize * 2,
        width: this.props.rectWidth - this.props.cornerOffsetSize * 2
      };
    } else {
      return {
        height: this.props.rectHeight,
        width: this.props.rectWidth
      };
    }
  }

  getCornerColor() {
    return {
      borderColor: this.props.cornerColor
    };
  }

  getCornerSize() {
    return {
      height: this.props.cornerBorderLength,
      width: this.props.cornerBorderLength
    };
  }

  getBorderWidth() {
    return {
      borderWidth: this.props.borderWidth
    };
  }

  getBorderColor() {
    return {
      borderColor: this.props.borderColor
    };
  }

  renderLoadingIndicator() {
    if (!this.props.isLoading) {
      return null;
    }

    return (
      <ActivityIndicator
        animating={this.props.isLoading}
        color={this.props.color}
        size="large"
      />
    );
  }

  measureTotalSize(e) {
    let totalSize = e.layout;
    this.setState({
      topWidth: totalSize.width
    });
  }

  measureRectPosition(e) {
    let rectSize = e.layout;
    this.setState({
      topHeight: rectSize.y,
      leftWidth: rectSize.x
    });
  }

  getTopMaskHeight() {
    if (this.props.isCornerOffset) {
      return (
        this.state.topHeight +
        this.props.rectHeight -
        this.props.cornerOffsetSize
      );
    } else {
      return this.state.topHeight + this.props.rectHeight;
    }
  }

  getBottomMaskHeight() {
    if (this.props.isCornerOffset) {
      return (
        this.props.rectHeight +
        this.state.topHeight -
        this.props.cornerOffsetSize
      );
    } else {
      return this.state.topHeight + this.props.rectHeight;
    }
  }

  getSideMaskHeight() {
    if (this.props.isCornerOffset) {
      return this.props.rectHeight - this.props.cornerOffsetSize * 2;
    } else {
      return this.props.rectHeight;
    }
  }

  getSideMaskWidth() {
    if (this.props.isCornerOffset) {
      return this.state.leftWidth + this.props.cornerOffsetSize;
    } else {
      return this.state.leftWidth;
    }
  }

  getBottomMenuHeight() {
    return {
      bottom: this.props.bottomMenuHeight
    };
  }

  getTopMenuHeight() {
    return {
      top: this.props.topMenuHeight
    };
  }

  getScanBarMargin() {
    return {
      marginRight: this.props.scanBarMargin,
      marginLeft: this.props.scanBarMargin
    };
  }

  getScanImageWidth() {
    return this.props.rectWidth - this.props.scanBarMargin * 2;
  }

  _renderScanBar() {
    if (!this.props.showScanBar) return;
    if (this.props.scanBarImage) {
      return (
        <Image
          style={{
            resizeMode: 'contain',
            width: this.getScanImageWidth()
          }}
          source={this.props.scanBarImage}
        />
      );
    } else {
      return (
        <View
          style={[
            this.getScanBarMargin(),
            {
              backgroundColor: this.props.scanBarColor,
              height: this.props.scanBarHeight
            }
          ]}
        />
      );
    }
  }

  componentDidMount() {
    this.scannerLineMove();
  }

  scannerLineMove() {
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: this.props.rectHeight - 20,
      duration: this.props.scanBarAnimateTime,
      easing: Easing.linear
    }).start(() => this.scannerLineMove());
  }

  render() {
    const animatedStyle = {
      transform: [{ translateY: this.state.animatedValue }]
    };

    return (
      <View
        onLayout={({ nativeEvent: e }) => this.measureTotalSize(e)}
        style={[
          styles.container,
          this.getBottomMenuHeight(),
          this.getTopMenuHeight()
        ]}
      >
        <View
          style={[styles.viewfinder, this.getRectSize()]}
          onLayout={({ nativeEvent: e }) => this.measureRectPosition(e)}
        >
          {/* Frame Border */}
          <View
            style={[
              this.getBorderSize(),
              this.getBorderColor(),
              this.getBorderWidth()
            ]}
          >
            <Animated.View style={[animatedStyle]}>
              {this._renderScanBar()}
            </Animated.View>
          </View>

          {/* Frame upper left corner */}
          <View
            style={[
              this.getCornerColor(),
              this.getCornerSize(),
              styles.topLeftCorner,
              {
                borderLeftWidth: this.props.cornerBorderWidth,
                borderTopWidth: this.props.cornerBorderWidth
              }
            ]}
          />

          {/* Frame upper right corner */}
          <View
            style={[
              this.getCornerColor(),
              this.getCornerSize(),
              styles.topRightCorner,
              {
                borderRightWidth: this.props.cornerBorderWidth,
                borderTopWidth: this.props.cornerBorderWidth
              }
            ]}
          />

          {/* Render animated loader */}
          {this.renderLoadingIndicator()}

          {/* Frame bottom left corner  */}
          <View
            style={[
              this.getCornerColor(),
              this.getCornerSize(),
              styles.bottomLeftCorner,
              {
                borderLeftWidth: this.props.cornerBorderWidth,
                borderBottomWidth: this.props.cornerBorderWidth
              }
            ]}
          />

          {/* Frame bottom left corner */}
          <View
            style={[
              this.getCornerColor(),
              this.getCornerSize(),
              styles.bottomRightCorner,
              {
                borderRightWidth: this.props.cornerBorderWidth,
                borderBottomWidth: this.props.cornerBorderWidth
              }
            ]}
          />
        </View>

        <View
          style={[
            this.getBackgroundColor(),
            styles.topMask,
            {
              bottom: this.getTopMaskHeight(),
              width: this.state.topWidth
            }
          ]}
        />

        <View
          style={[
            this.getBackgroundColor(),
            styles.leftMask,
            {
              height: this.getSideMaskHeight(),
              width: this.getSideMaskWidth()
            }
          ]}
        />

        <View
          style={[
            this.getBackgroundColor(),
            styles.rightMask,
            {
              height: this.getSideMaskHeight(),
              width: this.getSideMaskWidth()
            }
          ]}
        />

        <View
          style={[
            this.getBackgroundColor(),
            styles.bottomMask,
            {
              top: this.getBottomMaskHeight(),
              width: this.state.topWidth
            }
          ]}
        />

        <View
          style={{ position: 'absolute', bottom: this.props.hintTextPosition }}
        >
          {this.props.hintText}
        </View>
      </View>
    );
  }
}
