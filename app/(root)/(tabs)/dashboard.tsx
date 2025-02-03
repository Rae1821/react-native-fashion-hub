import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/ctx';
import BodyShape from '@/components/BodyShape';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { ChevronDownIcon, ChevronUpIcon, CloseIcon, Icon } from '@/components/ui/icon';
import axios from 'axios';
import FashionStyle from '@/components/FashionStyle';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
  AccordionIcon,
} from '@/components/ui/accordion';
import { appleBodyCharacteristic, pearBodyCharacteristic } from '@/constants';

const Dashboard = () => {
  const { user, token, signOut } = useAuth();
    const [showBodyShapeModal, setBodyShapeShowModal] = useState(false);
    const [showFashionStyleModal, setFashionStyleShowModal] = useState(false);

    interface UserProfile {
      name: string;
      id: string;
      email: string;
      bodyShape: string;
      fashionStyle: string;
    }

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const userId = user?._id;


  useEffect(() => {
    if (userId) {
      getUserInfo();
    }
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`http://192.168.1.59:3000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      setUserProfile(response.data);

    } catch (error) {
      console.log(error);
    }
  }





  return (
    <SafeAreaView className="bg-white h-full">
      <View className="mt-10 px-4 flex items-center justify-between flex-row">
        <Text className="font-poppins-medium text-lg">{user?.name}'s Dashboard</Text>
        <Button onPress={signOut} variant="outline" size="sm">
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </View>

      {/* <Text>{JSON.stringify(userProfile)}</Text> */}

      <View className="flex flex-col items-center justify-center mt-10">
        <Accordion className="w-[95%] p-2 border border-outline-50 bg-slate-50 shadow-sm rounded-lg" type="single">
          <AccordionItem value="bodyShape" className="bg-slate-50">
            <AccordionHeader className="">
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                    <AccordionTitleText>Your Body Shape is: {userProfile?.bodyShape}</AccordionTitleText>
                    {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} />
                    )}
                    </>
                  )
                }}

              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <AccordionContentText className="flex flex-col justify-between items-center">
                <View>
                  <Text>Characteristics of {userProfile?.bodyShape} include:</Text>

                  {userProfile?.bodyShape === "Pear" ? (
                      <FlatList
                        data={pearBodyCharacteristic.map((characteristic, idx) => ({ key: idx.toString(), characteristic }))}
                        renderItem={({ item }) => <Text>{item.characteristic}</Text>}
                      />
                  ) : userProfile?.bodyShape === "Apple" ? (
                    <FlatList
                      data={appleBodyCharacteristic.map((characteristic, idx) => ({ key: idx.toString(), characteristic }))}
                      renderItem={({ item }) => <Text>{item.characteristic}</Text>}
                    />
                  ) : null }
                </View>


                <View className="pt-5">
                  <Button onPress={() => setBodyShapeShowModal(true)} className="bg-[#04BF9D]">
                    <ButtonText>Calculate Body Shape</ButtonText>
                  </Button>
                {/* BodyShape Modal */}
                <Modal
                  isOpen={showBodyShapeModal}
                  onClose={() => {
                    setBodyShapeShowModal(false)
                  }}
                  size="md"
                >
                  <ModalBackdrop />
                    <ModalContent>
                      <ModalHeader>
                        <Heading size="md" className="font-poppins-bold">
                          Body Shape Calculator
                        </Heading>
                        <ModalCloseButton>
                          <Icon
                            as={CloseIcon}
                            size="md"
                            className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                          />
                        </ModalCloseButton>
                      </ModalHeader>
                      <ModalBody>
                      {userId && token && <BodyShape userId={userId} token={token} />}
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </View>
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>



      <View className="mt-12 px-4">
        <View>

        </View>


        <View className="mt-5 bg-slate-100 flex flex-col justify-between rounded-lg h-40 p-4">
          {/* FashionStyle Modal */}
          <View className="pt-2">
            <Text>Your Fashion Style</Text>
            <Text>Edgy</Text>
          </View>
          <Button onPress={() => setFashionStyleShowModal(true)} className="bg-[#EF798A]">
            <ButtonText>Take Fashion Style Quiz</ButtonText>
          </Button>
        <Modal
        isOpen={showFashionStyleModal}
        onClose={() => {
          setFashionStyleShowModal(false)
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="font-poppins-bold">
              Find your Fashion Style
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
           {userId && token && <FashionStyle userId={userId} token={token} />}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </View>
      </View>



    </SafeAreaView>
  )
}

export default Dashboard