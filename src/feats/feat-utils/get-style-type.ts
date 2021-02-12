import { TextStyle, ViewStyle } from 'react-native';

// todo @ANKU @LOW - не распознает ссылки на сами ключи динамических объектов
//type GetStyle = (theme: ReactNativePaper.Theme) => { [key: string]: ViewStyle|TextStyle };
type GetStyle = (theme: ReactNativePaper.Theme) => any;

export default GetStyle;
