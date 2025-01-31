import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

// import { Button, ButtonText } from './ui/button';
// import { Heading } from './ui/heading';
import { Input, InputField } from './ui/input';
// import { Controller, useForm } from 'react-hook-form';
import { VStack } from './ui/vstack';
import { Button, ButtonText } from './ui/button';
import { HStack } from './ui/hstack';


const BodyShape = () => {
  const [shapeResults, setShapeResults] = useState('');
  const [shoulders, setShoulders] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');

  // const { control, handleSubmit } = useForm();


  // interface CalculateShapeEvent extends React.FormEvent<HTMLFormElement> {
  //   target: EventTarget & HTMLFormElement;
  // }

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

      return shapeResults;
    } catch (err) {
      console.log(err);
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
      <View className="flex justify-end gap-4 items-center mt-5 flex-row">
        <Button onPress={handleReset} variant="outline">
            <ButtonText>Reset</ButtonText>
          </Button>
          <Button onPress={handleCalculateShape}>
            <ButtonText>Calculate</ButtonText>
          </Button>
      </View>

      <View>
      <Text>Your body shape is {" "}</Text>
      <Text>{shapeResults}</Text>
      </View>

    </View>
  )
}

export default BodyShape