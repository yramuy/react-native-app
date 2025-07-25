import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../components/css/style';
import styles2 from './css/login_style';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();

    const handleLoginButton = async () => {
        let valid = true;
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = 'Usename is required';
            valid = false;
        }
        if (!password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {

            const body = JSON.stringify({
                "username": username, "password": password
            });

            const response = await fetch('https://civsp.in/statisticsApp/api/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (response.status === 200) {
                const responseBody = await response.json();
                console.log("Response Body");
                console.log(responseBody.data);
                saveUserDatails(responseBody.data);
                navigation.replace('Home');
                Alert.alert('Login Successful!', `Username: ${username}`);
            } else {
                Alert.alert('Login failed!', 'Incorrect username or password!');
            }
        }
    }

    const saveUserDatails = async (data) => {
        await AsyncStorage.setItem('isLogin', JSON.stringify(true));
        await AsyncStorage.setItem('userId', data.id);
        await AsyncStorage.setItem('image_path', data.image_path);
        await AsyncStorage.setItem('mobile_number', data.mobile_number);
        await AsyncStorage.setItem('name', data.name);
        await AsyncStorage.setItem('role_id', data.role_id);
        await AsyncStorage.setItem('role_name', data.role_name);
        await AsyncStorage.setItem('username', data.username);
    }

    return (

        <ImageBackground
            source={require('../assets/images/login_bg.jpg')}
            style={styles2.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles2.loginBox}>
                    <Icon name="user-lock" style={styles2.userlock} />

                    <Text style={styles2.textlbl}>Username</Text>
                    <TextInput
                        style={styles2.input}
                        placeholder="Enter username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />

                    {errors.username && <Text style={styles2.error}>{errors.username}</Text>}

                    <Text style={styles2.pswlbl}>Password</Text>
                    <View style={styles2.pswContainer}>
                        <TextInput
                            style={styles2.inputpsw}
                            placeholder="Enter Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={secure}
                        />
                        <TouchableOpacity onPress={() => setSecure(!secure)} style={styles2.icon}>
                            <Icon name={secure ? 'eye-slash' : 'eye'} size={20} color="grey" />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles2.error}>{errors.password}</Text>}

                    <TouchableOpacity
                        onPress={() => handleLoginButton()}
                        style={styles2.loginButton}
                    >
                        <Text style={styles2.buttonText}>Login</Text>

                    </TouchableOpacity>

                    <View style={styles2.accountRow}>
                        <Text style={styles2.accountText}>Don't have an account ?</Text>
                        <TouchableOpacity onPress={() => Alert.alert('clicked signup')}>
                            <Text style={styles2.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </View>
        </ImageBackground>


    );
};

export default Login;