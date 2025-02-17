import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeftIcon, Icon } from '@/components/ui/icon'
import { Heading } from '@/components/ui/heading'
import FashionStyle from '@/components/FashionStyle'
import { useAuth } from '@/lib/ctx'

const StyleQuizPage = () => {
  const { user, token } = useAuth();


  const userId = user?._id;

  return (
    <SafeAreaView className="p-4">
      <ScrollView>
      <View className="mt-8">
        <Heading>Almost done!</Heading>
        <Text>Now let's find your fashion style. Answer the questions below as best as you can to uncover your personal fashion style preference.</Text>
      </View>
      <View>
       {userId && token && (
          <FashionStyle userId={userId} token={token} />
       )}
      </View>
      <View>
        <View>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon as={ArrowLeftIcon} className="text-background-800" />
            </Pressable>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default StyleQuizPage