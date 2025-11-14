import { FlatList, StyleSheet, Text, View } from "react-native";

const UpdateAttendance = () => {

    const data = [
        { id: 1, name: "Ramu", age: 28, city: "Hyd" },
        { id: 2, name: "John", age: 30, city: "Delhi" },
        { id: 3, name: "Akhil", age: 25, city: "Chennai" },
        { id: 4, name: "Akhil", age: 25, city: "Chennai" },
    ];

    return (
        <View style={[styles.container]}>

            <View style={[styles.row, styles.header]}>
                <Text style={styles.headerText}>Sno</Text>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Attendance</Text>
            </View>

            {/* Rows */}
            {
                data.map((item) => (
                    <View key={item.id} style={styles.row}>
                        <Text style={styles.cell}>{item.id}</Text>
                        <Text style={styles.cell}>{item.name}</Text>

                        <Text style={styles.cell}>{item.city}</Text>
                    </View>
                ))
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
        paddingLeft: 10
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10

    }
});

export default UpdateAttendance;