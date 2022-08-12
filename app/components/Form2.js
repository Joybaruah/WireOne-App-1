import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {SelectStep2, setStep2} from '../redux/formSlice';
import FormInputs from '../form_inputs.json';

const validationSchema = Yup.object().shape({
  beneficiaryName: Yup.string().required('This is a required question'),
  accountNumber: Yup.string().required('This is a required question'),
  ifscCode: Yup.string().required('This is a required question'),
  bankName: Yup.string().required('This is a required question'),
  branchAddress: Yup.string().required('This is a required question'),
});

const {form2_inputs} = FormInputs[1];

const Form2 = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);

  const step2 = useSelector(SelectStep2);
  console.log(step2);

  const uploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      setImageUri(response.assets[0].uri);
    });
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const dispatch = useDispatch();

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bank Details</Text>
      </View>
      <Formik
        initialValues={{
          beneficiaryName: '',
          accountNumber: '',
          ifscCode: '',
          bankName: '',
          branchAddress: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          dispatch(
            setStep2({
              step_2: values,
              images: {
                cheque: imageUri,
              },
            }),
          );
          navigation.navigate('Step3');
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView>
            <FlatList
              data={form2_inputs}
              renderItem={({item}) => {
                const {key, label} = item;
                return (
                  <View style={styles.box}>
                    <Text style={styles.label}>{label}</Text>

                    <TextInput
                      onChangeText={handleChange(`${key}`)}
                      onBlur={handleBlur(`${key}`)}
                      style={styles.input}
                      value={values[`${item.key}`]}
                      placeholder="Your answer"
                      placeholderTextColor="#3F4E4F"
                    />

                    {errors[`${item.key}`] && touched[`${item.key}`] ? (
                      <Text style={styles.errorText}>
                        {errors[`${item.key}`]}
                      </Text>
                    ) : null}
                  </View>
                );
              }}
            />

            {/* CANCELLED CHEQUE */}
            <View style={styles.box}>
              <Text style={styles.label}>Cancelled Cheque</Text>

              {imageUri ? (
                <View style={{borderWidth: 0.5, marginVertical: 5}}>
                  <Image source={{uri: imageUri}} style={{height: 50}} />
                </View>
              ) : (
                <TouchableOpacity style={styles.button2} onPress={uploadImage}>
                  <Text style={styles.buttonText2}>ADD FILE</Text>
                </TouchableOpacity>
              )}

              {imageUri ? (
                <TouchableOpacity style={styles.button2} onPress={removeImage}>
                  <Text style={styles.buttonText2}>REMOVE</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              title="Submit"
              style={styles.button}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Form2;

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
    color: '#fff',
    backgroundColor: '#A66CFF',
    padding: 10,
    marginTop: 10,
    fontSize: 20,
    borderRadius: 5,
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
  errorText: {
    color: '#EB1D36',
    paddingHorizontal: 4,
  },
});