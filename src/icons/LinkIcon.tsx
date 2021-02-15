/* eslint-disable max-len */
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import SvgIconProps from './SvgIconProps';

export default function LinkIcon(props: SvgIconProps) {
  const {
    fill = '#1D63CB',
    width = '22',
    height = '24',
  } = props;

  return (
    <Svg width={ width } height={ height } viewBox="0 0 16 16" fill="none">
      <Path
        d="M2.99994 2C2.44765 2 1.99994 2.44772 1.99994 3V13C1.99994 13.5523 2.44765 14 2.99994 14H12.9999C13.5522 14 13.9999 13.5523 13.9999 13V8H15.9999V13C15.9999 14.6569 14.6568 16 12.9999 16H2.99994C1.34308 16 -6.10352e-05 14.6569 -6.10352e-05 13V3C-6.10352e-05 1.34315 1.34308 0 2.99994 0H7.99994V2H2.99994Z"
        fill={ fill }
      />
      <Path
        d="M13.9999 3.41436L7.20712 10.2072L5.79291 8.79297L12.5859 2H9.99994V0H15.9999V6H13.9999V3.41436Z"
        fill={ fill }
      />
    </Svg>
  );
}
