import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const CreateAccount = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.headerText}>CREATE ACCOUNT</Text>

        <Text style={styles.labelText}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder={'Enter your password'}
          placeholderTextColor="#73777B"
        />

        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={'Enter your email'}
          placeholderTextColor="#73777B"
        />

        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder={'Enter your password'}
          placeholderTextColor="#73777B"
        />

        <Text style={styles.labelText}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder={'Enter your password'}
          placeholderTextColor="#73777B"
        />

        {/* BUTTON */}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText2}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerText: {
    color: '#000',
    fontSize: 30,
    fontWeight: '500',
  },
  labelText: {
    color: '#000',
    paddingVertical: 8,
  },
  view1: {
    justifyContent: 'center',
    marginHorizontal: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#000',
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonText2: {
    fontSize: 18,
    color: '#000',
  },
  text2: {
    color: '#5463FF',
    marginVertical: 5,
  },
});
