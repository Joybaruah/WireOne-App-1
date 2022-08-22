import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setStep2 } from '../redux/formSlice';
import FormInputs from '../form_inputs.json';

const validationSchema = Yup.object().shape({
  beneficiaryName: Yup.string().required('This is a required question'),
  accountNumber: Yup.string().required('This is a required question'),
  ifscCode: Yup.string().required('This is a required question'),
  bankName: Yup.string().required('This is a required question'),
  branchAddress: Yup.string().required('This is a required question'),
});

const { form2Inputs } = FormInputs[1];

const Form2 = ({ navigation, localData }) => {
  // const localChequeImage = localData ? localData.step2.images.cheque : null;
  const [imageUri, setImageUri] = useState();
  const uploadImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      setImageUri(response.assets[0].uri);
    });
  };

  const chequeImage = {
    uri: imageUri,
  };

  useEffect(() => {
    setImageUri(localData ? localData.step2.images.cheque : null);
  }, [localData]);

  const removeImage = () => {
    setImageUri(null);
  };

  const dispatch = useDispatch();

  return (
    <View style={styles.view} key={localData}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bank Details</Text>
      </View>
      <Formik
        initialValues={{
          beneficiaryName: localData
            ? localData.step2.step_2.beneficiaryName
            : '',
          accountNumber: localData ? localData.step2.step_2.accountNumber : '',
          ifscCode: localData ? localData.step2.step_2.ifscCode : '',
          bankName: localData ? localData.step2.step_2.bankName : '',
          branchAddress: localData ? localData.step2.step_2.branchAddress : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(
            setStep2({
              step_2: values,
              images: {
                cheque: imageUri,
              },
            }),
          );
          navigation.navigate('form3');
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <FlatList
            data={form2Inputs}
            renderItem={({ item }) => {
              const { key, label } = item;
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
            ListFooterComponent={(
              <View>
                <View style={styles.box}>
                  <Text style={styles.label}>Cancelled Cheque</Text>
                  {chequeImage.uri ? (
                    <View style={{ borderWidth: 0.5, marginVertical: 5 }}>
                      <Image
                        source={{ uri: chequeImage.uri }}
                        style={{ height: 50 }}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.button2}
                      onPress={uploadImage}
                    >
                      <Text style={styles.buttonText2}>ADD FILE</Text>
                    </TouchableOpacity>
                  )}
                  {chequeImage.uri ? (
                    <TouchableOpacity
                      style={styles.button2}
                      onPress={removeImage}
                    >
                      <Text style={styles.buttonText2}>REMOVE</Text>
                    </TouchableOpacity>
                  ) : null}

                  {chequeImage.uri ? null : (
                    <Text style={styles.errorText}>This is a required!</Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  title="Submit"
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
              </View>
            )}
          />
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
