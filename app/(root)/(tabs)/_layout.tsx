import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/app-example/components/ui/IconSymbol.ios';

const TabLayout = () => {
  return (
    <Tabs
        screenOptions={{
            headerShown: false,
        }}
    >
     <Tabs.Screen
        name="dashboard"
        options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
     />
     <Tabs.Screen
        name="products"
        options={{
            title: 'Products',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
     />
    </Tabs>
  )
}

export default TabLayout