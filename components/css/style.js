import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({

    scrollContainer: {
        paddingVertical: 10,
    },
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    boxDecoration: {
        width: wp('90%'),
        padding: 30,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hometext: {
        fontSize: 18,
        marginLeft: 10,
        color: 'blue'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 10,
    },

    card: {
        width: wp('94%'),
        padding: 8,
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        margin: 10
    },

    row: {
        flexDirection: 'row',
        padding: 8,
    },
    label: {
        flex: 1.5,
        fontSize: 14,
        color: 'black',
    },
    value: {
        flex: 1,
        fontSize: 14,
        color: 'black',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 25,
        justifyContent: 'flex-end',
        marginRight: 30,
        marginBottom: 10,
        marginTop: 20
    },
    editIcon: {
        color: 'blue',
        fontSize: 25,
    },
    deleteIcon: {
        color: 'red',
        fontSize: 25
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%'
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        margin: 8,
        width: '48%',
        gap: 15,

    },
    dropdown: {
        // flex: 2,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        minHeight: 50,
        elevation: 10,
        zIndex: 1000,
    },

    loadText: {
        marginTop: 20,
    },

    categoryCard: {
        width: wp('94%'),
        padding: 8,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 12
    },

    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
        gap: 10
    },

    headerText: {
        width: wp('12%'),
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        fontFamily: 'Inter-Medium',
        textAlign: 'center'
    },
    headerTextBold: {
        width: wp('12%'),
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Inter-Medium',
        textAlign: 'center'
    },
    catHeaderTextBold: {
        width: wp('45%'),
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Inter-Medium',
        marginLeft: 10
        // marginHorizontal: 6
        // textAlign: 'center'
    },
    cellText: {
        width: wp('12%'),
        fontSize: 14,
        fontWeight: 'bold',
        color: 'blue',
        fontFamily: 'Inter-Medium',
        textAlign: 'center'
    },
    catText: {
        // width: wp('12%'),
        fontSize: 14,
        fontWeight: 'bold',
        color: 'blue',
        fontFamily: 'Inter-Medium',
        textAlign: 'center'
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10,
    },
    cardRowLeft: {
        flexDirection: 'row',
    },

    // Add Saint CSS
    formCard: {
        padding: 8,
        margin: 5
    },
    textLbl: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 5
    },

    dobLbl: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 5,
        marginTop: 10
    },

    textInput: {
        width: 'auto',
        height: 50,
        backgroundColor: 'white',
        elevation: 1,
        marginTop: 8,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    maleButton: {
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 8,
    },
    femaleButton: {
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 8,
    },
    radioLbl: {
        marginTop: 10,
        marginLeft: 15,
        fontSize: 14
    },
    selectedButton: {
        backgroundColor: 'green', // Color when selected
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        height: 50,
        backgroundColor: 'white',
        elevation: 1,
        borderRadius: 10,
        marginTop: 10,

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
    districtDropdown: {
        borderColor: '#ccc',
        borderWidth: 0,
        borderRadius: 6,
        minHeight: 50,
        elevation: 1,
        marginTop: 10,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    saveBtn: {
        width: '30%',
        backgroundColor: 'purple',
        paddingVertical: 6,
        borderRadius: 8,
    },
    backBtn: {
        width: '30%',
        backgroundColor: 'grey',
        paddingVertical: 6,
        borderRadius: 8,
    },
    saveBtnText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 8

    },
    backBtnText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 8

    },
    star: {
        color: 'red',
        fontSize: 18
    },
    toast: {
        backgroundColor: 'black'
    },
    bottomBarContainer: {
        // eslint-disable-next-line no-undef
        paddingBottom: Platform.OS === 'android' ? 10 : 30,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 10,
    },

});