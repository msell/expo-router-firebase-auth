import { Text, View, TextInput, StyleSheet, Button } from 'react-native'
import { useRef } from 'react'
import { Stack, useRouter } from 'expo-router'
import {
  AuthStore,
  appSignUp,
  sendEmailVerification,
  appSignOut,
} from '../../store'

export default function CreateAccount() {
  const router = useRouter()
  const emailRef = useRef('')
  const firstNameRef = useRef('')
  const lastNameRef = useRef('')
  const passwordRef = useRef('')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen
        options={{ title: 'Create Account', headerLeft: () => <></> }}
      />
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="firstName"
          nativeID="firstName"
          onChangeText={(text) => {
            firstNameRef.current = text
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="lastName"
          nativeID="lastName"
          onChangeText={(text) => {
            lastNameRef.current = text
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          nativeID="password"
          onChangeText={(text) => {
            passwordRef.current = text
          }}
          style={styles.textInput}
        />
      </View>

      <View style={{ marginBottom: 8 }}>
        <Button
          title="Create Account"
          onPress={async () => {
            const resp = await appSignUp(
              emailRef.current,
              passwordRef.current,
              firstNameRef.current + ' ' + lastNameRef.current
            )
            if (resp?.user) {
              await sendEmailVerification()
              // It is important for MFA TOTP that a user email is verified prior to login.
              alert('Please check your email for a verification link.')
              await appSignOut()
              router.replace("/(public)/login");
            } else {
              console.log(resp.error)
              if (resp.error instanceof Error) {
                alert(resp.error.message)
              }
            }
          }}
        />
      </View>

      <Button
        onPress={() => {
          AuthStore.update((s) => {
            s.isLoggedIn = false
          })
          router.back()
        }}
        title="Cancel"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: '#455fff',
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#455fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
})
