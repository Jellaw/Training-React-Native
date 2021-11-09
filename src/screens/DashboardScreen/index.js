import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {SearchBarBlock} from '~/components/SearchBar';
import Screen from '~/components/Screen';
import AppText from '~/components/AppText';
import styles from './styles';
import {PieChartBlock} from '~/components/ChartCircle';
import {ListProject} from '~/components/ListProject';
import routes from '~/navigation/routes';
import MyIcon from '~/components/MyIcon';
import colors from '~/assets/colors';
import CreateProject from '../ProjectConfigureScreen/components/create-project';
import FilterProject from '../ProjectScreen/filter-project';
import {logOutApp} from '~/store/auth/actions';
import {
  getProjectContactList,
  getProjectDetail,
  getProjectList,
  setIsCreate,
} from '~/store/project/actions';
import {getCompanyList} from '~/store/company/actions';
import {notification} from '~/components/alert/NotificationCenter';
import {getTtnAplicationList} from '~/store/ttn-application/actions';
import ROLES from '~/constants/permissions';

function DashboardScreen({navigation}) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const {data, overView, isCreate} = useSelector(state => state.project);
  const {roles} = useSelector(state => state.me);

  useEffect(() => {
    roles.includes(ROLES.PROJECT_GET_LIST) &&
      dispatch(getProjectList({meta: {pageSize: 10000}}));
    roles.includes(ROLES.COMPANY_GET_LIST) &&
      dispatch(getCompanyList({meta: {pageSize: 10000}}));
    roles.includes(ROLES.TTN_APPLICATION_GET_LIST) &&
      dispatch(getTtnAplicationList({meta: {pageSize: 10000}}));
  }, [roles]);

  useEffect(() => {
    if (isCreate) {
      notification('SUCCESS', 'Create project successful');
      dispatch(setIsCreate(false));
      roles.includes(ROLES.PROJECT_GET_LIST) &&
        dispatch(getProjectList({meta: {pageSize: 10000}}));
    }
  }, [isCreate]);

  const handleLogOut = () => {
    dispatch(logOutApp());
  };

  const handleGoToProjectDetail = id => {
    roles.includes(ROLES.PROJECT_GET) && dispatch(getProjectDetail(id));
    roles.includes(ROLES.CONTACT_GET_LIST) &&
      dispatch(getProjectContactList(id));
    navigation.navigate(routes.PROJECT);
  };

  const submitFilter = type => {
    roles.includes(ROLES.PROJECT_GET_LIST) &&
      dispatch(getProjectList({meta: {pageSize: 10000}, status: {eq: type}}));
  };

  const renderTopBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 26,
        }}>
        <TouchableOpacity
          onPress={handleLogOut}
          style={{width: 40, height: 40}}>
          <MyIcon name="sign-out" size={20} color={colors.grey} light />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {roles.includes(ROLES.PROJECT_CREATE) && (
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                width: 40,
                height: 40,
                alignItems: 'flex-end',
                marginRight: 10,
              }}>
              <MyIcon name="plus" size={20} color={colors.purple} light />
            </TouchableOpacity>
          )}
          {roles.includes(ROLES.PROJECT_NODE_CHECK) && (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.QRCODE)}
              style={{width: 40, height: 40, alignItems: 'flex-end'}}>
              <MyIcon name="qrcode" size={20} color={colors.purple} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderChart = () => {
    return (
      <View style={{paddingHorizontal: 26}}>
        <AppText text="Dashboard" style={styles.titleHead} />
        <PieChartBlock data={overView || {}} style={styles.pieChart} />
      </View>
    );
  };

  const renderList = () => {
    const onSearch = text => {
      dispatch(
        getProjectList({
          name: {regex: text || undefined},
          meta: {pageSize: 10000},
        }),
      );
    };
    return (
      <View style={styles.boxContent}>
        <View style={{paddingHorizontal: 16}}>
          <SearchBarBlock onSearch={onSearch}>
            <TouchableOpacity
              onPress={() => setFilterVisible(true)}
              style={{
                ...styles.smallBtn,
                backgroundColor: colors.purple,
                borderRadius: 14,
              }}>
              <MyIcon name="sliders-h" size={20} color="white" />
            </TouchableOpacity>
          </SearchBarBlock>
        </View>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingVertical: 24, paddingHorizontal: 16}}>
          {(data || []).map((item, index) => (
            <ListProject
              onPress={() =>
                roles.includes(ROLES.PROJECT_GET) &&
                handleGoToProjectDetail(item.id)
              }
              key={index}
              data={item}
              style={styles.boxList}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <Screen style={styles.container}>
      {renderTopBar()}
      {renderChart()}
      {renderList()}
      <CreateProject visible={visible} onClose={() => setVisible(false)} />
      <FilterProject
        visible={filterVisible}
        selectedType={filter}
        onConfirm={type => setFilter(type)}
        onClose={() => setFilterVisible(false)}
        onSubmitFilter={submitFilter}
      />
    </Screen>
  );
}

export default DashboardScreen;
