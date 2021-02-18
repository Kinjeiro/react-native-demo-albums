import { View } from 'react-native';
import React, { useContext } from 'react';
import { useTheme } from 'react-native-paper';
import { BlackPortal } from 'react-native-portal';
import FormBuilder, { FormConfigArrayType } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';

import { sleep } from '../../../../core-feats/feat-common-utils/promise-utils';
import { generateNumberId, setInDeepReducer } from '../../../../core-feats/feat-common-utils/common-utils';
import AppButton from '../../../../components-overriden/AppButton/AppButton';
import UserContext from '../../../../feats/feat-auth/context-user';

// ======================================================
// MODULE
// ======================================================
import TextInputCustom from './TextInputCustom';
import {
  MUTATION_ALBUM_CREATE,
  MutationAlbumCreateType,
  MutationAlbumCreateVariablesType,
} from './graphql-album-create';
import { getQueryAlbumsKey } from '../List/graphql-albums';
import FeedScreens from '../../feed-navigation';

export const PORTAL_CREATE_ALBUM_BUTTON = 'createAlbum';

const FIELDS: FormConfigArrayType = [
  {
    name: 'title',
    type: 'input',
    variant: 'outlined',
    label: 'Title',
    rules: {
      required: {
        value: true,
        message: 'Title is required',
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
  const { user, loading: isUserLoading } = useContext(UserContext);

  const queryAlbumKey = getQueryAlbumsKey();
  const [apiCreateAlbum] = useMutation<MutationAlbumCreateType, MutationAlbumCreateVariablesType>(
    MUTATION_ALBUM_CREATE,
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
      userId: user!.id!,
    };
    const optimisticResponse = {
      createAlbum: {
        id: String(generateNumberId()),
        title: albumInputData.title,
        user: {
          name: user!.name,
        },
        /*
          @NOTE: нужно чтобы совпадал формат полностью, а там мы запрашиваем фотки еще
        */
        photos: {
          data: [],
        },
      },
    };

    await apiCreateAlbum({
      variables: { albumInputData },
      /*
        @NOTE: ДОЛЖЕН БЫТЬ ТОЧНЫЙ ЗАПРОС - один в один совпадать с запрашиваемыми данными назад
      */
      optimisticResponse,
      update: (proxy, { data }) => {
        const prevQueryResult = proxy.readQuery(queryAlbumKey);

        if (prevQueryResult) {
          proxy.writeQuery({
            ...queryAlbumKey,
            data: setInDeepReducer(
              prevQueryResult,
              'albums',
              {
                meta: {
                  totalCount: (prevQueryResult.albums.meta?.totalCount || 0) + 1,
                },
                data: [
                  // todo @ANKU @LOW - @BUG_OUT - Apollo - update() method getting called twice, both times with optimistic/fake data
                  // https://stackoverflow.com/questions/48942175/apollo-update-method-getting-called-twice-both-times-with-optimistic-fake-d
                  //data?.createAlbum,
                  optimisticResponse.createAlbum,
                  ...(prevQueryResult.albums.data || []),
                ],
              },
            ),
          });
        }
      },
    });
    // todo @ANKU @CRIT @MAIN @debugger -
    await sleep(3000);
    navigation.navigate(FeedScreens.FEED);
  });

  /*
    // todo @ANKU @LOW - FormBuilder работает на react-hook-form@5.7.2 - нужно его обновлять на 6 (переписывать Controller на render метод)

    // todo @ANKU @LOW - при отсылки формы, хорошо бы все поля дисейблить
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
          disabled={ !form.formState.isValid || isUserLoading }
          uppercase={ false }
          labelStyle={{ fontSize: theme.fontSizes.title }}
          onPress={ handleSubmit }
          loading={ isUserLoading }
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
