import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ListRenderItemInfo,
} from 'react-native';

import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

// todo @ANKU @LOW - сделать по нормальному с пробрасыванием типа (IPropsSwipeListView.renderHiddenItem)
type Callback = (rowData: ListRenderItemInfo<any>, rowMap: RowMap<any>) => Promise;
export type ListWithSwypesCallback<Item> = ((rowData: ListRenderItemInfo<Item>) => Promise | void);

type ListWithSwypesProps = {
  data: any,

  renderItem: ListWithSwypesCallback<any>,

  onClickRow?: ListWithSwypesCallback<any> | undefined,
  onCloseRow?: ListWithSwypesCallback<any> | undefined,
  onDeleteRow?: ListWithSwypesCallback<any> | undefined,
};

export default function ListWithSwypes(props: ListWithSwypesProps) {
  const {
    data,
    renderItem,

    onClickRow,
    onCloseRow,
    onDeleteRow,

    ...restProps
  } = props;

  const handleCloseRow:Callback = async (rowData, rowMap) => {
    const rowKey = rowData.item.key;
    if (rowMap[rowKey] && (!onCloseRow || await onCloseRow(rowData))) {
      rowMap[rowKey].closeRow();
    }
  };

  const handleDeleteRow:Callback = async (rowData, rowMap) => {
    // todo @ANKU @LOW - если открыли одну то закрывать другие
    if (!onDeleteRow || await onDeleteRow(rowData)) {
      await handleCloseRow(rowData, rowMap);
    }
  };

  const innerRenderItem:Callback = (rowData) => (
    <TouchableHighlight
      onPress={ onClickRow && (() => onClickRow(rowData)) }
      style={ styles.rowFront }
      // todo @ANKU @LOW - Color
      underlayColor="#AAA"
    >
      <View>
        { renderItem(rowData) }
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem:Callback = (rowData, rowMap) => (
    <View
      // todo @ANKU @LOW - подумать над ключом
      key={ rowData.item.id }
      style={ styles.rowBack }
    >
      {/* <Text>Left</Text> */}
      {
        onCloseRow && (
          <TouchableOpacity
            style={ [styles.backRightBtn, styles.backRightBtnLeft] }
            onPress={ () => handleCloseRow(rowData, rowMap) }
          >
            <Text style={ styles.backTextWhite }>Close</Text>
          </TouchableOpacity>
        )
      }
      {
        onDeleteRow && (
          <TouchableOpacity
            style={ [styles.backRightBtn, styles.backRightBtnRight] }
            onPress={ () => handleDeleteRow(rowData, rowMap) }
          >
            <Text style={ styles.backTextWhite }>Delete</Text>
          </TouchableOpacity>
        )
      }
    </View>
  );

  return (
    <SwipeListView
      data={ data }

      renderHiddenItem={ renderHiddenItem }
      renderItem={ innerRenderItem }

      // leftOpenValue={ 75 }
      leftOpenValue={ 0 }
      // rightOpenValue={ -150 }
      rightOpenValue={ (onCloseRow ? -75 : 0) + (onDeleteRow ? -75 : 0) }
      disableRightSwipe={ true }

      // leftActivationValue={ 100 }
      // rightActivationValue={ -200 }
      // leftActionValue={ 0 }
      // rightActionValue={ -500 }

      // previewRowKey={ '0' }
      // previewOpenValue={ -40 }
      // previewOpenDelay={ 3000 }

      // onRowDidOpen={ onRowDidOpen }
      // onLeftAction={ onLeftAction }
      // onRightAction={ onRightAction }
      // onLeftActionStatusChange={ onLeftActionStatusChange }
      // onRightActionStatusChange={ onRightActionStatusChange }

      { ...restProps }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
