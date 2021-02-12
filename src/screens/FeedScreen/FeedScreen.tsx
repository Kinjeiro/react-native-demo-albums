import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

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

export default function FeedScreen() {
  const { colors } = useTheme();

  return (
    <FeedNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          //borderWidth: 2,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 17,

          //textTransform: 'uppercase',

          color: colors.text,
        },
      }}
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
      <FeedNavigator.Screen name={ FeedScreens.ALBUM_CREATE } component={ AlbumCreateScreen } />
    </FeedNavigator.Navigator>
  );
}
