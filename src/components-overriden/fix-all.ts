import { IS_WEB } from '../core-feats/feat-native-utils/native-utils';

let applied = false;

export default class GlobalFixing {
  static fixAll() {
    if (!applied) {
      /*
        // todo @ANKU @LOW - web падает с ошибкой

      */
      if (!IS_WEB) {
        // todo @ANKU @LOW - к сожалению Text используется в Button и проще было создать отдельный компонент SmallText, чем переделывать Button
        //fixReactNativeTextStyle({
        //  // todo @ANKU @LOW - fix font load - не находится в Android и Web
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
