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
        <Heading className="font-poppins-bold text-xl">Welcome to your Fashion Hub, {user?.name}!</Heading>
        <Text className="font-poppins mt-4">We are so excited you are here. Let's get started with a few questions to help us personalize your experience.</Text>
        <Text className="font-poppins mt-4">On the next two pages you'll fill out the necessary information to find out your body shape and your personal fashion style.</Text>
        <Text className="font-poppins mt-4">After that you'll end up on your dashboard page where you'll see the results for your body shape and fashion quiz. You'll also see links to the body calculator and fashion quiz in case you want to fill those out again in the future.</Text>
      </View>
      <View>
        <Text className="mt-8 font-poppins-medium">So get your measuring tape ready and click the button below to get started!</Text>
      </View>
      <View>
        <Link href="/shape-calculator" className="px-4 py-3.5 bg-black rounded-lg text-center font-poppins-bold mt-12 text-white">Let's do this</Link>
      </View>
    </SafeAreaView>
  )
}

export default OnboardingPage