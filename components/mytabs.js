import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './home';
import Dashboard from './dashboard';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#6A0DAD',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#E6E6FA',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 60,
                    paddingBottom: 6,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Dashboard') {
                        iconName = 'dashboard';
                    }

                    return (
                        <MaterialIcons
                            name={iconName}
                            size={size}
                            color={color}
                            solid={focused}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />

            <Tab.Screen name="Home" component={HomeScreen} />


        </Tab.Navigator>
    );
};

export default MyTabs;
