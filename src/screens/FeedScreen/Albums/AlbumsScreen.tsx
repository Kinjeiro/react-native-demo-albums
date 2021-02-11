import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import FeedScreens from '../feed-navigation';

type AlbumsProps = {
  // route: RouteProp<any>;
  navigation: StackNavigationProp<any>;
};

export default function AlbumsScreen({ navigation }: AlbumsProps) {
  const goToView = () => navigation.navigate(FeedScreens.ALBUM_VIEW);
  const goToCreate = () => navigation.navigate(FeedScreens.ALBUM_CREATE);

  return (
    <View>
      <Text>Albums</Text>
      <Button title="Go to AlbumCreate" onPress={ goToView } />
      <Button title="Go to AlbumView" onPress={ goToCreate } />
    </View>
  );
}
