import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Search() {
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([
    '검색어1',
    '검색어2',
    '검색어3',
    '검색어4',
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText} numberOfLines={1}>
        {item}
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="close" size={16} color="#4f4f4f" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.searchBarWrap}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#9f9f9f" />
            <TextInput
              style={styles.searchInput}
              placeholder="씨드 제목과 메모를 검색해보세요"
              placeholderTextColor="#9f9f9f"
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelBtn}
          >
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>최근 검색어</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.clearAll}>비우기</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recent}
          keyExtractor={(item, idx) => `${item}-${idx}`}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 20,
  },
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 42,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
  },
  cancelBtn: {
    marginLeft: 13,
  },
  cancelText: {
    fontSize: 14,
    color: '#4f4f4f',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearAll: {
    fontSize: 12,
    color: '#4f4f4f',
  },

  itemRow: {
    marginBottom: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
});
