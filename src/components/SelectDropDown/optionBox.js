import React from 'react';

import {View, ScrollView, Button} from 'react-native';
// import {Button} from 'react-native-elements';
import styles from './styles';
const OptionBox = props => {
  return (
    <ScrollView style={styles.mainDropDown}>
      <View style={styles.optionsDrepDown}>
        {props.options.map((opt, index) => (
          <Button
            key={index}
            onPress={() => props.optionChangeKey(opt.key)}
            title={opt.value}
            type="clear"
            buttonStyle={styles.optionsButtonDrepDown}
            titleStyle={styles.optionsTitleDrepDown}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export class SingleSelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
    };
  }

  optionChangeKey = key => {
    this.setState({
      options: this.state.options.map(opt => {
        opt.checked = opt.key === key && !opt.checked;
        return opt.value;
      }),
    });

    this.props.optionChangeKey(key);
    this.props.onDone();
  };

  render() {
    return (
      <OptionBox
        options={this.state.options}
        optionChangeKey={this.optionChangeKey}
      />
    );
  }
}
