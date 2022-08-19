import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { useDispatch } from 'react-redux';
import RadioButtonRN from 'radio-buttons-react-native';
import { setStep1 } from '../redux/formSlice';
import FormInputs from '../form_inputs.json';

const radioButtonsData = [
  {
    label: 'Male',
    id: 1,
  },
  {
    label: 'Female',
    id: 2,
  },
  {
    label: 'Prefer not to say',
    id: 3,
  },
  {
    label: 'Other',
    id: 4,
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
    item: 'Art',
  },
  {
    id: '4',
    item: 'Music',
  },
  {
    id: '5',
    item: 'Cooking',
  },
];

const panValue = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const aadharValue = /^\d{4}\d{4}\d{4}$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('This is a required question'),
  contact: Yup.string()
    .length(10, 'Not a Valid Number')
    .required('This is a required question'),
  emergerncyContact: Yup.string()
    .length(10, 'Not a Valid Number')
    .required('This is a required question'),
  fullname: Yup.string().required('This is a required question'),
  bloodGroup: Yup.string().required('This is a required question'),
  permAddress: Yup.string().required('This is a required question'),
  mailAddress: Yup.string().required('This is a required question'),
  panNumber: Yup.string()
    .matches(panValue, 'Not a valid pan number')
    .required('This is a required question'),
  aadharNum: Yup.string()
    .matches(aadharValue, 'Not a valid aadhar number')
    .required('This is a required question'),
  fatherName: Yup.string().required('This is a required question'),
  motherName: Yup.string().required('This is a required question'),
  emergContactRelation: Yup.string().required('This is a required question'),
});

const { form1Inputs } = FormInputs[0];

// eslint-disable-next-line react/prop-types
const FormInput = ({ navigation, localData }) => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [genderState, setGenderState] = useState();
  const dispatch = useDispatch();

  const onMultiChange = () => (item) => setSelectedHobbies(xorBy(selectedHobbies, [item], 'id'));

  // eslint-disable-next-line react/no-unstable-nested-components
  const FlatlistHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Employee On-boarding Form</Text>
    </View>
  );

  const initialValues = {
    email: localData ? localData.step1.step_1.email : '',
    contact: localData ? localData.step1.step_1.contact : '',
    altContact: localData ? localData.step1.step_1.altContact : '',
    fullname: localData ? localData.step1.step_1.fullname : '',
    bloodGroup: localData ? localData.step1.step_1.bloodGroup : '',
    permAddress: localData ? localData.step1.step_1.permAddress : '',
    mailAddress: localData ? localData.step1.step_1.mailAddress : '',
    panNumber: localData ? localData.step1.step_1.panNumber : '',
    aadharNum: localData ? localData.step1.step_1.aadharNum : '',
    fatherName: localData ? localData.step1.step_1.fatherName : '',
    motherName: localData ? localData.step1.step_1.motherName : '',
    emergerncyContact: localData
      ? localData.step1.step_1.emergerncyContact
      : '',
    emergContactRelation: localData
      ? localData.step1.step_1.emergContactRelation
      : '',
    medicalHistory: localData ? localData.step1.step_1.medicalHistory : '',
  };

  return (
    <View style={styles.view} key={localData}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(
            setStep1({
              step_1: values,
              hobbies: selectedHobbies,
              gender: genderState,
            }),
          );
          navigation.navigate('form2');
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
            data={form1Inputs}
            ListHeaderComponent={FlatlistHeader}
            ListFooterComponent={(
              <View>
                {/* Hobbies */}
                <View style={styles.box}>
                  <Text style={styles.label}>Hobbies</Text>

                  <View>
                    <SelectBox
                      listOptionProps={{ nestedScrollEnabled: true }}
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

                  <RadioButtonRN
                    data={radioButtonsData}
                    initial={localData ? localData.step1.gender.id : 4}
                    circleSize={10}
                    selectedBtn={(e) => setGenderState(e)}
                  />
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
            renderItem={({ item }) => {
              const { key, label } = item;
              return (
                <View style={styles.box}>
                  <Text style={styles.label}>{label}</Text>

                  <TextInput
                    onChangeText={handleChange(`${key}`)}
                    onBlur={handleBlur(`${key}`)}
                    style={styles.input}
                    value={values[`${key}`]}
                    placeholder="Your answer"
                    placeholderTextColor="#3F4E4F"
                  />

                  {errors[`${key}`] && touched[`${key}`] ? (
                    <Text style={styles.errorText}>{errors[`${key}`]}</Text>
                  ) : null}
                </View>
              );
            }}
          />
        )}
      </Formik>
    </View>
  );
};

export default FormInput;

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
