/* eslint-disable react-native/no-inline-styles */

/* eslint-disable no-undef */
import { View, Text, ScrollView, TextInput, TouchableOpacity, Button, KeyboardAvoidingView } from 'react-native';
import styles from '../css/style';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

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
    const [roleID, setRoleID] = useState('0');

    const [classifications, setClassifications] = useState([]);
    const [openCf, setOpenCf] = useState(false);
    const [classificationID, setClassificationID] = useState('0');

    useEffect(() => {
        loadDropdowns();
    }, []);

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

    const handleSave = () => {

    };

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

                    <Text style={styles.dobLbl}>District</Text>
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

                    <Text style={styles.dobLbl}>Category</Text>
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

                    <Text style={styles.dobLbl}>Classification</Text>
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

                    <View style={styles.bottomBar}>
                        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                            <Text style={styles.saveBtnText}>Save</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backBtn}>
                            <Text style={styles.backBtnText}>Back</Text>

                        </TouchableOpacity>

                    </View>


                </View>
            </View>

        </ScrollView>
    );

};

export default AddSaint;