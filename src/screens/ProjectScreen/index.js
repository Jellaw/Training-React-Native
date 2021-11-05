import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import {SafeAreaView} from 'react-native';
import {FlatList} from 'react-native';
import routes from '~/navigation/routes';
import {NODE_STATUS, PROJECT_STATUS} from '~/constants/masterData';
import {getProjectDetail} from '~/store/project/actions';

const tagStyle = color => ({
  height: 16,
  backgroundColor: `${color}33`,
  borderRadius: 8,
  marginLeft: 5,
  paddingHorizontal: 5,
  justifyContent: 'center',
});

function ProjectScreen({navigation}) {
  const dispatch = useDispatch();
  const {obj} = useSelector(state => state.project);

  useEffect(() => {}, []);

  // const renderLabel = ({route, focused}) => {
  //   const font = focused
  //     ? fonts.type.bold(20, colors.black)
  //     : fonts.type.bold(20, colors.grey);
  //   return (
  //     <Text
  //       style={{
  //         ...font,
  //         paddingRight: 5,
  //       }}>
  //       {route.title}
  //     </Text>
  //   );
  // };

  const handleGoToConfigureProject = () => {
    navigation.navigate(routes.PROJECT_CONFIG);
    dispatch(getProjectDetail(obj.id));
  };

  // const renderTabBar = props => {
  //   return (
  //     <TabBar
  //       {...props}
  //       indicatorStyle={{
  //         height: 2,
  //         backgroundColor: colors.purple,
  //       }}
  //       contentContainerStyle={{
  //         paddingHorizontal: 18,
  //         borderBottomRightRadius: 30,
  //         borderBottomLeftRadius: 30,
  //         borderBottomWidth: 2,
  //         borderBottomColor: colors.mediumgrey,
  //       }}
  //       indicatorContainerStyle={{
  //         marginHorizontal: 18,
  //         // marginBottom: 5,
  //         zIndex: 2,
  //       }}
  //       style={{
  //         backgroundColor: 'transparent',
  //       }}
  //       tabStyle={{
  //         height: 42,
  //         width: 'auto',
  //       }}
  //       renderLabel={renderLabel}
  //     />
  //   );
  // };

  const renderTag = (title, color, value) => {
    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
        <Text style={{...fonts.type.bold(12, color)}}>{title}</Text>
        <View
          style={{
            ...tagStyle(color),
          }}>
          <Text style={{...fonts.type.medium(12, color)}}>{value}</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: colors.lightgrey,
          borderRadius: 30,
          shadowOffset: {
            x: 0,
            y: 4,
          },
          shadowRadius: 5,
          shadowOpacity: 0.08,
          elevation: 5,
          padding: 24,
          marginBottom: 16,
        }}>
        <Text style={{...fonts.type.bold(22)}}>{item.name}</Text>
        <View
          style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              {renderTag(
                'Alert',
                colors.red,
                (item.statusCounter || {})[NODE_STATUS.ALERT] || 0,
              )}
              {renderTag(
                'Check',
                colors.orange,
                (item.statusCounter || {})[NODE_STATUS.CHECK] || 0,
              )}
            </View>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              {renderTag(
                'Pause',
                colors.darkgrey,
                (item.statusCounter || {})[NODE_STATUS.PAUSE] || 0,
              )}
              {renderTag(
                'Active',
                colors.green,
                (item.statusCounter || {})[NODE_STATUS.ACTIVE] || 0,
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.BUILDING_DETAIL, {
                building: item,
                projectName: obj.name,
              })
            }
            style={{
              height: 40,
              borderRadius: 14,
              paddingHorizontal: 22,
              borderWidth: 2,
              borderColor: colors.purple,
              justifyContent: 'center',
            }}>
            <Text style={{...fonts.type.bold(12, colors.purple)}}>
              View Building
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 16, marginTop: 20}}>
          <Text style={{...fonts.type.medium(12, colors.grey)}}>
            {obj.location}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 8,
              marginBottom: 10,
            }}>
            <Text style={{...fonts.type.bold(34), flex: 1}}>{obj.name}</Text>
            <TouchableOpacity
              onPress={handleGoToConfigureProject}
              style={{
                ...styles.smallBtn,
              }}>
              <MyIcon name="edit" size={16} color={colors.grey} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={{...styles.row, flex: 1}}>
              {obj.status === PROJECT_STATUS[obj.status] ? (
                <>
                  <View style={styles.tagActive}>
                    <Text style={{...fonts.type.medium(12, 'white')}}>
                      Active
                    </Text>
                  </View>
                  <Text style={{...fonts.type.medium(12)}}>
                    Gateway Connected
                  </Text>
                </>
              ) : (
                <>
                  <View style={styles.tagInactive}>
                    <Text style={{...fonts.type.medium(12, 'white')}}>
                      InActive
                    </Text>
                  </View>
                  <Text style={{...fonts.type.medium(12)}}>
                    Gateway Disconnected
                  </Text>
                </>
              )}
            </View>
            {/* <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setIsList(true)}
                style={{...styles.smallBtn}}>
                <MyIcon
                  name="list"
                  size={20}
                  color={isList ? colors.purple : colors.grey}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsList(false)}
                style={{...styles.smallBtn}}>
                <MyIcon
                  name="th"
                  size={20}
                  color={!isList ? colors.purple : colors.grey}
                />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        {/* <TabView
          swipeEnabled={false}
          style={{flex: 1}}
          // lazy={true}
          initialLayout={{
            width: Dimensions.get('window').width,
          }}
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={({route}) => (
            <BuildingDetail
              onNodePress={onNodePress}
              currentNode={currentNode}
              name={route.title}
              isList={isList}
            />
          )}
          onIndexChange={setIndex}
        /> */}
        <FlatList
          contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 24}}
          data={obj.deviceLocationTrees || []}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return <SafeAreaView style={{flex: 1}}>{renderContent()}</SafeAreaView>;
}

export default ProjectScreen;
