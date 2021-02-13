import React from 'react';
import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';

export default function UserProfileParams({ user }) {
  const theme = useTheme();

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

              marginTop: theme.spacing.defaultMargin,
              //marginLeft: widthPercentToPx(3.8),
              //marginRight: widthPercentToPx(3.8),
              marginBottom: theme.spacing.defaultMargin,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSizes.title,
              }}
            >
              { label }
            </Text>
            <Text
              style={{
                fontSize: theme.fontSizes.title,
                color: theme.colors.disabled,
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
