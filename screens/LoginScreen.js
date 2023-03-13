import React, { useState } from 'react';

import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      navigation.navigate('Dashboard', {
        name: data.firstName + data.lastName,
        age: data.age,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate,
        bloodGroup: data.bloodGroup,
        height: data.height,
        weight: data.weight,
        eyeColor: data.eyeColor,
        avatar: data.image
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#2e64e5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  forgotPasswordButton: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  forgotPasswordButtonText: {
    fontSize: 16,
    color: '#2e64e5',
  },
});

export default LoginScreen;
