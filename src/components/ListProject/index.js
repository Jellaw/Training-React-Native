import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import AppText from '../AppText';
import styles from './styles';

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

export const ListProject = props => {
  const {data, onPress} = props;

  return (
    <View style={[styles.container, props.style]}>
      <View style={{flexDirection: 'row'}}>
        <AppText style={{...fonts.type.bold(22), flex: 1}} text={data.name} />
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View style={{...styles.row}}>
            {data.status === 'ACTIVE' ? (
              <>
                <View style={styles.tagActive}>
                  <Text style={{...fonts.type.medium(10, 'white')}}>
                    Active
                  </Text>
                </View>
                <Text style={{...fonts.type.medium(12, '#322A7D')}}>
                  Connected
                </Text>
              </>
            ) : (
              <>
                <View style={styles.tagInactive}>
                  <Text style={{...fonts.type.medium(10, 'white')}}>
                    Inactive
                  </Text>
                </View>
                <Text style={{...fonts.type.medium(12, '#322A7D')}}>
                  Disconnected
                </Text>
              </>
            )}
          </View>
          <View style={styles.row}>
            <View style={{...styles.row, marginRight: 8}}>
              <View style={dot(colors.red)} />
              <Text style={{...fonts.type.medium(12, colors.grey)}}>
                {(data.statusCounter || {}).alertCount || 0}
              </Text>
            </View>
            <View style={{...styles.row, marginRight: 8}}>
              <View style={dot(colors.orange)} />
              <Text style={{...fonts.type.medium(12, colors.grey)}}>
                {(data.statusCounter || {}).checkCount || 0}
              </Text>
            </View>
            <View style={{...styles.row, marginRight: 8}}>
              <View style={dot(colors.darkgrey)} />
              <Text style={{...fonts.type.medium(12, colors.grey)}}>
                {(data.statusCounter || {}).pauseCount || 0}
              </Text>
            </View>
            <View style={{...styles.row, marginRight: 8}}>
              <View style={dot(colors.green)} />
              <Text style={{...fonts.type.medium(12, colors.grey)}}>
                {(data.statusCounter || {}).activeCount || 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={{...fonts.type.medium(15, colors.grey)}}>
            {(data.company || {}).name}
          </Text>
          <Text style={{...fonts.type.medium(15, colors.grey), marginTop: 10}}>
            {data.location}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 40,
            borderRadius: 14,
            paddingHorizontal: 22,
            borderWidth: 2,
            borderColor: colors.purple,
            justifyContent: 'center',
          }}>
          <Text style={{...fonts.type.bold(12, colors.purple)}}>
            View Project
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
