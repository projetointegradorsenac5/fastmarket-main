export const LastPurchase = ({ purchase }) => {
    return (
        <View>
            <Text>Última Compra</Text>
            <View>
                {purchase.items.map((item, index) => {
                    return (
                        <View key={index}>
                            <Text>{item.product.description}</Text>
                            <Text>{item.product.unit_price}</Text>
                            <Text>{item.qtt}</Text>
                        </View>
                    )
                })}
            </View>
            <Text>{purchase.total}</Text>
        </View>
    )
}