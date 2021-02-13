/* eslint-disable react/jsx-props-no-spreading */
import { Text, TextInput, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import React from 'react';

export default function TextInputCustom(props: React.ComponentProps<typeof TextInput>) {
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
            // @ts-ignore
            ...style,
          }}
        />
      </View>
    </View>
  );
}
