import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen       from './HomeScreen';
import CounselingScreen from './CounselingScreen';
import EventsScreen     from './EventsScreen';
import SupportScreen    from './SupportScreen';
import HotlinesScreen   from './HotlinesScreen';

const HomeStack       = createStackNavigator();
const EventsStack     = createStackNavigator();
const HotlinesStack   = createStackNavigator();
const SupportStack    = createStackNavigator();
const CounselingStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Teams',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Counseling"
        component={CounselingStackScreen}
        options={{
          tabBarLabel: 'Roster',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="account-group" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Hotlines"
        component={HotlinesStackScreen}
        options={{
          tabBarLabel: 'Contacts',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="phone" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsStackScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar-month-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportStackScreen}
        options={{
          tabBarLabel: 'Support',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="email" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

 export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Teams',
        headerLeft: () => (
            <Icon.Button name="menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

 const CounselingStackScreen = ({navigation}) => (
  <CounselingStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <CounselingStack.Screen name="Counseling Department" component={CounselingScreen} options={{
          title:'Team Roster',
          headerLeft: () => (
              <Icon.Button name="menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </CounselingStack.Navigator>
);

const HotlinesStackScreen = ({navigation}) => (
  <HotlinesStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HotlinesStack.Screen name="Wellness Resources" component={HotlinesScreen} options={{
          title:'Contact Info',
          headerLeft: () => (
              <Icon.Button name="menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </HotlinesStack.Navigator>
);

const EventsStackScreen = ({navigation}) => (
  <EventsStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <EventsStack.Screen name="Events" component={EventsScreen} options={{
          title:'Team Events',
          headerLeft: () => (
              <Icon.Button name="menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </EventsStack.Navigator>
);

const SupportStackScreen = ({navigation}) => (
  <SupportStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <SupportStack.Screen name="Support" component={SupportScreen} options={{
          title:'Support',
          headerLeft: () => (
              <Icon.Button name="menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </SupportStack.Navigator>
);

  