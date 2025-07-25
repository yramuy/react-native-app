/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View, Text } from 'react-native';

function FlagDesign() {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to React Native
      </Text>
      <View style={styles.orangeBox}>
        <Text style={styles.orgtext}>ORANGE</Text>
      </View>
      <View style={styles.blueBox}>
        <View style={styles.circle}>
          <Text style={styles.bluetext}>BLUE</Text>
        </View>
      </View>
      <View style={styles.greenBox}>
        <Text style={styles.greentext}>GREEN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    flex: 1
  },
  orangeBox: {
    width: 200,
    padding: 10,
    backgroundColor: 'orange',
    margin: 10,
    borderRadius:10
  },
  blueBox: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 10,
    borderRadius:10,
    elevation: 5

  },
  greenBox: {
    width: 200,
    padding: 10,
    backgroundColor: 'green',
    margin: 10,
    borderRadius:10
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 50,

  },
  bluetext: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30
  },
  greentext: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30
  },
  orgtext: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30
  },
  
  text: {
    padding: 20,
    margin: 10,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20
  },
  hello: {
    padding: 20,
    margin: 10,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold'
  }
});

export default FlagDesign;
