import React, { useEffect, useState } from "react";
import { purchaseService } from "../services/PurchaseService";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LoadingIndicator } from "../components";

export const Purchase = ({ purchase }) => {
    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(date.seconds * 1000).toLocaleDateString('pt-BR', options);
    };

    const formattedDate = formatDate(purchase.date);

    return (
        <View style={styles.purchaseContainer}>
            <Text style={styles.sectionTitle}>Itens:</Text>
            <View style={styles.itemsContainer}>
                {purchase.items.map((item, index) => {
                    return (
                        <View style={styles.itemContainer} key={index}>
                            <Text style={styles.itemDescription}>{item.product.description}</Text>
                            <Text style={styles.itemPrice}>Preço: R$ {item.product.unit_price}</Text>
                            <Text style={styles.itemQuantity}>Quantidade: {item.qtt}</Text>
                        </View>
                    )
                })}
            </View>
            <Text style={styles.total}>Total: R$ {purchase.total}</Text>
            <Text style={styles.date}>Data: {formattedDate}</Text>
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
        <SafeAreaView style={styles.container}>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <>
                    {purchases && purchases.length >= 1 ? (
                        <PurchaseHistory purchases={purchases} />
                    ) : (
                        <Text style={styles.noPurchasesText}>Sem compras anteriores</Text>
                    )}
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3', // cor de fundo
    },
    purchaseContainer: {
        borderWidth: 1,
        borderColor: '#ccc', // cor da borda
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#fff', // cor do fundo do contêiner
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // cor do texto (destaque)
    },
    itemsContainer: {
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 16,
        color: '#333', // cor do texto (destaque)
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666', // cor do texto (destaque)
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666', // cor do texto
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333', // cor do texto (destaque)
    },
    date: {
        fontSize: 14,
        color: '#999', // cor do texto
    },
    noPurchasesText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#999', // cor do texto (destaque)
    }
});
