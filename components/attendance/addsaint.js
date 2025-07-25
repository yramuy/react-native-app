import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import styles from '../css/style';
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';

const AddSaint = () => {

    const [gender, setGender] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.formCard}>
                    <Text style={styles.textLbl}>Saint Name</Text>
                    <TextInput style={styles.textInput} />

                    <Text style={styles.textLbl}>Email</Text>
                    <TextInput style={styles.textInput} />

                    <Text style={styles.textLbl}>Mobile Number</Text>
                    <TextInput style={styles.textInput} />

                    <Text style={styles.textLbl}>User Name</Text>
                    <TextInput style={styles.textInput} />

                    <Text style={styles.textLbl}>Password</Text>
                    <TextInput style={styles.textInput} />

                    <Text style={styles.textLbl}>Gender</Text>
                    <View style={styles.radioGroup}>
                        
                        <TouchableOpacity style={styles.radioButton} onPress={() => setGender('1')} />
                        <Text style={styles.radioLbl}>Male</Text>

                        <TouchableOpacity style={styles.radioButton} onPress={() => setGender('1')} />
                        <Text style={styles.radioLbl}>Female</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );

};

export default AddSaint;