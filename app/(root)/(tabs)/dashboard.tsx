import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/ctx';

const Dashboard = () => {
  const { user, token, signOut} = useAuth();
  console.log(user?.email)

  // useEffect(() => {
  //   axios.get('/api/user')
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the user")
  //     });
  // })

  return (
    <SafeAreaView>
      <Text>Dashboard</Text>
      <Text>Hello {user?.name}</Text>
    </SafeAreaView>
  )
}

export default Dashboard