/* eslint-disable */
import { Button, useTheme } from 'react-native-paper';
import React from 'react';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';
import { isPromise } from '../../core-feats/feat-common-utils/promise-utils';

export default function AppButton(props: React.ComponentProps<typeof Button>) {
  const {
    style,
    labelStyle,
    onPress,
    children,
    disabled,
    ...restProps
  } = props;
  const theme = useTheme();

  const [isLoading, setLoading] = useState(false);

  const handlePress = () => {
    if (!isLoading && props.onPress) {
      const result = props.onPress();
      debugger;
      if (isPromise(result)) {
        setLoading(true);
        // todo @ANKU @LOW - переписать чтобы onPress в типах мог возвращать Promise
        return result.then(() => {
          try {
            setLoading(false)
          } catch (e) {
            // todo @ANKU @CRIT @MAIN - warning не может обновить, если компонента уже нет - оформить красивее
            console.debug('AppButton', e);
          }
        });
      }
      return result;
    }
  };

  // todo @ANKU @LOW - кнопка лоадинга прыгает, немного не хватает места для small лоадинга
  return (
    <Button
      mode="contained"
      uppercase={ false }

      { ...restProps }

      disabled={ isLoading || disabled }
      onPress={ handlePress }

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
    >
      {
        isLoading
          ? <Loading indicatorSize="small" />
          : children
      }
    </Button>
  );
}
