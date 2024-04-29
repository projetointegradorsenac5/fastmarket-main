import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Button, View, Text } from "react-native";
import { purchaseService } from "../services/PurchaseService"
import { LoadingIndicator } from "../components";
import { LastPurchase } from "../components/last-purchase";

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