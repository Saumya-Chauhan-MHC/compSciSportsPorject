import React, { useState, useEffect }  from 'react';

import { 
  StyleSheet,
  View, 
  Text, 
  Button, 
  StatusBar,
  ScrollView,
  SafeAreaView,
  FlatList,
  VirtualizedList,
} from 'react-native';

import { useTheme } from '@react-navigation/native';

//import Colors from './Colors';

import{ AuthContext } from '../components/context';

import { TeamContext } from '../components/TeamContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
  const [quotes, setQuotes] = React.useState([{id:'0', quote: 'You are enough just as you are.', name: 'Meghan Markle'}]);

  const [quoteId, setQuoteId] = React.useState(0);

  const currDay = Math.floor(Date.now()/(86400000));

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

  useEffect(() => {

    firestore()
        .collection('quotes')
        .orderBy('id')
        .get()
        .then(querySnapshot => {

          const todos = [];
          //console.log("Total quotes :", querySnapshot.size);

            querySnapshot.forEach(doc => {

                //console.log("quote : ", doc.data());

                  const newQuote = {
                    id:    doc.data().id,
                    quote: doc.data().quote,
                    name:  doc.data().name,
                  };

                  todos.push(newQuote);

                  //console.log("todos: ", todos, ", todos size : ", todos.length);
                });

                setQuotes(todos);
                setQuoteId(currDay%todos.length);
                //console.log("DidMount counselers: ", quotes, ", # num quotes: ", quotes.length);
           });
  }, []);

  console.log("Day number", currDay);
  console.log("Quote Id", quoteId);

  const renderTeams = (team) => {

    return (
  
       <View style={{ flex: 1, width: 300 }}>
          <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <Button 
                 onPress={ () => {setTeamName(team.dbName)} }
                 title={team.entry} />
              <Text style={styles.name}>{team.name}</Text>
              <Text style={styles.name}>{team.from}</Text>
          </View>
          <View style={styles.separator} />
        </View>
    );    
  };

  return (

      <SafeAreaView style={styles.container}>
          <View style={styles.sectionContainer}>
            <Text style={styles.quoteSection}>Quote of the Day</Text>
            <View style={styles.separator} />
            <Text style={styles.quote}>"{quotes[quoteId].quote}"</Text>
            <Text style={styles.author}>{quotes[quoteId].name}</Text>
            <View style={styles.separator} />
            <Text style={styles.quoteSection}>Team Selected : {teamName}</Text>
            <View style={styles.separator} />
            <FlatList data={teams} 
                      renderItem={({ item }) => renderTeams(item)} 
                      keyExtractor={item => item.id} 
                      showsVerticalScrollIndicator={false} >
            </FlatList> 
          </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: "column",
    alignItems: 'center', 
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
  },
  sectionContainer: {
    marginTop: 18,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'center', 
    justifyContent: 'center',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
  },
  quoteSection: {
    marginTop:12,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center', 
    justifyContent: 'center',
    color: Colors.dark,
  },
  quote: {
    marginTop:12,
    fontSize: 18,
    fontStyle : 'italic',
    fontWeight: '900',
    color: Colors.dark,
  },
  author: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  separator: {
    marginTop: 12,
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default HomeScreen;

 
/*
                <FlatList //style={styles.feed} 
                    data={quotes} 
                    renderItem={({ item }) => renderQuotes(item)} 
                    keyExtractor={item => item.id} 
                    showsVerticalScrollIndicator={true} >
                </FlatList> 
 */