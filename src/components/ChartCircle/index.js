import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import AppText from '~/components/AppText';
import styles from './styles';

const percentMaths = (total = '', variable = '') => {
  return Math.round((variable / total) * 100 * 100) / 100;
};

export const PieChartBlock = props => {
  const {alertCount, checkCount, pauseCount, activeCount} = props.data;
  const totalDevices = alertCount + checkCount + pauseCount + activeCount || '';

  const percent = {
    alertCount: percentMaths(totalDevices, alertCount),
    checkCount: percentMaths(totalDevices, checkCount),
    pauseCount: percentMaths(totalDevices, pauseCount),
    activeCount: percentMaths(totalDevices, activeCount),
  };

  const arrData = [
    {
      value: alertCount,
      color: colors.red,
    },
    {
      value: checkCount,
      color: colors.orange,
    },
    {
      value: pauseCount,
      color: colors.darkgrey,
    },
    {
      value: activeCount,
      color: colors.green,
    },
  ];

  const pieData = arrData.map((item, index) => ({
    value: item.value,
    svg: {
      fill: item.color,
      onPress: () => '',
    },
    key: `pie-${index}`,
  }));

  const renderInfo = (color, title, value) => {
    return (
      <View style={{marginRight: 25, flexDirection: 'row'}}>
        <View style={{width: 2, backgroundColor: color, marginRight: 5}} />
        <View>
          <Text style={{...fonts.type.bold(12)}}>{value}%</Text>
          <Text style={{...fonts.type.medium(10, colors.grey)}}>{title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={props.style}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 122, height: 122}}>
          <PieChart
            style={{height: '100%'}}
            data={pieData}
            labelRadius={100}
            innerRadius={'95%'}
            outerRadius={'81%'}>
            <View style={styles.totalCenter}>
              <AppText style={{...fonts.type.heavy(21)}} text={totalDevices} />
              <AppText
                style={{...fonts.type.medium(10, colors.grey)}}
                text="Safe-T Devices"
              />
            </View>
          </PieChart>
        </View>
        <View style={{flex: 1, marginLeft: 30}}>
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            {renderInfo(colors.red, 'ALERT', percent.alertCount || '')}
            {renderInfo(colors.orange, 'CHECK', percent.checkCount || '')}
          </View>
          <View style={{flexDirection: 'row'}}>
            {renderInfo(colors.darkgrey, 'PAUSE', percent.pauseCount || '')}
            {renderInfo(colors.green, 'ACTIVE', percent.activeCount || '')}
          </View>
        </View>
      </View>
    </View>
  );
};
