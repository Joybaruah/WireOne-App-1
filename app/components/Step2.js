import {
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
import { SelectStep2, setStep2 } from '../redux/formSlice';

const validationSchema = Yup.object().shape({
  beneficiaryName: Yup.string().required('This is a required question'),
  accountNumber: Yup.string().required('This is a required question'),
  ifscCode: Yup.string().required('This is a required question'),
  bankName: Yup.string().required('This is a required question'),
  branchAddress: Yup.string().required('This is a required question'),
});

const Step2 = ({navigation}) => {
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

          dispatch(setStep2({
            step_2: values,
            images: {
              cheque: imageUri
            }
          }))
          navigation.navigate('Step3')
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
            {/* Beneficiary Name */}
            <Text style={styles.headerText}>Bank Details</Text>
            <View style={styles.headerBox}>
              <Text style={styles.label}>Beneficiary Name</Text>

              <TextInput
                onChangeText={handleChange('beneficiaryName')}
                onBlur={handleBlur('beneficiaryName')}
                value={values.beneficiaryName}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />

              {errors.beneficiaryName && touched.beneficiaryName ? (
                <Text style={styles.errorText}>{errors.beneficiaryName}</Text>
              ) : null}
            </View>

            {/* Account Number */}
            <View style={styles.box}>
              <Text style={styles.label}>Account Number</Text>

              <TextInput
                onChangeText={handleChange('accountNumber')}
                onBlur={handleBlur('accountNumber')}
                value={values.accountNumber}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.accountNumber && touched.accountNumber ? (
                <Text style={styles.errorText}>{errors.accountNumber}</Text>
              ) : null}
            </View>

            {/* IFSC CODE */}
            <View style={styles.box}>
              <Text style={styles.label}>IFSC Code</Text>

              <TextInput
                onChangeText={handleChange('ifscCode')}
                onBlur={handleBlur('ifscCode')}
                value={values.ifscCode}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.ifscCode && touched.ifscCode ? (
                <Text style={styles.errorText}>{errors.ifscCode}</Text>
              ) : null}
            </View>

            {/* BANK NAME */}
            <View style={styles.box}>
              <Text style={styles.label}>Bank Name</Text>

              <TextInput
                onChangeText={handleChange('bankName')}
                onBlur={handleBlur('bankName')}
                value={values.bankName}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.bankName && touched.bankName ? (
                <Text style={styles.errorText}>{errors.bankName}</Text>
              ) : null}
            </View>

            {/* BRANCH ADDRESS */}
            <View style={styles.box}>
              <Text style={styles.label}>Branch Address</Text>

              <TextInput
                onChangeText={handleChange('branchAddress')}
                onBlur={handleBlur('branchAddress')}
                value={values.branchAddress}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.branchAddress && touched.branchAddress ? (
                <Text style={styles.errorText}>{errors.branchAddress}</Text>
              ) : null}
            </View>

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

export default Step2;

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
  errorText: {
    color: '#EB1D36',
    paddingHorizontal: 4,
  },
});
