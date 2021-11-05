import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import AppText from '~/components/AppText';
import {ListUser} from '~/components/ListUser';
import Screen from '~/components/Screen';
import {SearchBarBlock} from '~/components/SearchBar';
import routes from '~/navigation/routes';
import styles from './styles';

function UserScreen({navigation}) {
  const [filter, setFilter] = useState('');

  //Load User List
  const data = [];

  return (
    <Screen style={styles.container}>
      <View style={styles.toolBar}>
        <SearchBarBlock
          style={styles.searchBar}
          value={filter}
          onChange={e => setFilter(e)}
        />
      </View>

      <View style={styles.boxContent}>
        <View style={styles.rowTitle}>
          <TouchableOpacity style={styles.boxHeader}>
            <AppText text="User" style={styles.titleHead} />
            <View style={styles.underlined} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boxHeader}
            onPress={() => navigation.navigate(routes.COMPANY)}>
            <AppText text="Companies" style={styles.titleHead} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {(data || []).map((item, index) => (
            <ListUser style={styles.listItem} key={index} data={item} />
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}

export default UserScreen;
