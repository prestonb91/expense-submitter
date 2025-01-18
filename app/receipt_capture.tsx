import { Text, View , StyleSheet, Button, Image, Alert} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

export default function ReceiptCapture() {

  const [photo, setPhoto] = useState<any>(null);
  const [galleryPhoto, setGalleryPhoto] = useState<any>(null);

  // Open the camera.
  const takePhoto = () => {
    ImagePicker.launchCamera({
      mediaType: 'photo'
    },
    response => {
      if (response.assets) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  // Open image gallery.
  // const openGallery = useCallback(() => {

  //   const options = {
  //     selectionLimit: 1, 
  //     mediaType: 'photo',
  //     includeBase64: true,
  //   }

  //   ImagePicker.launchImageLibrary(options, res => {
  //     if(res.didCancel) {
  //       console.log('User cancelled')
  //     } else if(resizeBy.errorCode) {
  //       console.log('ImagePickerError: ', resizeBy.errorMessage)
  //     } else {
  //       setGalleryPhoto(res);
  //       sendImageToAPI(resizeBy.assets[0].base64, resizeBy.assets[0].type)
  //     }
  //   })
  // }, [])

  // Parse data from receipt.
  // ADD CODE

  // Upload selected receipt to freee会計 with parsed data.
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

  // TODO: Add parsed data from receipt into input to send to freee会計.
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Capture screen</Text>
      {photo && <Image source={{ uri : photo}} style={{ width: 200, height: 200}} />}
      <Button title="Take Receipt Photo" onPress={takePhoto} />
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
});
