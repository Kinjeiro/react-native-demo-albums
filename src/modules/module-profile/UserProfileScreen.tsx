import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Title } from 'react-native-paper';

import { widthPercentToPx } from '../../core-feats/feat-native-utils/native-utils';
import FONT_SIZES from '../../feats/feat-theme/configs/font-sizes.config';

// ======================================================
// MODULE
// ======================================================
import UserProfileParams from './UserProfileParams';
import USER from './user.data';

export default function UserProfileScreen() {
  // todo @ANKU @CRIT @MAIN - получать пользователя
  const user = USER;
  const {
    login,
    name,
    url,
  } = user;

  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: widthPercentToPx(3.8),
        marginLeft: widthPercentToPx(3.8),
        marginRight: widthPercentToPx(3.8),
        marginBottom: widthPercentToPx(3.8),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Title
            style={{
              fontSize: FONT_SIZES.bigText,
            }}
          >
            { login }
          </Title>
          <Text
            style={{
              fontSize: FONT_SIZES.userProfileName,
            }}
          >
            { name }
          </Text>
        </View>
        <Avatar.Image
          size={ 80 }
          source={{ uri: url }}
        />
      </View>

      <UserProfileParams user={ user } />
    </View>
  );
}
