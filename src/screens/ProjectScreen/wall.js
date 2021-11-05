import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import MyIcon from '~/components/MyIcon';
import {NODE_STATUS} from '~/constants/masterData';
import {isEmpty} from '~/helpers/validate';
import routes from '~/navigation/routes';
import styles from './styles';

const dot = (color, size = 6, border = 2) => {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    shadowOffset: {
      x: 0,
      y: 0,
    },
    shadowRadius: border,
    shadowColor: color,
    shadowOpacity: 0.14,
    marginRight: 2,
  };
};

const shortBay = item => {
  const arr = [];
  (item.children || []).map(level =>
    (level.children || []).map(bay => {
      (bay.children || []).filter(item =>
        arr.push({
          name: bay.name + ' (' + item.name + ')',
          status: !isEmpty(item.projectNodes)
            ? item.projectNodes[0].status
            : '',
        }),
      );
    }),
  );
  return arr;
};

function WallItem(props) {
  const {item, onPress, onToggle, isExpand} = props;
  // const [filter, setFilter] = React.useState(0);
  const navigation = useNavigation();
  const bay = shortBay(item) || [];

  const onViewAll = () => {
    navigation.navigate(routes.BUILDING_NODES, {data: bay, name: item.name});
  };

  // const onChangeFilter = filter => {
  //   LayoutAnimation.easeInEaseOut();
  //   setFilter(filter);
  // };

  // const renderNodeFilter = () => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         height: 40,
  //         borderWidth: 1,
  //         borderColor: 'white',
  //         borderRadius: 10,
  //         marginTop: 20,
  //         backgroundColor: '#ffffffE6',
  //         padding: 5,
  //       }}>
  //       <TouchableOpacity
  //         onPress={() => onChangeFilter(0)}
  //         style={{
  //           ...styles.filterBtn,
  //           backgroundColor: filter === 0 ? colors.red : 'transparent',
  //         }}>
  //         <Text
  //           style={{
  //             ...fonts.type.bold(13, filter === 0 ? 'white' : colors.grey),
  //           }}>
  //           Alert 2
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={() => onChangeFilter(1)}
  //         style={{
  //           ...styles.filterBtn,
  //           backgroundColor: filter === 1 ? colors.orange : 'transparent',
  //         }}>
  //         <Text
  //           style={{
  //             ...fonts.type.bold(13, filter === 1 ? 'white' : colors.grey),
  //           }}>
  //           Check 2
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={() => onChangeFilter(2)}
  //         style={{
  //           ...styles.filterBtn,
  //           backgroundColor: filter === 2 ? colors.darkgrey : 'transparent',
  //         }}>
  //         <Text
  //           style={{
  //             ...fonts.type.bold(13, filter === 2 ? 'white' : colors.grey),
  //           }}>
  //           Pause 4
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const renderNodeItem = (item, index) => {
    if (index > 2) return;
    return (
      <TouchableOpacity
        onPress={() => {
          onPress && onPress(item);
        }}
        key={index.toString()}
        style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
        {item.status == NODE_STATUS.ACTIVE && (
          <View style={{...dot(colors.green, 8, 3), marginRight: 10}} />
        )}
        {item.status == NODE_STATUS.ALERT && (
          <View style={{...dot(colors.red, 8, 3), marginRight: 10}} />
        )}
        {item.status == NODE_STATUS.PAUSE && (
          <View style={{...dot(colors.grey, 8, 3), marginRight: 10}} />
        )}
        {item.status == NODE_STATUS.CHECK && (
          <View style={{...dot(colors.orange, 8, 3), marginRight: 10}} />
        )}
        <Text style={{...fonts.type.base(15), flex: 1}}>{item.name}</Text>
        {/* <TouchableOpacity style={{...styles.smallBtn}}>
          <MyIcon name="qrcode" size={20} color={colors.purple} />
        </TouchableOpacity> */}
        <TouchableOpacity style={{...styles.smallBtn}}>
          <MyIcon name="angle-right" size={20} color={colors.purple} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: 16,
        backgroundColor: colors.lightgrey,
        borderRadius: 14,
        paddingVertical: 25,
        marginBottom: 16,
      }}>
      <TouchableOpacity onPress={() => onToggle(item)} style={styles.row}>
        <Text style={{...fonts.type.semibold(16), flex: 1}}>{item.name}</Text>
        <Text
          style={{...fonts.type.semibold(12, colors.green), marginRight: 20}}>
          {(item.statusCounter || {})[NODE_STATUS.ACTIVE] || 0}{' '}
          <Text style={{color: colors.grey}}>
            /{' '}
            {(item.statusCounter || {})[NODE_STATUS.ACTIVE] +
              (item.statusCounter || {})[NODE_STATUS.ALERT] +
              (item.statusCounter || {})[NODE_STATUS.CHECK] +
              (item.statusCounter || {})[NODE_STATUS.PAUSE] || 0}
          </Text>
        </Text>
        <View style={styles.row}>
          <View style={{...styles.row, marginRight: 8}}>
            <View style={dot(colors.red)} />
            <Text style={{...fonts.type.medium(12, colors.grey)}}>
              {(item.statusCounter || {})[NODE_STATUS.ALERT] || 0}
            </Text>
          </View>
          <View style={{...styles.row, marginRight: 8}}>
            <View style={dot(colors.orange)} />
            <Text style={{...fonts.type.medium(12, colors.grey)}}>
              {(item.statusCounter || {})[NODE_STATUS.CHECK] || 0}
            </Text>
          </View>
          <View style={{...styles.row, marginRight: 8}}>
            <View style={dot(colors.grey)} />
            <Text style={{...fonts.type.medium(12, colors.grey)}}>
              {(item.statusCounter || {})[NODE_STATUS.PAUSE] || 0}
            </Text>
          </View>
        </View>
        <View style={{width: 20, marginLeft: 20}}>
          <MyIcon
            name={isExpand ? 'angle-up' : 'angle-down'}
            size={20}
            color={colors.grey}
          />
        </View>
      </TouchableOpacity>
      {/* {renderNodeFilter()} */}
      {isExpand && (
        <>
          <View style={{marginVertical: 10}}>
            {(bay || []).map(renderNodeItem)}
          </View>
          <TouchableOpacity
            onPress={onViewAll}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <Text
              style={{
                ...fonts.type.semibold(14, colors.grey),
                marginRight: 10,
              }}>
              View All
            </Text>
            <MyIcon name="angle-right" size={20} color={colors.grey} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default WallItem;
