'use strict';
//import React from 'react';
//import type {Node} from 'react';

import React, { useState, useEffect }  from 'react';

import {
  View, 
  Text, 
  Linking,
  StyleSheet, 
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

//import Colors from './Colors';

import { TeamContext } from '../components/TeamContext';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HotlinesScreen = ({navigation}) => {

  const [coaches, setCoaches] = React.useState([]);

  const { teamName, setTeamName } = React.useContext(TeamContext);

  useEffect(() => {

    const teamContacts_db = 'Teams/'+ teamName + '/Contact';

    console.log("Team Contacts : ", teamContacts_db);

    firestore()
        .collection(teamContacts_db)
        .orderBy('id')
        .get()
        .then(querySnapshot => {
   
          const todos = [];
             //console.log("Total players :", querySnapshot.size);
   
              querySnapshot.forEach(doc => {
   
                     const newCoaches = {
                       id:        doc.data().id,
                       name:      doc.data().Name,
                       title:     doc.data().Title,
                       phone:     doc.data().Phone,
                       email:     doc.data().Email,
                     };
   
                     todos.push(newCoaches);
   
                   });
   
                   setCoaches(todos);
            });
   }, [teamName]);

  const dialPhone = (phoneNumber) => {

    console.log('Phone : ' + phoneNumber);
  
    if (phoneNumber != '') 
    {
      Linking.canOpenURL(`tel:${phoneNumber}`)
      .then(supported => {
        if (!supported) {
          // handle the error
        } else {
          return Linking.openURL(`tel:${phoneNumber}`);
        }
      })
    }
  };
  
  const renderCoaches = (coach) => {
          
    const coachEmail = 'mailto:' + coach.email + '?subject=Subject Here&body=Type Here';

    return (

        <View style={{ flex: 1, width: 380 }}>
                  <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", paddingStart: 24 }}>
                    <Text style={styles.name}>Name :     {coach.name}</Text>
                    <Text style={styles.title}>Title:         {coach.title}</Text>
                  </View>
                  <View>
                  <View style={styles.phoneContainer}>
                    <Text style={styles.phoneNumber}>Phone:     {coach.phone}</Text>
                        <Icon
                        name='phone'
                        size={24}
                        color='gray'
                        onPress={() => {dialPhone(coach.phone)}}>
                        </Icon>
                  </View>
                  <TouchableHighlight
                    underlayColor="#DDDDDD"
                    activeOpacity={0.6}
                    onPress={()=>{Linking.openURL(coachEmail)}}>
                    <View style={styles.emailContainer}>
                        <Text style={styles.email}>Email:      {coach.email}</Text>
                        <Icon name="email" size={25} color="grey" />
                    </View>
                  </TouchableHighlight>
          </View>
          <View style={styles.separator} />
        </View>
    );
  };
    
  return (
      <>
        <SafeAreaView style={styles.container}>
           <Text style={styles.header}>Coaches</Text>
           <View style={styles.separator} />
                <FlatList //style={styles.feed} 
                    data={coaches} 
                    renderItem={({ item }) => renderCoaches(item)} 
                    keyExtractor={item => item.id} 
                    showsVerticalScrollIndicator={false} >
              </FlatList> 
              <Text style={styles.footer} onPress={() => {navigation.navigate('Home')}} >Press to select new Team</Text>
        </SafeAreaView>
      </>
  );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  body: {
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    //paddingHorizontal: 24,
  },
  footer: {
    marginTop: 6,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'purple',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  name: {
    flex: 1,
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  email: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  phone: {
    //marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
  },
  description: {
    //flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 18,
    color: Colors.dark,
  },
  emailContainer: {
    flexDirection:'row', 
    paddingStart: 24,
    paddingRight: 24,
  },
  phoneContainer: {
    flexDirection:'row', 
    paddingVertical: 8, 
    paddingStart: 24,
    paddingRight: 24,
  },
  phoneNumber: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    paddingEnd: 12,
    //paddingStart: 12,
  },
  separator: {
    marginTop: 8,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default HotlinesScreen;
