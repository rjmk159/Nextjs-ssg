import React from 'react';
import { Switch, Platform } from 'react-native';

import icpaTheme from '../constants/Theme';

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor = Platform.OS === 'ios' ? null :
      Platform.OS === 'android' && value ? icpaTheme.COLORS.SWITCH_ON : icpaTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        thumbColor={thumbColor}
        ios_backgroundColor={icpaTheme.COLORS.SWITCH_OFF}
        trackColor={{ false: icpaTheme.COLORS.SWITCH_ON, true: icpaTheme.COLORS.SWITCH_ON }}
        {...props}
      />
    );
  }
}

export default MkSwitch;