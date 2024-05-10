import { CallToAction, CallToActionText } from "../../../styled-components/buttons";
import { ParagraphSemibold, Title } from "../../../styled-components/text";
import { Text, TouchableOpacity, View } from "react-native";
import { ViewContainer, ViewContainerSecondary } from "../../../styled-components/view";

import { FontAwesome5 } from '@expo/vector-icons';
import { Loading } from "../../loading";
import { Purchase } from "../purchase";
import { loadLastPurchaseAsync } from "../../../store/purchase/thunks";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import useDeviceTheme from "../../../theme/use-theme";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

interface ErrorIndicatorProps {
    onReload: () => void;
    errorText: string
}

const ErrorIndicator = ({ onReload, errorText }: ErrorIndicatorProps) => {
    return (
        <View className="flex items-center p-2">
            <Text className="font-semibold text-center text-[14px]">{errorText}</Text>
            <TouchableOpacity onPress={onReload} className="p-2 rounded-md bg-red-400 mt-3">
                <Text style={{ color: '#fff', fontSize: 16 }}>Recarregar</Text>
            </TouchableOpacity>
        </View>
    );
}

export function LastPurchase() {
    const { loading, lastPurchase } = useAppSelector((store) => store.purchase)
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { theme } = useDeviceTheme()

    useEffect(() => {
        try {
            dispatch(loadLastPurchaseAsync());
            console.log(lastPurchase)
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    {
                        lastPurchase.createdAt ? (
                            <Purchase
                                title={<Title>Compra Anterior</Title>}
                                data={lastPurchase}
                                date={lastPurchase.createdAt}
                                cta={
                                    <CallToAction onPress={() => {
                                        navigation.navigate('PurchaseHystory')
                                    }}>
                                        <CallToActionText>Histórico</CallToActionText>
                                    </CallToAction>
                                }
                            />
                        ) : (
                            <>
                                {/* <ErrorIndicator
                                    onReload={() => dispatch(loadLastPurchaseAsync())}
                                    errorText={"Ocorreu um erro ao carregar a sua última compra."}
                                /> */}
                                <ViewContainer>
                                    <Title>Minhas Compras</Title>
                                    <ViewContainerSecondary style={{ marginTop: 6 }}>
                                        <View className="flex items-center justify-center gap-2 p-2">
                                            <ParagraphSemibold>Suas compras aparecem aqui!</ParagraphSemibold>
                                            <FontAwesome5 name="smile" size={24} color={theme.color} />
                                        </View>
                                    </ViewContainerSecondary>
                                </ViewContainer>
                            </>
                        )}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};