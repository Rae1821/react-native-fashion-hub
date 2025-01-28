import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/user')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user")
      });
  })

  return (
    <SafeAreaView>
      <Text>Dashboard</Text>
      <Text>Hello {user}</Text>
    </SafeAreaView>
  )
}

export default Dashboard