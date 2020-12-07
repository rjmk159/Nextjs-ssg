import React from 'react';
import {Dimensions} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// screens
import Letters from '../screens/Letter';
import Circulars from '../screens/Circulars';
import Onboarding from '../screens/OnBoarding';
import Elements from '../screens/Elements';
import Template from '../screens/Template';

// drawer
import CustomDrawerContent from './Menu';

// header for screens
import {Header} from '../components';

const {width} = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}

function MembershipStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Membership"
        component={Template}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Membership" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}
function PaymentStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Membership"
        component={Template}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Payments" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}
function GrevienceStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Membership"
        component={Template}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Grievance" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}
function ContactUsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Membership"
        component={Template}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Contact Us" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}
function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Letter"
        component={Letters}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Letters"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      {/* <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      /> */}
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
function CircularsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Circulars"
        component={Circulars}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Circulars"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}
function OnlineFormsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="OnlineForms"
        component={Circulars}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Online Forms"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{flex: 1}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Letters">
      <Drawer.Screen name="Letters" component={HomeStack} />
      <Drawer.Screen name="Circulars" component={CircularsStack} />
      <Drawer.Screen name="Membership" component={MembershipStack} />
      <Drawer.Screen name="Payments" component={PaymentStack} />
      <Drawer.Screen name="Online Forms" component={OnlineFormsStack} />
      <Drawer.Screen name="Contact Us" component={ContactUsStack} />
      <Drawer.Screen name="Grievance Section" component={GrevienceStack} />
      <Drawer.Screen name="Elements" component={ElementsStack} />

    </Drawer.Navigator>
  );
}
