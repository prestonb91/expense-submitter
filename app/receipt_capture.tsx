import { Text, View , StyleSheet, Button, Image, Alert} from 'react-native';
import { useState } from 'react';
import { GOOGLE_CLOUD_VISION_API_KEY } from '@/config/secret';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ReceiptCapture() {

  const [photo, setPhoto] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState<any>(false);
  const [extractedText, setExtractedText] = useState<any>("");
  const [expenseFormData, setExpenseFormData] = useState<any>({
    
  })

  // Request camera permission.
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required.');
    } else {
      setHasPermission(status === 'granted');
    }
  };

  // Open the camera after asking for permission.
  const takePhoto = async () => {

    requestPermissions();

    if (hasPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        base64: true,
        aspect: [4, 3],
      });
  
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    };
  };

  // Open image gallery.
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      base64: true,
      aspect: [4, 3],
    });
    
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
  };

  // TODO: Creates unique image ID or blob with uuid and uses XHR to send request to Firebase storage to upload.  
  // https://jscrambler.com/blog/create-a-react-native-image-recognition-app-with-google-vision-api

  // Have google OCR analyze photo and store parsed data.
  const performOCR = async () => {

    if (!photo) {
      Alert.alert("No Image", "Please capture or select an image first.");
      return;
    }

    try {

      // Remove metadata from base64
      const base64Image = photo.toString().split(",")[1];

      const body = JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: { type: "TEXT_DETECTION" },
          },
        ],
      });

        // Send request to Google Vision API
        const visionURL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`;
        const res = await fetch(visionURL, {
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        const text = result.responses?.[0]?.fullTextAnnotation?.text || "No text found";

        setExtractedText(text);
        console.log("Extracted text", text);

      } catch (error) {
        console.error("OCR Error:", error);
        Alert.alert("OCR Error", "Failed to analyze receipt.");
      }
    }

    // FEATURE TBD: Upload selected receipt to freee会計.
  // const uploadReceipt = () => {
  //   if (!photo) return Alert.alert('Error', 'Please take a photo first')

  //   const formData = new FormData();
  //   formData.append('receipt', {
  //     uri: photo,
  //     type: 'image/jpeg',
  //     name: 'receipt.jpg',
  //   });

  //   try {
  //     Alert.alert('Upload Success', 'Photo Data');
  //   } catch (err) {
  //     Alert.alert('Upload Failed', 'Please try again.');
  //   }
  // }

  return (
    <View style={styles.container}>
      <Button title="Take Receipt Photo" onPress={takePhoto} />
      <Button title="Select Receipt from Gallery" onPress={openGallery} />
      {photo && <Image source={{ uri : photo}} style={{ width: 200, height: 200}} />}
      {/* Add button below that appears below selected photo to analyze by google OCR */}
      <Button title="Anaylze receipt" onPress={performOCR} />
      <Text style={{backgroundColor: "white"}}>{extractedText}</Text>

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
  }
})
