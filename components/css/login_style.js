import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        height: hp('100%'),
        width: wp('100%'),
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff', // Optional
    },
    loginBox: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 10,
        padding: 10,
        // backgroundColor: '#e5e7e9',
        height: hp('100%')
        // borderRadius: 20
    },
    userlock: {
        textAlign: 'center',
        marginVertical: 50,
        fontSize: 90,
        color: 'green'
    },
    textlbl: {
        color: 'black',
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 5
    },
    pswlbl: {
        color: 'black',
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 5,
        marginTop: 15
    },
    input: {
        width: "auto",
        borderWidth: 0.8,
        borderRadius: 10,
        borderColor: 'grey',
        marginVertical: 10,
        height: hp('7%'),
        paddingLeft: 10
    },
    pswContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.8,
        borderColor: 'grey',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },

    inputpsw: {
        flex: 1,
        height: 40
    },

    icon: {
        padding: 15
    },

    loginButton: {
        marginVertical: 30,
        width: '100%',
        borderRadius: 5,
        borderWidth: 0,
        backgroundColor: 'green',
        alignItems: 'center',
        paddingVertical: 13
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    accountRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },

    accountText: {
        fontSize: 14,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    signupText: {
        fontWeight: 'bold',
        color: '#007BFF',
        fontSize: 14,
        textDecorationLine: 'underline',

    },
    error: {
        color: 'red',
        marginLeft: 5
    }
});