import { Link } from 'expo-router'
import React, { useRef } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Alert,
} from 'react-native'
import { appSignIn } from '../../store'
import { Stack, useRouter } from 'expo-router'

const Login = () => {
  const router = useRouter()
  const emailRef = useRef('')
  const passwordRef = useRef('')

  const onSignInPress = async () => {
    try {
      const { user, error } = await appSignIn(
        emailRef.current,
        passwordRef.current
      )

      if(user?.emailVerified === false) {
        alert("Please verify your email address by clicking the link in your welcome email.")
        return
      }
      if(user) {
        router.push('/(auth)/home')
      } else {

        if (error instanceof Error) {
          Alert.alert("Login Error", error?.message)
        }
      }
    } catch (err: any) {
      alert(err.errors[0].message)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="email address"
        onChangeText={(text) => {
          emailRef.current = text
        }}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        onChangeText={(text) => {
          passwordRef.current = text
        }}
        secureTextEntry
        style={styles.inputField}
      />

      <Button onPress={onSignInPress} title="Login" color={'#6c47ff'}></Button>

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
})

export default Login
