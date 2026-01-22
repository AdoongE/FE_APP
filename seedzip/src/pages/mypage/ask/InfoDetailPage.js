import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDetailNotice } from '../../../api/MyPageApi';

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

export default function InfoDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route?.params?.id;

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const detail = await getDetailNotice(id);
        if (mounted) setItem(detail ?? null);
      } catch (e) {
        console.error(
          '상세 Info 로딩 실패:',
          e?.response?.data || e?.message || e,
        );
        if (mounted) setItem(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id != null) fetchDetail();
    else setLoading(false);

    return () => {
      mounted = false;
    };
  }, [id]);

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
      ) : !item ? (
        <View style={styles.loader}>
          <Text style={{ color: '#999' }}>존재하지 않는 공지입니다.</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
        >
          <View style={styles.badgeRow}>
            {!!item.isNew && <Badge label="NEW" type="new" />}
            {!!item.isImportant && <Badge label="중요" type="important" />}
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.createdAt}</Text>

          <View style={styles.divider} />

          <Text style={styles.bodyText}>{item.content}</Text>
        </ScrollView>
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
  headerTitle: { fontSize: 16, fontWeight: '600' },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  badgeRow: { flexDirection: 'row', gap: 5, marginTop: 6, marginBottom: 10 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 28,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  badgeText: { fontWeight: '500', fontSize: 12 },
  badgeNew: { backgroundColor: '#FFF', borderColor: '#41C3AB' },
  badgeNewText: { color: '#41C3AB' },
  badgeImportant: { backgroundColor: '#FFF', borderColor: '#4F4F4F' },
  badgeImportantText: { color: '#4F4F4F' },
  title: { fontSize: 20, fontWeight: '400', lineHeight: 20 },
  date: { marginTop: 12, color: '#9F9F9F', fontSize: 12 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DCDADA',
    marginVertical: 14,
  },
  bodyText: { fontSize: 16, lineHeight: 20.8 },
});
