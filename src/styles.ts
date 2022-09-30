import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    shadowColor: '#000',
    overflow: 'hidden',
  },
  contentWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  circleWrapper: {
    height: '100%',
    aspectRatio: 1,
  }
})
