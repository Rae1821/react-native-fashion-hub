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
import { appleBodyCharacteristic, bestAppleProducts, bestHourglassProducts, bestInvertedTriangleProducts, bestPearProducts, bestRectangleProducts, hourglassBodyCharacteristic, invertedTriangleBodyCharacteristic, pearBodyCharacteristic, rectangleBodyCharacteristic } from '@/constants';
import {
Triangle,
Hourglass,
RectangleVertical,
Apple,
Shirt,
} from "lucide-react-native"
import { currentIPAddress } from '@/lib/helper';

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

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`http://${currentIPAddress}:3000/api/user/${userId}`, {
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

  useEffect(() => {
    if (userId) {
      getUserInfo();
    }
  }, []);




  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-4 flex flex-row justify-between items-center border-b border-gray-100">
        <Text className="mt-4 font-poppins-bold text-xl">Fashion Hub</Text>
        <Button onPress={signOut} variant="link" size="sm">
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </View>
      <View className="mt-10 px-4 flex items-center gap-2 flex-row">
        <Text className="bg-gray-200 h-10 w-10 rounded-full"></Text>
        <View>
          <Text className="font-poppins-medium text-lg">Hello {user?.name}</Text>
          <Text className="font-poppins-light text-xs">Discover your style</Text>
        </View>
      </View>

      {/* <Text>{JSON.stringify(userProfile)}</Text>÷ */}

      <View className="flex flex-col items-center justify-center mt-10">
        <Accordion className="w-[95%] p-2 border border-outline-50 bg-white shadow-sm rounded-lg" type="single">
          <AccordionItem value="bodyShape" className="">
            <AccordionHeader className="py-4">
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                    <AccordionTitleText className="font-poppins-bold text-lg bg-white">Your Body Shape is: {userProfile?.bodyShape}</AccordionTitleText>
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
                  <Text className="font-poppins-medium mb-2">{userProfile?.bodyShape} body shape characteristics:</Text>

                  {userProfile?.bodyShape === "Pear" ? (
                      <FlatList
                        data={pearBodyCharacteristic.map((characteristic, idx) => ({ key: idx.toString(), characteristic }))}
                        renderItem={({ item }) =>
                        <View className="flex flex-row items-center gap-2">
                          <Icon className="text-typography-500" as={Triangle} />
                          <Text className="font-poppins">{item.characteristic}</Text>
                        </View>
                        }
                      />
                  ) : userProfile?.bodyShape === "Apple" ? (
                    <FlatList
                      data={appleBodyCharacteristic.map((characteristic, idx) => ({ key: idx.toString(), characteristic }))}
                      renderItem={({ item }) => <Text>{item.characteristic}</Text>}
                    />
                  ) : userProfile?.bodyShape === "Rectangle" ? (
                    <FlatList
                      data={rectangleBodyCharacteristic.map((characteristic, idx) => ({ key: idx.toString(), characteristic }))}
                      renderItem={({ item }) => <Text>{item.characteristic}</Text>}
                    />
                  ) : userProfile?.bodyShape === "Inverted Triangle" ? (
                    <FlatList
                      data={invertedTriangleBodyCharacteristic.map((characteristic, idx) => ({ key: idx.toString(), characteristic }))}
                      renderItem={({ item }) => <Text>{item.characteristic}</Text>}
                    />
                  ) : userProfile?.bodyShape === "Hourglass" ? (
                    <FlatList
                      data={hourglassBodyCharacteristic.map((characteristic, idx) => ({ key: idx.toString(), characteristic }))}
                      renderItem={({ item }) => <Text>{item.characteristic}</Text>}
                    />
                  ) : null}

                  <View className="mt-4">
                    <Text className="font-poppins-medium">Common clothing items include:</Text>
                      {userProfile?.bodyShape === "Pear" ? (
                        <FlatList
                        data={bestPearProducts.map((product, idx) => ({ key: idx.toString(), product }))}
                        renderItem={({ item }) =>
                        <View className="flex flex-row items-center gap-2">
                          <Icon className="text-typography-500" as={Shirt} />
                          <Text className="font-poppins">{item.product}</Text>
                        </View>
                        }
                      />
                      ) : userProfile?.bodyShape === "Apple" ? (
                        <FlatList
                        data={bestAppleProducts.map((product, idx) => ({ key: idx.toString(), product }))}
                        renderItem={({ item }) =>
                        <View className="flex flex-row items-center gap-2">
                          <Icon className="text-typography-500" as={Shirt} />
                          <Text className="font-poppins">{item.product}</Text>
                        </View>
                        }
                      />
                      ) : userProfile?.bodyShape === "Rectangle" ? (
                        <FlatList
                        data={bestRectangleProducts.map((product, idx) => ({ key: idx.toString(), product }))}
                        renderItem={({ item }) =>
                        <View className="flex flex-row items-center gap-2">
                          <Icon className="text-typography-500" as={Shirt} />
                          <Text className="font-poppins">{item.product}</Text>
                        </View>
                        }
                      />
                      ) : userProfile?.bodyShape === "Inverted Triangle" ? (
                        <FlatList
                        data={bestInvertedTriangleProducts.map((product, idx) => ({ key: idx.toString(), product }))}
                        renderItem={({ item }) =>
                        <View className="flex flex-row items-center gap-2">
                          <Icon className="text-typography-500" as={Shirt} />
                          <Text className="font-poppins">{item.product}</Text>
                        </View>
                        }
                      />
                      ) : userProfile?.bodyShape === "Hourglass" ? (
                        <FlatList
                        data={bestHourglassProducts.map((product, idx) => ({ key: idx.toString(), product }))}
                        renderItem={({ item }) =>
                        <View className="flex flex-row items-center gap-2">
                          <Icon className="text-typography-500" as={Shirt} />
                          <Text className="font-poppins">{item.product}</Text>
                        </View>
                        }
                      />
                      ) : null}
                  </View>

                  <View className="mt-4">
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
        <ModalContent className="">
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