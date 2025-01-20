import { Link } from "expo-router";
import { Text, View , StyleSheet, Button} from "react-native";
// import { authConfig } from "../config/env";
import { authorize } from 'react-native-app-auth';

// FUTURE FEATURE
// const loginWithFreee = async () => {
//   try {
//     console.log("Auth config: ", authConfig)
//     const authState = await authorize(authConfig);
//     console.log("Auth State: ", authState)
//     return authState;
//   } catch (err) {
//     console.error("Login error:", err);
//   }
// }

export default function Index() {
  return (
    <View style={styles.container}>
      {/* <Button title="Login with freee" onPress={loginWithFreee} /> */}
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
