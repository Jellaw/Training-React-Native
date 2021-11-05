import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import AppText from '~/components/AppText';
import {ListCompany} from '~/components/ListCompany';
import Screen from '~/components/Screen';
import {SearchBarBlock} from '~/components/SearchBar';
import routes from '~/navigation/routes';
import styles from './styles';

function CompanyScreen({navigation}) {
  const [filter, setFilter] = useState('');
  //TODO: Get company
  const data = {};

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
          <TouchableOpacity
            style={styles.boxHeader}
            onPress={() => navigation.navigate(routes.USER)}>
            <AppText text="User" style={styles.titleHead} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxHeader}>
            <AppText text="Companies" style={styles.titleHead} />
            <View style={styles.underlined} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {(data || []).map((item, index) => (
            <ListCompany style={styles.listItem} key={index} data={item} />
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}

export default CompanyScreen;
