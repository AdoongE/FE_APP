import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Search({ route }) {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([]);

  const returnMode = route.params?.returnMode || 'search';
  const categoryId = route.params?.categoryId;
  const categoryName = route.params?.categoryName;

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    const recentSearches = await AsyncStorage.getItem('recentSearches');
    if (recentSearches) {
      setRecent(JSON.parse(recentSearches));
    }
  };

  const handleSearch = async (searchText = query) => {
    if (!searchText.trim()) return;

    saveRecentSearch(searchText);
    navigation.navigate('seedList', {
      mode: returnMode,
      searchKeyword: searchText,
      categoryId,
      categoryName,
    });
  };

  const saveRecentSearch = async (searchTerm) => {
    const updatedRecent = recent.filter((item) => item !== searchTerm); // 이미 존재하는 검색어 제거
    const newRecentSearches = [searchTerm, ...updatedRecent];

    setRecent(newRecentSearches);
    await AsyncStorage.setItem(
      'recentSearches',
      JSON.stringify(newRecentSearches),
    );
  };

  const clearAll = async () => {
    await AsyncStorage.removeItem('recentSearches');
    setRecent([]);
  };

  const removeItem = async (term) => {
    const updatedRecent = recent.filter((it) => it !== term);
    setRecent(updatedRecent);
    await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.searchBarWrap}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#9f9f9f" />
            <TextInput
              style={styles.searchInput}
              placeholder="찾고 싶은 씨드를 검색하세요."
              placeholderTextColor="#9f9f9f"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => handleSearch(query)}
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
          {recent.length > 0 && (
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearAll}>비우기</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={recent}
          keyExtractor={(item, idx) => `${item}-${idx}`}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={styles.searchTermTouchable}
                onPress={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
              >
                <Text style={styles.itemText} numberOfLines={1}>
                  {item}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeItem(item)}>
                <Ionicons name="close" size={16} color="#4f4f4f" />
              </TouchableOpacity>
            </View>
          )}
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
