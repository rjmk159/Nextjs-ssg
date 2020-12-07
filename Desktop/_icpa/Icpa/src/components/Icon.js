import React from 'react';
import {Icon} from 'galio-framework';

class IconExtra extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({IcpaExtra: IcpaExtra});
    this.setState({fontLoaded: true});
  }

  render() {
    const {name, family, ...rest} = this.props;

    if (name && family && this.state.fontLoaded) {
      if (family === 'IcpaExtra') {
        return (
          <Icon
            name={'ios-close-circle-outline'}
            color="rgba(0,0,0,0.6)"
            size={40}
          />
        );
      }
    }

    return null;
  }
}

export default IconExtra;
