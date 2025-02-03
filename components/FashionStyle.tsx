import { View, Text } from 'react-native'
import React from 'react'
import { questions } from '@/constants'


interface FashionStyleProps {
    userId: string;
    token: string;
  }

const FashionStyle: React.FC<FashionStyleProps> = ({ userId, token}) => {
  return (
    <View>
        <Text>Select the answer that most represents you</Text>

        <View>
            {questions.map((question, index) => (
                <View className="flex mt-5 font-poppins" key={index}>
                    <Text>{question.id}</Text>
                    <Text>{question.text}</Text>
                    <View>
                        {question.answers.map((answer, index) => (
                            <Text key={index}>{answer.text}</Text>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    </View>
  )
}

export default FashionStyle