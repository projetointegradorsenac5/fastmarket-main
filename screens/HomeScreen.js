import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Button, View, Text } from "react-native";
import { purchaseService } from "../services/PurchaseService"
import { LoadingIndicator } from "../components";

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

export const HomeScreen = ({ navigation }) => {
  const [lastPurchase, setLastPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    purchaseService.getLast()
      .then(lastPurchase => {
        setLastPurchase(lastPurchase);
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
          {lastPurchase ? (
            <LastPurchase purchase={lastPurchase} />
          ) : (
            <Text>Sem compras anteriores</Text>
          )}
        </>
      )}

      <Button title="Go To Purchase History" onPress={() => navigation.navigate("PurchaseHistory")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});