import React, { useState, useEffect }  from 'react';

import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

//import Colors from './Colors';

import { TeamContext } from '../components/TeamContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

//import firebase from '@react-native-firebase/app';

import * as AddCalendarEvent from 'react-native-add-calendar-event';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from "moment";

const EventsScreen = ({navigation}) => {

  const [events, setEvents] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const { teamName, setTeamName } = React.useContext(TeamContext);
  
/*   const [userInfo, setUserInfo] = React.useState({
    photo     : 'https://api.adorable.io/avatars/50/abott@adorable.png',
    email     : '',
    userName  : '',
    followers : 0,
    following : 0,
  });

  _isSignedIn = async () => {

      const isSignedIn = await GoogleSignin.isSignedIn();

      if (isSignedIn) {

        console.log('Register: User is signed in');
        //Get the User details as user is already signed in
        try {

          const _userInfo = await GoogleSignin.getCurrentUser();
          console.log('Register: User Info --> ', _userInfo);

          setUserInfo({ ...userInfo, 
                    photo     : _userInfo.user.photo, 
                    userName  : _userInfo.user.name, 
                    givenName : _userInfo.user.givenName, 
                    email     : _userInfo.user.email,
                  });
        } catch (error) {

          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            //alert('User has not signed in yet');
            console.log('Register: User has not signed in yet');
          } else {
            //alert("Something went wrong. Unable to get user's info");
            console.log("Register: Something went wrong. Unable to get user's info", statusCodes);
          }
        }
      } else {
        console.log('Please Login');
      }
  };

  useEffect(() => {

    _isSignedIn();

  }, []);
 */ 
  useEffect(() => {

    const teamEvents_db = 'Teams/'+ teamName + '/Events';

    console.log("Team Events : ", teamEvents_db);

    firestore()
        .collection(teamEvents_db)
        .orderBy('id')
        .get()
        .then(querySnapshot => {

          const todos = [];
          console.log("Total Events :", querySnapshot.size);

            querySnapshot.forEach(doc => {

                console.log("document : ", doc.data());

                  const newEvent = {
                    id:        doc.data().id,
                    name:      doc.data().name,
                    title:     doc.data().title,
                    date:      doc.data().Time,
                    startDate: doc.data().startDate,
                    endDate:   doc.data().endDate,
                    allDay:    doc.data().allDay,
                    location:  doc.data().location,
                    desc:      doc.data().description,
                    notes:     doc.data().notes,
                  };

                  todos.push(newEvent);

                });

                setEvents(todos);
                console.log("events: ", events, ", events size : ", events.length);
           });

  }, [teamName]);

  const _getEvents = () => {
                    
    const teamEvents_db = 'Teams/'+ teamName + '/Events';

    setRefreshing(true);

    firestore()
        .collection(teamEvents_db)
        .orderBy('id')
        .get()
        .then(querySnapshot => {

          const todos = [];
          console.log("Total Events :", querySnapshot.size);

            querySnapshot.forEach(doc => {

                console.log("document : ", doc.data());

                  const newEvent = {
                    id:        doc.data().id,
                    name:      doc.data().name,
                    title:     doc.data().title,
                    date:      doc.data().Time,
                    startDate: doc.data().startDate,
                    endDate:   doc.data().endDate,
                    allDay:    doc.data().allDay,
                    location:  doc.data().location,
                    desc:      doc.data().description,
                    notes:     doc.data().notes,
                  };

                  todos.push(newEvent);

                });

                setEvents(todos);
                console.log("events: ", events, ", events size : ", events.length);
           });

    setRefreshing(false);
  };
 
  const registerEmail = (event) => {

    firestore()
        .collection('mail')
        .add({
          to: event.email,
          //to: 'saumya.s.chau@gmail.com',
          message: 
                { 
                  subject: 'Registration Confirmation for : ' + event.title,
                  html: 'You have successfully registered for, Event : ' + event.title + ', Venue : ' + event.venue + ', Time  : ' + event.time + '.'
                }
        });

  };

  const utcDateToString = (momentInUTC) => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
  };

  const addToCalendar = (_event) => {

    const title    = _event.title;
    const notes    = _event.notes;
    const location = _event.location;
    const allDay   = _event.allDay;

    const startDate = utcDateToString(_event.startDate._seconds*1000);
    const endDate   = utcDateToString(_event.endDate._seconds*1000);

    const eventConfig = {
      title,
      startDate: startDate,
      endDate: endDate,
      notes: notes,
      location: location,
      allDay: allDay,
      navigationBarIOS: {
        tintColor: 'orange',
        backgroundColor: 'green',
        titleColor: 'blue',
      },
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(
        (eventInfo: {
          calendarItemIdentifier: string,
          eventIdentifier: string,
        }) => {
          //alert('eventInfo -> ' + JSON.stringify(eventInfo));
          console.log('eventInfo -> ' + JSON.stringify(eventInfo));
        }
      )
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        //alert('Error -> ' + error);
        console.log('Error -> ' + error);
      });
  };

  const renderEvent = (_event) => {

    const startTime = moment(_event.startDate.toDate()).format("lll");
    const endTime   = moment(_event.endDate.toDate()).format("hh:mm A");

    console.log("event.DateUTC: ", utcDateToString(_event.date._seconds*1000));

    return (

      <View style={{ flex: 1, width: 300 }}>
        <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <Text style={styles.eventName}>{'\u25CF'}  {_event.title}</Text>
        </View>
        <View>
            <TouchableHighlight
                underlayColor="#DDDDDD"
                activeOpacity={0.6}
                onPress={()=>{addToCalendar(_event)}}>
              <View style={{flexDirection:'row', justifyContent: "space-between", paddingVertical: 8}}>
                  <Icon name="calendar-month-outline" size={25} color={Colors.dark} />
                  <Text style={styles.eventTime}>{startTime} - {endTime}</Text>
              </View>
            </TouchableHighlight>
            <Text style={styles.eventVenue}>Venue : {_event.location}</Text>
            <Text style={styles.eventDescription}>{_event.desc}</Text>
            <Button 
              onPress={() => {registerEmail({email: '' /*userInfo.email*/, title : _event.title, time: startTime, venue: _event.location})} }
              title="Register" />
        </View>
        <View style={styles.separator} />
      </View>
    );    
  };

  //console.log("showEvents : ", showEvents);
  console.log("Render events : ", events, "events Size : ", events.length);

  return (

    <SafeAreaView  style={styles.container}>
        <Text style={{color: 'red', alignItems:'center', justifyContent: 'center'}}>Pull down to refresh</Text>
        <View style={styles.separator} />
        <FlatList data={events} 
                  renderItem={({ item }) => renderEvent(item)} 
                  keyExtractor={item => item.id} 
                  refreshing={refreshing}
                  onRefresh={_getEvents}
                  showsVerticalScrollIndicator={false} >
        </FlatList> 
        <Text style={styles.footer} onPress={() => {navigation.navigate('Home')}} >Press to select new Team</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 6,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'purple'
  },
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  eventName: {
    marginTop: 24,
    fontSize: 18,
  },
  eventTime: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  eventVenue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  eventDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
    color: Colors.dark,
  },
  separator: {
    marginTop: 16,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default EventsScreen;

