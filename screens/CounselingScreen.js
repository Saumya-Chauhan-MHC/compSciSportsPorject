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
  ImageBackground,
  Linking,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

//import Colors from './Colors';

import { TeamContext } from '../components/TeamContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationHelpersContext } from '@react-navigation/core';

const CounselingScreen = ({navigation}) => {

  const [roster, setRoster] = React.useState([]);

  const { teamName, setTeamName } = React.useContext(TeamContext);

  useEffect(() => {

    const teamRoster_db = 'Teams/' + teamName + '/Roster';

    console.log("Team Roaster : ", teamRoster_db);

    firestore()
        .collection(teamRoster_db)
        .orderBy('id')
        .get()
        .then(querySnapshot => {

          const todos = [];

            querySnapshot.forEach(doc => {


                  const newRoster = {
                    id:        doc.data().id,
                    name:      doc.data().Name,
                    age:       doc.data().Age,
                    number:    doc.data().Jersey,
                    height_ft: Math.trunc(doc.data().Height/12),
                    height_in: doc.data().Height%12,
                    position:  doc.data().Position,
                  };

                  todos.push(newRoster);

                });

                setRoster(todos);
           });

     }, [teamName]);

     const renderRoster = (player) => {

      return (
    
         <View style={{ flex: 1, width: 300 }}>
            <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
                <Text style={styles.name}>Name :        {player.name}</Text>
                <Text style={styles.name}>No. :            {player.number}</Text>
                <Text style={styles.name}>Age :           {player.age}</Text>
                <Text style={styles.name}>Height :       {player.height_ft}' {player.height_in}"</Text>
                <Text style={styles.name}>Position :    {player.position}</Text>
            </View>
            <View style={styles.separator} />
          </View>
      );    
  };
  
return (
    
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Players</Text>
            <View style={styles.separator} />
            <FlatList //style={styles.feed}
                      data={roster} 
                      renderItem={({ item }) => renderRoster(item)} 
                      keyExtractor={item => item.id} 
                      //refreshing={refreshing}
                      //onRefresh={_getEvents}
                      showsVerticalScrollIndicator={false} >
              </FlatList> 
              <Text style={styles.footer} onPress={() => {navigation.navigate('Home')}} >Press to select new Team</Text>
        </SafeAreaView>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  header: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
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
  footer: {
    marginTop: 6,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue'
  },
  officeHours: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 8,
  },
  separator: {
    marginTop: 16,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default CounselingScreen;
