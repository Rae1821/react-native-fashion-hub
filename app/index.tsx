import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";


export default function Index() {
  return (
    <SafeAreaView className="flex flex-col items-center justify-center">
      <View>
      <Text className="text-5xl text-pink-500">Hello World</Text>

<Link href="/sign-in">Sign in</Link>
      </View>

    </SafeAreaView>
  );
}
