import { View, Animated, TouchableOpacity } from 'react-native'
import React, { ReactElement, useRef } from 'react'

// Styles
import styles from './styles'

export interface RNAnimatedSwitchProps {
  width: number
  height: number
  value: boolean
  backgroundColor?: string
  circleBackgroundColor?: string
  isDisable?: boolean
  disableColor?: string
  inactiveColor?: string
  activeColor?: string
  onValueChange?: (value: boolean) => void
  circleContent?: () => ReactElement
  inactiveComponent?: () => ReactElement
  activeComponent?: () => ReactElement
}

const RNAnimatedSwitch = (props: RNAnimatedSwitchProps) => {
  const {
    width,
    value,
    isDisable,
    disableColor = '#BDBDBD',
    backgroundColor = '#fff',
    circleBackgroundColor = '#fff',
    onValueChange,
    inactiveColor,
    activeColor,
    circleContent,
    inactiveComponent,
    activeComponent
  } = props

  const height = width * 0.8 > props.height ? props.height : width * 0.8

  const padding = height * 0.1

  const translateX = useRef(
    new Animated.Value(value ? width - height : 0)
  ).current

  const scaleX = translateX.interpolate({
    inputRange: [
      0,
      (width - height - padding / 8) / 2,
      width - height - padding / 8 / 2
    ],
    outputRange: [1, 1.7, 1]
  })

  const interpolateBackgroundColor = translateX.interpolate({
    inputRange: [0, width - height - padding / 8],
    outputRange: [inactiveColor, activeColor]
  })

  const interpolateInactiveIcon = translateX.interpolate({
    inputRange: [0, width - height - padding / 8],
    outputRange: [height, 0]
  })

  const interpolateActiveIcon = translateX.interpolate({
    inputRange: [0, width - height - padding / 8],
    outputRange: [0, height]
  })

  const onPress = () => {
    if (!value) {
      Animated.spring(translateX, {
        toValue: width - height - padding / 8,
        useNativeDriver: false
      }).start()
      onValueChange && onValueChange(true)
    } else {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false
      }).start()
      onValueChange && onValueChange(false)
    }
  }

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius: width / 2,
        backgroundColor: !(inactiveColor || activeColor)
          ? backgroundColor
          : interpolateBackgroundColor,
        padding: padding,
        ...(isDisable && { backgroundColor: disableColor }),
        ...styles.container
      }}
    >
      <View
        style={{
          margin: padding,
          ...styles.contentWrapper
        }}
      >
        <Animated.View
          style={{
            height: height * 0.8,
            width: width - height - padding,
            transform: [{ translateY: interpolateInactiveIcon }]
          }}
        >
          {inactiveComponent && inactiveComponent()}
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            height: height * 0.8,
            width: width - height - padding,
            transform: [{ translateY: interpolateActiveIcon }],
            left: height - padding
          }}
        >
          {activeComponent && activeComponent()}
        </Animated.View>
      </View>

      <TouchableOpacity
        disabled={isDisable}
        activeOpacity={1}
        onPress={onPress}
      >
        <Animated.View
          style={{
            backgroundColor: circleBackgroundColor,
            borderRadius: width / 2,
            padding: height * 0.1,
            transform: [{ translateX }, { scaleX }],
            ...(isDisable && { backgroundColor: disableColor }),
            ...styles.circleWrapper
          }}
        >
          {circleContent && circleContent()}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default RNAnimatedSwitch
