import { StyleSheet } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';

// export const screenOptions = {
//  headerStyle: {
//    backgroundColor: PINK,
//  },
//  headerTintColor: '#fff',
// };

const CommonStyles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//eslint-disable-next-line max-len
export const getSlackNavigatorScreenOptions : (theme: ReactNativePaper.Theme) => StackNavigationOptions = ({ colors }) => ({
  headerStyle: {
    backgroundColor: colors.background,
    //borderWidth: 2,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: '500',
    fontSize: 17,

    textTransform: 'uppercase',
    color: colors.text,
  },
  cardStyle: {
    backgroundColor: colors.background,
  },
});

export default CommonStyles;
