import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  viewfinder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  topMask: {
    position: 'absolute',
    top: 0
  },
  leftMask: {
    position: 'absolute',
    left: 0
  },
  rightMask: {
    position: 'absolute',
    right: 0
  },
  bottomMask: {
    position: 'absolute',
    bottom: 0
  },
});
