import { ActivityIndicator } from 'react-native'
import { Redirect, Slot } from 'expo-router';

import { useAuth, useSession } from '@/lib/ctx';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout() {
    const { user, token, signOut} = useAuth();

 // You can keep the splash screen open, or render a loading screen like we do here.
//  if (isLoading) {
//     return (
//       <SafeAreaView className="bg-white h-full flex justify-center items-center">
//         <ActivityIndicator className="text-red-300" size="large" />
//       </SafeAreaView>
//     );
//   }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
    return (
      <Slot />
    )
  ;
}