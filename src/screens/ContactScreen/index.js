import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, Linking} from 'react-native';
import Screen from '~/components/Screen';
import {SearchBarBlock} from '~/components/SearchBar';
import fonts from '~/assets/fonts';
import {FlatList} from 'react-native-gesture-handler';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import {useSelector} from 'react-redux';

function ContactScreen() {
  const {contact} = useSelector(state => state.project);

  useEffect(() => {}, []);

  const renderItem = ({item, index}) => {
    const {user} = item || {};
    return (
      <TouchableOpacity
        key={index}
        style={{
          padding: 24,
          backgroundColor: colors.lightgrey,
          borderRadius: 20,
          shadowOffset: {x: 0, y: 4},
          shadowRadius: 5,
          elevation: 5,
          shadowColor: '#1F1F1F',
          shadowOpacity: 0.08,
          marginBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...fonts.type.semibold(16), marginRight: 10}}>
              {user.firstname + ' ' + user.surname}
            </Text>
            <Text style={{...fonts.type.base(12, colors.grey)}}>
              {(user.userGroup || {}).type}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <MyIcon name="phone" size={12} light color={colors.grey} />
            <Text style={{...fonts.type.base(14, colors.grey), marginLeft: 5}}>
              {user.phone}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <MyIcon name="envelope" size={12} light color={colors.grey} />
            <Text style={{...fonts.type.base(14, colors.grey), marginLeft: 5}}>
              {user.email}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${user.phone}`)}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyIcon name="phone" size={18} color={colors.purple} light />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${user.email}`)}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyIcon name="envelope" size={18} color={colors.purple} light />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        contentContainerStyle={{paddingVertical: 24}}
        data={contact}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  return (
    <Screen style={{flex: 1, paddingHorizontal: 16, paddingTop: 50}}>
      <Text style={{...fonts.type.bold(34)}}>Contact</Text>
      <SearchBarBlock placeholder="Search Contact" style={{marginTop: 24}} />
      {renderList()}
    </Screen>
  );
}

export default ContactScreen;
