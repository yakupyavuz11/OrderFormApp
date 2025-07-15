import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function OrderDetail({ route }) {
  const { order } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧾 Sipariş Detayı</Text>
      <Text style={styles.line}>📅 {new Date(order.createdAt * 1000).toLocaleString("tr-TR")}</Text>
      <Text style={styles.line}>🧾 Müşteri: {order.customerName}</Text>
      <Text style={styles.line}>🧍‍♂️ Sürücü: {order.driverName} - {order.driverPhone}</Text>
      <Text style={styles.line}>🚚 Araç: {order.vehicleType} - {order.vehiclePlate}</Text>
      <Text style={styles.line}>📦 Taşıma Tipi: {order.shipmentType}</Text>
      <Text style={styles.line}>⚖️ Toplam Ağırlık: {order.totalWeight} kg</Text>

      {order.products && (
        <View style={styles.products}>
          <Text style={styles.subTitle}>🛒 Ürünler:</Text>
          {order.products.map((p, i) => (
            <Text key={i} style={styles.product}>
              • {p.productName} ({p.palletCount} palet, {p.weight} kg)
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.note}>
        📝 Not: {order.deliveryNote || "Belirtilmemiş"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  line: { fontSize: 15, marginBottom: 5 },
  subTitle: { fontWeight: '600', marginTop: 10 },
  product: { fontSize: 14, marginBottom: 3 },
  note: { fontStyle: 'italic', color: '#1c7ed6', marginTop: 10 }
});
