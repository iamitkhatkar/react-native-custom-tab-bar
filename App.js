/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Screen3 from './src/screens/Screen3';
import StackNavigatorHome from './src/navigator';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomTabBar} from './src/components/CustomTabBar';

const Tab = createBottomTabNavigator();

const activeColor = '#129';
const inactiveColor = 'grey';

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={StackNavigatorHome}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                size={25}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Screen3}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="cog"
                size={25}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
