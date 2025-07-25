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

});