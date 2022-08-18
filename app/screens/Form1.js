import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput1 from '../components/FormInput1';

const Form1 = ({ navigation }) => {
  const [localData, setlocalData] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('formData');
        return jsonValue != null ? setlocalData(JSON.parse(jsonValue)) : null;
      } catch (e) {
        // error reading value
      }
    })();
  }, []);

  return (
    // eslint-disable-next-line max-len
    <FormInput1 navigation={navigation} localData={localData} />
  );
};

export default Form1;
