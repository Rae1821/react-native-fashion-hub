import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Input, InputField } from './ui/input';
import { VStack } from './ui/vstack';
import { Button, ButtonText } from './ui/button';
import axios from 'axios';
// import { updateUser } from '@/utils/helper';
// import { useAuth } from '@/lib/ctx';
import Checkbox from 'expo-checkbox';
import { currentIPAddress } from '@/utils/helper';


interface BodyShapeProps {
  userId: string;
  token: string;
}

const BodyShape: React.FC<BodyShapeProps> = ({ userId, token }) => {
  const [shapeResults, setShapeResults] = useState('');
  const [shoulders, setShoulders] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [isChecked, setChecked] = useState(false);


  const handleCalculateShape = () => {

    const shouldersNum = parseInt(shoulders);
    const waistNum = parseInt(waist);
    const hipsNum = parseInt(hips);

    try {
      if (hipsNum / shouldersNum >= 1.05 && waist < hips) {
        setShapeResults("Pear");
      } else if (shouldersNum / hipsNum >= 1.05 && waistNum === shouldersNum) {
        setShapeResults("Apple");
      } else if (
        waistNum / shouldersNum <= 0.75 &&
        waistNum / hipsNum < 0.75 &&
        hipsNum * 0.95 < shouldersNum
      ) {
        setShapeResults("Hourglass");
      } else if (shouldersNum / hipsNum >= 1.05 && waistNum < shouldersNum) {
        setShapeResults("Triangle");
      } else if (waistNum / shouldersNum >= 0.75 && shouldersNum * 0.95 < hipsNum) {
        setShapeResults("Rectangle");
      } else if (shoulders === null || waist === null || hips === null) {
        console.log("Please fill in all fields");
      }

      if(isChecked) {
        handleSaveShape();
      }
      return shapeResults;
    } catch (err) {
      console.log(err);
    }
  };


// Save shape to database
  const handleSaveShape = async () => {
    try {
      const response = await axios.put(`${currentIPAddress}:3000/api/user/${userId}`, { bodyShape: shapeResults }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const handleReset = () => {
    setShapeResults("");
  };

  return (
    <View>
      <Text className="font-poppins">Measure around each area of your body using inches</Text>
      <VStack space="xs" className="mt-5">
        <Text className="font-poppins-medium text-sm">Shoulder Measurement</Text>
          <Input
            variant="outline"
            size="sm"
            isDisabled={false}
            isInvalid={false}
          >
            <InputField
              placeholder="39"
              value={shoulders}
              onChangeText={text => setShoulders(text)}
            />
          </Input>
      </VStack>

      <VStack space="xs" className="mt-5">
        <Text className="font-poppins-medium text-sm">Waist Measurement</Text>
        <Input
          variant="outline"
          size="sm"
          isDisabled={false}
          isInvalid={false}
        >
          <InputField
            placeholder="29"
            value={waist}
            onChangeText={text => setWaist(text)}
          />
        </Input>
      </VStack>

      <VStack space="xs" className="mt-5">
        <Text className="font-poppins-medium text-sm">Hip Measurement</Text>
        <Input
          variant="outline"
          size="sm"
          isDisabled={false}
          isInvalid={false}
        >
          <InputField
            placeholder="41"
            value={hips}
            onChangeText={text => setHips(text)}
          />
        </Input>
      </VStack>
      <View className="flex flex-row items-center mt-5 gap-2">
       <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? 'black' : undefined}
        />
        <Text className="font-poppins">Save results to dashboard</Text>
      </View>
      <View className="flex justify-end gap-4 items-center mt-5 flex-row">
        <Button onPress={handleReset} variant="outline">
            <ButtonText>Reset</ButtonText>
          </Button>
          <Button onPress={handleCalculateShape}>
            <ButtonText>Calculate</ButtonText>
          </Button>
      </View>

      <View className="mt-10 flex flex-row items-center">
        <Text className="font-poppins">Your body shape is: {" "}</Text>
        <Text className="font-poppins-bold text-lg">{shapeResults}</Text>
      </View>
    </View>
  )
}

export default BodyShape