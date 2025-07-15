import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail'; // detay sayfası

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Siparişler" component={OrderList} />
        <Stack.Screen name="Detay" component={OrderDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
