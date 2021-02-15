import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import SvgIconProps from './SvgIconProps';

export default function UserIcon(props: SvgIconProps) {
  const {
    fill = '#AFAFAF',
    width = '22',
    height = '24',
    ...restProps
  } = props;

  return (
    <Svg width={ width } height={ height } viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G {...restProps} >
        <Path
          d="M2 20.0231C2 21.0495 5.7946 22.0183 10.9965 22C13.5701 21.991 15.9272 21.7625 17.6174 21.3346C19.2358 20.9249 20 20.3997 20 20.0231C20 15.5154 16.2313 12 11 12C5.76356 12 2 15.5071 2 20.0231ZM8.15195 10.3129C8.93219 11.334 9.99945 12 11 12C12.0003 12 13.0673 11.3343 13.8475 10.3137C18.6681 11.4106 22 15.2675 22 20.0231C22 22.8444 17.5259 23.9771 11.0035 24C4.50394 24.0228 0 22.8729 0 20.0231C0 15.2598 3.329 11.4077 8.15195 10.3129ZM11 12C12.882 12 15 9.64368 15 7C15 3.91615 13.462 2 11 2C8.53799 2 7 3.91615 7 7C7 9.64368 9.11802 12 11 12ZM11 14C8.10913 14 5 10.866 5 7C5 3.13401 7.13401 0 11 0C14.866 0 17 3.13401 17 7C17 10.866 13.8909 14 11 14Z"
          fill={ fill }
        />
      </G>
    </Svg>
  );
}
