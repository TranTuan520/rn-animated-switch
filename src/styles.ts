import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    shadowColor: '#000',
    overflow: 'hidden',

    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  contentWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute'
  },
  content: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subContent: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleWrapper: {
    height: '100%',
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  }
})
