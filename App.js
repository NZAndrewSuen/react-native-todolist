import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';

// screens
import HomeScreen from './src/screens/HomeScreen';
import ListDetailScreen from './src/screens/ListDetailScreen';
import AddListScreen from './src/screens/AddListScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ArchiveScreen from './src/screens/ArchiveScreen';
import SettingScreen from './src/screens/SettingScreen';
import UserScreen from './src/screens/ProfileScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import AboutScreen from './src/screens/AboutScreen';
import ArchiveDetailScreen from './src/screens/ArchiveDetailScreen'
import TestScreen from './src/screens/TestScreen'

//Auth Page
const AuthStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    SignUp: SignUpScreen,
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    Test: TestScreen,
  },
  {
    initialRouteName: 'Login',
  }
)

//HomePage
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Add: AddListScreen,
    ListDetails: ListDetailScreen,
    User: UserScreen,
    TaskDetail: TaskDetailScreen,
    Search: SearchScreen,
  }
)

const ArchiveStack = createStackNavigator(
  {
    Archive: ArchiveScreen,
    ArchiveDetail: ArchiveDetailScreen,
  }
)

const SettingStack = createStackNavigator(
  {
    Setting: SettingScreen,
    User: UserScreen,
    About: AboutScreen,
  }
)

const AppStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon style={[{ color: tintColor }]} name={'home'} size={25}></Icon>
        )
      }
    },
    Archive: {
      screen: ArchiveStack,
      navigationOptions: {
        tabBarLabel: 'Archive',
        tabBarIcon: ({ tintColor }) => (
          <Icon style={[{ color: tintColor }]} name={'archive'} size={25}></Icon>
        )
      }
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: ({ tintColor }) => (
          <Icon style={[{ color: tintColor }]} name={'cog'} size={25}></Icon>
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    barStyle: { backgroundColor: '#115737' },
  }
);

const Mainstack = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  }
)

const AppContainer = createAppContainer(Mainstack)

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}