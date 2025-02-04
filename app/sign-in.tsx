import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import { ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { useSession } from '@/lib/ctx';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import * as SecureStore from 'expo-secure-store';
import { currentIPAddress } from '@/utils/helper';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const { signIn } = useSession();

  const handleSaveEmail = async () => {
    if (isChecked) {
      // Save email to SecureStore
      try {
        await SecureStore.setItemAsync('userEmail', email);
      } catch (error) {
        console.error('Error saving email:', error);
        throw error;
      }
    } else {
      // Remove email from SecureStore
      await SecureStore.deleteItemAsync('userEmail');
    }
  };

  useEffect(() => {
    const getEmailFromStore = async () => {
      try {
        // Fetch email from SecureStore
        const storedEmail = await SecureStore.getItemAsync('userEmail');

        // If the email is found, prefill the email field
        if (storedEmail) {
          setEmail(storedEmail); // set the email field value
          setChecked(true); // check the "Remember me" checkbox
          console.log(storedEmail); // log the email to the console
        } else {
          console.log('Email not found in SecureStore');
        }
      } catch (error) {
        console.log('Error fetching email from Se');
      }
    };
    getEmailFromStore(); // Call the async function to fetch the email
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Error ', 'Please fill in all fields');
      return;
    }
    setIsLoading(true);
    Keyboard.dismiss();
    handleSaveEmail();

    // 192.168.1.59 - goodmans
    // 192.168.0.42 - home
    try {
      const response = await axios.post(`${currentIPAddress}:3000/api/signin`, {
        email,
        password,
      });
      const { token, user } = response.data;
      await signIn(token, user);
      router.replace('/dashboard');
    } catch (error) {
      Alert.alert('Error ', 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-10 mt-12">
        <VStack className="max-w-[440px] w-full" space="md">
          <VStack className="md:items-center" space="md">
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon as={ArrowLeftIcon} className="text-background-800" />
            </Pressable>
            <VStack>
              <Heading
                className="text-center font-poppins-extrabold"
                size="3xl"
              >
                Log In
              </Heading>
              <Text className="font-poppins text-center">
                Login to start using Fashion Hub
              </Text>
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
                  onChangeText={(text) => setEmail(text)}
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
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  // autoCompleteType="password"
                />
                <InputSlot>
                  <InputIcon></InputIcon>
                </InputSlot>
              </Input>
            </VStack>
            <VStack space="sm" className="flex flex-row mt-2 items-center">
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? 'black' : undefined}
              />
              <Text className="font-poppins-medium">Remember Me</Text>
            </VStack>
            {/* <Text>{JSON.stringify({ email, password })}</Text> */}
          </VStack>
          <VStack className="w-full my-7" space="lg">
            <TouchableOpacity
              onPress={handleSignin}
              disabled={isLoading}
              className="bg-black py-3 flex items-center justify-center"
            >
              <Text className="text-white font-poppins-bold text-lg">
                {isLoading ? 'Loggin in...' : 'Log in'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={handleSignin}
              disabled={isLoading}
              className="border-2 border-black py-3 flex items-center justify-center"
            >
              <Text className="font-poppins-bold text-lg">
                Continue with Google
              </Text>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
