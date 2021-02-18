import React, { useCallback } from 'react';
import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';

import { GQLUser } from '../../feats/feat-graphql/graphqlTypes';

type FieldInfo = {
  field: keyof GQLUser,
  label: string,
  //eslint-disable-next-line react/require-default-props
  extractor?: (value: any) => string,
};

const fieldInfos : FieldInfo[] = [
  { field: 'email', label: 'Email' },
  { field: 'website', label: 'Website' },
  {
    field: 'company',
    label: 'Company Name',
    extractor: (company: GQLUser['company']) => `${company?.name}`,
  },
  { field: 'phone', label: 'Phone' },
  {
    field: 'address',
    label: 'Address',
    extractor: (address: GQLUser['address']) => `${address?.city} ${address?.street}`,
  },
];

export default function UserProfileParams({ user }: { user: GQLUser }) {
  const renderParamPair = useCallback(({ field, label, extractor }: FieldInfo) => {
    const theme = useTheme();

    return (
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
          {
            extractor ? extractor(user[field]) : user[field]
          }
        </Text>
      </View>
    );
  }, [user]);

  return (
    <View>
      { fieldInfos.map(renderParamPair) }
    </View>
  );
}
