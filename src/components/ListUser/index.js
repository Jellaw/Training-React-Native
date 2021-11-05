import React from 'react';
import {View} from 'react-native';
import AppText from '../AppText';
import {ButtonIcon} from '../Button';
import styles from './styles';

export const ListUser = props => {
  const {data} = props;

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.row}>
        <View style={styles.boxContent}>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Name: " />
            <AppText style={styles.content} text={data.firstname} />
          </View>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Type: " />
            <AppText
              style={styles.content}
              text={(data.userGroup || {}).type}
            />
          </View>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Mobile: " />
            <AppText style={styles.content} text={data.phone} />
          </View>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Email: " />
            <AppText
              style={styles.content}
              numberOfLines={1}
              text={data.email}
            />
          </View>
        </View>
        <View style={styles.boxContent}>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Surname: " />
            <AppText style={styles.content} text={data.surname} />
          </View>
          <View style={[styles.rowContent, styles.row]}>
            <AppText style={styles.title} text="Company: " />
            <AppText style={styles.content} text={(data.company || {}).name} />
          </View>
          <View style={styles.btn}>
            <ButtonIcon
              title="Block access "
              icon="lock"
              iconRight={true}
              style={styles.btnIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
