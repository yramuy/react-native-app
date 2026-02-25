import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";

function Dashboard() {
    return (
        <View style={{ flex: 1 }}>

            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Text style={{ fontSize: 16, color: 'blue', fontWeight: '500', margin: 10 }}>Area Wise Saints</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Total</DataTable.Title>
                        <DataTable.Title>AGP</DataTable.Title>
                        <DataTable.Title>GWK</DataTable.Title>
                        <DataTable.Title>AKP</DataTable.Title>
                        <DataTable.Title>CITY</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>163</DataTable.Cell>
                        <DataTable.Cell>50</DataTable.Cell>
                        <DataTable.Cell>47</DataTable.Cell>
                        <DataTable.Cell>26</DataTable.Cell>
                        <DataTable.Cell>40</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>

            <View style={{ alignItems: 'center' }} >
                <Text style={{ fontSize: 16, color: 'blue', fontWeight: '500', margin: 10 }}>Category Wise Saints</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Category</DataTable.Title>
                        <DataTable.Title>AGP</DataTable.Title>
                        <DataTable.Title>GWK</DataTable.Title>
                        <DataTable.Title>AKP</DataTable.Title>
                        <DataTable.Title>CITY</DataTable.Title>
                        <DataTable.Title>Total</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>Elders</DataTable.Cell>
                        <DataTable.Cell>50</DataTable.Cell>
                        <DataTable.Cell>47</DataTable.Cell>
                        <DataTable.Cell>26</DataTable.Cell>
                        <DataTable.Cell>40</DataTable.Cell>
                        <DataTable.Cell>160</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>

        </View>

    );
};

export default Dashboard;
