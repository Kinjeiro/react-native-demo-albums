import * as React from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import fontConfig from './configs/font.config';
import GlobalFixing from '../../components-overriden/fix-all';

// ======================================================
// MODULE
// ======================================================
import colors from './configs/colors.config';
import themeFontSizes, { ThemeFontSizes } from './configs/font-sizes.config';
import themeSpacing, { ThemeSpacing } from './configs/spacing.config';

declare global {
  namespace ReactNativePaper {
    interface Theme {
      myOwnProperty: boolean;
      fontSizes: ThemeFontSizes,
      spacing: ThemeSpacing,
    }

    //interface ThemeAnimation {
    //  customProperty: number;
    //}
  }
}

const theme : ReactNativePaper.Theme = {
  ...DefaultTheme,
  // todo @ANKU @CRIT @MAIN - На Android - fontFamily "Ubuntu Regular" is not a system font and has not been loaded through Font.loadAsync.
  //fonts: configureFonts(fontConfig),
  // Specify custom property in nested object
  //@ts-ignore
  colors,

  // ======================================================
  // CUSTOM PROPERTIES
  // ======================================================
  fontSizes: themeFontSizes,
  spacing: themeSpacing,
};

/*
  @NOTE: ФИКСЫ стилей и шрифтов
*/
GlobalFixing.fixAll();

export default function AppThemeProvider({ children }: React.PropsWithChildren<any>) {
  // todo @ANKU @LOW - здесь можно настроить dark mode - https://github.com/callstack/react-native-paper/blob/main/example/src/index.tsx
  return (
    <PaperProvider theme={ theme }>
      { children }
    </PaperProvider>
  );
}
