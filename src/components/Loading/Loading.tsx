import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

// todo @ANKU @LOW - сделать алиасы
import CommonStyles from '../../styles/common-styles';

export default function Loading() {
  const { colors } = useTheme();

  return (
    <View style={ CommonStyles.centered }>
      <ActivityIndicator size="large" color={ colors.primary } />
    </View>
  );
}
