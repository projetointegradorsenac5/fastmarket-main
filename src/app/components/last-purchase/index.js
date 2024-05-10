import { Image, Text, View, Button, TouchableOpacity } from "react-native"
import { styles } from "./style"
import { useNavigation } from "@react-navigation/native"
import { Title } from "../../styled-components/text"

export const LastPurchase = ({ purchase }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Title style={{ paddingBottom: 12 }}>Última Compra</Title>
      <View style={styles.filho}>
        {purchase.items.map((item, index) => {
          return (
            <View key={index}>
              <Image width={50} height={80} source={{ uri: item.product.img_url }}></Image>
            </View>
          )
        })}
        {purchase.items.map((item, index) => {
          return (
            <View key={index}>
              <Image width={50} height={80} source={{ uri: item.product.img_url }}></Image>
            </View>
          )
        })}
        {purchase.items.map((item, index) => {
          return (
            <View key={index}>
              <Image width={50} height={80} source={{ uri: item.product.img_url }}></Image>
            </View>


          )
        })}
        {purchase.items.map((item, index) => {
          return (
            <View key={index}>
              <Image width={50} height={80} source={{ uri: item.product.img_url }}></Image>
            </View>


          )
        })}
        {purchase.items.map((item, index) => {
          return (
            <View key={index}>
              <Image width={50} height={80} source={{ uri: item.product.img_url }}></Image>
            </View>


          )
        })}
      </View>
      <View>

        <TouchableOpacity
          style={[styles.button, { alignSelf: 'flex-end' }]} // Combine styles
          onPress={() => navigation.navigate("PurchaseHystory")}
        >
          <Text>Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

