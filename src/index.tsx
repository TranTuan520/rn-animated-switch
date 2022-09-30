import { View, Animated, TouchableOpacity, ViewStyle } from 'react-native'
import React, { ReactElement, useRef } from 'react'

// Styles
import styles from './styles'

export interface RNAnimatedSwitchProps {
  width: number
  height: number
  value: boolean
  containerStyle: ViewStyle,
  backgroundColor?: string
  isDisable?: boolean
  disableColor?: string
  inactiveColor?: string
  activeColor?: string
  inactiveCircleColor?: string,
  activeCircleColor?:string,
  onValueChange?: (value: boolean) => void
  circleContent?: () => ReactElement
  inactiveComponent?: () => ReactElement
  activeComponent?: () => ReactElement
}

const RNAnimatedSwitch = (props: RNAnimatedSwitchProps) => {
  const {
    width,
    value,
    containerStyle,
    isDisable,
    disableColor = '#BDBDBD',
    backgroundColor = '#fff',
    onValueChange,
    inactiveColor,
    activeColor,
    activeCircleColor,
    inactiveCircleColor,
    circleContent,
    inactiveComponent,
    activeComponent,
  } = props

  const height = width * 0.8 > props.height ? props.height : width * 0.8

  const padding = height * 0.1

  const translateX = useRef(
    new Animated.Value(value ? width - height : 0)
  ).current

  const scaleX = translateX.interpolate({
    inputRange: [0, (width - height) / 2, width - height],
    outputRange: [1, 1.7, 1]
  })

  const interpolateBackgroundColor = translateX.interpolate({
    inputRange: [0, width - height],
    outputRange: [inactiveColor, activeColor]
  })

  const interpolateCircleBackgroundColor = translateX.interpolate({
    inputRange: [0, width - height],
    outputRange: [inactiveCircleColor, activeCircleColor]
  })

  const interpolateInactiveIcon = translateX.interpolate({
    inputRange: [0, width - height],
    outputRange: [height, 0]
  })

  const interpolateActiveIcon = translateX.interpolate({
    inputRange: [0, width - height],
    outputRange: [0, height]
  })

  const onPress = () => {
    if (!value) {
      Animated.spring(translateX, {
        toValue: width - height,
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
        ...styles.container,
        ...containerStyle
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
          {activeComponent && activeComponent()}
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
          {inactiveComponent && inactiveComponent()}
        </Animated.View>
      </View>

      <TouchableOpacity
        disabled={isDisable}
        activeOpacity={1}
        onPress={onPress}
      >
        <Animated.View
          style={{
            backgroundColor: interpolateCircleBackgroundColor,
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
