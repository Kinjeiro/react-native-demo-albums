import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// todo @ANKU @LOW - сделать алиасы
import CommonStyles from '../../styles/common-styles';
import { COLOR_FOOTER_TABS_BG } from '../../styles/colors';

export default function Loading() {
  return (
    <View style={ CommonStyles.centered }>
      <ActivityIndicator size="large" color={ COLOR_FOOTER_TABS_BG } />
    </View>
  );
}
