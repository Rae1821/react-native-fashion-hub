import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { ArrowLeftIcon, ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Heading } from '@/components/ui/heading'
import FashionStyle from '@/components/FashionStyle'
import { useAuth } from '@/lib/ctx'

const StyleQuizPage = () => {
  const { user, token } = useAuth();


  const userId = user?._id;

  return (
    <SafeAreaView className="p-4">
      <ScrollView>
        <View className="mt-4">
              <Pressable
                onPress={() => {
                  router.back();
                }}
                className="flex flex-row items-center gap-2"
              >
                <Icon as={ArrowLeftIcon} className="text-background-800" />
                <Text className="font-poppins-medium">Back</Text>
              </Pressable>
          </View>
          <View className="mt-8">
            <Heading className="font-poppins-bold">Almost done {user?.name}!</Heading>
            <Text className="font-poppins leading-loose">Now let's find your fashion style. Answer the questions below as best as you can to uncover your personal fashion style preference.</Text>
          </View>
          <View>
          {userId && token && (
              <FashionStyle userId={userId} token={token} />
          )}
          </View>

          <View className="mt-10 flex flex-row items-center justify-end gap-2 mr-8">
            <Pressable
              onPress={() => router.push('/dashboard')}
              className="flex flex-row items-center gap-2"
              >
              <Text className="font-poppins-medium text-sm">Next</Text>
              <Icon as={ArrowRightIcon} className="text-background-800" />
            </Pressable>
          </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default StyleQuizPage