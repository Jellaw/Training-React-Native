import React from 'react';
import Proptypes from 'prop-types';
import {View, Image} from 'react-native';
import {Button} from 'react-native-elements';

import {SingleSelectBox, MultiSelectBox} from './optionBox';

import styles from './styles';
export default class SelectDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOption: false,
    };
  }

  toogleShowOptions = () => {
    this.setState({
      showOption: !this.state.showOption,
    });
  };

  renderSelectBox(type = '', props) {
    switch (type) {
      case 'multiple-choise':
        return (
          <MultiSelectBox {...props} onChange={props.onChange || (() => {})} />
        );
      default:
        return (
          <SingleSelectBox
            options={this.props.options}
            optionChangeKey={this.props.optionChangeKey}
            onDone={this.toogleShowOptions}
          />
        );
    }
  }

  render() {
    const {
      title,
      titleStyle,
      options,
      type,
      icon,
      image,
      buttonInput,
      selectStyle,
      containerStyle,
    } = this.props;

    return (
      <View style={containerStyle || styles.container}>
        <View style={selectStyle || styles.seclect}>
          <Button
            title={title}
            type="clear"
            titleStyle={titleStyle || styles.input}
            onPress={this.toogleShowOptions}
            buttonStyle={buttonInput || styles.buttonInput}
          />
          {image && <Image source={image} style={styles.image} />}
          {icon && <View style={styles.icon}>{icon}</View>}
        </View>
        <View style={styles.dropDown}>
          {this.state.showOption &&
            this.renderSelectBox(type, {
              options,
            })}
        </View>
      </View>
    );
  }
}

SelectDropDown.propTypes = {
  icon: Proptypes.object,
  title: Proptypes.string,
  titleStyle: Proptypes.object,
  style: Proptypes.object,
  value: Proptypes.string,
  options: Proptypes.array,
  onChange: Proptypes.func,
  optionChangeKey: Proptypes.func,
};
