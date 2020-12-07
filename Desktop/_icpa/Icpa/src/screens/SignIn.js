import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Block, Text} from 'galio-framework';
import {showTopErrorMessage} from '../_utils/helper';
import {Button, Input} from '../components';
import {icpaTheme} from '../constants';
import {checkLogin, setLoader} from '../redux/slices/Login';
import {emailRegex} from '../_const/const';

const {width, height} = Dimensions.get('screen');

export function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [ctaText, setText] = useState('Login');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const state = useSelector((_state) => _state.dataLogin);
  useEffect(() => {
console.log(state)

  }, []);
  const handleSubmit = async  () => {
    // let email = 'saro22345313@gmilia.com',  
    // password = 'werty@123'
    dispatch(setLoader(true));
    if (email === '') {
      showTopErrorMessage('Email is required', 'danger');
      setEmailError(true);
    } else if (!emailRegex.test(email)) {
      showTopErrorMessage('Email is not valid', 'danger');
      setEmailError(true);
    } else if (password === '') {
      showTopErrorMessage('Passord is required', 'danger');
      setEmailError(false);
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setText('Signing in...')
      dispatch(
       checkLogin(email, password, (error, data) => {
          if (error) {
            showTopErrorMessage(data || 'Invalid credentials', 'danger');
          } else {
            AsyncStorage.setItem('STORAGE_KEY', JSON.stringify(data));
            navigation.navigate('App');
          }
          setText('Login')
        }),
      );
    }
  };
  return (
    <Block flex center>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <Block width={width * 0.8} style={{marginBottom: 15}}>
          <Input
            error={emailError}
            right
            placeholder="Error Input"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </Block>
        <Block width={width * 0.8}>
          <Input
            password
            value={password}
            error={passwordError}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </Block>
        <Block middle>
          <Button
            color="primary"
            style={styles.createButton}
            onPress={ctaText==='Signing in...'? null :handleSubmit}>
            <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
              {ctaText}
            </Text>
          </Button>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
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
});

export default SignIn;
