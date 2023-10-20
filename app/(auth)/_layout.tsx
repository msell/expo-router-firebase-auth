import React from 'react'
import { Stack } from 'expo-router'

const AuthenticatedLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: 'Sample App',
        }}
      ></Stack.Screen>
    </Stack>
  )
}

export default AuthenticatedLayout
