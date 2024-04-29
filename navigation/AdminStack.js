import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View } from "react-native";
import { auth } from "../config";
import { signOut } from "firebase/auth";
import Scanner from "../components/scanner";
import { globalStyles } from '../globalStyles';
import { purchaseService } from "../services/PurchaseService";

const Stack = createStackNavigator();

const AdminScreen = () => {
    const handleLogout = () => {
        signOut(auth).catch((error) => console.log("Error logging out: ", error));
    };

    const onCodeScanned = () => { }
    const clearBarcodeData = () => { }

    return (
        <View>
            <Text>AdminScreen</Text>
            <Button title="log out" onPress={handleLogout}></Button>
            <Scanner
                onCodeScanned={onCodeScanned}
                clearBarcodeData={clearBarcodeData}
                BarCodeScannerContainerStyle={{ ...globalStyles.BarCodeScannerContainerStyle }}
                BarCodeScannerReScanButtonStyle={{ ...globalStyles.BarCodeScannerReScanButtonStyle }}
            />
        </View>
    );
};

export const AdminStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={AdminScreen} />
        </Stack.Navigator>
    );
};
