/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "../css/style";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import axios from 'axios';

const ViewSaints = () => {

    const [saints, setSaints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [openDst, setOpenDst] = useState(false);
    const [districtID, setDistrictID] = useState('0');

    const [categories, setCategories] = useState([]);
    const [openCg, setOpenCg] = useState(false);
    const [categoryID, setCategoryID] = useState('0');

    const [total, setTotal] = useState('0');
    const [generalSaints, setGeneralSaints] = useState('0');
    const [yws, setYws] = useState('0');
    const [cs, setCs] = useState('0');
    const [teenger, setTeenger] = useState('0');
    const [children, setChildren] = useState('0');
    const [card, setCard] = useState(true);
    const [catTotal, setCatTotal] = useState('0');

    const [categoryName, setCategoryName] = useState('');



    useEffect(() => {
        loadDropdowns();
        loadSaints(); // Initial load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (districtID !== 0 || categoryID !== 0) {
            loadSaints();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtID, categoryID]);

    const loadSaints = async () => {
        setIsLoading(true);
        handleCategoryCard();
        const body = JSON.stringify({
            "districtId": districtID,
            "typeId": categoryID,
            "date": "",
            "meetingType": "0",
            "classificationID": ""
        });

        const response = await fetch('https://civsp.in/statisticsApp/api/saints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: body

        });

        if (response.status === 200) {
            const responseBody = await response.json();
            if (responseBody.status === '200') {
                setSaints(responseBody.saints);
                // eslint-disable-next-line radix
                const finalTotal = parseInt(responseBody.total) + parseInt(responseBody.counts.childrens);
                setTotal(finalTotal);
                setCatTotal(responseBody.total);
                setGeneralSaints(responseBody.counts.generalSaints);
                setYws(responseBody.counts.young_working_saints);
                setCs(responseBody.counts.young_ones);
                setTeenger(responseBody.counts.teenagers);
                setChildren(responseBody.counts.childrens);
                setIsLoading(false);
                console.log("Saints", responseBody.saints);
            } else {
                setIsLoading(false);
                showAlert();
            }

        } else {
            setIsLoading(false);
            showAlert();
        }
    }

    const handleCategoryCard = () => {
        if (districtID === '0' && categoryID === '0') {
            setCard(true);
        } else if (districtID !== '0' && categoryID === '0') {
            setCard(true);
        } else if (districtID !== '0' && categoryID !== '0') {
            setCard(false);
        } else if (districtID === '0' && categoryID !== '0') {
            setCard(false);
        }

        if (categoryID !== '0') {
            const selectedLabel = categories.find(item => item.config_id === categoryID);
            setCategoryName(selectedLabel?.name || "");
        }

        console.log("DistrictID", districtID);
        console.log("CategoryID", categoryID);
    }

    const loadDropdowns = async () => {

        try {
            const urls = [
                'https://civsp.in/statisticsApp/api/masterData?dropdownID=2&featureID=1&isActive=1',
                'https://civsp.in/statisticsApp/api/masterData?dropdownID=3&featureID=1&isActive=1'
            ];

            const responses = await Promise.all(urls.map(url => axios.get(url)));
            const [districtResponse, categoryResponse] = responses;

            if (districtResponse.status === 200) {
                // Clone the original data to avoid mutation
                const districtsData = [...districtResponse.data.masterData];

                // Add custom object at index 0
                districtsData.unshift({
                    id: '0',
                    name: "All Districts",
                    short_text: "",
                    config_id: '0',
                    dropdown_id: "",
                    dropdown_name: "District",
                    feature_id: "",
                    feature_name: "Saint",
                    is_active: "1"
                });

                // Set state
                setDistricts(districtsData);
                console.log('districtResponse:', districtsData);
            } else {
                showError();
            }

            if (categoryResponse.status === 200) {
                // setCategories(categoryResponse.data.masterData);

                // Clone the original data to avoid mutation
                const categoriesData = [...categoryResponse.data.masterData];

                // Add custom object at index 0
                categoriesData.unshift({
                    id: '0',
                    name: "All Categories",
                    short_text: "",
                    config_id: '0',
                    dropdown_id: "",
                    dropdown_name: "Category",
                    feature_id: "",
                    feature_name: "Saint",
                    is_active: "1"
                });

                // Set state
                setCategories(categoriesData);
                console.log('categoryResponse:', categoriesData);
            } else {
                showError();
            }

        } catch (error) {
            console.log('Error in loadDropdownData:', error);
            showError();
        }
    }

    const showError = () => {
        Alert.alert('Error', 'Failed to load dropdown data.');
    }

    const showAlert = () => {
        console.log(saints);
        Alert.alert(
            'Alert',
            'Something went wrong, Please retry later',
            [{ text: 'OK' }],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            {/* Dropdowns container */}
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={openDst}
                    value={districtID}
                    items={districts.map((item) => ({ label: item.name, value: item.config_id }))}
                    setOpen={setOpenDst}
                    setValue={setDistrictID}
                    setItems={setDistricts}
                    placeholder="-- Select District --"
                    style={styles.dropdown}
                />

                <DropDownPicker
                    open={openCg}
                    value={categoryID}
                    items={categories.map((item) => ({ label: item.name, value: item.config_id }))}
                    setOpen={setOpenCg}
                    setValue={setCategoryID}
                    setItems={setCategories}
                    placeholder="--Select Category--"
                    style={styles.dropdown}
                />
            </View>

            {
                card === true ? <View style={styles.categoryCard}>
                    <View style={styles.categoryRow}>
                        <Text style={styles.headerText}>Total</Text>
                        <Text style={styles.headerText}>Elders</Text>
                        <Text style={styles.headerText}>YWS</Text>
                        <Text style={styles.headerText}>CS</Text>
                        <Text style={styles.headerText}>Teenager</Text>
                        <Text style={styles.headerText}>Childrens</Text>
                    </View>
                    <View style={styles.categoryRow}>
                        <Text style={styles.headerTextBold}>{total}</Text>
                        <Text style={styles.cellText}>{generalSaints}</Text>
                        <Text style={styles.cellText}>{yws}</Text>
                        <Text style={styles.cellText}>{cs}</Text>
                        <Text style={styles.cellText}>{teenger}</Text>
                        <Text style={styles.cellText}>{children}</Text>
                    </View>

                </View> :
                    <View style={styles.cardRow}>
                            <Text style={styles.catHeaderTextBold}>{categoryName} Total </Text>
                            <Text style={styles.cellText}>{catTotal}</Text>

                    </View>
            }

            {/* FlatList */}
            <FlatList
                data={saints}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>

                        <View style={styles.row}>
                            <Text style={styles.label}>Name</Text>
                            <Text style={styles.value}>{item.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <Text style={styles.value}>{item.mobile}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>District</Text>
                            <Text style={styles.value}>{item.district}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Category</Text>
                            <Text style={styles.value}>{item.saintType}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Classification</Text>
                            <Text style={styles.value}>
                                {item.classificationName === 'null' ? '--' : item.classificationName}
                            </Text>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity>
                                <Icon name="edit" style={styles.editIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign name="delete" style={styles.deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                )}
                ListEmptyComponent={
                    isLoading ? (
                        <View style={styles.center}>
                            <ActivityIndicator size="large" color="purple" />
                            <Text style={styles.loadText}>Data loading please wait...</Text>
                        </View>
                    ) : null
                }
            />

        </View>
    );
};

export default ViewSaints;