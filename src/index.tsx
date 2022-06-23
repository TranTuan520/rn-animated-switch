import { View, Animated, TouchableOpacity } from 'react-native'
import React, { ReactElement, useRef } from 'react'

// Styles
import styles from './styles'

export interface RNAnimatedSwitchProps {
  width: number
  value: boolean
  backgroundColor?: string
  circleBackgroundColor?: string
  onValueChange?: (value: boolean) => void
  inactiveColor?: string
  activeColor?: string
  circleContent?: () => ReactElement
  inactiveComponent?: () => ReactElement
  activeComponent?: () => ReactElement
}

const RNAnimatedSwitch = (props: RNAnimatedSwitchProps) => {
  const {
    width,
    value,
    backgroundColor = '#fff',
    circleBackgroundColor = '#fff',
    onValueChange,
    inactiveColor,
    activeColor,
    circleContent,
    inactiveComponent,
    activeComponent: renderActiveComponent
  } = props

  const height = width / 2

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
    outputRange: [1, 1.6, 1]
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
        backgroundColor: !(inactiveColor || activeColor)
          ? backgroundColor
          : interpolateBackgroundColor,
        borderRadius: width / 2,
        padding: padding,
        ...styles.container
      }}
    >
      <View
        style={{
          margin: padding,
          ...styles.contentWrapper
        }}
      >
        <View style={styles.content}>
          <Animated.View
            style={{
              height: height * 0.8,
              transform: [{ translateY: interpolateInactiveIcon }],
              ...styles.subContent
            }}
          >
            {inactiveComponent && inactiveComponent()}
          </Animated.View>
        </View>

        <View style={styles.content}>
          <Animated.View
            style={{
              height: height * 0.8,
              transform: [{ translateY: interpolateActiveIcon }],
              ...styles.subContent
            }}
          >
            {renderActiveComponent && renderActiveComponent()}
          </Animated.View>
        </View>
      </View>

      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <Animated.View
          style={{
            backgroundColor: circleBackgroundColor,
            borderRadius: width / 2,
            padding: height * 0.1,
            transform: [{ translateX }, { scaleX }],
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
