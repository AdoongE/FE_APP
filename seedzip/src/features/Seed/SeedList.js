import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { getAllSeeds } from '../../api/SeedApi';
import SeedItem from './SeedItem';
import useSeedActions from '../../hooks/useSeedActions';

const SeedList = ({ navigation }) => {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([
    '일상',
    '공부',
    '여행',
    '레시피',
  ]);

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    try {
      setLoading(true);
      const resAllSeeds = await getAllSeeds();
      const seedData = resAllSeeds[0].seedInfoList.map((item) => ({
        seedId: item.seedId,
        seedName: item.seedName,
        categoryName: item.categoryName,
        seedType: item.seedType,
        thumbnailImage: item.thumbnailImage,
        tagName: item.tagName,
      }));
      setSeeds(seedData);
    } catch (error) {
      console.error('씨드 목록 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filterSeeds = () => {
    return seeds.filter((seed) => {
      // 검색어 필터링
      const matchesSearch =
        searchText === '' ||
        seed.seedName.toLowerCase().includes(searchText.toLowerCase());

      // 태그 필터링
      const matchesTags =
        selectedTags.length === 0 ||
        (seed.tagName && selectedTags.includes(seed.tagName));

      return matchesSearch && matchesTags;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: 20 }}>
        {/* 검색창 */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9f9f9f" />
          <TextInput
            style={styles.searchInput}
            placeholder="씨드 제목과 메모를 검색해보세요"
            placeholderTextColor="#9f9f9f"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.line} />
        {/* 태그 선택 */}
        <View style={styles.rowContainer}>
          <Feather
            name="tag"
            size={14}
            color="#4f4f4f"
            style={{ marginTop: 2 }}
          />
          <Text style={styles.sectionTitle}>태그 선택</Text>
          <View style={styles.tagsContainer}>
            {availableTags.map((tag) => (
              <View key={tag} style={styles.tagButton}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity
                  key={tag}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleTagSelect(tag);
                  }}
                >
                  <Ionicons name="close" size={12} color="#4f4f4f" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.line} />
        {/* 저장형식 · 정렬 버튼 */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>저장형식 · 정렬</Text>
            <Ionicons name="chevron-down" size={14} color="#4f4f4f" />
          </TouchableOpacity>
        </View>

        {/* 씨드 목록 */}
        <FlatList
          data={filterSeeds()}
          keyExtractor={(item) => item.seedId.toString()}
          renderItem={({ item }) => (
            <SeedItem
              seed={item}
              onPress={() =>
                navigation.navigate('view', { seedId: item.seedId })
              }
              onDeleteSuccess={(deletedId) => {
                setSeeds((prev) =>
                  prev.filter((seed) => seed.seedId !== deletedId),
                );
              }}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 14,
    marginTop: 32,
    height: 42,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
  },
  line: {
    height: 1,
    backgroundColor: '#f2f2f2',
    marginVertical: 12,
    marginHorizontal: -20,
  },
  sectionTitle: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: -5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tagButton: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
  },
  tagButtonSelected: {
    backgroundColor: '#41C3AB',
  },
  tagText: {
    color: '#4f4f4f',
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: '#4f4f4f',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  listContainer: {
    paddingHorizontal: 4,
  },
});

export default SeedList;
