/* eslint-disable */
import { Button, useTheme } from 'react-native-paper';
import React from 'react';
import { useState } from 'react';

import { isPromise } from '../../core-feats/feat-common-utils/promise-utils';

type AppButtonProps = {
  onPress?: () => (void | Promise<any>);
} & React.ComponentProps<typeof Button>;
function AppButton(props: AppButtonProps) {
  const {
    style,
    labelStyle,
    onPress,
    disabled,
    loading,
    ...restProps
  } = props;

  const theme = useTheme();

  const [isPromiseLoading, setPromiseLoading] = useState(false);

  const handlePress = () => {
    if (!isPromiseLoading && props.onPress) {
      const result = props.onPress();

      if (isPromise(result)) {
        setPromiseLoading(true);
        // todo @ANKU @LOW - переписать чтобы onPress в типах мог возвращать Promise
        return (result as Promise<any>).then(() => {
          try {
            setPromiseLoading(false)
          } catch (e) {
            // todo @ANKU @CRIT @MAIN - warning не может обновить, если компонента уже нет - оформить красивее
            console.debug('AppButton', e);
          }
        });
      }
      return result;
    }
  };

  return (
    <Button
      mode="contained"
      uppercase={ false }

      { ...restProps }

      loading={ isPromiseLoading || loading }
      disabled={ isPromiseLoading || disabled }

      style={{
        padding: theme.spacing.defaultMargin,
        // @ts-ignore
        ...style
      }}
      labelStyle={{
        padding: 0,
        fontSize: theme.fontSizes.button,
        // @ts-ignore
        ...labelStyle
      }}

      onPress={ handlePress }
    />
  );
}

export default React.memo(AppButton);
