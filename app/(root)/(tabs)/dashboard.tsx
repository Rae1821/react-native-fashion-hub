import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/ctx';
import BodyShape from '@/components/BodyShape';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { CloseIcon, Icon } from '@/components/ui/icon';

const Dashboard = () => {
  const { user, token, signOut} = useAuth();
    const [showModal, setShowModal] = useState(false);

  // console.log(user?.email)



  return (
    <SafeAreaView>
      <Text>Dashboard</Text>
      <Text>Hello {user?.name}</Text>

      <View>
        <View>
        <Button onPress={() => setShowModal(true)}>
        <ButtonText>Show Modal</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
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
           <BodyShape />
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