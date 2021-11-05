import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {ListItem, ListItemSeparator} from '~/components/lists';
import colors from '~/assets/colors';
import Icon from '~/components/Icon';
import routes from '~/navigation/routes';
import Screen from '~/components/Screen';

const menuItems = [
  {
    title: 'My Listings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MESSAGES,
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function ProfileScreen({navigation}) {
  //TODO: Get Me
  const data = {};

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={(data || {}).firstname + ' ' + (data || {}).surname}
          subTitle={(data || {}).email}
          image={{uri: (data || {}).avatar}}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default ProfileScreen;
