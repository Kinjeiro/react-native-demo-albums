/* eslint-disable react/jsx-props-no-spreading */
import { Text, TextInput, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import React from 'react';

function TextInputCustom(props: React.ComponentProps<typeof TextInput>) {
  const theme = useTheme();
  const {
    label,
    error,
    style,
    ...restProps
  } = props;

  // todo @ANKU @LOW - width TextInput в WEB 210px, хотя на андройде все нормально растягивается
  return (
    <View
      style={{
        height: 80,
        justifyContent: 'flex-start',
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
            borderColor: error ? theme.colors.errorBackground : theme.colors.disabled,
            // @ts-ignore
            //...style,
          }}
        />
      </View>
      {
        error && (
          <Text
            style={{
              marginTop: theme.spacing.defaultMargin,
              color: theme.colors.errorBackground,
            }}
          >
            { error }
          </Text>
        )
      }
    </View>
  );
}

export default React.memo(TextInputCustom);
