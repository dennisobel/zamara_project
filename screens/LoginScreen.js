import React, { useState } from 'react';

import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    .then(user => {
      AsyncStorage.setItem('token', user.token);
      console.log(user);
  
      fetch('https://dummyjson.com/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      })
      .then(res => res.json())    
    .then(data => {
      console.log(data)
      
      const currentUser = data.users.find(res => res.id === user.id);

      if (currentUser) {
        navigation.navigate('Dashboard', {
          name: currentUser.firstName + " " + currentUser.lastName,
          age: currentUser.age,
          gender: currentUser.gender,
          email: currentUser.email,
          phone: currentUser.phone,
          birthDate: currentUser.birthDate,
          bloodGroup: currentUser.bloodGroup,
          height: currentUser.height,
          weight: currentUser.weight,
          eyeColor: currentUser.eyeColor,
          avatar: currentUser.image,
          token: data.token
        });
      } else {
        console.log('User not found!');
      }
    })    .catch(error => {
      console.log(error);
    });

      // navigation.navigate('Dashboard', {
      //   name: data.firstName + " " + data.lastName,
      //   age: data.age,
      //   gender: data.gender,
      //   email: data.email,
      //   phone: data.phone,
      //   birthDate: data.birthDate,
      //   bloodGroup: data.bloodGroup,
      //   height: data.height,
      //   weight: data.weight,
      //   eyeColor: data.eyeColor,
      //   avatar: data.image,
      //   token: data.token
      // });
    })
    .catch(error => {
      console.log(error);
    });
  }
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        // value="atuny0"
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        // value="9uQFF1Lh"
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
