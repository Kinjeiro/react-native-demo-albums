import { PlatformOSType } from 'react-native';
import { Fonts } from 'react-native-paper/lib/typescript/types';

//declare global {
//  namespace ReactNativePaper {
//    interface ThemeFonts {
//      superLight: ThemeFont;
//    }
//  }
//}

/*
  @NOTE: see /assets/fonts and react-native.config.js (use "react-native link" command)
*/
const fontConfig: {
  [platform in PlatformOSType | 'default']?: Fonts;
} = {
  web: {
    regular: {
      fontFamily: 'Ubuntu Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Ubuntu Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Ubuntu Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Ubuntu Light',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Ubuntu Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Ubuntu Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Ubuntu Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Ubuntu Light',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Ubuntu Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Ubuntu Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Ubuntu Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Ubuntu Light',
      fontWeight: 'normal',
    },
  },
};

export default fontConfig;
