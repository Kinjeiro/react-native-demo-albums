import {
  IconButton, Modal, Portal, useTheme,
} from 'react-native-paper';
import React, { PropsWithChildren } from 'react';

interface BottomModalProps extends PropsWithChildren<any> {
  onClose: () => void,
}
export default function BottomModal(props: BottomModalProps) {
  const {
    children,
    onClose,
  } = props;

  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={ true }
        onDismiss={ onClose }
        style={{
          marginTop: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        contentContainerStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,

          // // todo @ANKU @LOW - @BUG_OUT абсолютное для модалки начинается не слева, а на 10 пикселей смещено
          //paddingLeft: 0,

          paddingTop: 56,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          //height: 400,
          backgroundColor: theme.colors.background,
        }}
      >
        <IconButton
          icon="close"
          style={{
            position: 'absolute',
            top: 5,
            left: 0,
          }}
          color={ theme.colors.text }
          onPress={ onClose }
        />
        { children }
      </Modal>
    </Portal>
  );
}
