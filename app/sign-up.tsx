import { View, Text, TouchableOpacity, Pressable, Alert, TextInput} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VStack } from '@/components/ui/vstack';
import { Link, router } from 'expo-router';
import { ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import axios from 'axios';


const SignUp = () => {
     const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (name === '' || email === '' || password === '') {
            alert('All fields are required');
            return;
        }
        const resp = await axios.post('http://localhost:8000/api/signup', { name, email, password });
        alert("Sign Up Successful");
    };

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
            <Heading className="text-center font-poppins-extrabold" size="3xl">Sign Up</Heading>
            <Text className="font-poppins text-center">Sign up to start using Fashion Hub</Text>
          </VStack>
        </VStack>
          <VStack space="lg" className="mt-5">
          <VStack space="sm">
              <Text className="font-poppins-medium">Name</Text>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
              >
                <InputField
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={text  => setName(text)}
                  autoCapitalize="words"
                  autoCorrect={false}
                  />
              </Input>
            </VStack>
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
                //   autoCompleteType="email"
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
                //   autoCompleteType="password"
                  />
                <InputSlot>
                  <InputIcon></InputIcon>
                </InputSlot>
              </Input>
            </VStack>

          <Text>{JSON.stringify({ name, email, password })}</Text>
          </VStack>
          <VStack className="w-full my-7" space="lg">
            <TouchableOpacity
                // onPress={handleSignin}
                disabled={isLoading}
                className="bg-black py-3 flex items-center justify-center"
              >
                <Text className="text-white font-poppins-bold text-lg">Sign up now</Text>
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
          <View className="flex flex-row mt-3 justify-center items-center gap-2">
          <Text>Already signed up?</Text>
          <Link href="/sign-in" className="font-poppins-medium underline">Sign in</Link>

          </View>

    </View>

</SafeAreaView>
  )
}

export default SignUp