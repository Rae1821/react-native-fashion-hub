import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/lib/ctx';
import BodyShape from '@/components/BodyShape';
import { Link, router } from 'expo-router';
import { ArrowRightIcon, Icon } from '@/components/ui/icon';

const ShapeCalculatorPage = () => {
   const { user, token } = useAuth();

   const userId = user?._id;


  return (
    <SafeAreaView className="p-4 flex flex-col h-full">
      <View className="mt-4 px-4">
        <Text className="font-poppins-bold text-2xl">Welcome, {user?.name}!</Text>
        <Text className="font-poppins mt-2 text-sm leading-loose">Let's find out your body shape! Knowing your body shape is the key to finding clothes that make you look and feel like your best self.</Text>
      </View>

      <View className="mt-12 px-4">
        <Text className="font-poppins-bold text-lg">Body Shape Calculator</Text>
        {userId && token && <BodyShape userId={userId} token={token} />}

      </View>

      <View className="mt-12 flex flex-row items-center justify-end gap-2 mr-8">
        <Pressable
          onPress={() => router.push('/style-quiz')}
          className="flex flex-row items-center gap-2"
          >
          <Text className="font-poppins-medium">Next</Text>
          <Icon as={ArrowRightIcon} className="text-background-800" />
        </Pressable>
      </View>

    </SafeAreaView>
  )
}

export default ShapeCalculatorPage