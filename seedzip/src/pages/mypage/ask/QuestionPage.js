import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFaq } from '../../../api/MyPageApi';

export default function QuestionPage() {
  const navigation = useNavigation();
  const [tab, setTab] = useState('service');
  const [expandedId, setExpandedId] = useState(null);
  const [faq, setFaq] = useState([]);
  const data = tab === 'service' ? faq : [];

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const faqList = await getFaq();
        setFaq(faqList);
        console.log(faqList);
      } catch (err) {
        console.error('FAQ 로딩 실패:', err);
      }
    };
    fetchFaq();
  }, []);

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderItem = ({ item }) => {
    const isOpen = expandedId === item.id;

    return (
      <View>
        <Pressable style={styles.row} onPress={() => toggle(item.id)}>
          <Text style={styles.qPrefix}>
            <Text style={styles.qPrefixNum}>Q{item.order}.</Text>{' '}
            <Text style={styles.qTitle}>{item.question}</Text>
          </Text>
          <Ionicons
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#9F9F9F"
          />
        </Pressable>

        {isOpen && <Text style={styles.answer}>{item.answer}</Text>}

        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={22}
          color="#111"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.tabs}>
        <Pressable style={styles.tabBtn} onPress={() => setTab('service')}>
          <Text
            style={[styles.tabText, tab === 'service' && styles.tabActiveText]}
          >
            서비스
          </Text>
          {tab === 'service' && <View style={styles.tabIndicator} />}
        </Pressable>

        <Pressable style={styles.tabBtn} onPress={() => setTab('payment')}>
          <Text
            style={[styles.tabText, tab === 'payment' && styles.tabActiveText]}
          >
            결제/환불
          </Text>
          {tab === 'payment' && <View style={styles.tabIndicator} />}
        </Pressable>
      </View>

      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>등록된 내용이 없습니다.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const GREEN = '#41C3AB';

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

  tabs: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 0,
    borderBottomColor: '#E6E6EA',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  tabBtn: {
    flex: 1,
    alignItems: 'center',
  },

  tabText: { fontSize: 16, color: '#9F9F9F', fontWeight: '600' },
  tabActiveText: { color: GREEN },

  tabIndicator: {
    marginTop: 8,
    height: 2,
    width: '60%',
    backgroundColor: GREEN,
    borderRadius: 2,
  },

  listContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20 },

  row: {
    minHeight: 58,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  qPrefix: { flex: 1, paddingRight: 12 },
  qPrefixNum: { color: GREEN, fontWeight: '600', fontSize: 16 },
  qTitle: { fontSize: 16, fontWeight: '400' },

  answer: {
    color: '#4F4F4F',
    lineHeight: 16.8,
    marginTop: 5,
    marginBottom: 12,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E6E6EA',
    marginBottom: 4,
  },

  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#9F9F9F' },
});
