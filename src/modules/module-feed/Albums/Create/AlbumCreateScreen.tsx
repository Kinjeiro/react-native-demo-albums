import { Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { BlackPortal } from 'react-native-portal';

export const PORTAL_CREATE_ALBUM_BUTTON = 'createAlbum';

export default function AlbumCreateScreen() {
  return (
    <View>
      <Text>AlbumCreateDialog</Text>

      <BlackPortal name={ PORTAL_CREATE_ALBUM_BUTTON }>
        <Button
          onPress={ () => alert('ANKU') }
          disabled={ true }
          uppercase={ false }
        >
          Send
        </Button>
      </BlackPortal>

      <Text>End</Text>
    </View>
  );
}
