import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';

import FeedPage from './modules/module-feed/FeedPage';
import FAQPage from './modules/module-faq/FAQPage';
import UserProfilePage from './modules/module-profile/UserProfilePage';
// todo @ANKU @LOW - @BUG_OUT ../assets/svgs/*.svg - импорт не работает в вебе
import FoldersIcon from './icons/FoldersIcon';
import QuestionIcon from './icons/QuestionIcon';
import UserIcon from './icons/UserIcon';

import RootScreens from './root-navigation';
import GetStyle from './core-feats/feat-native-utils/get-style-type';

const FooterTabs = createMaterialBottomTabNavigator();

export default function RootNavigation() {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <NavigationContainer>
      <FooterTabs.Navigator
        initialRouteName={ RootScreens.FEED }
        // todo @ANKU @LOW - опция перегружает компоненты при переходе, тем самым нормализует роутинг и обновляет данные
        //unmountOnBlur={ true }
        // todo @ANKU @LOW - вынести цвета
        activeColor={ theme.colors.primary }
        inactiveColor={ theme.colors.disabled }
        barStyle={{
          backgroundColor: theme.colors.background,
          //height: 60,
          //marginTop: 10,
          //flex: 1,
          //paddingTop: 10,
          justifyContent: 'center',
          //alignItems: 'center',
        }}
        screenOptions={{
          tabBarLabel: '',
        }}
      >
        <FooterTabs.Screen
          name={ RootScreens.FEED }
          component={ FeedPage }
          options={{
            tabBarIcon: ({ color }) => (
              <View style={ styles.iconWrapper }>
                <FoldersIcon fill={ color } />
              </View>
            ),
          }}
        />
        <FooterTabs.Screen
          name={ RootScreens.FAQ }
          component={ FAQPage }
          options={{
            tabBarIcon: ({ color }) => (
              <View style={ styles.iconWrapper }>
                <QuestionIcon fill={ color } />
              </View>
            ),
          }}
        />
        <FooterTabs.Screen
          name={ RootScreens.PROFILE }
          component={ UserProfilePage }
          options={{
            tabBarIcon: ({ color }) => (
              <View style={ styles.iconWrapper }>
                <UserIcon fill={ color } />
              </View>
            ),
          }}
        />
      </FooterTabs.Navigator>
    </NavigationContainer>
  );
}

const getStyles : GetStyle = ({ colors }) => ({
  iconWrapper: {
    marginTop: 6,
  },
});
