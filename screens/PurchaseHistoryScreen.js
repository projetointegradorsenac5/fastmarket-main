import { useEffect, useState } from "react";
import { purchaseService } from "../services/PurchaseService";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LoadingIndicator } from "../components";

export const Purchase = ({ purchase }) => {
    const date = new Date(purchase.date.seconds).toString();

    return (
        <View style={styles.purchaseContainer}>
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
            <Text>total: {purchase.total}</Text>
            <Text>data: {date}</Text>
        </View>
    )
}

export const PurchaseHistory = ({ purchases }) => {
    return (
        <>
            <FlatList
                data={purchases}
                renderItem={({ item }) => <Purchase purchase={item} />}
            />
        </>
    );
}

export const PurchaseHistoryScreen = () => {
    const [purchases, setPurchases] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        purchaseService.getAll()
            .then(purchases => {
                setPurchases(purchases);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <SafeAreaView style={{}}>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <>
                    {purchases && purchases.length >= 1 ? (
                        <PurchaseHistory purchases={purchases} />
                    ) : (
                        <Text>Sem compras anteriores</Text>
                    )}
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    purchaseContainer: {
        borderWidth: 1,
        margin: 4,
    },
})