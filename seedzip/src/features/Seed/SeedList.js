import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { getAllSeeds } from '../../api/SeedApi';
import SeedItem from './SeedItem';
import FilterModal from './FilterModal';

const SeedList = ({ navigation }) => {
  const [seeds, setSeeds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  // 저장형식, 정렬 필터링
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
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
  };

  // const handleTagSelect = (tag) => {
  //   if (selectedTags.includes(tag)) {
  //     setSelectedTags(selectedTags.filter((t) => t !== tag));
  //   } else {
  //     setSelectedTags([...selectedTags, tag]);
  //   }
  // };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const applyFilters = (newType, newSort) => {
    setSelectedType(newType);
    setSelectedSort(newSort);
    setFilterModalVisible(false);
  };

  const filteredSeeds = () => {
    return (
      seeds
        .filter((seed) => {
          // TODO: 검색어 필터링
          const matchesSearch =
            searchText === '' ||
            seed.seedName.toLowerCase().includes(searchText.toLowerCase());

          // TODO: 태그 필터링
          const matchesTags =
            selectedTags.length === 0 ||
            (seed.tagName &&
              selectedTags.some((tag) => seed.tagName.includes(tag)));
          // 저장형식 필터링
          const matchesType = !selectedType || seed.seedType === selectedType;
          return matchesSearch && matchesTags && matchesType;
        })
        // 정렬 필터링
        .sort((a, b) => {
          if (selectedSort === 'name') {
            return a.seedName.localeCompare(b.seedName);
          }
          return b.seedId - a.seedId;
        })
    );
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tagsContainer}>
              {selectedTags.map((tag) => (
                <View key={tag} style={styles.tagButton}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <TouchableOpacity
                    key={tag}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleTagRemove(tag);
                    }}
                  >
                    <Ionicons name="close" size={12} color="#4f4f4f" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.line} />
        {/* 저장형식 · 정렬 버튼 */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              setFilterModalVisible(true);
            }}
          >
            <Text style={styles.filterText}>저장형식 · 정렬</Text>
            <Ionicons name="chevron-down" size={14} color="#4f4f4f" />
          </TouchableOpacity>
        </View>

        {/* 씨드 목록 */}
        <FlatList
          data={filteredSeeds()}
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

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        initialType={selectedType}
        initialSort={selectedSort}
        onApply={applyFilters}
      />
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
