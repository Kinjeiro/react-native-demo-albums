import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Title } from 'react-native-paper';

import { widthPercentToPx } from '../../core-feats/feat-native-utils/native-utils';
import FONT_SIZES from '../../feats/feat-theme/configs/font-sizes.config';

// ======================================================
// MODULE
// ======================================================
import UserProfileParams from './UserProfileParams';
import UserContext from '../../feats/feat-auth/context-user';
import Loading from '../../components/Loading/Loading';

export default function UserProfileScreen() {
  const {
    loading,
    user,
  } = useContext(UserContext);

  const {
    username,
    name,
  } = user || {};

  // todo @ANKU @CRIT @MAIN - у пользователя нет аватарки
  //eslint-disable-next-line max-len
  const avatarUrl = 'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png';

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        marginTop: widthPercentToPx(3.8),
        marginLeft: widthPercentToPx(3.8),
        marginRight: widthPercentToPx(3.8),
        marginBottom: widthPercentToPx(3.8),
      }}
    >
      {
        loading || !user
          ? (
            <Loading />
          )
          : (
            <>
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
                    { username }
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
                  source={{ uri: avatarUrl }}
                />
              </View>

              <UserProfileParams user={ user } />
            </>
          )
      }
    </View>
  );
}
