import { CallToActionMD, CallToActionText } from "../../styled-components/buttons";

import { useNavigation } from "@react-navigation/native";

type NavigationButtonProps = {
    RouteName: string
    buttonText: string
    RouteParams?: any
}

export default function NavigationButton({ RouteName, RouteParams, buttonText }: NavigationButtonProps) {
    const navigation = useNavigation()
    return (
        <>
            <CallToActionMD
                onPress={() => {
                    navigation.navigate(RouteName, RouteParams || {})
                }}
            >
                <CallToActionText>{buttonText}</CallToActionText>
            </CallToActionMD>
        </>
    )
}