import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddCategoryModal from './AddCategoryModal';
import { getUserSeedInfo } from '../../api/CategoryApi';

const AllCategory = ({ onAddCategory }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [userSeedInfo, setUserSeedInfo] = useState([]);

  const handleAdd = (name, isPublic) => {
    onAddCategory(name, isPublic);
    setOpenAddModal(false);
  };

  const fetchUserSeedInfo = async () => {
    const resSeedInfo = await getUserSeedInfo();
    setUserSeedInfo({
      totalCategory: resSeedInfo[0].totalCategoryCount,
      totalSeed: resSeedInfo[0].totalSeedCount,
      popular: resSeedInfo[0].mostReadSeedCount,
      unread: resSeedInfo[0].neverReadSeedCount,
    });
    setUserSeedInfo(seedInfoData);
  };

  useEffect(() => {
    fetchUserSeedInfo();
  }, [openAddModal]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>
            모든 카테고리({userSeedInfo.totalCategory})
          </Text>
          <TouchableOpacity onPress={() => setOpenAddModal(true)}>
            <Ionicons name="add-outline" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>전체 씨드</Text>
            <Text>
              <Text style={styles.cardNumber}>{userSeedInfo.totalSeed}</Text>
              <Text style={styles.cardCount}>개</Text>
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>많이 찾는 씨드</Text>
            <Text>
              <Text style={styles.cardNumber}>{userSeedInfo.popular}</Text>
              <Text style={styles.cardCount}>개</Text>
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>읽지 않은 씨드</Text>
            <Text>
              <Text style={styles.cardNumber}>{userSeedInfo.unread}</Text>
              <Text
                style={[
                  styles.cardCount,
                  { color: userSeedInfo.unread >= 30 ? '#41C3AB' : '#4f4f4f' },
                ]}
              >
                {userSeedInfo.unread < 30 ? '개' : '+'}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <AddCategoryModal
        visible={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        onAdd={handleAdd}
      />
    </>
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
  },
  cardLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#4f4f4f',
  },
});
