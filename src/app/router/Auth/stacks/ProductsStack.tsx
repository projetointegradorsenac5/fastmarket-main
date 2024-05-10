import React from "react";
import CartProductsPartial from "../../../pages/cart-products-partial";
import Products from "../../../pages/products";
import { Stack } from "../.."; 
import Payment from "../../../pages/payment";

export default function ProductStack() {
    return (
        <Stack.Navigator
            initialRouteName="Ìr as compras"
        >
            <Stack.Screen
                name="Ìr as compras"
                component={Products}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{
                    headerTitle: 'Pagamento'
                }}
            />
            <Stack.Screen
                name="CartProductsPartial"
                component={CartProductsPartial}
                options={{
                    headerTitle: "Checagem de Produtos"
                }}
            />
        </Stack.Navigator>
    )
};