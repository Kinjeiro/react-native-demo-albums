import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { WhitePortal } from 'react-native-portal';

// ======================================================
// MODULE
// ======================================================
import AlbumsScreen from './Albums/List/AlbumsScreen';
import AlbumViewScreen, { AlbumViewScreenProps } from './Albums/View/AlbumViewScreen';
import AlbumCreateScreen, { PORTAL_CREATE_ALBUM_BUTTON } from './Albums/Create/AlbumCreateScreen';
import Posts from './Posts/Posts';
import FeedScreens, { FeedScreensParamList } from './feed-navigation';
import { getSlackNavigatorScreenOptions } from '../../styles/common-styles';

const FeedTabs = createMaterialTopTabNavigator();

const FeedNavigator = createStackNavigator<FeedScreensParamList>();

type FeedTabsScreenProps = {
  route: RouteProp<FeedScreensParamList, FeedScreens.FEED>;
  navigation: StackNavigationProp<FeedScreensParamList, FeedScreens.FEED>;
};
function FeedTabsScreen(props: FeedTabsScreenProps) {
  const { colors } = useTheme();

  return (
    <FeedTabs.Navigator
      swipeEnabled={ false }
      style={{
        // todo @ANKU @LOW - бордер над табами
        //borderWidth: 0,
        //backgroundColor: 'aqua',
      }}
      tabBarOptions={{
        // todo @ANKU @LOW - заглавные буквы, вместо прописных на табах
        activeTintColor: colors.text,
        inactiveTintColor: colors.disabled,
        style: {
          //backgroundColor: 'red',
          //borderWidth: 0,
          // todo @ANKU @LOW - цвет полоски под активной табой primary а нужно черный
        },
      }}
    >
      <FeedTabs.Screen
        name="AlbumsTab"
        component={ AlbumsScreen }
        options={{ title: 'Albums' }}
      />
      <FeedTabs.Screen
        name="PostsTab"
        component={ Posts }
        options={{ title: 'Posts' }}
      />
    </FeedTabs.Navigator>
  );
}

export default function FeedPage() {
  return (
    <FeedNavigator.Navigator
      screenOptions={ getSlackNavigatorScreenOptions(useTheme()) }
    >
      <FeedNavigator.Screen
        name={ FeedScreens.FEED }
        component={ FeedTabsScreen }
        options={{ title: 'FEED' }}
      />
      <FeedNavigator.Screen
        name={ FeedScreens.ALBUM_VIEW }
        component={ AlbumViewScreen }
        options={ ({ route }: AlbumViewScreenProps) => ({ title: route.params.albumTitle }) }
      />
      <FeedNavigator.Screen
        name={ FeedScreens.ALBUM_CREATE }
        component={ AlbumCreateScreen }
        options={{
          headerRight: (props) => (
            <WhitePortal name={ PORTAL_CREATE_ALBUM_BUTTON } />
          ),
        }}
      />
    </FeedNavigator.Navigator>
  );
}
