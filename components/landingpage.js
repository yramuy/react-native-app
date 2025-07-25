import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './css/login_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const LandingPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {

    // Start animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Redirect after 2.5 seconds
    const timeout = setTimeout(() => {
      const checkLogin = async () => {
        const loggedIn = await getLoginState();
        console.log("IsLoggin", loggedIn);
        if (loggedIn === 'true') {
          navigation.replace('Home');
        } else {
          navigation.replace('login');
        }
      };
      checkLogin();
    }, 2500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLoginState = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLogin');
      return isLoggedIn;

    } catch (error) {
      console.error('Error reading login state:', error);
      return false;
    }
  };

  return (

    <LinearGradient colors={['purple', 'white', 'skyblue']}
      style={styles.container}>
      <Animated.Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          opacity: fadeAnim,
          transform: [
            {
              scale: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ],
          fontSize: 24,
          fontWeight: 'bold',
          color: 'blue',
        }}
      >
        Welcome to CIV
      </Animated.Text>
    </LinearGradient>
  );
};

export default LandingPage;
