import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import * as Yup from 'yup';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {SelectStep1, setStep1} from '../redux/formSlice';

const radioButtonsData = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'female',
    value: 'female',
  },
  {
    label: 'Prefer not to say',
    value: 'prefer not to say',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const K_OPTIONS = [
  {
    id: '1',
    item: 'Reading',
  },
  {
    id: '2',
    item: 'Gaming',
  },
  {
    id: '3',
    item: 'Art'
  },
  {
    id: "4",
    item: 'Music'
  },
  {
    id: '5',
    item: 'Cooking'
  }
];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('This is a required question'),
  contact: Yup.number()
    .min(10, 'Not a Valid Number')
    .required('This is a required question'),
  emergerncyContact: Yup.number()
    .min(10, 'Not a Valid Number')
    .required('This is a required question'),
  fullname: Yup.string().required('This is a required question'),
  bloodGroup: Yup.string().required('This is a required question'),
  permAddress: Yup.string().required('This is a required question'),
  mailAddress: Yup.string().required('This is a required question'),
  panNumber: Yup.string().required('This is a required question'),
  aadharNum: Yup.string().required('This is a required question'),
  fatherName: Yup.string().required('This is a required question'),
  motherName: Yup.string().required('This is a required question'),
  emergContactRelation: Yup.string().required('This is a required question'),
});

