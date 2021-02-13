import { Linking, Text, View } from 'react-native';
import React from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { BlackPortal } from 'react-native-portal';
import FormBuilder from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { widthPercentToPx } from '../../../../feats/feat-utils/native-utils';
import FONT_SIZES from '../../../../feats/feat-theme/configs/font-sizes.config';

export const PORTAL_CREATE_ALBUM_BUTTON = 'createAlbum';


function CustomTextInput(props) {
  const theme = useTheme();
  const {
    label,
    style,
    ...restProps
  } = props;

  // todo @ANKU @LOW - width TextInput в WEB 210px, хотя на андройде все нормально растягивается
  return (
    <View
      style={{
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.formFieldMarginHorizontal,
      }}
    >
      <Text
        style={{
          color: theme.colors.disabled,
          fontSize: theme.fontSizes.userProfileName,
        }}
      >
        { label }
      </Text>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TextInput
          { ...restProps }
          style={{
            flex: 1,
            borderColor: theme.colors.disabled,
            ...style,
          }}
        />
      </View>
    </View>
  );
}


export default function AlbumCreateScreen() {
  const theme = useTheme();

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit((data) => {
    // todo @ANKU @CRIT @MAIN -
    alert(JSON.stringify(data, null, 2));
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
        <Button
          onPress={ onSubmit }
          disabled={ !form.formState.isValid }
          uppercase={ false }
          labelStyle={{ fontSize: FONT_SIZES.title }}
        >
          Send
        </Button>
      </BlackPortal>


      <FormBuilder
        CustomInput={ CustomTextInput }
        formConfigArray={ [
          {
            name: 'name',
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
            rules: {
              required: {
                value: true,
                message: 'Description is required',
              },
            },
            textInputProps: {
              keyboardType: 'default',
            },
          },
        ] }
        form={ form }
      />
    </View>
  );
}
