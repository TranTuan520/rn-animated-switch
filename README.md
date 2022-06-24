# rn-animated-switch

![preview](https://github.com/TranTuan520/rn-animated-switch/blob/dev/src/Images/preview.gif)

## Install

from yarn

```
yarn add rn-animated-switch
```

from npm

```
npm i rn-animated-switch
```

## Usage

```js
import RNAnimatedSwitch from 'rn-animated-switch'

...

const circleContent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>Hi!</Text>
      </View>
    )
  }

  const renderActiveComponent = () => {
    return <Image source={Images.smile} style={{ width: 30, height: 30 }} />
  }
  const renderInactiveComponent = () => {
    return <Image source={Images.sadBoy} style={{ width: 30, height: 30 }} />
  }

...

 <RNAnimatedSwitch
          width={100}
          height={40}
          value={value}
          onValueChange={setValue}
          activeColor='#282E38'
          inactiveColor={'#D8F3FF'}
          circleContent={circleContent}
          activeComponent={renderActiveComponent}
          inactiveComponent={renderInactiveComponent}
/>

...
```

## Properties

| Prop                    | Default | Type       | Description                                                                                          |
| ----------------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| **`width`**             | none    | `number`   | Width of Switch                                                                                      |
| **`height`**            | none    | `number`   | Height of Switch                                                                                     |
| **`value`**             | none    | `boolean`  | Value of Switch                                                                                      |
| **`onValueChange`**     | none    | `function` | The callback function for when the value is changed in Switch, providing the updated value in params |
| **`activeColor`**       | none    | `string`   | Active color                                                                                         |
| **`inactiveColor`**     | none    | `string`   | Inactive color                                                                                       |
| **`isDisable`**         | none    | `boolean`  | Disable switch                                                                                       |
| **`disableColor`**      | none    | `string`   | Switch color when disabled                                                                           |
| **`circleContent`**     | none    | `element`  | Content of Switch's circle                                                                           |
| **`activeComponent`**   | none    | `element`  | Component show when switch inactive                                                                  |
| **`inactiveComponent`** | none    | `element`  | Component show when switch inactive                                                                  |

## License

[MIT License](http://opensource.org/licenses/mit-license.html).