const Step1 = ({navigation}) => {
  
  const step1 = useSelector(SelectStep1);
  console.log(step1);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const [genderState, setGenderState] = useState(String);

  const dispatch = useDispatch();

  const onMultiChange = () => {
    return item => setSelectedHobbies(xorBy(selectedHobbies, [item], 'id'));
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee On-boarding Form</Text>
      </View>

      <Formik
        initialValues={{
          email: '',
          contact: '',
          altContact: '',
          fullname: '',
          bloodGroup: '',
          permAddress: '',
          mailAddress: '',
          panNumber: '',
          aadharNum: '',
          fatherName: '',
          motherName: '',
          emergerncyContact: '',
          emergContactRelation: '',
          medicalHistory: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => { 
          console.log(values);
          dispatch(setStep1({
            step_1: values,
            hobbies: selectedHobbies,
            dateofbirth: date.toString(),
            gender: genderState
          }));
          navigation.navigate('Step2');
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* EMAIL */}
            <View style={styles.box}>
              <Text style={styles.label}>Email</Text>

              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                placeholder="Your email address"
                placeholderTextColor="#3F4E4F"
              />

              {errors.email && touched.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* CONTACT NUMBER */}
            <View style={styles.box}>
              <Text style={styles.label}>Contact Number</Text>

              <TextInput
                onChangeText={handleChange('contact')}
                onBlur={handleBlur('contact')}
                value={values.contact}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.contact && touched.contact ? (
                <Text style={styles.errorText}>{errors.contact}</Text>
              ) : null}
            </View>

            {/* ALT CONTACT NUMBER */}
            <View style={styles.box}>
              <Text style={styles.label}>Alternative Contact Number</Text>

              <TextInput
                onChangeText={handleChange('altContact')}
                onBlur={handleBlur('altContact')}
                value={values.altContact}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
            </View>

            {/* FULL NAME */}
            <View style={styles.box}>
              <Text style={styles.label}>Full Name</Text>

              <TextInput
                onChangeText={handleChange('fullname')}
                onBlur={handleBlur('fullname')}
                value={values.fullname}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.fullname && touched.fullname ? (
                <Text style={styles.errorText}>{errors.fullname}</Text>
              ) : null}
            </View>

            {/* Hobbies */}
            <View style={styles.box}>
              <Text style={styles.label}>Hobbies</Text>

              <View>
                <SelectBox
                  label="Select Hobbies"
                  options={K_OPTIONS}
                  selectedValues={selectedHobbies}
                  onMultiSelect={onMultiChange()}
                  onTapClose={onMultiChange()}
                  isMulti
                />
              </View>
            </View>

            {/* GENDER */}
            <View style={styles.box}>
              <Text style={styles.label}>Gender</Text>

              <RadioForm
                radio_props={radioButtonsData}
                initial={0}
                onPress={value => {
                  setGenderState({value});
                }}
                buttonColor="#000"
                selectedButtonColor="#000"
                style={{padding: 10}}
                buttonSize={10}
              />
            </View>

            {/* BLOOD GROUP */}
            <View style={styles.box}>
              <Text style={styles.label}>Blood Group</Text>

              <TextInput
                onChangeText={handleChange('bloodGroup')}
                onBlur={handleBlur('bloodGroup')}
                value={values.bloodGroup}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.bloodGroup && touched.bloodGroup ? (
                <Text style={styles.errorText}>{errors.bloodGroup}</Text>
              ) : null}
            </View>

            {/* PERMANENT ADDRESS */}
            <View style={styles.box}>
              <Text style={styles.label}>Permanent Address</Text>

              <TextInput
                onChangeText={handleChange('permAddress')}
                onBlur={handleBlur('permAddress')}
                value={values.permAddress}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.permAddress && touched.permAddress ? (
                <Text style={styles.errorText}>{errors.permAddress}</Text>
              ) : null}
            </View>

            {/* MAILING ADDRESS */}
            <View style={styles.box}>
              <Text style={styles.label}>Current Address/Mailing Adress</Text>

              <TextInput
                onChangeText={handleChange('mailAddress')}
                onBlur={handleBlur('mailAddress')}
                value={values.mailAddress}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.mailAddress && touched.mailAddress ? (
                <Text style={styles.mailAddress}>{errors.mailAddress}</Text>
              ) : null}
            </View>

            {/* PAN NUMBER */}
            <View style={styles.box}>
              <Text style={styles.label}>PAN Number</Text>

              <TextInput
                onChangeText={handleChange('panNumber')}
                onBlur={handleBlur('panNumber')}
                value={values.panNumber}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.panNumber && touched.panNumber ? (
                <Text style={styles.errorText}>{errors.panNumber}</Text>
              ) : null}
            </View>

            {/* AADHAR NUMBER */}
            <View style={styles.box}>
              <Text style={styles.label}>Aadhar Number</Text>

              <TextInput
                onChangeText={handleChange('aadharNum')}
                onBlur={handleBlur('aadharNum')}
                value={values.aadharNum}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.aadharNum && touched.aadharNum ? (
                <Text style={styles.errorText}>{errors.aadharNum}</Text>
              ) : null}
            </View>

            {/* FATHER'S NAME */}
            <View style={styles.box}>
              <Text style={styles.label}>Father's Name</Text>

              <TextInput
                onChangeText={handleChange('fatherName')}
                onBlur={handleBlur('fatherName')}
                value={values.fatherName}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.fatherName && touched.fatherName ? (
                <Text style={styles.errorText}>{errors.fatherName}</Text>
              ) : null}
            </View>

            {/* MOTHER'S NAME */}
            <View style={styles.box}>
              <Text style={styles.label}>Mother's Name</Text>

              <TextInput
                onChangeText={handleChange('motherName')}
                onBlur={handleBlur('motherName')}
                value={values.motherName}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.motherName && touched.motherName ? (
                <Text style={styles.errorText}>{errors.motherName}</Text>
              ) : null}
            </View>

            {/* EMERGENCY CONTACT */}
            <View style={styles.box}>
              <Text style={styles.label}>Emergency Contact</Text>

              <TextInput
                onChangeText={handleChange('emergerncyContact')}
                onBlur={handleBlur('emergerncyContact')}
                value={values.emergerncyContact}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.emergerncyContact && touched.emergerncyContact ? (
                <Text style={styles.errorText}>{errors.emergerncyContact}</Text>
              ) : null}
            </View>

            {/* RELATIONSHIP WITH EMERGENCY CONTACT  */}
            <View style={styles.box}>
              <Text style={styles.label}>
                Relationship with Emergency Contact
              </Text>

              <TextInput
                onChangeText={handleChange('emergContactRelation')}
                onBlur={handleBlur('emergContactRelation')}
                value={values.emergContactRelation}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
              {errors.emergContactRelation && touched.emergContactRelation ? (
                <Text style={styles.errorText}>
                  {errors.emergContactRelation}
                </Text>
              ) : null}
            </View>

            {/* MEDICAL HISTORY  */}
            <View style={styles.box}>
              <Text style={styles.label}>Medical History (If Any)</Text>

              <TextInput
                onChangeText={handleChange('medicalHistory')}
                onBlur={handleBlur('medicalHistory')}
                value={values.medicalHistory}
                style={styles.input}
                placeholder="Your answer"
                placeholderTextColor="#3F4E4F"
              />
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

export default Step1;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginHorizontal: 15,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 15,
    borderTopWidth: 10,
    borderTopColor: '#A66CFF',
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#000',
    fontSize: 22,
  },
  input: {
    borderBottomWidth: 0.5,
    marginVertical: 8,
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
  errorText: {
    color: '#EB1D36',
    paddingHorizontal: 4,
  },
});
