import { Link } from "expo-router";
import { Text, View , StyleSheet, Button } from "react-native";
import { useState } from 'react';
import { authConfig } from "../config/env";
import * as AuthSession from 'expo-auth-session';

export default function Index() {
  const [authData, setAuthData] = useState<any>(null);

// freee login
// TODO: Update based on below documentation
// https://docs.expo.dev/versions/latest/sdk/auth-session/
const loginWithFreee = async () => {
  try {
    
    const authUrl = `https://accounts.secure.freee.co.jp/public_api/authorize?client_id=${authConfig.clientId}&redirect_uri=${encodeURIComponent(authConfig.redirectUrl)}&response_type=token&scope=read write`;

    const result = await AuthSession.promptAsync({ authUrl });
    
    if (result.type === 'success') {
      console.log("Auth Data: ", result.params);
      setAuthData(result.params);
    }
    
  } catch (err) {
    console.error("Login error:", err);
  }
}

  return (
    <View style={styles.container}>
      <Button title="Login with freee" onPress={loginWithFreee} />
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
