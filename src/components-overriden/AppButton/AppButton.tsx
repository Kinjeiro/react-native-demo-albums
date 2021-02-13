/* eslint-disable */
import { Button, useTheme } from 'react-native-paper';
import React from 'react';

export default function AppButton(props: React.ComponentProps<typeof Button>) {
  const theme = useTheme();

  return (
    <Button
      mode="contained"
      uppercase={ false }

      { ...props }

      style={{
        padding: theme.spacing.defaultMargin,
        // @ts-ignore
        ...props.style
      }}
      labelStyle={{
        padding: 0,
        fontSize: theme.fontSizes.button,
        // @ts-ignore
        ...props.labelStyle
      }}
    />
  );
}
