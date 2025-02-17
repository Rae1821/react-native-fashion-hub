import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { questions } from '@/constants';
import { Button, ButtonText } from './ui/button';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from './ui/radio';
  import { CircleIcon } from "@/components/ui/icon"


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




    // map through the questions and answers
    // when a user clicks an answer for each question, that answer is added to the selectedAnswers array
    // the selectedAnswers array is then used to calculate the user's fashion style


    const handleSelect = (questionId: number, value: string) => {
        setSelectedAnswer((prev) => ({ ...prev, [questionId]: value }));
        setAnswersArr((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[questionId] = value;
            return updatedAnswers;
        });
        handleFindStyle();
    }

    const handleFindStyle = () => {
        const style = {
            Boho: 0,
            Chic: 0,
            Classic: 0,
            Sporty: 0,
            Edgy: 0,
        };

        answersArr.map((answer) => {
            if (answer === 'Boho') {
                style.Boho += 1;
            } else if (answer === 'Chic') {
                style.Chic += 1;
            } else if (answer === 'Classic') {
                style.Classic += 1;
            } else if (answer === 'Sporty') {
                style.Sporty += 1;
            } else if (answer === 'Edgy') {
                style.Edgy += 1;
            }
            setStyleObj(style);
        })

        // answersArr.forEach((answerObj) => {
        //     const answer = answerObj.answer;
        //     if (answer === 'Boho') {
        //         style.Boho += 1;
        //     } else if (answer === 'Chic') {
        //         style.Chic += 1;
        //     } else if (answer === 'Classic') {
        //         style.Classic += 1;
        //     } else if (answer === 'Sporty') {
        //         style.Sporty += 1;
        //     } else if (answer === 'Edgy') {
        //         style.Edgy += 1;
        //     }

        //     setStyleObj(style);
        // });
    }

    const handleSubmit = (obj: any) => {
        let highestCategory = 0;
        let winningCategory = '';

        for (const style in obj) {
            if (obj[style] > highestCategory) {
                highestCategory = obj[style];
                winningCategory = style;
            }
        }
        return setStyleResult(winningCategory);
    }

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


                    {/* <Text key={index}>{index}{answer.value}{answer.text}</Text> */}



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
        <View>
            <Text>{answersArr}</Text>
            <Button>
                <ButtonText onPress={() => {handleSubmit(styleObj)}}>Submit</ButtonText>
            </Button>
            <Button variant="link" onPress={handleStartOver}>
                <ButtonText>Start over</ButtonText>
            </Button>
        </View>
        <View>
            <Text>{styleResult}</Text>
            <Text>{JSON.stringify(styleObj)}</Text>

        </View>
    </ScrollView>
  )
}

export default FashionStyle