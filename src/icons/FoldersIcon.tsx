/* eslint-disable max-len */
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import SvgIconProps from './SvgIconProps';

export default function FoldersIcon(props: SvgIconProps) {
  const {
    fill = '#AFAFAF',
  } = props;

  return (
    <Svg width="24" height="24" viewBox="0 0 26 22" fill="none">
      <Path
        d="M4 9C4 7.34315 5.34315 6 7 6H20V5C20 4.44772 19.5523 4 19 4H11.4721C11.0064 4 10.5471 3.89159 10.1306 3.68335L6.9746 2.10555C6.83575 2.03614 6.68266 2 6.52743 2H3C2.44772 2 2 2.44772 2 3V19C2 19.5523 2.44772 20 3 20H4V9ZM22 6H23C24.6569 6 26 7.34315 26 9V19C26 20.6569 24.6569 22 23 22H3C1.34315 22 0 20.6569 0 19V3C0 1.34315 1.34315 0 3 0H6.52743C6.99311 0 7.45241 0.108412 7.86894 0.316653L11.0249 1.89445C11.1638 1.96386 11.3169 2 11.4721 2H19C20.6569 2 22 3.34315 22 5V6ZM23 20C23.5523 20 24 19.5523 24 19V9C24 8.44772 23.5523 8 23 8H7C6.44772 8 6 8.44772 6 9V20H23Z"
        fill={ fill }
      />
    </Svg>
  );
}
