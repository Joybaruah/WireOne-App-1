import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput3 from '../components/FormInput3';

const Form1 = ({ navigation }) => {
  const [localData, setlocalData] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('formData');
        return jsonValue != null ? setlocalData(JSON.parse(jsonValue)) : null;
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  return <FormInput3 navigation={navigation} localData={localData} />;
};

export default Form1;
