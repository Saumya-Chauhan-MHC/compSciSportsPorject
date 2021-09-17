import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../components/context';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    const [userInfo, setUserInfo] = React.useState({
        photo     : 'https://api.adorable.io/avatars/50/abott@adorable.png',
        email     : '',
        userName  : '',
        followers : 0,
        following : 0,
    });

    _isSignedIn = async () => {

        const isSignedIn = await GoogleSignin.isSignedIn();

        if (isSignedIn) {

          console.log('DrawerNav: User is signed in');
          //Get the User details as user is already signed in
          try {
            //const _userInfo = await GoogleSignin.signInSilently();
            const _userInfo = await GoogleSignin.getCurrentUser();
            console.log('DrawerNav: User Info --> ', _userInfo);
            setUserInfo({ ...userInfo, 
                      photo     : _userInfo.user.photo, 
                      userName  : _userInfo.user.name, 
                      givenName : _userInfo.user.givenName, 
                      email     : _userInfo.user.email,
                    });
          } catch (error) {

            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
              //alert('User has not signed in yet');
              console.log('DrawerNav: User has not signed in yet');
            } else {
              //alert("Something went wrong. Unable to get user's info");
              console.log("DrawerNav: Something went wrong. Unable to get user's info", statusCodes);
            }
           }
        } else {
          console.log('Please Login');
        }
    };
    
    useEffect(() => {

        _isSignedIn();

    }, []);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    //uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                    uri: userInfo.photo
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userInfo.userName}</Title>
                                <Caption style={styles.caption}>{userInfo.givenName}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{userInfo.email}</Paragraph>
                                <Caption style={styles.caption}></Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Teams"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-group" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Roster"
                            onPress={() => {props.navigation.navigate('Counseling')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="phone" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Contacts"
                            onPress={() => {props.navigation.navigate('Hotlines')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar-month-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Events"
                            onPress={() => {props.navigation.navigate('Events')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="email-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('Support')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="logout" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  /* <DrawerItem 
icon={({color, size}) => (
    <Icon 
    name="settings-helper" 
    color={color}
    size={size}
    />
)}
label="About"
onPress={() => {props.navigation.navigate('Support')}}
/>
 */
