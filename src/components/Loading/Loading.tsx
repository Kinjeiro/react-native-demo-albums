import React from 'react';
import { View, ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'react-native-paper';

// todo @ANKU @LOW - сделать алиасы
import CommonStyles from '../../styles/common-styles';

type LoadingProps = React.ComponentProps<typeof View> & {
  indicatorSize?: ActivityIndicatorProps['size'],
};
Loading.defaultProps = {
  indicatorSize: 'large',
};
export default function Loading(props: LoadingProps) {
  const { colors } = useTheme();
  const {
    indicatorSize,
  } = props;

  return (
    <View
      { ...props }
      style={{ ...CommonStyles.centered, ...props.style as {} }}
    >
      <ActivityIndicator size={ indicatorSize } color={ colors.primary } />
    </View>
  );
}
