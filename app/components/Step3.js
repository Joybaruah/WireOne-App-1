import {
  Alert,
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

const Step3 = ({navigation}) => {
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

  const uploadImage = uri => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      uri(response.assets[0].uri);
    });
  };

  const removeImage = uri => {
    uri(null);
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
        }
      }),
    );

    if(!image1||!image2||!image3||!image4||!image5||!image6||!image7||!image8) {
      Alert.alert(
        "Error",
        "Upload all the Required Images!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    } else {
      PushNotification.localNotification({
        channelId: "form-submit",
        title: 'Submitted',
        message: 'You have submited the Form'
      })

      navigation.navigate('Step1')
    }
  }

  return (
    <View style={styles.view}>
      <Formik>
        {({handleSubmit, values}) => (
          <ScrollView>
            {/* 10th Certificate */}
            <Text style={styles.headerText}>Document Upload</Text>
            <View style={styles.headerBox}>
              <Text style={styles.label}>10th Certificate</Text>

              {image1 ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: image1}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => uploadImage(setImage1)}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {image1 ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeImage(setImage1)}>
                  <Text style={[styles.buttonText2, {color: 'red'} ]}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* 12th Certificate */}
            <View style={styles.box}>
              <Text style={styles.label}>12th Certificate</Text>

              {image2 ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: image2}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => uploadImage(setImage2)}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {image2 ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeImage(setImage2)}>
                  <Text style={[styles.buttonText2, {color: 'red'} ]}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Bachelor Certificate */}
            <View style={styles.box}>
              <Text style={styles.label}>Bachelor Certificate</Text>

              {image3 ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: image3}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => uploadImage(setImage3)}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {image3 ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeImage(setImage3)}>
                  <Text style={[styles.buttonText2, {color: 'red'} ]}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Any other qualification? */}
            <View style={styles.box}>
              <Text style={styles.label}>Any other qualification?</Text>

              {image4 ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: image4}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => uploadImage(setImage4)}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {image4 ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeImage(setImage4)}>
                  <Text style={[styles.buttonText2, {color: 'red'} ]}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Paslips- Previous Company (3 Months) */}
            <View style={styles.box}>
              <Text style={styles.label}>
                Paslips- Previous Company (3 Months)
              </Text>

              {image5 ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: image5}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => uploadImage(setImage5)}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {image5 ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeImage(setImage5)}>
                  <Text style={[styles.buttonText2, {color: 'red'} ]}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Reliving Letter- Previous Company */}
            <View style={styles.box}>
              <Text style={styles.label}>
                Reliving Letter- Previous Company
              </Text>

              {image6 ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: image6}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => uploadImage(setImage6)}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {image6 ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeImage(setImage6)}>
                  <Text style={[styles.buttonText2, {color: 'red'} ]}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* PAN CARD */}
            <View style={styles.box}>
              <Text style={styles.label}>PAN CARD</Text>

              {image7 ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: image7}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => uploadImage(setImage7)}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {image7 ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeImage(setImage7)}>
                  <Text style={[styles.buttonText2, {color: 'red'} ]}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* AADHAR CARD */}
            <View style={styles.box}>
              <Text style={styles.label}>AADHAR CARD</Text>

              {image8 ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: image8}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => uploadImage(setImage8)}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {image8 ? (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeImage(setImage8)}>
                  <Text style={[styles.buttonText2, {color: 'red'} ]}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

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

export default Step3;

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
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 15,
  },
  headerText: {
    color: '#fff',
    backgroundColor: '#A66CFF',
    padding: 10,
    marginTop: 10,
    fontSize: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
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
