import React, {useEffect} from 'react';
import {View} from 'react-native';
import WallItem from './wall';

function ProjectList(props) {
  const {data, onNodePress, onWallToggle, selectedItems} = props;

  useEffect(() => {}, []);

  const renderItem = (item, index) => {
    return (
      <WallItem
        item={item}
        isExpand={selectedItems.includes(item)}
        onPress={onNodePress}
        onToggle={onWallToggle}
        key={index.toString()}
      />
    );
  };

  const renderList = () => {
    return (
      <View style={{paddingHorizontal: 16, marginTop: 24}}>
        {(data || []).map(renderItem)}
      </View>
    );
  };

  return <View>{renderList()}</View>;
}

export default ProjectList;
