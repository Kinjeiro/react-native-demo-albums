import { Text, Title, useTheme } from 'react-native-paper';
import { View, Image } from 'react-native';
import React from 'react';

import { heightPercentToPx } from '../../../../core-feats/feat-native-utils/native-utils';
import AppButton from '../../../../components-overriden/AppButton/AppButton';
//import ModalBasketIcon from '../../../../../assets/svgs/modal-basket.svg';
//import ModalBasketIcon from '../../../../icons/ModalBasketIcon';
const ModalBasketImage = require('../../../../icons/ModalBasketIcon.png');

interface DeleteDialogProps {
  onDelete: () => void | Promise<any>,
}
export default function DeleteDialog({ onDelete }: DeleteDialogProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        padding: theme.spacing.defaultMargin,
        backgroundColor: theme.colors.background,
        //padding: 16,
        height: heightPercentToPx(70),
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {
          // todo @ANKU @LOW - к сожалению иконка в эмуляторе криво показывается (заливаются не нужные куски)
            /*<ModalBasketIcon
            width={ 108 }
            height={ 128 }
            fill={ theme.colors.errorBackground }
          />*/
        }
        <Image
          source={ ModalBasketImage }
          style={{
            width: 108,
            height: 128,
          }}
        />
        <Title
          style={{
            fontSize: theme.fontSizes.modalTitle,
            fontWeight: 'bold',
            marginTop: 20,
          }}
        >
          Delete album
        </Title>
        <Text
          style={{
            fontSize: theme.fontSizes.modalDescription,
            marginTop: theme.spacing.defaultMargin,
          }}
        >
          Album will be permanently deleted.
        </Text>
      </View>

      <AppButton
        color={ theme.colors.errorBackground }
        labelStyle={{
          color: theme.colors.error,
          fontSize: theme.fontSizes.modalButton,
        }}
        uppercase={ false }
        onPress={ onDelete }
      >
        Delete
      </AppButton>
    </View>
  );
}
