import { View, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Home() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <Button title="expenseApplication" />
            <Button title="Receipt Capture" onPress={()=> router.push("/receipt_capture")} />
        </View>
    )
};

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

