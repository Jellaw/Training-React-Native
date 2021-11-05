import React, {useCallback} from 'react';
import {TextInput, View} from 'react-native';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import MyIcon from '../MyIcon';
import styles from './styles';
import {debounce} from 'lodash';

export const SearchBarBlock = props => {
  const {
    placeholder = 'Search',
    delay = 1000,
    style,
    onChangeText,
    onSearch,
    children,
    ...rest
  } = props;

  const doSearch = useCallback(
    debounce(text => {
      onSearch && onSearch(text);
    }, delay),
    [],
  );

  return (
    <View style={[styles.inputSearch, style]}>
      <MyIcon name="search" size={16} color={colors.purple} />
      <TextInput
        style={{flex: 1, paddingLeft: 10, ...fonts.type.base(16)}}
        clearButtonMode="always"
        placeholderTextColor={colors.grey}
        placeholder={placeholder}
        onChangeText={text => {
          onChangeText && onChangeText(text);
          doSearch(text);
        }}
        {...rest}
      />
      {children}
    </View>
  );
};
