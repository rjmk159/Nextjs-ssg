import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {DrawerItem as DrawerCustomItem} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CustomDrawerContent({navigation, state}) {
  const screens = [
    {name: 'Letters', moveTo: true},
    {name: 'Circulars', moveTo: true},
    {name: 'Membership', moveTo: null},
    {name: 'Payments', moveTo: null},
    {name: 'Online Forms', moveTo: null},
    {name: 'Contact Us', moveTo: null},
    {name: 'Grievance Section', moveTo: null},
    {name: 'Elements', moveTo: null},
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <Block flex={0.06} style={styles.header}>
        <Text styles={{fontSize: 30}}>ICPA</Text>
      </Block>
      <Block flex style={{paddingLeft: 8, paddingRight: 14}}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item.name}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block
            flex
            style={{marginTop: 24, marginVertical: 8, paddingHorizontal: 8}}>
            <Block
              style={{
                borderColor: 'rgba(0,0,0,0.2)',
                width: '100%',
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
              <Text color="#8898AA" style={{marginTop: 16, marginLeft: 8}}>
                Logout
              </Text>
            </TouchableOpacity>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    fontSize: 200,
    color: 'red',
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
});

export default CustomDrawerContent;
