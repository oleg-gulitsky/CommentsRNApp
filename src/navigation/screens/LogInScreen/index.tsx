import React, {useCallback, useState} from 'react';
import {Text, TextInput, View, Pressable, StyleSheet} from 'react-native';

import {useAppDispatch} from '../../../store';
import {setUserInfo} from '../../../store/features/userSlice';

export function LogInScreen() {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const dispatch = useAppDispatch();

  const handleNameInput = useCallback((inputValue: string) => {
    setName(inputValue);
    setIsNameValid(checkName(inputValue));
  }, []);

  const handleEmailInput = useCallback((inputValue: string) => {
    setEmail(inputValue);
    setIsEmailValid(checkEmail(inputValue));
  }, []);

  const handleLogInPress = useCallback(() => {
    dispatch(setUserInfo({name, email}));
  }, [dispatch, email, name]);

  const isButtonDisabled = !isNameValid || !isEmailValid;

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={handleNameInput}
        />
        {!isNameValid && <Text style={styles.error}>The name is invalid</Text>}
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailInput}
        />
        {!isEmailValid && (
          <Text style={styles.error}>The email is invalid</Text>
        )}
      </View>
      <Pressable
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        disabled={isButtonDisabled}
        onPress={handleLogInPress}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
}

function checkName(str: string): boolean {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(str);
}

function checkEmail(str: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(str);
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputWrapper: {
    marginBottom: 10,
    paddingBottom: 20,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'grey',
  },
  error: {
    color: 'red',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    backgroundColor: 'blue',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
