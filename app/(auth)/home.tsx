import { Button, View, Text, StyleSheet } from 'react-native'
import { AuthStore, appSignOut } from '../../store'
import { useRouter } from 'expo-router'
import { getAuth, onIdTokenChanged } from 'firebase/auth'

const auth = getAuth()
export default function Home() {
  const router = useRouter()
  const user = AuthStore.useState((s) => s.user)

  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          const resp = await appSignOut()
          if (!resp?.error) {
            router.replace('/(public)/login')
          } else {
            console.log(resp.error)
          }
        }}
        title="Sign Out"
        color={'#6c47ff'}
      ></Button>
      <Text>{`Welcome ${user?.displayName}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    padding: 20,
    alignItems: 'center',
  },
})
