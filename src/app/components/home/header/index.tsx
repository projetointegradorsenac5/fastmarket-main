import { Image, View } from "react-native";
import { ViewContainer } from "../../../styled-components/view";
import useDeviceTheme from "../../../theme/use-theme";
import { ParagraphSemibold } from "../../../styled-components/text";

export default function Header() {
    const { theme } = useDeviceTheme();

    return (
        <ViewContainer
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderTopColor: theme.borderColor,
                borderTopWidth: 0.53,
            }}
        >
            <Image
                className={``}
                source={require('../../../../../assets/Fast_market_logo.png')}
                style={{ width: 70, height: 70 }}
            />
            <View className='p-2 justify-center'>
                <ParagraphSemibold>{"Olá ${user.name}!"}</ParagraphSemibold>
            </View>
        </ViewContainer>
    );
}