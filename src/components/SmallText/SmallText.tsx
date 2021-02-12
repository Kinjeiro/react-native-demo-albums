/* eslint-disable */
import React from 'react';
import { Text } from 'react-native-paper';

import FONT_SIZES from '../../feats/feat-theme/font-size.config';

export default function SmallText(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      { ...props }
      style={ [{ fontSize: FONT_SIZES.text }, props.style] }
    />
  );
}
