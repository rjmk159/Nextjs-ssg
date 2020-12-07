import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

import {Input} from 'galio-framework';

import Icon from './Icon';
import {icpaTheme} from '../constants';
import DatePicker from 'react-native-datepicker';


const {width, height} = Dimensions.get('screen');
class ArInput extends React.Component {
  state = {
    date: '',
  };
  render() {
    const {shadowless, success, error, date, onChangeText} = this.props;
    const inputStyles = [
      styles.input,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,
      {...this.props.style},
    ];

    return !date ? (
      <Input
        placeholder="write something here"
        placeholderTextColor={icpaTheme.COLORS.MUTED}
        style={inputStyles}
        color={icpaTheme.COLORS.HEADER}
        onChangeText = {(text) => {onChangeText(text)}}
        iconContent={
          <Icon
            size={14}
            color={icpaTheme.COLORS.ICON}
            name="link"
            family="AntDesign"
          />
        }
        {...this.props}
      />
    ) : (
      <DatePicker
        style={[{ width: width * 0.8,marginTop:8},styles.input,styles.shadow]}
         date={this.state.date || null}
        mode="date"
        showIcon={false}
        placeholder="Dob"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: { 
            borderWidth: 0,
            paddingTop:5
           }
        }}
        onDateChange={(date) => {
          this.setState({date: date});
        }}
      />
    );
  }
}

ArInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: icpaTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
  },
  success: {
    borderColor: icpaTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: icpaTheme.COLORS.INPUT_ERROR,
  },
  shadow: {
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
});

export default ArInput;
