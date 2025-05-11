import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AllCategory = () => {
  const totalCategory = 30;
  const totalSeed = 250;
  const popular = 25;
  const unread = 25;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>모든 카테고리({totalCategory})</Text>
        <TouchableOpacity>
          <Ionicons name="add-outline" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>전체 씨드</Text>
          <Text>
            <Text style={styles.cardNumber}>{totalSeed}</Text>
            <Text style={styles.cardCount}>개</Text>
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>많이 찾는 씨드</Text>
          <Text>
            <Text style={styles.cardNumber}>{popular}</Text>
            <Text style={styles.cardCount}>개</Text>
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>읽지 않은 씨드</Text>
          <Text>
            <Text style={styles.cardNumber}>{unread}</Text>
            <Text style={styles.cardCount}>개</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AllCategory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  cardsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  card: {
    flex: 1,
    gap: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#41c3ab',
  },
  cardCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4f4f4f',
  },
  cardLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#4f4f4f',
  },
});
