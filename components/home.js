import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import styles from './css/style';
import AsyncStorage from "@react-native-async-storage/async-storage";

const menuItems = [
  { id: 1, text: 'Attendance', icon: <Icon name="book" size={30} color="black" /> },
  { id: 2, text: 'Finance', icon: <Icon name="money" size={30} color="black" /> },
  { id: 3, text: 'Admin', icon: <FontAwesome5 name="users-cog" size={30} color="black" /> },
  { id: 4, text: 'Profile', icon: <FontAwesome5 name="user-circle" size={30} color="black" /> },
  { id: 5, text: 'Logout', icon: <AntDesign name="logout" size={30} color="black" />, isLogout: true },
];

function HomeScreen() {
  const navigation = useNavigation();

  const handleMenu = (item) => {
    console.log(`Clicked on: ${item.id}`);
    if (item.isLogout) {
      // Add logout logic here
      handleLogout();
    }
    navigation.navigate('attendance', { id: item.id, title: item.text });
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('isLogin', JSON.stringify(false));
    navigation.reset({ index: 0, routes: [{ name: 'login' }] });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleMenu(item)} style={styles.boxDecoration}>
            <View style={styles.leftContent}>
              {item.icon}
              <Text style={styles.hometext}>{item.text}</Text>
            </View>
            <Icon name="angle-right" size={40} color="black" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
