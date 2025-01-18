import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: "freee Expense Submitter"
      }}/>
      <Stack.Screen name="receipt_capture" options={{
        headerTitle: "Receipt Capture"
      }}/>
    </Stack>
  )
}
