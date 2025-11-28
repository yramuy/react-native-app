import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const UpdateAttendance = () => {

    const [saints, setSaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAttendance, setIsAttendance] = useState({});

    useEffect(() => {
        loadSaints();
    }, []);

    const loadSaints = async () => {
        setLoading(true);
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
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const handleAttendance = (item, index, value) => {
        setIsAttendance(prev => ({
            ...prev,
            [index]: value
        }));
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{index + 1}. {item.name}</Text>

            <View style={styles.dataRow}>

                {/* PRESENT */}
                <TouchableOpacity
                    style={styles.statusBox}
                    onPress={() => handleAttendance(item, index, true)}
                >
                    <Text style={styles.label}>Present</Text>
                    <View
                        style={[
                            styles.radioButton,
                            { backgroundColor: isAttendance[index] === true ? "green" : "#fff" }
                        ]}
                    />
                </TouchableOpacity>

                {/* ABSENT */}
                <TouchableOpacity
                    style={styles.statusBox}
                    onPress={() => handleAttendance(item, index, false)}
                >
                    <Text style={styles.label}>Absent</Text>
                    <View
                        style={[
                            styles.radioButton,
                            { backgroundColor: isAttendance[index] === false ? "red" : "#fff" }
                        ]}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );

    return (
        <View>
            {
                loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#4CAF50" style={styles.indicator} />
                    </View>
                ) : (
                    <>
                        <View style={[styles.row, styles.header]}>
                            <Text style={styles.headerText}>Name</Text>
                            <Text style={styles.headerText}>Attendance</Text>
                        </View>

                        <FlatList
                            data={saints}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </>
                )
            }
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
        marginLeft: 20,
        fontSize: 16
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
    statusBox: {
        alignItems: "center",
        justifyContent: "center",
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: 'black',
        marginTop: 5,
    },
    loadingContainer: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        paddingVertical: 300,
    }
});

export default UpdateAttendance;
