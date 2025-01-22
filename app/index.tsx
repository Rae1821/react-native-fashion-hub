import images from "@/constants/images";
import { Link } from "expo-router";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";


export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
           <View className="px-10 mt-12">
             <Text className="text-6xl pt-2 font-poppins-extrabold tracking-tighter">Discover</Text>
             <Text className="text-6xl text-red-300 font-poppins-extrabold tracking-widest pt-2">Your
               <Text className="text-6xl font-poppins-exrabold text-black pt-2">
                 {" "}Style
               </Text>
             </Text>

             <TouchableOpacity className="mt-8 border-4 border-black py-3">
             <Link href="/sign-in" className="text-center font-poppins-extrabold text-lg">Sign in here</Link>
             </TouchableOpacity>

             <View className="flex flex-row mt-3 justify-center items-center gap-2">
               <Text>Don't have an account?</Text>
                <Link href="/sign-up" className="font-poppins-medium underline">Sign up</Link>

             </View>


           </View>
           <Image source={images.hero} className="w-full h-[500px] absolute bottom-0" />
       </SafeAreaView>
  );
}
