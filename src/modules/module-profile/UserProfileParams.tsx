import React from 'react';
import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';

import { widthPercentToPx } from '../../feats/feat-utils/native-utils';
import FONT_SIZES from '../../feats/feat-theme/font-size.config';

export default function UserProfileParams({ user }) {
  const { colors } = useTheme();

  const fieldInfos = [
    { field: 'email', label: 'Email' },
    { field: 'site', label: 'Website' },
    { field: 'company', label: 'Company Name' },
    { field: 'phone', label: 'Phone' },
    { field: 'address', label: 'Address' },
  ];

  return (
    <View>
      {
        fieldInfos.map(({ field, label }) => (
          <View
            key={ field }
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',

              marginTop: widthPercentToPx(3.8),
              //marginLeft: widthPercentToPx(3.8),
              //marginRight: widthPercentToPx(3.8),
              marginBottom: widthPercentToPx(3.8),
            }}
          >
            <Text
              style={{
                fontSize: FONT_SIZES.title,
              }}
            >
              { label }
            </Text>
            <Text
              style={{
                fontSize: FONT_SIZES.title,
                color: colors.disabled,
              }}
            >
              { user[field] }
            </Text>
          </View>
        ))
      }
    </View>
  );
}
