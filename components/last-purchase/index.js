import { Image, Text, View, Button, TouchableOpacity } from "react-native"
import { styles } from "./style"
import { useNavigation } from "@react-navigation/native"

export const LastPurchase = ({ purchase }) => {
    const navigation = useNavigation()
    return (
<View style={styles.container}>
            <Text>Última Compra</Text>
            <View style={styles.filho}>
                {purchase.items.map((item, index) => {
                    return (
                        <View key={index}>
                            <Image width={100} height={100} source={{uri: item.product.imgUrl}}></Image>
                            <Text>{item.product.description}</Text>
                            <Text>{item.product.unit_price}</Text>
                            <Text>{item.qtt}</Text>
                        </View>
                    )
                })}
            </View>
            <Text>{purchase.total}</Text>
            <View>
  <TouchableOpacity
    style={[styles.button, { alignSelf: 'flex-end' }]} // Combine styles
    onPress={() => navigation.navigate("PurchaseHistory")}
  >
    <Text>Histórico</Text>
  </TouchableOpacity>
</View>
        </View>
    )
}

