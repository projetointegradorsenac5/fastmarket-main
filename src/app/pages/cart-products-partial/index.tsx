import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { CartItem } from "../../store/cart/initialState";
import QRCode from 'react-native-qrcode-svg';
import { ParagraphBold, ParagraphSemibold, Title } from "../../styled-components/text";
import { ViewContainer } from '../../styled-components/view';
import { globalStyles } from '../../global-styles';
import { useAppSelector } from "../../store/hooks/useAppSelector";
import useDeviceTheme from "../../theme/use-theme";
import { CallToActionMD, CallToActionText } from '../../styled-components/buttons';
import { off, onValue, ref, set } from 'firebase/database';
import { auth, rt_db } from '../../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { BasePage } from '../base-page';
import React from 'react';

export type OpenedPurchase = {
    cart: CartItem[];
    isReadyToPay: boolean;
    total: number;
}

export default function CartProductsPartial() {
    const { cartProducts, cartSum } = useAppSelector(store => store.cart);
    const { theme } = useDeviceTheme();
    const navigation = useNavigation()

    const [confirmedCart, setConfirmedCart] = useState<boolean>(false);
    const userId = auth.currentUser?.uid;

    const myOpenedPurchaseRef = ref(rt_db, 'openedPurchases/' + userId);

    const confirmMyCartItems = () => {
        const data = {
            cart: cartProducts,
            total: cartSum,
            isReadyToPay: false,
        }

        set(myOpenedPurchaseRef, data)
            .then(() => {
                setConfirmedCart(true);
            }).catch(() => { });
    }

    const listenToMyCartValidation = () => {
        onValue(myOpenedPurchaseRef, (snapshot) => {
            const data: OpenedPurchase = snapshot.val();
            if (!data.isReadyToPay) return;

            navigation.navigate("Payment", data);
        });
    }

    const closeListenToMyCartValidation = () => {
        off(myOpenedPurchaseRef);
    }

    useEffect(() => {
        if (confirmedCart) {
            listenToMyCartValidation();
        }

        return () => closeListenToMyCartValidation();
    }, [confirmedCart]);

    return (
        <BasePage children={
            <>
                <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden, styles.container]}>
                    <View className='my-2'>
                        <Title style={{ marginBottom: 8 }}>Siga para a Área de Finalização</Title>
                        <ParagraphSemibold>1 - Comfirme o seu carrinho</ParagraphSemibold>
                        <ParagraphSemibold>2 - Apresente o QR code ao verificador</ParagraphSemibold>
                    </View>
                    <View className='my-2' style={
                        [styles.containerQr,
                        {
                            borderColor: theme.borderColor
                        }
                        ]}
                    >
                        {userId && (
                            <QRCode
                                value={userId ? userId : 'NA'}
                                size={200}
                                color="black"
                                backgroundColor="white"
                                logoSize={20}
                                logoMargin={2}
                                logoBorderRadius={15}
                                logoBackgroundColor="yellow"
                            />
                        )}
                    </View>
                </ViewContainer>

                <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden, { alignItems: 'center' }]}>
                    {!confirmedCart ? (
                        <CallToActionMD onPress={confirmMyCartItems}>
                            <CallToActionText>
                                Confirmar meu carrinho
                            </CallToActionText>
                        </CallToActionMD>
                    ) : (
                        <View className='gap-2'>
                            <ParagraphBold>Aguarde a verificação de produtos</ParagraphBold>
                            <ActivityIndicator color={theme.callToActionBackground} size={'large'} />
                        </View>
                    )}
                </ViewContainer>
            </>
        }
        />
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
        marginTop: 8,
        alignItems: 'center',
    },
});