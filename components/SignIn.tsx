import { View, Text, TouchableOpacity, Pressable, Alert, TextInput} from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VStack } from '@/components/ui/vstack';
import { Redirect, router } from 'expo-router';
import { ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '@/lib/ctx';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useSession();


  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Error ', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const resp = await axios.post('http://192.168.0.42:3000/api/signin', {
        email,
        password,
      });

      if (resp.data) {


        Alert.alert('Sign in successful')

        // <Redirect href="/dashboard" />
      }
    } catch (error) {
      Alert.alert(
        'Error',
        (error as any).response?.data?.message || 'An error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
        <View className="px-10 mt-12">

          <VStack className="max-w-[440px] w-full" space="md">
            <VStack className="md:items-center" space="md">
              <Pressable onPress={() => {
                router.back();
              }}>
                <Icon as={ArrowLeftIcon} className="text-background-800" />
              </Pressable>
              <VStack>
                <Heading className="text-center font-poppins-extrabold" size="3xl">Log In</Heading>
                <Text className="font-poppins text-center">Login to start using Fashion Hub</Text>
              </VStack>
            </VStack>
              <VStack space="lg" className="mt-5">

                <VStack space="sm">
                  <Text className="font-poppins-medium">Email</Text>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                  >
                    <InputField
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={text => setEmail(text)}
                      // autoCompleteType="email"
                      keyboardType="email-address"
                      />
                  </Input>
                </VStack>
                <VStack space="sm">
                  <Text className="font-poppins-medium">Password</Text>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isRequired={true}
                    isInvalid={false}
                  >
                    <InputField
                      placeholder="Enter your password"
                      value={password}
                      onChangeText={text => setPassword(text)}
                      secureTextEntry={true}
                      // autoCompleteType="password"
                      />
                    <InputSlot>
                      <InputIcon></InputIcon>
                    </InputSlot>
                  </Input>
                </VStack>

              <Text>{JSON.stringify({ email, password })}</Text>
              </VStack>
              <VStack className="w-full my-7" space="lg">
                <TouchableOpacity
                    onPress={handleSignin}
                    disabled={isLoading}
                    className="bg-black py-3 flex items-center justify-center"
                  >
                    <Text className="text-white font-poppins-bold text-lg">{isLoading ? 'Loggin in...' : 'Log in'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={handleSignin}
                    disabled={isLoading}
                    className="border-2 border-black py-3 flex items-center justify-center"
                  >
                    <Text className="font-poppins-bold text-lg">Continue with Google</Text>
                  </TouchableOpacity>
              </VStack>
          </VStack>


        </View>

    </SafeAreaView>
  )
}

export default SignIn