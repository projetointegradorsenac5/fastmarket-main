import { Dimensions, View } from "react-native";
import { CallToAction, CallToActionMD, CallToActionText } from "../../../styled-components/buttons";
import { ParagraphBold, ParagraphSemibold, Title } from "../../../styled-components/text";
import React, { useCallback, useState } from "react";
import { ViewContainer, ViewContainerSecondary } from "../../../styled-components/view";
import colors from "tailwindcss/colors";

import Scanner from "../../../components/scanner/scanner";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../../global-styles";
import useDeviceTheme from "../../../theme/use-theme";
import { useFocusEffect } from "@react-navigation/native";
import { DataSnapshot, child, get, ref, set } from "firebase/database";
import { rt_db } from "../../../../../firebaseConfig";
import { OpenedPurchase } from "../../../pages/cart-products-partial";
import { Alert } from "react-native";

type ProductPartials = {
    id: number,
    quantity: number
}

export default function PurchaseRelease() {
    const [products, setProducts] = useState<any[]>([]);
    const [scannerActive, setScannerActive] = useState(false);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [showOnlyQrCode, setShowOnlyQrCode] = useState(false);
    const { theme } = useDeviceTheme();
    const width = Dimensions.get("window").width;

    const onCodeScanned = (type: string, data: string) => {
        if (type != '256' || !data) return;

        if (data) {
            setUserId(data);
            const openedPurchaseFromUserRef = 'openedPurchases/' + userId;
            const dbRef = ref(rt_db);
            get(child(dbRef, openedPurchaseFromUserRef))
                .then((snapshot: DataSnapshot) => {
                    if (snapshot.exists()) {
                        const data: OpenedPurchase = snapshot.val();

                        console.log(data.cart)
                        setProducts(data.cart);

                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }
    }

    const setIsReadyToPay = () => {
        const dbRef = ref(rt_db);
        const openedPurchaseFromUserRef = ref(rt_db, `openedPurchases/${userId}`);
        get(child(dbRef, `openedPurchases/${userId}`))
            .then((snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const data: OpenedPurchase = snapshot.val();
                    data.isReadyToPay = true;

                    set(openedPurchaseFromUserRef, data)
                        .then(() => {
                            return Alert.alert("Preparado para o pagamento");
                        }).catch(() => {
                            return Alert.alert("Falha ao comfirmar compra");
                        });

                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    const clearBarcodeData = () => {
        setProducts([]);
    }

    const [qrCodeData, setQrCodeData] = useState<string>()

    function handleSetQuantity(index: number, quantity: string | number) {
        const textValue = String(quantity);

        var isValid = /^(?:0*\d{1,5})(?:\.\d{0,6}0*)?$|^(?:0*\.)(?:\d{1,2}0*)$/.test(textValue)

        setProducts((prevState) => {
            const updatedProducts = [...prevState];
            updatedProducts[index].quantity = isValid ? textValue : '';
            return updatedProducts;
        });
    }

    function handleSetEditable(index: number) {
        const updatedProducts = [...products];
        updatedProducts[index].editable = !updatedProducts[index].editable;

        setProducts(updatedProducts);
        updatedProducts.forEach((product) => console.log(product.editable))
    }

    useFocusEffect(
        useCallback(() => {
            if (products.length == 0) {
                setScannerActive(true)
            }
            return () => {
                setScannerActive(false);
            };
        }, [products])
    );

    return (
        <>
            {!showOnlyQrCode ? (
                <>
                    <Title style={{ textAlign: "center" }}>Conferir Compra</Title>
                    {scannerActive && (
                        <>
                            <Scanner
                                onCodeScanned={onCodeScanned}
                                clearBarcodeData={clearBarcodeData}
                                BarCodeScannerContainerStyle={{ ...globalStyles.BarCodeScannerContainerStyle }}
                                BarCodeScannerReScanButtonStyle={{ ...globalStyles.BarCodeScannerReScanButtonStyle }}
                            />
                        </>
                    )}

                    {products.length >= 1 && (
                        products.map((product, index) => (
                            <View key={index + Math.random()}>
                                <ViewContainerSecondary>
                                    <View style={{
                                        padding: 8,
                                        borderWidth: 1,
                                        borderColor: theme.borderColor,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                        }}>
                                            <ParagraphBold style={{
                                                backgroundColor: colors.red[500],
                                                color: theme.callToActionTextColor,
                                                paddingHorizontal: 8,
                                                borderRadius: 3,
                                            }}>
                                                {product?.quantity || '0'}
                                            </ParagraphBold>
                                        </View>
                                        <ParagraphSemibold style={{
                                            paddingVertical: 4,
                                        }}>
                                            {product?.description}
                                        </ParagraphSemibold>
                                        {product?.description && product.description.split(' ').includes('KG') && (
                                            <View
                                                style={{
                                                }}>
                                                <ParagraphBold style={{
                                                    paddingTop: 10,
                                                    borderTopColor: 'gray',
                                                    borderTopWidth: 1,
                                                    borderStyle: 'dashed'
                                                }}>{'Peso em KG'.toUpperCase()}</ParagraphBold>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        borderWidth: 1,
                                                        borderColor: theme.borderColor,
                                                    }}>
                                                    <TextInput
                                                        style={{ backgroundColor: 'white', width: '60%' }}
                                                        textAlign='center'
                                                        keyboardType="decimal-pad"
                                                        onChangeText={(quantity) => handleSetQuantity(index, quantity)}
                                                        value={products[index].quantity.toString() || product?.quantity.toString()}
                                                        editable={products[index].editable}
                                                    // accessible={products[index].editable}
                                                    />

                                                    <CallToAction
                                                        style={{ width: '40%' }}
                                                        onPress={() => {
                                                            handleSetEditable(index)
                                                        }}
                                                    >
                                                        <CallToActionText>
                                                            {(products[index].editable ? 'Confirmar' : 'editar').toUpperCase()}
                                                        </CallToActionText>
                                                    </CallToAction>
                                                </View>
                                            </View>
                                        )}
                                        <ParagraphBold
                                            style={{
                                                color: colors.green[600]
                                            }}
                                        >
                                            {`Total: ${product?.unit_price} * ${parseFloat(products[index].quantity)} = ${(product?.unit_price * parseFloat(products[index].quantity)).toFixed(2)} `}
                                        </ParagraphBold>
                                    </View>
                                </ViewContainerSecondary>
                                {index === products.length - 1 && (
                                    <CallToActionMD
                                        style={{
                                            marginVertical: 10,
                                        }}
                                        onPress={() => {
                                            setShowOnlyQrCode(true);
                                            setIsReadyToPay()
                                        }}
                                    >
                                        <CallToActionText>
                                            {'liberar pagamento'.toUpperCase()}
                                        </CallToActionText>
                                    </CallToActionMD>
                                )}
                            </ View>))
                    )}
                </>
            ) : (
                <>
                    <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden, styles.container]}>
                        {/* <Title style={{ paddingBottom: 8 }}>Efetue o Pagamento</Title>
                        <View style={
                            [styles.containerQr,
                            {
                                borderColor: theme.borderColor
                            }
                            ]}
                        >
                             <QRCode
                                value={qrCodeData ? qrCodeData : 'NA'}
                                size={width - 50}
                                color="black"
                                backgroundColor="white"
                                logoSize={20}
                                logoMargin={2}
                                logoBorderRadius={15}
                                logoBackgroundColor="yellow"
                            />
                        </View>
                    */}
                        <CallToActionMD
                            style={{ marginTop: 10 }}
                            onPress={() => {
                                setScannerActive(!scannerActive);
                                setProducts([]);
                                setShowOnlyQrCode(false);
                            }}
                        >
                            <CallToActionText>
                                {'Proxima Compra'.toUpperCase()}
                            </CallToActionText>
                        </CallToActionMD>
                    </ViewContainer>
                </>
            )
            }
        </>
    );
}

const styles = StyleSheet.create({
    containerQr: {
        justifyContent: 'center',
        padding: 8,
        borderWidth: .3,
        backgroundColor: 'white',
    },
    container: {
        alignItems: 'center',
        marginTop: 8,
    },
});