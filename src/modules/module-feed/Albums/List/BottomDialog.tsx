import BottomSheet from 'reanimated-bottom-sheet';
import { IconButton, Portal } from 'react-native-paper';
import React, { ForwardedRef, PropsWithChildren } from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';

interface BottomDialogProps extends PropsWithChildren<any> {
  renderContent: any,
}
const BottomDialog = React.forwardRef<BottomSheet, BottomDialogProps>((props, ref) => {
  const {
    //ref,
    renderContent,
  } = props;

  const fall = new Animated.Value(1);

  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    // todo @ANKU @LOW - переделать на модалку, так как pointerEvents="none" не работает в портале, все нажимается*/
    return (
      <Animated.View
        pointerEvents="none"
        style={ [
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#000',
            opacity: animatedShadowOpacity,
          },
        ] }
      />
    );
  };

  const onClose = () => {
    //@ts-ignore - почему или в тайпах не рассматривает - ошибка TS
    ref?.current.snapTo(1);
  };

  // todo @ANKU @LOW - @BUG_OUT внутри нажимаются но не отрабатываются кнопки
  const renderContentInner = () => {
    return (
      <View
        style={{
          backgroundColor: 'red',
        }}
      >
        <IconButton
          icon="camera"
          color="green"
          size={ 20 }
          onPress={ onClose }
        />
        { renderContent() }
      </View>
    );
  };

  return (
    <Portal>
      <BottomSheet
        ref={ ref }
        initialSnap={ 1 }
        snapPoints={ [300, 0] }
        borderRadius={ 10 }
        renderContent={ renderContentInner }
        callbackNode={ fall }
      />
      {
        renderShadow()
      }
    </Portal>
  );
});

export default BottomDialog;
