import { View, Text, ScrollView } from 'react-native';
import styles from '../css/style';

const AddSaint = () => {

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.formCard}>
                    <Text>Welcome to ADD</Text>
                </View>
            </View>
        </ScrollView>
    );

};

export default AddSaint;