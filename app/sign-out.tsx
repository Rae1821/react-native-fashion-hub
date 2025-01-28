import { View, Text } from 'react-native'

import { useSession } from '@/lib/ctx';

const SignOut = () => {
    const { signOut } = useSession();
  return (
    <View className="flex flex-1 justiy-center items-center">
      <Text onPress={() => {
        // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
        signOut();
      }}>Sign Out</Text>
    </View>
  )
}

export default SignOut