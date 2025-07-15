import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export default function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.product} - {item.amount} adet</Text>
      <Text>Oluşturan: {item.orderCreator}</Text>
      <Text>Müşteri: {item.customerName}</Text>
      <Text>Araç Türü: {item.vehicleType}</Text>
      <Text>Taşıma Tipi: {item.shipmentType}</Text>
      <Text>Plaka: {item.vehiclePlate}</Text>
      <Text>Sürücü: {item.driverName}</Text>
      <Text>Sürücü Tel: {item.driverPhone}</Text>
      <Text>Alıcı: {item.recipientName}</Text>
      <Text>Alıcı Tel: {item.recipientPhone}</Text>
      <Text>İrsaliye Notu: {item.deliveryNote}</Text>
    </View>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  }
});
