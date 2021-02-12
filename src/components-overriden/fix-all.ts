import fixReactNativeTextStyle from './react-native/fix-text';
import fixReactNativeTextInputStyle from './react-native/fix-text-input';

import FONT_SIZES from '../feats/feat-theme/font-size.config';
import { IS_WEB } from '../feats/feat-utils/native-utils';

let applied = false;

export default class GlobalFixing {
  static fixAll() {
    if (!applied) {
      /*
        // todo @ANKU @LOW - web падает с ошибкой

      */
      if (!IS_WEB) {
        // todo @ANKU @LOW - к сожалению текст используется в кнопке и проще было создать отдельный компонет SmallText, чем переделывать кнопку
        //fixReactNativeTextStyle({
        //  // todo @ANKU @LOW - fix font load
        //  //fontFamily: 'Ubuntu Regular',
        //  fontSize: FONT_SIZES.text,
        //});
        //fixReactNativeTextInputStyle({
        //  //fontFamily: 'Ubuntu Regular',
        //  fontSize: FONT_SIZES.text,
        //});
      }

      applied = true;
    }
  }
}
