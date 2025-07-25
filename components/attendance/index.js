/* eslint-disable react-hooks/exhaustive-deps */
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from '../css/style';

const Index = () => {

    const route = useRoute();
    const { id } = route.params;
    const [submenus, setSubmenus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        loadMenus();
    }, [id]);

    const loadMenus = async () => {
        try {
            const body = JSON.stringify({
                parent_id: id,
                role_id: 1,
                type: 'child'
            });

            const response = await fetch('https://civsp.in/statisticsApp/api/menus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (response.status === 200) {
                const responseBody = await response.json();
                if (responseBody.status === '200') {
                    console.log('submenus:', responseBody.menus);
                    setSubmenus(responseBody.menus);
                } else {
                    showAlert();
                }
            } else {
                showAlert();
            }

        } catch (error) {
            console.error('API Error:', error);
            showAlert();
        } finally {
            setIsLoading(false);
        }
    }

    const showAlert = () => {
        Alert.alert(
            'Alert',
            'Something went wrong, Please retry later',
            [{ text: 'OK' }],
            { cancelable: false }
        );
    };

    const handleMenu = (menuId, name) => {

        switch (menuId) {
            case '40':
                navigation.navigate('viewsaints', { title: name });
                break;

            default:
                break;
        }
        console.log("ID : ", menuId);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>

                {
                    submenus.map((menu) => (
                        <TouchableOpacity onPress={() => handleMenu(menu.id, menu.name)} style={styles.boxDecoration} key={menu.id}>
                            <View style={styles.leftContent}>
                                <Image
                                    source={{ uri: menu.img_path }}
                                    style={styles.image}
                                    resizeMode="cover" // or "contain", "stretch"
                                />
                                <Text style={styles.hometext}>{menu.name}</Text>
                            </View>

                            <Icon name="angle-right" size={40} color="black" />

                        </TouchableOpacity>
                    ))
                }



            </View>
        </ScrollView>
    );
};

export default Index;