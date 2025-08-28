// src/screens/InfoPage.jsx (MOCK 버전)
import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getNotice } from '../../../api/MyPageApi';

function Badge({ label, type = 'new' }) {
  const isNew = type === 'new';
  return (
    <View
      style={[styles.badge, isNew ? styles.badgeNew : styles.badgeImportant]}
    >
      <Text
        style={[
          styles.badgeText,
          isNew ? styles.badgeNewText : styles.badgeImportantText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function ItemRow({ item }) {
  const { id, title, isNew, isImportant, createdAt } = item;
  const formattedDate = (() => {
    const d = createdAt ? new Date(createdAt) : null;
    if (!d || isNaN(d.getTime())) return 'YYYY.MM.DD';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  })();
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('info_detail', { id })}>
      <View style={styles.item}>
        <View style={styles.badgeRow}>
          {isNew && <Badge label="NEW" type="new" />}
          {isImportant && <Badge label="중요" type="important" />}
        </View>

        <View style={styles.itemMain}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#9F9F9F" />
        </View>

        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.divider} />
    </Pressable>
  );
}

export default function InfoPage() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      setItems(MOCK_NOTICES);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchNotices = async () => {
      try {
        const infoList = await getNotice();
        setItems(infoList);
        setLoading(false);
      } catch (err) {
        console.error('Info 목록 로딩 실패:', err);
      }
    };

    fetchNotices();
  });

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotices();
  };

  const renderItem = ({ item }) => (
    <ItemRow
      item={item}
      onPress={() => navigation.navigate('InfoDetail', { id: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={22}
          color="#111"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>공지사항</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  listContent: { paddingTop: 8, paddingHorizontal: 16, paddingBottom: 20 },
  item: { paddingVertical: 12 },
  badgeRow: { flexDirection: 'row', gap: 5, marginBottom: 6 },
  itemMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 16, fontWeight: '400', marginTop: 5 },
  date: { marginTop: 12, fontSize: 12, color: '#9F9F9F' },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DCDADA',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 28,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  badgeNew: { backgroundColor: '#FFF', borderColor: '#41C3AB' },
  badgeNewText: { color: '#41C3AB', fontWeight: '500', fontSize: 12 },
  badgeImportant: { backgroundColor: '#FFF', borderColor: '#4F4F4F' },
  badgeImportantText: { color: '#4F4F4F', fontWeight: '500', fontSize: 12 },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
