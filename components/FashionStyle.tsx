import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { questions } from '@/constants';
import { Button, ButtonText } from './ui/button';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from './ui/radio';
  import { CircleIcon } from "@/components/ui/icon"
import { Divider } from './ui/divider';


type Answer = {
    index: number;
    answer: string;
    text: string;
}

interface FashionStyleProps {
    userId: string;
    token: string;
  }

const FashionStyle: React.FC<FashionStyleProps> = ({ userId, token}) => {
    const [answersArr, setAnswersArr] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: string }>({});
    const [styleObj, setStyleObj] = useState({});
    const [styleResult, setStyleResult] = useState<string>("");



    const handleSelect = (questionId: number, value: string) => {
        setSelectedAnswer((prev) => ({ ...prev, [questionId]: value }));
        setAnswersArr((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[questionId] = value;
            handleFindStyle(updatedAnswers)
            return updatedAnswers;
        });
    }

    const handleFindStyle = (updatedAnswers: string[]) => {
        const style = {
            Boho: 0,
            Chic: 0,
            Classic: 0,
            Sporty: 0,
            Edgy: 0,
        };

        for(let i = 0; i < updatedAnswers.length; i++) {
            if (answersArr[i] === 'classic') {
                style.Classic += 1;
            } else if (answersArr[i] === 'boho') {
                style.Boho += 1;
            } else if (answersArr[i] === 'chic') {
                style.Chic += 1;
            } else if (answersArr[i] === 'sporty') {
                style.Sporty += 1;
            } else if (answersArr[i] === 'edgy') {
                style.Edgy += 1;
            }
            setStyleObj(style)
        }
    }


    const handleSubmit = (obj: { [key: string]: number }) => {
        let highestCategory = 0;
        let winningCategory = '';
        let tiedCategories: string[] = [];

        for (const style in obj) {
          if (obj[style] > highestCategory) {
            highestCategory = obj[style];
            winningCategory = style;
            tiedCategories = [style];
          } else if (obj[style] === highestCategory) {
            tiedCategories.push(style);
          }
        }

        if (tiedCategories.length > 1) {
          console.log('Tie between categories:', tiedCategories);
          // Handle tie logic here, e.g., randomly select one, prompt user, etc.
          setStyleResult(`Tie between: ${tiedCategories.join(' & ')}`);
        } else {
          setStyleResult(winningCategory);
        }
      };



    const handleStartOver = () => {
        setStyleObj({});
        setStyleResult("");
        setSelectedAnswer({});
        setAnswersArr([]);
    }



  return (
    <ScrollView className="p-4">
        <Text className="font-poppins-light text-sm">Select the answer that most represents you</Text>

        <View className="p-2">
            {questions.map((question, index) => (

                <View className="flex mt-5 font-poppins" key={index}>
                    <View className="flex flex-row gap-2 mb-2">
                        <Text className="font-poppins-bold">{question.id}.</Text>
                        <Text className="font-poppins-medium">{question.text}</Text>
                    </View>
                        <RadioGroup
                            key={question.id}
                            value={selectedAnswer[question.id] || ''}
                            onChange={(value) => handleSelect(question.id, value)}
                        >
                        {question.answers.map((answer, idx) => (
                        <Radio
                            key={idx}
                            value={answer.value}
                            size="md"
                            >
                          <RadioIndicator>
                            <RadioIcon as={CircleIcon} />
                          </RadioIndicator>
                          <RadioLabel>{answer.text}</RadioLabel>
                        </Radio>
                          ))}
                      </RadioGroup>

                </View>
            ))}
        </View>
        <View className="mt-4 flex flex-row items-center justify-between">
            <Button variant="solid">
                <ButtonText onPress={() => {handleSubmit(styleObj)}}>Submit</ButtonText>
            </Button>
            <Button variant="outline" onPress={handleStartOver}>
                <ButtonText>Start over</ButtonText>
            </Button>
        </View>
        <Divider className="my-8" />
        <View>
            {styleResult && (
                <View>
                    <Text className="font-poppins-medium text-2xl">Your style is: {styleResult}</Text>
                </View>
            )}
        </View>
        <View>
            {/* <Text>{styleResult}</Text> */}
            {/* <Text>{JSON.stringify(answersArr)}</Text> */}
            {/* <Text>{JSON.stringify(styleObj)}</Text> */}

        </View>
    </ScrollView>
  )
}

export default FashionStyle