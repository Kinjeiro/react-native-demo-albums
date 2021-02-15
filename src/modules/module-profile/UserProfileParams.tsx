import React from 'react';
import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';
import { UserStub } from '../../feats/feat-auth/user.data';

// todo @ANKU @CRIT @MAIN - грузить пользователя
//import { GQLUser } from '../../feats/feat-graphql/graphqlTypes';

//export default function UserProfileParams({ user }: { user: GQLUser }) {
export default function UserProfileParams({ user }: { user: UserStub }) {
  const theme = useTheme();

  //const fieldInfos : { field: keyof GQLUser, label: string }[] = [
  const fieldInfos : { field: keyof UserStub, label: string }[] = [
    { field: 'email', label: 'Email' },
    { field: 'website', label: 'Website' },
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
