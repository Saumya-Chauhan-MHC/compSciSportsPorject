import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen  from './screens/MainTabScreen';
import CounselingScreen from './screens/CounselingScreen';
import HotlinesScreen from './screens/HotlinesScreen';
import EventsScreen   from './screens/EventsScreen';
import SupportScreen  from './screens/SupportScreen';

import { AuthContext } from './components/context';
import { TeamContext }  from './components/TeamContext';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

//import firestore from '@react-native-firebase/firestore';

import {firebase} from '@react-native-firebase/auth';

//import moment from "moment";

const Drawer = createDrawerNavigator();
  
const App = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
 
  const [gettingLoginStatus, setGettingLoginStatus] = React.useState(true);

  const [userInfo, setUserInfo] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const [teamName, setTeamName] = React.useState('Team1');

  const teamSettings = { teamName, setTeamName };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {

    console.log('action :', action);

    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      //alert('User is already signed in');
      console.log('User is already signed in');
      //Get the User details as user is already signed in
      _getCurrentUserInfo();
      setGettingLoginStatus({ gettingLoginStatus: false });
    } else {
        //alert("Please Login");
      console.log('Please Login');
    }
  };

  _getCurrentUserInfo = async () => {
    try {
      const _userInfo = await GoogleSignin.signInSilently();
      console.log('Silent Sign In : User Info --> ', _userInfo);
      setUserInfo({ userInfo: _userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signOut = async () => {

      //Remove user session from the device.
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
    dispatch({ type: 'LOGOUT' });
  };

  const authContext = React.useMemo(() => ({

    signIn: async () => {

      //Prompts a modal to let the user sign in into your application.
      try {
        await GoogleSignin.hasPlayServices({
          //Check if device has Google Play Services installed.
          //Always resolves to true on iOS.
          showPlayServicesUpdateDialog: true,
        });

        const _userInfo = await GoogleSignin.signIn();
        console.log('Signed In: User Info --> ', _userInfo);
        setUserInfo({ userInfo: _userInfo });

        const userToken = 'msjhs_token';
        const userName = 'msjhs';

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
  
      } catch (error) {
          console.log('Message', error.message);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing In');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services Not Available or Outdated');
          } else {
            console.log('Some Other Error Happened');
          }
          _signOut();
      }
    },

    signOut: async () => {

      console.log('Signout Called');

      dispatch({ type: 'LOGOUT' });
      try {
        /*// Add Firebase Authentication - Start
        await firebase.auth().signOut();
        // Add Firebase Authentication - End*/

        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();

        setUserInfo({ userInfo: null }); 
        console.log("Logged out from Google");

        //Remove user session from the device.
        try {
          await AsyncStorage.removeItem('userToken');
        } catch(e) {
          console.log(e);
        }
      } catch (error) {
        console.error(error);
      }
      // dispatch({ type: 'LOGOUT' });
    },

    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []); 

          /*// Add Firebase Authentication - Start
        const { accessToken, idToken } = await GoogleSignin.signIn();
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        await firebase.auth().signInWithCredential(credential);

        console.log('idToken: ', idToken);
        console.log('accessToken: ', accessToken);
        console.log('credential: ', credential);
        
        const _userInfo = await GoogleSignin.signInSilently();
        //Add Firebase Authentication - End*/
  useEffect(() => {

    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      scopes: ['email'],
      // Repleace with your webClientId generated from Firebase console
      //hostedDomain: 'fusdk12.net', // specifies a hosted domain restriction
      webClientId: '712858466664-t2giqvqbrfon7h7thqivfaajpltlidqn.apps.googleusercontent.com',
      offlineAccess: false
    });

    _isSignedIn();

    setTimeout( async () => {
      // setIsLoading(false);
      let _userToken;
      _userToken = null;

      try {
        _userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: _userToken });
    }, 1000);
  }, []);

  console.log('loginState :', loginState);
  //console.log('userInfo   :', userInfo);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    //<PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { loginState.userToken !== null ? (
        <TeamContext.Provider value={teamSettings}>
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="CounselingScreen" component={CounselingScreen} />
            <Drawer.Screen name="HotlinesScreen" component={HotlinesScreen} />
            <Drawer.Screen name="EventsScreen" component={EventsScreen} />
            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          </Drawer.Navigator>
        </TeamContext.Provider>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    //</PaperProvider>
  );
}

export default App;

