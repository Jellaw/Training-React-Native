import React, {useRef, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import ScaffoldingBay from './bay';
import NodePopup from './components/node-popup';
import {useNavigation} from '@react-navigation/native';
import routes from '~/navigation/routes';
import {NODE_STATUS} from '~/constants/masterData';
import {generateScaffoldingArray} from '~/helpers/scaffolding';

const dot = color => {
  return {
    ...styles.dot,
    backgroundColor: color,
    shadowOffset: {
      x: 0,
      y: 0,
    },
    shadowRadius: 2,
    shadowColor: color,
    shadowOpacity: 0.14,
  };
};

function ProjectScaffolding(props) {
  const {data, selectedItems, onWallToggle} = props;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const scrollView = useRef(null);

  // useEffect(() => {
  //   if (currentNode && scrollView.current) {
  //     setSelectedId('L4-8');
  //     scrollView.current.scrollTo({x: 8 * 40, animiated: true});
  //   }
  // }, []);

  const renderScaffoldings = item => {
    const data = generateScaffoldingArray(item.children);
    let countBay = 0;

    const countBayLoop = length => {
      if (length > countBay) countBay = length;
    };

    const onBayPressed = id => {
      if (selected === id) {
        setVisible(true);
      } else {
        setSelected(id);
      }
    };
    return (
      <ScrollView
        ref={scrollView}
        style={{marginVertical: 20}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View>
          {/* {renderScaffolding(data)} */}
          {(data || []).map((item, index) => (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...fonts.type.medium(12), width: 30}}>
                {data.length - index}
              </Text>
              {countBayLoop(item.length)}
              {item.map((bay, bayindex) => (
                <ScaffoldingBay
                  item={bay}
                  isShow={bay.isEmpty ? false : true}
                  onPress={() =>
                    bay.isEmpty
                      ? ''
                      : onBayPressed(
                          `${item.id}-${data.length - index}-${bayindex + 1}`,
                        )
                  }
                  isSelect={
                    `${item.id}-${data.length - index}-${bayindex + 1}` ===
                    selected
                  }
                  key={bayindex}
                />
              ))}
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 30,
              marginTop: 20,
            }}>
            {[...Array(Number(countBay)).keys()].map((i, index) => (
              <Text
                style={{width: 40, textAlign: 'center'}}
                key={`bay-${index}`}>
                {index + 1}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderItem = (item, index) => {
    const isExpand = selectedItems.includes(item);
    return (
      <View
        style={{
          paddingLeft: 16,
          borderRadius: 14,
          marginBottom: 16,
        }}
        key={index.toString()}>
        <TouchableOpacity
          onPress={() => onWallToggle(item)}
          style={{...styles.row, paddingRight: 16}}>
          <Text style={{...fonts.type.semibold(16), flex: 1}}>{item.name}</Text>
          <Text
            style={{...fonts.type.semibold(12, colors.green), marginRight: 20}}>
            {(item.statusCounter || {})[NODE_STATUS.ACTIVE]}{' '}
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
        {isExpand && renderScaffoldings(item)}
      </View>
    );
  };

  const renderList = () => {
    return <View style={{marginTop: 24}}>{(data || []).map(renderItem)}</View>;
  };

  return (
    <View style={{}}>
      {renderList()}
      <NodePopup
        visible={visible}
        onClose={() => setVisible(false)}
        onChoose={type => {
          navigation.navigate(routes.DEVICE_DETAIL, {type});
        }}
      />
    </View>
  );
}

export default ProjectScaffolding;
