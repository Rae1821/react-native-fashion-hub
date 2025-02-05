import { View, Text } from 'react-native';
import React from 'react';
import { questions } from '@/constants';

import { ChevronDownIcon } from "@/components/ui/icon";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from './ui/select';
import { Button, ButtonText } from './ui/button';


interface FashionStyleProps {
    userId: string;
    token: string;
  }

const FashionStyle: React.FC<FashionStyleProps> = ({ userId, token}) => {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);


  return (
    <View>
        <Text className="font-poppins-light text-sm">Select the answer that most represents you</Text>

        <View className="p-2">
            {questions.map((question, index) => (
                <View className="flex mt-5 font-poppins" key={index}>
                    <View className="flex flex-row gap-2 mb-2">
                        <Text className="font-poppins-bold">{question.id}.</Text>
                        <Text className="font-poppins-medium">{question.text}</Text>
                    </View>

                        <View>
                            <Select>
                                <SelectTrigger variant="outline" size="md" className="flex flex-row justify-between" >
                                    <SelectInput placeholder="Select option" />
                                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop/>
                                    <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    {question.answers.map((answer, index) => (
                                    <SelectItem key={index} label={answer.text} value={answer.text} />
                                ))}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                        </View>
                </View>
            ))}
        </View>
        <View>
            <Button>
                <ButtonText>Submit</ButtonText>
            </Button>
            <Button variant="link">
                <ButtonText>Start over</ButtonText>
            </Button>
        </View>
    </View>
  )
}

export default FashionStyle