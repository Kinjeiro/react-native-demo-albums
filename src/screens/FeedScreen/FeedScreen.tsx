import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';

import { COLOR_HEADER_BG } from '../../styles/colors';

// ======================================================
// MODULE
// ======================================================
import AlbumsScreen from './Albums/List/AlbumsScreen';
import AlbumViewScreen, { AlbumViewScreenProps } from './Albums/View/AlbumViewScreen';
import AlbumCreateScreen from './Albums/Create/AlbumCreateScreen';
import Posts from './Posts/Posts';
import FeedScreens, { FeedScreensParamList } from './feed-navigation';

const FeedTabs = createMaterialTopTabNavigator();

const FeedNavigator = createStackNavigator<FeedScreensParamList>();

type FeedTabsScreenProps = {
  route: RouteProp<FeedScreensParamList, FeedScreens.FEED>;
  navigation: StackNavigationProp<FeedScreensParamList, FeedScreens.FEED>;
};
function FeedTabsScreen(props: FeedTabsScreenProps) {
  return (
    <FeedTabs.Navigator swipeEnabled={ false }>
      <FeedTabs.Screen name="AlbumsTab" component={ AlbumsScreen } />
      <FeedTabs.Screen name="PostsTab" component={ Posts } />
    </FeedTabs.Navigator>
  );
}

export default function FeedScreen() {
  return (
    <FeedNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLOR_HEADER_BG },
      }}
    >
      <FeedNavigator.Screen
        name={ FeedScreens.FEED }
        component={ FeedTabsScreen }
        options={{ title: 'Feed' }}
      />
      <FeedNavigator.Screen name={ FeedScreens.ALBUM_VIEW } component={ AlbumViewScreen } />
      <FeedNavigator.Screen name={ FeedScreens.ALBUM_CREATE } component={ AlbumCreateScreen } />
    </FeedNavigator.Navigator>
  );
}
