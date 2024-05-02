import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Button, View, Text, ScrollView } from "react-native";
import { purchaseService } from "../services/PurchaseService"
import { LoadingIndicator } from "../components";
import { LastPurchase } from "../components/last-purchase";
import Header from "../components/header";
import Destaque from "../components/emphasis";

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
      <ScrollView>
        <Header />
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
        <Destaque />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});