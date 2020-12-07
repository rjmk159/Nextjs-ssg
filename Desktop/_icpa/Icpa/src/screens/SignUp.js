import React from 'react';
import {StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';
import {Block, Text} from 'galio-framework';

import {Button, Input} from '../components';
import {icpaTheme} from '../constants';
import {ScrollView} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

let region_props = [
  {label: 'East', value: 0},
  {label: 'West', value: 1},
  {label: 'North', value: 2},
  {label: 'South', value: 3},
];
let gender_props = [
  {label: 'Male', value: 0},
  {label: 'Female', value: 1},
  {label: 'Others', value: 2},
];

class SignUp extends React.Component {
  state = {
    region: 0,gender:0
  };
  render() {
    return (
      <Block flex center>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
          <ScrollView>
            <Block width={width * 0.8}>
              <Input borderless placeholder="First Name" />
            </Block>
            <Block width={width * 0.8}>
              <Input borderless placeholder="Last Name" />
            </Block>
            <Block width={width * 0.8}>
              <Input borderless placeholder="Email" />
            </Block>
            <Block width={width * 0.8}>
              <Input password borderless placeholder="Password" />
            </Block>
            <Block width={width * 0.8}>
              <Input borderless placeholder="Contact" />
            </Block>
            <Block width={width * 0.8}>
              <Input date />
            </Block>
            <Block width={width * 0.8}>
              <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text style={{paddingBottom:5,color:icpaTheme.COLORS.PLACEHOLDER}}>Select Region</Text>
                <RadioForm formHorizontal={true} animation={true}>
                  {region_props.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.region === i}
                        onPress={(value) => {
                          this.setState({region: value});
                        }}
                        borderWidth={1}
                        buttonInnerColor={ icpaTheme.COLORS.PRIMARY}
                        buttonOuterColor={
                          this.state.region === i ? icpaTheme.COLORS.PRIMARY : icpaTheme.COLORS.INPUT
                        }
                        buttonSize={20}
                        buttonOuterSize={20}
                        buttonStyle={{}}
                        buttonWrapStyle={[i!==0 && {marginLeft: 10}]}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(value) => {
                          this.setState({region: value});
                        }}
                        labelStyle={{fontSize: 10, color: icpaTheme.COLORS.PRIMARY}}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))}
                </RadioForm>
              </Block>
            </Block>
            <Block width={width * 0.8}>
              <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text style={{paddingBottom:5,color:icpaTheme.COLORS.PLACEHOLDER}}>Select Gender</Text>
                <RadioForm formHorizontal={true} animation={true}>
                  {gender_props.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.gender === i}
                        onPress={(value) => {
                          this.setState({gender: value});
                        }}
                        borderWidth={1}
                        buttonInnerColor={ icpaTheme.COLORS.PRIMARY}
                        buttonOuterColor={
                          this.state.region === i ? icpaTheme.COLORS.PRIMARY : icpaTheme.COLORS.INPUT
                        }
                        buttonSize={20}
                        buttonOuterSize={20}
                        buttonStyle={{}}
                        buttonWrapStyle={[i!==0 && {marginLeft: 10}]}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(value) => {
                          this.setState({gender: value});
                        }}
                        labelStyle={{fontSize: 10, color: icpaTheme.COLORS.PRIMARY,}}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))}
                </RadioForm>
              </Block>
            </Block>
            <Block middle>
              <Button color="primary" style={styles.createButton}>
                <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
                  Register
                </Text>
              </Button>
            </Block>
          </ScrollView>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
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
  input: {
    borderRadius: 4,
    borderColor: icpaTheme.COLORS.BORDER,
    minHeight: 44,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 10,
  },
  shadow: {
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
});

export default SignUp;
