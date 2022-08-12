import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {SelectStep3, setStep3} from '../redux/formSlice';
import PushNotification from 'react-native-push-notification';
import FormInputs from '../form_inputs.json';

const {form3_inputs} = FormInputs[2];

const Form3 = ({navigation}) => {
  useEffect(() => {
    createChannels();
  }, []);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [image7, setImage7] = useState(null);
  const [image8, setImage8] = useState(null);

  const dispatch = useDispatch();

  const step3 = useSelector(SelectStep3);

  // const uploadImage = uri => {
  //   let options = {
  //     mediaType: 'photo',
  //     quality: 1,
  //   };

  //   switch (uri) {
  //     case 'image1':
  //       launchImageLibrary(options, response => {
  //         setImage1(response.assets[0].uri);
  //       });
  //       break;
  //     case 'image2':
  //       launchImageLibrary(options, response => {
  //         setImage2(response.assets[0].uri);
  //       });
  //       break;
  //     case 'image3':
  //       launchImageLibrary(options, response => {
  //         setImage3(response.assets[0].uri);
  //       });
  //       break;
  //     case 'image4':
  //       launchImageLibrary(options, response => {
  //         setImage4(response.assets[0].uri);
  //       });
  //       break;
  //     case 'image5':
  //       launchImageLibrary(options, response => {
  //         setImage5(response.assets[0].uri);
  //       });
  //       break;
  //     case 'image6':
  //       launchImageLibrary(options, response => {
  //         setImage6(response.assets[0].uri);
  //       });
  //       break;
  //     case 'image7':
  //       launchImageLibrary(options, response => {
  //         setImage7(response.assets[0].uri);
  //       });
  //       break;
  //     case 'image8':
  //       launchImageLibrary(options, response => {
  //         setImage8(response.assets[0].uri);
  //       });
  //       break;
  //   }
  // };

  const uploadImage = id => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    switch (id) {
      case 'image1':
        launchImageLibrary(options, response => {
          setImage1(response.assets[0].uri);
        });
        break;
      case 'image2':
        launchImageLibrary(options, response => {
          setImage2(response.assets[0].uri);
        });
        break;
    }
  };

  const removeImage = uri => {
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

  const submitForm = () => {
    dispatch(
      setStep3({
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
      }),
    );

    if (
      !image1 ||
      !image2 ||
      !image3 ||
      !image4 ||
      !image5 ||
      !image6 ||
      !image7 ||
      !image8
    ) {
      Alert.alert('Error', 'Upload all the Required Images!', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      PushNotification.localNotification({
        channelId: 'form-submit',
        title: 'Submitted',
        message: 'You have submited the Form',
      });

      navigation.navigate('Step1');
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bank Details</Text>
      </View>
      <Formik>
        {({handleSubmit, values}) => (
          <ScrollView>
            <FlatList
              data={form3_inputs}
              renderItem={({item}) => {
                console.log(item)
                return (
                  <View style={styles.box}>
                    <Text style={styles.label}>{item.label}</Text>

                    {image1 ? (
                      <View style={{borderWidth: 0.5, marginVertical: 5}}>
                        <Image source={{uri: image1}} style={{height: 50}} />
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => uploadImage(item.key)}>
                        <Text style={styles.buttonText2}>ADD FILE</Text>
                      </TouchableOpacity>
                    )}

                    {image1 ? (
                      <TouchableOpacity
                        style={styles.button2}
                        onPress={() => removeImage(item.key)}>
                        <Text style={[styles.buttonText2, {color: 'red'}]}>
                          REMOVE
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                );
              }}
            />

            <TouchableOpacity
              onPress={submitForm}
              title="Submit"
              style={styles.button}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginHorizontal: 15,
  },
  headerText: {
    color: '#000',
    fontSize: 22,
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
