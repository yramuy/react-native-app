import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UpdateAttendance = () => {

    const [saints, setSaints] = useState([]);

    useEffect(() => {
        loadSaints();
    }, []);

    const loadSaints = async () => {
        const body = JSON.stringify({
            "districtId": "",
            "typeId": "",
            "date": "",
            "meetingType": "0",
            "classificationID": ""
        });

        const response = await fetch('https://civsp.in/statisticsApp/api/saints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        if (response.status === 200) {
            const responseBody = await response.json();
            setSaints(responseBody.saints);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{index + 1}. {item.name}</Text>

            <View style={styles.dataRow}>
                <View style={{ alignItems: "center" }}>
                    <Text>Present</Text>
                    <TouchableOpacity style={styles.radioButton} />
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text>Absent</Text>
                    <TouchableOpacity style={styles.radioButton} />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.row, styles.header]}>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Attendance</Text>
            </View>

            {/* List */}
            <FlatList
                data={saints}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ccc",
    },
    header: {
        backgroundColor: 'lightgrey'
    },
    headerText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10,
        marginLeft: 20
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10,
        marginTop: 10
    },
    dataRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 5,
    }
});

export default UpdateAttendance;
