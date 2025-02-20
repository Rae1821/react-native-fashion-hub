import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Input, InputField } from './ui/input';
import { VStack } from './ui/vstack';
import { Button, ButtonText } from './ui/button';
import axios from 'axios';
// import { updateUser } from '@/utils/helper';
// import { useAuth } from '@/lib/ctx';
import Checkbox from 'expo-checkbox';
import { currentIPAddress } from '@/lib/helper';
import { Divider } from './ui/divider';
import { set } from 'react-hook-form';


interface BodyShapeProps {
  userId: string;
  token: string;
}

const BodyShape: React.FC<BodyShapeProps> = ({ userId, token }) => {
  const [shapeResults, setShapeResults] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [measurements, setMeasurements] = useState({
    shoulders: '',
    waist: '',
    hips: '',
  });


  const handleCalculateShape = () => {
    const shoulders = measurements.shoulders;
    const waist = measurements.waist;
    const hips = measurements.hips;

    const shouldersNum = parseInt(shoulders);
    const waistNum = parseInt(waist);
    const hipsNum = parseInt(hips);

    let calculatedShape = '';

    try {
      if (hipsNum / shouldersNum >= 1.05 && waist < hips) {
        calculatedShape = "Pear";
      } else if (shouldersNum / hipsNum >= 1.05 && waistNum === shouldersNum) {
        calculatedShape = "Apple";
      } else if (
        waistNum / shouldersNum <= 0.75 &&
        waistNum / hipsNum < 0.75 &&
        hipsNum * 0.95 < shouldersNum
      ) {
        calculatedShape = "Hourglass";
      } else if (shouldersNum / hipsNum >= 1.05 && waistNum < shouldersNum) {
        calculatedShape = "Triangle";
      } else if (waistNum / shouldersNum >= 0.75 && shouldersNum * 0.95 < hipsNum) {
        calculatedShape = "Rectangle";
      } else if (shoulders === null || waist === null || hips === null) {
        console.log("Please fill in all fields");
      }

      setShapeResults(calculatedShape);
      handleSaveShape(calculatedShape);

      return shapeResults;
    } catch (err) {
      console.log(err);
    }
  };


// Save shape to database
  const handleSaveShape = async (shape: string) => {
    if(isChecked) {
      try {
        const response = await axios.put(`http://${currentIPAddress}:3000/api/user/${userId}`, { bodyShape: shape }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }

  };


  const handleReset = () => {
    setShapeResults("");
    setMeasurements({
      shoulders: '',
      waist: '',
      hips: '',
    });
    setIsChecked(false);
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
              value={measurements.shoulders}
              onChangeText={text => setMeasurements({ ...measurements, shoulders: text })}
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
            value={measurements.waist}
            onChangeText={text => setMeasurements({ ...measurements, waist: text })}
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
            value={measurements.hips}
            onChangeText={text => setMeasurements({ ...measurements, hips: text })}
          />
        </Input>
      </VStack>
      <View className="flex flex-row items-center mt-5 gap-2">
       <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
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

      <Divider className="my-8" />

    {shapeResults && (
      <View className="mt-10 flex flex-row items-center">
        <Text className="font-poppins">Your body shape is: {" "}</Text>
        <Text className="font-poppins-bold text-2xl">{shapeResults}</Text>
      </View>
        )}
    </View>
  )
}

export default BodyShape