import { Link } from "expo-router";
import { Text, View , StyleSheet, Button } from "react-native";
import { useState } from 'react';
import { authConfig } from "../config/env";
import * as AuthSession from 'expo-auth-session';

export default function Index() {
  const [authData, setAuthData] = useState<any>(null);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: authConfig.clientId,
      redirectUri: authConfig.redirectUrl,
      scopes: ['read', 'write'],
    },
    {
      authorizationEndpoint: authConfig.discovery.authorizationEndpoint,
      tokenEndpoint: authConfig.discovery.tokenEndpoint
    }
  );

  return (
    <View style={styles.container}>
      <Button title="Login with freee" onPress={() => promptAsync()} />
      <Link href={"/receipt_capture"} style={styles.button}>
        Photo capture a receipt.
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
