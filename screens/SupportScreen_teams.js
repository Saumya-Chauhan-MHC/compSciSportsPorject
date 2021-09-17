import React, { useState, useEffect }  from 'react';

import { 
  View,
  Text, 
  Button, 
  Linking,
  FlatList, 
  StyleSheet,
  SafeAreaView,
 } from 'react-native';

//import Colors from './Colors';

import { TeamContext } from '../components/TeamContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SupportScreen = ({navigation}) => {

  const [teams, setTeam] = React.useState([]);

  const { teamName, setTeamName } = React.useContext(TeamContext);

  useEffect(() => {
  
    console.log("Team Name : ", teamName);

    firestore()
        .collection('Teams')
        .orderBy('id')
        .get()
        .then(querySnapshot => {
   
          const todos = [];
             //console.log("Total players :", querySnapshot.size);
   
              querySnapshot.forEach(doc => {
   
                   //console.log("player : ", doc.data());
   
                     const newTeams = {
                       id:        doc.data().id,
                       name:      doc.data().name,
                       from:      doc.data().from,
                       entry:     doc.data().entry,
                       dbName:    doc.data().db_name
                     };
   
                     todos.push(newTeams);
   
                     //console.log("todos: ", todos, ", todos size : ", todos.length);
                   });
   
                   setTeam(todos);
                   //console.log("Did Mount roster: ", counselors, ", # numCounselors: ", counselors.length);
            });
   }, [teamName]);

   const renderTeams = (team) => {

    return (
  
       <View style={{ flex: 1, width: 300 }}>
          <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
              <Text style={styles.name}>{team.entry}</Text>
              <Text style={styles.name}>{team.name}</Text>
              <Text style={styles.name}>{team.from}</Text>
              <Button 
                 onPress={ () => {setTeamName(team.dbName)} }
                 title={team.entry} />
          </View>
          <View style={styles.separator} />
        </View>
    );    
  };

    return (
    
      <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Teams</Text>
          <Text style={styles.name}>Team Selected : {teamName}</Text>
          <View style={styles.separator} />
          <FlatList //style={styles.feed} 
                      //data={counselors} 
                      data={teams} 
                      renderItem={({ item }) => renderTeams(item)} 
                      keyExtractor={item => item.id} 
                      //refreshing={refreshing}
                      //onRefresh={_getEvents}
                      showsVerticalScrollIndicator={false} >
            </FlatList> 
      </SafeAreaView>
  );
};

/*<Button 
onPress={ () => {setTeamName(team.dbName)} }
title={team.entry} />*/

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 50,
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    paddingBottom: 10,
    color: Colors.dark,
  },
  separator: {
    marginTop: 8,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default SupportScreen;

/*<Text>Support Screen</Text>
<Button
  title="Click Here"
  onPress={() => alert('Button Clicked!')}
/>*/
