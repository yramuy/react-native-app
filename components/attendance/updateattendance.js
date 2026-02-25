import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from '@react-native-community/datetimepicker';


const UpdateAttendance = () => {

    const [saints, setSaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAttendance, setIsAttendance] = useState({});
    const [meetingTypes, setMeetingTypes] = useState([]);
    const [districts, setDistricts] = useState([]);
    const navigate = useNavigation();
    const [openMT, setOpenMT] = useState(false);
    const [openDist, setOpenDist] = useState(false);
    const [meetingTypeID, setMeetingTypeID] = useState('0');
    const [districtID, setDistrictID] = useState('0');
    const currentDate = new Date().toISOString().split('T')['0'];
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);


    useEffect(() => {
        // loadSaints();
        loadDropdowns();
    }, []);

    useEffect(() => {
        if (districtID !== '0') {
            loadSaints();
        }
    }, [districtID]);

    const loadSaints = async () => {
        setLoading(true);
        const body = JSON.stringify({
            "districtId": districtID,
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

    const loadDropdowns = async () => {
        try {
            const urls = [
                'https://civsp.in/statisticsApp/api/masterData?dropdownID=5&featureID=2&isActive=1',
                'https://civsp.in/statisticsApp/api/masterData?dropdownID=2&featureID=1&isActive=1',
            ];

            const responses = await Promise.all(urls.map(url => axios.get(url)));
            const [meetingTypeResponse, districtResponse] = responses;
            // console.log("Meeting Response1 : ", meetingTypeResponse.data.masterData);

            if (meetingTypeResponse.status === 200) {
                setMeetingTypes(meetingTypeResponse.data.masterData);
                console.log("Meeting Response", meetingTypeResponse.data.masterData);
                // showError("Load dropdown data successfully.");
            } else {
                showError("Failed to load Meeting Type Dropdown.");
            }

            if (districtResponse.status === 200) {
                setDistricts(districtResponse.data.masterData);
            } else {
                showError("Failed to load Districts Dropdown.");
            }

        } catch (error) {
            showError("Internal server error occured, please contact to administrator.");
        }
    };

    const showError = (errorText) => {
        Alert.alert(errorText);
        // navigate.replace('attendance');
        console.log(errorText);
    };

    const handleAttendance = (item, index, value) => {
        setIsAttendance(prev => ({
            ...prev,
            [index]: value
        }));

        saveAttendance(value, item.id, item.saintTypeId);

    };

    const saveAttendance = async (attendance, saintId, saintTypeId) => {

        try {

            const body = JSON.stringify({
                'district_id': districtID,
                'saint_id': saintId,
                'attendance': attendance ? 1 : 0,
                'meetingDate': date,
                'meetingTypeId': meetingTypeID,
                'categoryId': saintTypeId
            });

            const response = await fetch('https://civsp.in/statisticsApp/api/saveAttendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (response.status === 200) {
                console.log(response.status);
                // showError("Attendance saved succfully.");
            } else {
                showError("Attendance save failed.");
            }

        } catch (error) {
            showError("Internal server error occured, please contact to administrator.");
        }



        console.log("Body", body);
    };

    const handleChangeDistrict = (selectedId) => {
        console.log("District ID line 98 : ", selectedId);
        setDistrictID(selectedId);
    }

    const formatDate = (sentDate) => {
        const day = String(sentDate.getDate()).padStart(2, '0');
        const month = String(sentDate.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year = sentDate.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.bodyRow}>
            <Text style={styles.cell}>{index + 1}. {item.name}</Text>

            <View style={styles.dataRow}>

                {/* PRESENT */}
                <TouchableOpacity
                    style={styles.statusBox}
                    onPress={() => handleAttendance(item, index, true)}
                >
                    <View
                        style={[
                            styles.radioButton,
                            { backgroundColor: isAttendance[index] === true ? "green" : "#f0f2f4" }
                        ]}
                    />
                    <Text style={styles.label}>Present</Text>

                </TouchableOpacity>

                {/* ABSENT */}
                <TouchableOpacity
                    style={styles.statusBox}
                    onPress={() => handleAttendance(item, index, false)}
                >
                    <View
                        style={[
                            styles.radioButton,
                            { backgroundColor: isAttendance[index] === false ? "red" : "#f0f2f4" }
                        ]}
                    />
                    <Text style={styles.label}>Absent</Text>

                </TouchableOpacity>

            </View>
        </View>
    );

    return (
        <View>

            <>
                <View style={styles.dropdownRow}>
                    <View style={styles.dropdownBox}>
                        <DropDownPicker
                            open={openMT}
                            value={meetingTypeID}
                            items={meetingTypes.map((mt) => ({ label: mt.name, value: mt.config_id }))}
                            setOpen={setOpenMT}
                            setValue={setMeetingTypeID}
                            setItems={setMeetingTypes}
                            placeholder="-- Select Meeting type"
                        />
                    </View>
                    <View style={styles.dropdownBox}>
                        <DropDownPicker
                            open={openDist}
                            value={districtID}
                            items={districts.map((dst) => ({ label: dst.name, value: dst.config_id }))}
                            setOpen={setOpenDist}
                            setValue={setDistrictID}
                            setItems={setDistricts}
                            onChangeValue={(value) => handleChangeDistrict(value)}
                            placeholder="-- Select District"
                        />
                    </View>

                </View>
                <View style={styles.dateField}>
                    <Text style={styles.dateText}>{formatDate(date)}</Text>
                    <Icon name="calendar-alt" style={styles.dateIcon} onPress={() => setShow(true)} />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChange}
                        //minimumDate={new Date()}     // 🔒 restrict past dates
                        maximumDate={new Date()}  // 🔒 restrict future dates
                    />
                )}

                <View style={[styles.headerRow, styles.header]}>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.headerText}>Attendance</Text>
                </View>

                <FlatList
                    data={saints}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#4CAF50" style={styles.indicator} />
                            </View>
                        ) : (
                            <View style={styles.emptyRow}>
                                <Text style={styles.emptyText}>The records will be retrieved according to the selected district.</Text>
                            </View>
                        )
                    }
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            </>


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
        justifyContent: 'flex-start',
        gap: 30,
    },
    statusBox: {
        alignItems: "center",
        justifyContent: "center",
    },
    radioButton: {
        height: 25,
        width: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'blue',
        marginTop: 5,
    },
    loadingContainer: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        paddingVertical: 300,
    },
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10',
        gap: 10
    },
    bodyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ccc",
    },
    dropdownBox: {
        flex: 1
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10',
        margin: '8'
    },
    label: {
        padding: 8
    },
    emptyRow: {
        margin: 10
    },
    emptyText: {
        fontSize: 18,
        color: 'green'
    },
    dateField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        height: 50,
        backgroundColor: 'white',
        elevation: 0,
        borderRadius: 10,
        margin: 10,
        borderWidth: 0.6
    },
    dateText: {
        paddingLeft: 10,
        marginTop: 15
    },
    dateIcon: {
        paddingRight: 20,
        marginTop: 10,
        fontSize: 25,
        color: 'green'
    },
});

export default UpdateAttendance;
