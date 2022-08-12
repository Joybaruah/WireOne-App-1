import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  FlatList,
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
import FormInputs from '../form_inputs.json';

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

const {form1_inputs} = FormInputs[0];

const Form1 = ({navigation}) => {
  const step1 = useSelector(SelectStep1);

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
          dispatch(
            setStep1({
              step_1: values,
              hobbies: selectedHobbies,
              gender: genderState,
            }),
          );
          navigation.navigate("form2")
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
            <FlatList
              data={form1_inputs}
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

export default Form1;

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
