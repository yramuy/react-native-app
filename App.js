
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './components/home';
import Index from './components/attendance';
import ViewSaints from './components/attendance/viewsaints';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddSaint from './components/attendance/addsaint';
import LandingPage from './components/landingpage';
import Login from './components/login';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='landing' screenOptions={{
        headerStyle: {
          backgroundColor: 'purple'
        },
      }}>
        <Stack.Screen name='landing' component={LandingPage} options={{ title: '', headerTitleAlign: 'center', headerTintColor: 'white' }} />
        <Stack.Screen name='login' component={Login} options={{
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
          },
          headerTintColor: 'white', // optional, depends on icon/text color
        }} />

        <Stack.Screen name='Home' component={HomeScreen} options={{
          title: 'Welcome to CIV', headerTitleAlign: 'center', headerTintColor: 'white', headerLeft: () => null, // 🔒 hides back button
          gestureEnabled: false,
        }} />
        <Stack.Screen name='attendance' component={Index} options={({ route }) => ({
          title: route.params?.title,
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        })} />
        <Stack.Screen name='viewsaints' component={ViewSaints} options={({ route, navigation }) => ({
          title: route.params?.title,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{ flexDirection: 'row', gap: 35, marginRight: 10 }}>

              <TouchableOpacity
                onPress={() => navigation.navigate('addSaint')}

              >
                <FontAwesome5 name="user-plus" size={30} color='white' />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}

              >
                <FontAwesome5 name="home" size={30} color='white' />
              </TouchableOpacity>
            </View>

          ),
          headerTitleAlign: 'left',
          headerTintColor: 'white',
        })} />
        <Stack.Screen name='addSaint' component={AddSaint} options={{ title: 'Add Saint', headerTitleAlign: 'center', headerTintColor: 'white' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
