/* eslint-disable react-native/no-inline-styles */

/* eslint-disable no-undef */
import { View, Text, ScrollView, TextInput, TouchableOpacity, Button, KeyboardAvoidingView, Alert } from 'react-native';
import styles from '../css/style';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';


const AddSaint = () => {


    const [selectedGender, setSelectedGender] = useState(null);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [openDst, setOpenDst] = useState(false);
    const [districtID, setDistrictID] = useState('0');

    const [categories, setCategories] = useState([]);
    const [openCg, setOpenCg] = useState(false);
    const [categoryID, setCategoryID] = useState('0');

    const [roles, setRoles] = useState([]);
    const [openRole, setOpenRole] = useState(false);
    const [roleID, setRoleID] = useState('4');

    const [classifications, setClassifications] = useState([]);
    const [openCf, setOpenCf] = useState(false);
    const [classificationID, setClassificationID] = useState('0');

    const [userID, setUserID] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: '0',
        name: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        gender: '',
        dob: '',
        age: '',
        saintStatus: '1',

    });

    const navigation = useNavigation();
    const route = useRoute();
    const { saint } = route.params || {};

    useEffect(() => {
        loadDropdowns();
        loadLoginData();
    }, []);

    useEffect(() => {
        if (saint) {
            setFormData({
                id: saint.id,
                name: saint.name || '',
                email: saint.email || '',
                mobile: saint.mobile || '',
                username: saint.user_name || '',
                password: '',
                gender: '',
                dob: '',
                age: '',
                saintStatus: '1',
            });

            setSelectedGender(saint.gender === 'Male' || saint.gender === "1" ? 1 : 2);
            const dateStr = saint.dob; // yyyy-mm-dd
            const dateObj = new Date(dateStr);
            formatDate(dateObj);

            setDistrictID(saint.districtId?.toString() || '0');
            setCategoryID(saint.saintTypeId?.toString() || '0');
            setClassificationID(saint.classification?.toString() || '0');
            setRoleID(saint.user_role_id?.toString() || '4');
        }
    }, [saint]);

    const loadLoginData = async () => {
        var createdBy = await AsyncStorage.getItem('userId');
        setUserID(createdBy);

        console.log("Saint", saint);
    }

    const loadDropdowns = async () => {
        try {
            const urls = [
                'https://civsp.in/statisticsApp/api/masterData?dropdownID=2&featureID=1&isActive=1',
                'https://civsp.in/statisticsApp/api/masterData?dropdownID=3&featureID=1&isActive=1',
                'https://civsp.in/statisticsApp/api/masterData?dropdownID=1&featureID=1&isActive=1',
                'https://civsp.in/statisticsApp/api/masterData?dropdownID=4&featureID=1&isActive=1',
            ];

            const responses = await Promise.all(urls.map(url => axios.get(url)));
            const [districtResponse, categoryResponse, classificationResponse, roleResponse] = responses;

            if (districtResponse.status === 200) {
                // Set state
                setDistricts(districtResponse.data.masterData);
                console.log('districtResponse:', districtResponse.data.masterData);
            } else {
                showError();
            }

            if (categoryResponse.status === 200) {
                setCategories(categoryResponse.data.masterData);
                console.log('categoryResponse:', categoryResponse.data.masterData);
            } else {
                showError();
            }

            if (classificationResponse.status === 200) {
                setClassifications(classificationResponse.data.masterData);
                console.log('categoryResponse:', classificationResponse.data.masterData);
            } else {
                showError();
            }

            if (roleResponse.status === 200) {
                setRoles(roleResponse.data.masterData);
                console.log('categoryResponse:', roleResponse.data.masterData);
            } else {
                showError();
            }

        } catch (error) {
            console.log('Error in loadDropdownData:', error);
            showError();
        }
    }


    const handleGender = (gender) => {
        setSelectedGender(gender);
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

    const updateField = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {

        if (!formData.name) {
            Toast.show({
                type: 'customError',
                text1: 'Saint Name is required'
            });
            return;
        } else if (!formData.mobile) {
            Toast.show({
                type: 'customError',
                text1: 'Mobile number is required'
            })
            return;
        } else if (formData.mobile.length !== 10) {
            Toast.show({
                type: 'customError',
                text1: 'Please enter valid mobile number'
            })
            return;
        } else if (districtID === '0') {
            Toast.show({
                type: 'customError',
                text1: 'District is required'
            });
            return;

        } else if (categoryID === '0') {
            Toast.show({
                type: 'customError',
                text1: 'Category is required'
            });
            return;

        } else if (classificationID === '0') {
            Toast.show({
                type: 'customError',
                text1: 'Classification is required'
            });
            return;

        } else {

            setIsLoading(true);
            const saintFormData = {
                ...formData,
                created_by: userID,
                userId: userID,
                user_role_id: roleID,
                district: districtID,
                saintType: categoryID,
                classification: classificationID
            };

            console.log("saintFormData : ", saintFormData);

            const response = await fetch('https://civsp.in/statisticsApp/api/saveOrUpdateSaint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(saintFormData)
            });

            const responseBody = await response.json();

            if (response.status === 200) {

                console.log("responseBody : ", responseBody);
                navigation.replace('viewsaints');
                Alert.alert(responseBody['message']);
                setIsLoading(false);
            } else {
                Alert.alert(responseBody['message']);
                setIsLoading(false);
            }

        }

    };

    const toastConfig = {
        // eslint-disable-next-line react/no-unstable-nested-components
        customError: ({ text1 }) => {
            return (
                <View style={{
                    width: '97%',
                    height: 60,
                    backgroundColor: 'black',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>{text1}</Text>
                </View>
            );
        }

    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}>
                        <View style={styles.container}>
                            <View style={styles.formCard}>
                                <Text style={styles.textLbl}>Saint Name <Text style={styles.star}>*</Text></Text>
                                <TextInput style={styles.textInput}
                                    value={formData.name}
                                    onChangeText={(text) => updateField('name', text)}
                                />

                                <Text style={styles.textLbl}>Email</Text>
                                <TextInput style={styles.textInput}
                                    value={formData.email}
                                    onChangeText={(text) => updateField('email', text)} />

                                <Text style={styles.textLbl}>Mobile Number <Text style={styles.star}>*</Text></Text>
                                <TextInput style={styles.textInput}
                                    keyboardType='number-pad'
                                    value={formData.mobile}
                                    onChangeText={(text) => updateField('mobile', text)}
                                />

                                <Text style={styles.textLbl}>User Name</Text>
                                <TextInput style={styles.textInput}
                                    value={formData.username}
                                    onChangeText={(text) => updateField('username', text)}
                                />

                                <Text style={styles.textLbl}>Password</Text>
                                <TextInput style={styles.textInput} value={formData.password}
                                    onChangeText={(text) => updateField('password', text)}
                                />

                                <Text style={styles.textLbl}>Gender</Text>
                                <View style={styles.radioGroup}>

                                    <TouchableOpacity style={[styles.maleButton, selectedGender === 1 && styles.selectedButton]} onPress={() => handleGender(1)} />
                                    <Text style={styles.radioLbl}>Male</Text>

                                    <TouchableOpacity style={[styles.femaleButton, selectedGender === 2 && styles.selectedButton]} onPress={() => handleGender(2)} />
                                    <Text style={styles.radioLbl}>Female</Text>
                                </View>
                                <Text style={styles.dobLbl}>Date of Birth</Text>
                                <View style={styles.dateContainer}>
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

                                <Text style={styles.dobLbl}>Role</Text>
                                <View style={{ zIndex: openRole ? 1000 : 1 }}>
                                    <DropDownPicker
                                        open={openRole}
                                        value={roleID}
                                        items={roles.map((item) => ({ label: item.name, value: item.config_id }))}
                                        setOpen={setOpenRole}
                                        setValue={setRoleID}
                                        setItems={setRoles}
                                        placeholder="-- Select Role --"
                                        style={styles.districtDropdown}
                                        listMode="SCROLLVIEW" // or 'MODAL', or 'FLATLIST'
                                        nestedScrollEnabled={true}
                                    />
                                </View>

                                <Text style={styles.dobLbl}>District <Text style={styles.star}>*</Text></Text>
                                <View style={{ zIndex: openDst ? 1000 : 1 }}>
                                    <DropDownPicker
                                        open={openDst}
                                        value={districtID}
                                        items={districts.map((item) => ({ label: item.name, value: item.config_id }))}
                                        setOpen={setOpenDst}
                                        setValue={setDistrictID}
                                        setItems={setDistricts}
                                        placeholder="-- Select District --"
                                        style={styles.districtDropdown}
                                        listMode="SCROLLVIEW" // or 'MODAL', or 'FLATLIST'
                                        nestedScrollEnabled={true}
                                    />
                                </View>

                                <Text style={styles.dobLbl}>Category <Text style={styles.star}>*</Text></Text>
                                <View style={{ zIndex: openCg ? 1000 : 1 }}>
                                    <DropDownPicker
                                        open={openCg}
                                        value={categoryID}
                                        items={categories.map((item) => ({ label: item.name, value: item.config_id }))}
                                        setOpen={setOpenCg}
                                        setValue={setCategoryID}
                                        setItems={setCategories}
                                        placeholder="-- Select Category --"
                                        style={styles.districtDropdown}
                                        listMode="SCROLLVIEW" // or 'MODAL', or 'FLATLIST'
                                        nestedScrollEnabled={true}
                                    />
                                </View>

                                <Text style={styles.dobLbl}>Classification <Text style={styles.star}>*</Text></Text>
                                <View style={{ zIndex: openCf ? 1000 : 1 }}>
                                    <DropDownPicker
                                        open={openCf}
                                        value={classificationID}
                                        items={classifications.map((item) => ({ label: item.name, value: item.config_id }))}
                                        setOpen={setOpenCf}
                                        setValue={setClassificationID}
                                        setItems={setClassifications}
                                        placeholder="-- Select Classification --"
                                        style={styles.districtDropdown}
                                        listMode="SCROLLVIEW" // or 'MODAL', or 'FLATLIST'
                                        nestedScrollEnabled={true}
                                    />
                                </View>




                            </View>
                        </View>

                    </ScrollView>
                    {/* Bottom Bar fixed at bottom */}
                    <View style={[styles.bottomBar, { paddingBottom: 10 }]}>
                        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                            <Text style={styles.saveBtnText}>{formData.id != "0" ? 'Update' : 'Save'}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backBtn}>
                            <Text style={styles.backBtnText}>Back</Text>

                        </TouchableOpacity>

                    </View>

                </View>
                <Toast config={toastConfig} />
            </KeyboardAvoidingView>
        </SafeAreaView>

    );

};



export default AddSaint;

