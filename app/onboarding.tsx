import { View, Text } from 'react-native'
import React from 'react'
import { Heading } from '@/components/ui/heading'
import { useAuth } from '@/lib/ctx';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingPage = () => {
    const { user } = useAuth();

  return (
    <SafeAreaView className="p-4">
      <View className="mt-12">
        <Heading className="font-poppins-bold text-xl text-center">Welcome to your Fashion Hub, {user?.name}!</Heading>
        <Text className="font-poppins mt-4 px-4">We are so excited you are here. Let's get started with a few questions to help us personalize your experience.</Text>

      </View>
      <View>
        <Text className="mt-8 font-poppins-medium px-4">So get your measuring tape ready and click the button below to get started!</Text>
      </View>
      <View>
        <Link href="/shape-calculator" className="px-4 py-3.5 bg-black rounded-lg text-center font-poppins-bold mt-24 text-white">Let's do this</Link>
      </View>
    </SafeAreaView>
  )
}

export default OnboardingPage