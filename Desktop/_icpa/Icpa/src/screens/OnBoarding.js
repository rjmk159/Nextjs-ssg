import React from 'react';
import {StyleSheet, ImageBackground, Dimensions, StatusBar} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {Button} from '../components';
import {Images, icpaTheme} from '../constants';
import SignUp from './SignUp';
import SignIn from './SignIn';
const { width, height} = Dimensions.get('screen');

class Onboarding extends React.Component {
  state = {
    screen: 0,
  };
  render() {
    let {screen} = this.state;
    const { navigation } = this.props;
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{width, height, zIndex: 1}}>
          <Block flex middle>
            <Block style={{...styles.registerContainer,    height: height * (screen?0.95:0.5),}}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Block row style={{marginTop: theme.SIZES.BASE}}>
                  <Button
                    style={
                      screen === 0
                        ? {...styles.obButtonsActive, marginRight: 30}
                        : {...styles.obButtons, marginRight: 30}
                    }
                    onPress={() => this.setState({screen: 0})}>
                    <Block row>
                      <Text
                        style={[
                          styles.obTextButtons,
                          !screen ? styles.active : null,
                        ]}>
                        Sign In
                      </Text>
                    </Block>
                  </Button>
                  <Button
                    style={
                      screen === 1 ? styles.obButtonsActive : styles.obButtons
                    }
                    onPress={() => this.setState({screen: 1})}>
                    <Block row>
                      <Text
                        style={[
                          styles.obTextButtons,
                          screen ? styles.active : null,
                        ]}>
                        Sign Up
                      </Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex style={{paddingTop:15}}>
                {screen === 1 && <SignUp navigation = {navigation}/>}
                {screen === 0 && <SignIn navigation = {navigation}/>}
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: icpaTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8898AA',
  },
  obButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  obButtonsActive: {
    width: 120,
    height: 40,
    backgroundColor: icpaTheme.COLORS.PRIMARY,
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  obTextButtons: {
    color: icpaTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  active: {
    backgroundColor: icpaTheme.COLORS.PRIMARY,
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});

export default Onboarding;
