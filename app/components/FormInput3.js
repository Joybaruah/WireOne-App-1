import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { SelectStep1, SelectStep2 } from '../redux/formSlice';

const Form3 = ({ navigation, localData }) => {
  const step1 = useSelector(SelectStep1);
  const step2 = useSelector(SelectStep2);

  useEffect(() => {
    createChannels();
  }, []);

  useEffect(() => {
    if (!localData) return;

    setImage1(localData ? localData.images.image1 : null);
    setImage2(localData ? localData.images.image2 : null);
    setImage3(localData ? localData.images.image3 : null);
    setImage4(localData ? localData.images.image4 : null);
    setImage5(localData ? localData.images.image5 : null);
    setImage6(localData ? localData.images.image6 : null);
    setImage7(localData ? localData.images.image7 : null);
    setImage8(localData ? localData.images.image8 : null);
  }, [localData]);

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [image5, setImage5] = useState();
  const [image6, setImage6] = useState();
  const [image7, setImage7] = useState();
  const [image8, setImage8] = useState();

  const form3 = [
    {
      label: '10th Certificate',
      uri: image1,
      key: 'image1',
    },
    {
      label: '12th Certificate',
      uri: image2,
      key: 'image2',
    },
    {
      label: 'Bachelor Certificate',
      uri: image3,
      key: 'image3',
    },
    {
      label: 'Paslips- Previous Company (3 Months)',
      uri: image4,
      key: 'image4',
    },
    {
      label: 'Any other qualification?',
      uri: image5,
      key: 'image5',
    },
    {
      label: 'Reliving Letter- Previous Company',
      uri: image6,
      key: 'image6',
    },
    {
      label: 'PAN CARD',
      uri: image7,
      key: 'image7',
    },
    {
      label: 'AADHAR CARD',
      uri: image8,
      key: 'image8',
    },
  ];

  const uploadImage = (uri) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    // eslint-disable-next-line default-case
    switch (uri) {
      case 'image1':
        launchImageLibrary(options, (response) => {
          setImage1(response.assets[0].uri);
        });
        break;
      case 'image2':
        launchImageLibrary(options, (response) => {
          setImage2(response.assets[0].uri);
        });
        break;
      case 'image3':
        launchImageLibrary(options, (response) => {
          setImage3(response.assets[0].uri);
        });
        break;
      case 'image4':
        launchImageLibrary(options, (response) => {
          setImage4(response.assets[0].uri);
        });
        break;
      case 'image5':
        launchImageLibrary(options, (response) => {
          setImage5(response.assets[0].uri);
        });
        break;
      case 'image6':
        launchImageLibrary(options, (response) => {
          setImage6(response.assets[0].uri);
        });
        break;
      case 'image7':
        launchImageLibrary(options, (response) => {
          setImage7(response.assets[0].uri);
        });
        break;
      case 'image8':
        launchImageLibrary(options, (response) => {
          setImage8(response.assets[0].uri);
        });
        break;
    }
  };

  const removeImage = (uri) => {
    // eslint-disable-next-line default-case
    switch (uri) {
      case 'image1':
        setImage1(null);
        break;
      case 'image2':
        setImage2(null);
        break;
      case 'image3':
        setImage3(null);
        break;
      case 'image4':
        setImage4(null);
        break;
      case 'image5':
        setImage5(null);
        break;
      case 'image6':
        setImage6(null);
        break;
      case 'image7':
        setImage7(null);
        break;
      case 'image8':
        setImage8(null);
        break;
    }
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'form-submit',
      channelName: 'Form submit',
    });
  };

  const submitForm = async () => {
    if (
      !image1
      || !image2
      || !image3
      || !image4
      || !image5
      || !image6
      || !image7
      || !image8
    ) {
      Alert.alert('Error', 'Upload all the Required Images!', [
        // eslint-disable-next-line no-console
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      try {
        const jsonValue = JSON.stringify({
          step1,
          step2,
          images: {
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
            image7,
            image8,
          },
        });
        await AsyncStorage.setItem('formData', jsonValue);
      } catch (e) {
        // saving error
      }

      PushNotification.localNotification({
        channelId: 'form-submit',
        title: 'Submitted',
        message: 'You have submited the Form',
      });

      navigation.navigate('form1');
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bank Details</Text>
      </View>
      <FlatList
        data={form3}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text style={styles.label}>{item.label}</Text>

            {item.uri ? (
              <View style={{ borderWidth: 0.5, marginVertical: 5 }}>
                <Image source={{ uri: item.uri }} style={{ height: 50 }} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button2}
                onPress={() => uploadImage(item.key)}
              >
                <Text style={styles.buttonText2}>ADD FILE</Text>
              </TouchableOpacity>
            )}

            {item.uri ? (
              <TouchableOpacity
                style={styles.button2}
                onPress={() => removeImage(item.key)}
              >
                <Text style={[styles.buttonText2, { color: 'red' }]}>
                  REMOVE
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      />

      <TouchableOpacity
        onPress={submitForm}
        title="Submit"
        style={styles.button}
      >
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginHorizontal: 15,
  },
  input: {
    borderBottomWidth: 0.5,
    marginTop: 10,
    fontSize: 15,
    paddingVertical: 2,
    color: '#000',
  },
  label: {
    color: '#000',
    fontSize: 18,
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 0.2,
  },
  headerBox: {
    backgroundColor: '#fff',
    marginVertical: 0,
    borderWidth: 0.2,
    padding: 15,
  },
  headerText: {
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#A66CFF',
    padding: 10,
    marginVertical: 5,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#000',
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  button2: {
    borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 10,
  },
  buttonText2: {
    color: '#000',
    fontSize: 16,
  },
});
