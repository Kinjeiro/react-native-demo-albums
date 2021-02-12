import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import wrap from 'lodash/wrap';

export default function fixReactNativeTextStyle(style: StyleProp<TextStyle>) {
  //@ts-ignore
  Text.render = wrap(Text.render, function renderNew(func, ...args) {
    //@ts-ignore
    const originText = func.apply(this, args);
    return React.cloneElement(originText, {
      style: [
        style,
        originText.props.style,
      ],
    });
  });
}
