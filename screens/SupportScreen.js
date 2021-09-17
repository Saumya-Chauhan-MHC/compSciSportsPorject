import React from 'react';

import { 
  View,
  Text, 
  Button, 
  Linking, 
  StyleSheet,
  SafeAreaView,
 } from 'react-native';

//import Colors from './Colors';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const SupportScreen = () => {

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your feedback is Welcome!</Text>
          <Text style={styles.separator} />
          <Text style={styles.sectionDescription}>
                We are happy to hear about your suggestions regarding out events.
          </Text>
          <Text style={styles.sectionDescription}>
                Any feedback on our current Events or information in our App is welcome.
          </Text>
          <Text style={styles.separator} />
          <Text style={styles.sectionDescription} />
          <Button 
            onPress={() => Linking.openURL('mailto:saumya.s.chau@gmail.com?subject=Subject Here&body=Type Here') }
            title="Send Feedback" />
          </View>
      </SafeAreaView>
    </>
  );
};

export default SupportScreen;

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

