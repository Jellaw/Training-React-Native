import React from 'react';
import {View} from 'react-native';
import AppText from '../AppText';
import styles from './styles';

export const ListCompany = props => {
  const {data} = props;

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.row}>
        <View style={styles.boxContent}>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Name: " />
            <AppText
              style={styles.content}
              text={(data.contact || {}).firstname}
            />
          </View>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Company: " />
            <AppText style={styles.content} text={data.name} />
          </View>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Email: " />
            <AppText
              style={styles.content}
              numberOfLines={1}
              text={(data.contact || {}).email}
            />
          </View>
        </View>
        <View style={styles.boxContent}>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Surname: " />
            <AppText
              style={styles.content}
              text={(data.contact || {}).surname}
            />
          </View>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Phone: " />
            <AppText style={styles.content} text={(data.contact || {}).phone} />
          </View>
        </View>
      </View>
    </View>
  );
};
