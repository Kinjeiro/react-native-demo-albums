import { View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { BlackPortal } from 'react-native-portal';
import FormBuilder, { FormConfigArrayType } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';

import { sleep } from '../../../../core-feats/feat-common-utils/promise-utils';
import { setInDeepReducer } from '../../../../core-feats/feat-common-utils/common-utils';
import USER from '../../../../feats/feat-auth/user.data';
import AppButton from '../../../../components-overriden/AppButton/AppButton';

// ======================================================
// MODULE
// ======================================================
import TextInputCustom from './TextInputCustom';
import {
  MUTATION_ALBUM_CREATE,
  MutationAlbumCreateType,
  MutationAlbumCreateVariablesType,
} from './graphql-album-create';
import { getQueryAlbumsByUserKey } from '../List/graphql-albums';
import FeedScreens from '../../feed-navigation';

export const PORTAL_CREATE_ALBUM_BUTTON = 'createAlbum';

const FIELDS: FormConfigArrayType = [
  {
    name: 'title',
    type: 'input',
    variant: 'outlined',
    label: 'Name',
    rules: {
      required: {
        value: true,
        message: 'Name is required',
      },
    },
    textInputProps: {
      keyboardType: 'default',
    },
  },
  {
    name: 'description',
    type: 'input',
    variant: 'outlined',
    label: 'Description',
    textInputProps: {
      keyboardType: 'default',
    },
  },
];

interface AlbumCreateScreenProps {
  //route: RouteProp<FeedScreensParamList, FeedScreens.FEED>;
  navigation: StackNavigationProp<any>;
}
export default function AlbumCreateScreen({ navigation }: AlbumCreateScreenProps) {
  const theme = useTheme();

  const queryAlbumByUserKey = getQueryAlbumsByUserKey(USER.id);
  const [apiCreateAlbum] = useMutation<MutationAlbumCreateType, MutationAlbumCreateVariablesType>(
    MUTATION_ALBUM_CREATE,
    {
      update: (proxy, { data }) => {
        const prevQueryResult = proxy.readQuery(queryAlbumByUserKey);
        if (prevQueryResult) {
          proxy.writeQuery({
            ...queryAlbumByUserKey,
            data: setInDeepReducer(
              prevQueryResult,
              'user.albums',
              {
                meta: {
                  totalCount: (prevQueryResult.user.albums?.meta?.totalCount || 0) + 1,
                },
                data: [
                  ...(prevQueryResult.user.albums?.data || []),
                  data?.createAlbum,
                ],
              },
            ),
          });
        }
      },
    },
  );

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(async (albumData) => {
    const albumInputData = {
      title: albumData.title,
      userId: USER.id,
    };
    await apiCreateAlbum({
      variables: { albumInputData },
      //optimisticResponse: {
      //  __typename: 'Mutation',
      //  createAlbum: albumInputData,
      //},
    });
    // todo @ANKU @CRIT @MAIN @debugger -
    await sleep(3000);
    navigation.navigate(FeedScreens.FEED);
  });

  /*
    // todo @ANKU @LOW - FormBuilder работает на react-hook-form@5.7.2 - нужно его обновлять на 6 (переписывать Controller на render метод)
  */
  return (
    <View
      style={{
        flex: 1,
        marginTop: theme.spacing.defaultMargin * 2,
        marginLeft: theme.spacing.defaultMargin,
        marginRight: theme.spacing.defaultMargin,
      }}
    >
      <BlackPortal name={ PORTAL_CREATE_ALBUM_BUTTON }>
        <AppButton
          mode="text"
          disabled={ !form.formState.isValid }
          uppercase={ false }
          labelStyle={{ fontSize: theme.fontSizes.title }}
          onPress={ handleSubmit }
        >
          Send
        </AppButton>
      </BlackPortal>


      <FormBuilder
        CustomInput={ TextInputCustom }
        formConfigArray={ FIELDS }
        form={ form }
      />
    </View>
  );
}
