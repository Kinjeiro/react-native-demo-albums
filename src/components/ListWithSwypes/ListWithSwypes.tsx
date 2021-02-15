/* eslint-disable */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ListRenderItemInfo,
} from 'react-native';

import {
  IUseFlatListProps, IUseSectionListProps, RowMap, SwipeListView,
} from 'react-native-swipe-list-view';
import { IconButton, useTheme } from 'react-native-paper';

import GetStyle from '../../core-feats/feat-native-utils/get-style-type';

// ======================================================
// MODULE
// ======================================================
// todo @ANKU @LOW - сделать по нормальному с пробрасыванием типа (IPropsSwipeListView.renderHiddenItem)
type Callback = (rowData: ListRenderItemInfo<any>, rowMap: RowMap<any>) => Promise<any> | any;
export type ListWithSwypesCallback<Item> = ((rowData: ListRenderItemInfo<Item>) => Promise<any> | any);

//Partial<IUseSectionListProps<any>>,
//Partial<IUseFlatListProps<any>>,
type ListWithSwypesProps = Partial<IUseSectionListProps<any>>
& Partial<IUseFlatListProps<any>>
& {
  data: any,

  renderItem?: ListWithSwypesCallback<any>,

  onClickRow?: ListWithSwypesCallback<any>,
  onCloseRow?: ListWithSwypesCallback<any>,
  onDeleteRow?: ListWithSwypesCallback<any>,
};
function ListWithSwypes(props: ListWithSwypesProps) {
  const {
    data,
    renderItem,

    onClickRow,
    onCloseRow,
    onDeleteRow,

    ...restProps
  } = props;

  const theme = useTheme();
  const { colors } = theme;
  const styles = getStyles(theme);

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

  // todo @ANKU @LOW - вынести это и унифицировать
  const innerRenderItem:Callback = (rowData, rowMap) => (
    <TouchableHighlight
      key={ rowData.item.id || rowData.index }
      onPress={ onClickRow && (() => onClickRow(rowData)) }
      style={ styles.item }
      underlayColor={ colors.background }
    >
      {
        renderItem
          ? renderItem(rowData, rowMap)
          // todo @ANKU @LOW - сделать нативный из их внутреннего метода
          : undefined
      }
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
            style={ [
              styles.backRightBtn,
              styles.backRightBtnLeft,
              {
                backgroundColor: colors.primary,
              },
            ] }
            onPress={ () => handleCloseRow(rowData, rowMap) }
          >
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableOpacity>
        )
      }
      {
        onDeleteRow && (
          <TouchableOpacity
            style={ [
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                backgroundColor: colors.errorBackground,
              },
            ] }
            onPress={ () => handleDeleteRow(rowData, rowMap) }
          >
            <IconButton icon="trash-can-outline" color={ colors.error } />
          </TouchableOpacity>
        )
      }
    </View>
  );

  // ======================================================
  // MAIN RENDER
  // ======================================================
  return (
    <SwipeListView
      data={ data }
      style={ styles.root }

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

      {...restProps}
    />
  );
}

export default React.memo(ListWithSwypes);


const getStyles : GetStyle = ({ colors }) => ({
  root: {
    backgroundColor: colors.background,
  },
  item: {
    flex: 1,
    //height: 300,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',

    // обязателен, так как под ним actions скрыты
    backgroundColor: colors.background,
    //backgroundColor: 'red',

    // не получится использовать так как там бэкграунт нужен чтобы прикрыть экшены
    //box-shadow: inset 0px -1px 0px #F2F2F2;
    //shadowColor: colors.listItemShadow,
    //shadowOffset: {
    //  width: 0,
    //  height: 3,
    //},
    //shadowOpacity: 0.25,
    //shadowRadius: 3.84,
    borderBottomColor: colors.listItemDelimiter,
    borderBottomWidth: 1,
  },

  container: {
    //backgroundColor: 'white',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    //backgroundColor: '#DDD',
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
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
})
