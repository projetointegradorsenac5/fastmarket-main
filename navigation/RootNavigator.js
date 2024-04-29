import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { AuthenticatedUserContext } from "../providers";
import { LoadingIndicator } from "../components";
import { auth } from "../config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { AdminStack } from "./AdminStack";

export const RootNavigator = ({ navigation }) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userSnapshot = await getDoc(userRef)
          const user = userSnapshot.data()
          authenticatedUser.role = user.role;
        }
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      {user && user.role === "admin" ? <AdminStack /> : (user ? <AppStack /> : <AuthStack />)}
    </NavigationContainer>
  );
};