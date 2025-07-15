import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.seconds || 0
        }));
        const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
        setOrders(sortedData);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.products?.some(product =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detay', { order: item })}>
      <View style={styles.card}>
        <Text style={styles.date}>
          📅 {new Date(item.createdAt * 1000).toLocaleString('tr-TR')}
        </Text>
        <Text style={styles.title}>{item.orderCreator}</Text>
        <Text style={styles.line}>🧾 Sipariş Sahibi: {item.customerName}</Text>
        <Text style={styles.line}>🚚 Araç: {item.vehicleType} - {item.vehiclePlate}</Text>
        <Text style={styles.line}>🧍‍♂️ Sürücü: {item.driverName} ({item.driverPhone})</Text>
        <Text style={styles.line}>📦 Taşıma Tipi: {item.shipmentType}</Text>
        <Text style={styles.line}>⚖️ Toplam Ağırlık: {item.totalWeight} kg</Text>

        {item.products && item.products.length > 0 && (
          <View style={styles.productSection}>
            <Text style={styles.subTitle}>🛒 Ürünler:</Text>
            {item.products.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Text style={styles.productText}>
                  • {product.productName} — {product.palletCount} palet, {product.weight} kg
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.note}>
          📝 Not: {item.deliveryNote ? item.deliveryNote : 'Belirtilmemiş'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Ürün adına göre ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>Sonuç bulunamadı.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8'
  },
  listContent: {
    padding: 10
  },
  searchBar: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 14,
    elevation: 2
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  date: {
    fontSize: 13,
    color: '#999',
    marginBottom: 5
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  line: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3
  },
  note: {
    fontSize: 14,
    color: '#1c7ed6',
    marginTop: 8,
    fontStyle: 'italic'
  },
  productSection: {
    marginTop: 8,
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333'
  },
  productItem: {
    marginBottom: 4
  },
  productText: {
    fontSize: 14,
    color: '#444'
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888'
  }
});
