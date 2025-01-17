import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'

const SignIn = () => {
  return (
    <SafeAreaView className="bg-white h-full">

        <View className="px-10 mt-12">
          <Text className="text-6xl pt-2 font-poppins-extrabold tracking-tighter">Discover</Text>
          <Text className="text-6xl text-red-300 font-poppins-extrabold tracking-widest pt-2">Your
            <Text className="text-6xl font-poppins-exrabold text-black pt-2">
              {" "}Style
            </Text>
          </Text>

          <TouchableOpacity className="mt-8 bg-red-300 py-5 px-5 w-3/4 rounded-lg">
            <Text className="font-poppins-bold text-xl text-center text-white">Sign me up</Text>
          </TouchableOpacity>
          {/* <Text className="text-sm mt-2 text-center">Already signed up? Login here</Text> */}
        </View>
        <Image source={images.hero} className="w-full h-[500px] absolute bottom-0" />
        {/* <View className="w-full px-10">
          <Text>Discover your Style</Text>
        </View>
        <View>

        </View> */}

    </SafeAreaView>
  )
}

export default SignIn