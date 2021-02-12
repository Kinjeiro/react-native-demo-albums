import { StyleProp, TextInput, TextStyle } from 'react-native';
import React from 'react';
import wrap from 'lodash/wrap';

export default function fixReactNativeTextInputStyle(style: StyleProp<TextStyle>) {
  //@ts-ignore
  TextInput.render = wrap(TextInput.render, function renderNew(func, ...args) {
    //@ts-ignore
    const originTextInput = func.apply(this, args);
    return React.cloneElement(originTextInput, {
      style: [
        style,
        originTextInput.props.style,
      ],
    });
  });
}
