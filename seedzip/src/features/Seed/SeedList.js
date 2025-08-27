import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import {
  getAllSeeds,
  getCategorySeeds,
  getPopularSeeds,
  getUnreadSeeds,
  searchSeeds,
  searchCategorySeeds,
  getFavoriteSeeds,
  searchFavoriteSeeds,
} from '../../api/SeedApi';
import SeedItem from './SeedItem';
import FilterModal from './FilterModal';
import UnreadDeleteBtn from './UnreadDeleteBtn';
import BottomNav from '../../components/BottomNav';

const SeedList = ({ navigation, route }) => {
  const mode = route?.params?.mode || 'all';
  const categoryId = route?.params?.categoryId;
  const categoryName = route?.params?.categoryName;
  const searchKeyword = route?.params?.searchKeyword || '';

  const [addSeedModalVisible, setAddSeedModalVisible] = useState(false);
  const [seeds, setSeeds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  // 저장형식, 정렬 필터링
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  // 읽지 않은 씨드, 삭제 모드
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedSeedIds, setSelectedSeedIds] = useState([]);

  const typeLabels = {
    LINK: '링크',
    IMAGE: '이미지',
    PDF: 'PDF',
  };
  const sortLabels = {
    latest: '최신순',
    name: '이름순',
  };
  const typeText = selectedType ? typeLabels[selectedType] : '저장형식';
  const sortText = selectedSort ? sortLabels[selectedSort] : '정렬';

  useEffect(() => {
    let title = '전체 씨드';

    switch (mode) {
      case 'popular':
        title = '많이 찾는 씨드';
        break;
      case 'unread':
        title = '읽지 않은 씨드';
        break;
      case 'category':
        title = categoryName;
        break;
      case 'categorySearch':
        title = categoryName;
        break;
      case 'favorite':
        title = '즐겨찾기';
        break;
      case 'favoriteSearch':
        title = '즐겨찾기';
        break;
    }
    navigation.setOptions({ headerTitle: title });
  }, [mode, navigation]);

  useEffect(() => {
    if (
      (mode === 'search' ||
        mode === 'categorySearch' ||
        mode === 'favoriteSearch') &&
      searchKeyword
    ) {
      setSearchText(searchKeyword);
    }
  }, [mode, searchKeyword]);

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    let response;

    switch (mode) {
      case 'unread':
        response = await getUnreadSeeds();
        break;
      case 'popular':
        response = await getPopularSeeds();
        break;
      case 'category':
        response = await getCategorySeeds(categoryId);
        break;
      case 'favorite':
        response = await getFavoriteSeeds();
        break;
      case 'search':
        response = await searchSeeds(selectedTags, searchKeyword);
        break;
      case 'categorySearch':
        response = await searchCategorySeeds(
          categoryId,
          selectedTags,
          searchKeyword,
        );
        break;
      case 'favoriteSearch':
        response = await searchFavoriteSeeds(searchKeyword);
        break;
      default:
        response = await getAllSeeds();
        break;
    }

    const seedData = response[0].seedInfoList.map((item) => ({
      seedId: item.seedId,
      seedName: item.seedName,
      categoryName: item.categoryName,
      seedType: item.seedType,
      thumbnailImage: item.thumbnailImage,
      tagName: item.tagName,
      seedDetail: item.seedDetail,
      isFavorite: item.isSaved,
    }));
    setSeeds(seedData);
  };

  useLayoutEffect(() => {
    // 읽지 않은 씨드 헤더 삭제 버튼
    if (mode === 'unread') {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 18 }}
            onPress={() => {
              if (seeds.length > 0) {
                setDeleteMode(!deleteMode);
                setSelectedSeedIds([]);
              }
            }}
          >
            <Text style={{ color: '#4f4f4f', fontSize: 16 }}>
              {deleteMode ? '완료' : '삭제'}
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, deleteMode, mode, seeds.length]);

  const checkSeedSelection = (seedId) => {
    setSelectedSeedIds((prev) => {
      if (prev.includes(seedId)) {
        return prev.filter((id) => id !== seedId);
      } else {
        return [...prev, seedId];
      }
    });
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
    if (
      mode === 'popular' ||
      mode === 'unread' ||
      mode === 'favorite' ||
      mode === 'favoriteSearch'
    )
      return seeds;

    return (
      seeds
        .filter((seed) => {
          // TODO: 태그 필터링
          const matchesTags =
            selectedTags.length === 0 ||
            (seed.tagName &&
              selectedTags.some((tag) => seed.tagName.includes(tag)));
          // 저장형식 필터링
          const matchesType = !selectedType || seed.seedType === selectedType;
          return matchesTags && matchesType;
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
        {(mode === 'all' ||
          mode === 'category' ||
          mode === 'search' ||
          mode === 'categorySearch' ||
          mode === 'favorite' ||
          mode === 'favoriteSearch') && (
          <>
            {/* 검색창 */}
            <TouchableOpacity
              style={styles.searchContainer}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('search', {
                  returnMode:
                    mode === 'category'
                      ? 'categorySearch'
                      : mode === 'favorite'
                      ? 'favoriteSearch'
                      : 'search',
                  categoryId: mode === 'category' ? categoryId : null,
                  categoryName: mode === 'category' ? categoryName : null,
                })
              }
            >
              <Ionicons name="search-outline" size={20} color="#9f9f9f" />
              <TextInput
                style={styles.searchInput}
                placeholder="씨드 제목과 메모를 검색해보세요"
                placeholderTextColor="#9f9f9f"
                value={searchText}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
            {mode !== 'favorite' && mode != 'favoriteSearch' && (
              <>
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
                    <Text style={styles.filterText}>
                      {typeText} · {sortText}
                    </Text>
                    <Ionicons name="chevron-down" size={14} color="#4f4f4f" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}
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
              deleteMode={deleteMode}
              isSelected={selectedSeedIds.includes(item.seedId)}
              onCheckSelect={checkSeedSelection}
              searchKeyword={
                mode === 'search' || mode === 'categorySearch'
                  ? searchKeyword
                  : ''
              }
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* 읽지 않은 씨드 삭제 버튼 */}
      {deleteMode && (
        <UnreadDeleteBtn
          selectedSeeds={selectedSeedIds}
          onSelectAll={() =>
            setSelectedSeedIds(seeds.map((seed) => seed.seedId))
          }
          onDeleteSuccess={(deletedIds) => {
            setDeleteMode(false);
            setSelectedSeedIds([]);
            setSeeds((prev) =>
              prev.filter((seed) => !deletedIds.includes(seed.seedId)),
            );
          }}
        />
      )}

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        initialType={selectedType}
        initialSort={selectedSort}
        onApply={applyFilters}
      />
      <BottomNav
        addSeedModalVisible={addSeedModalVisible}
        setAddSeedModalVisible={setAddSeedModalVisible}
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
    marginVertical: -2,
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
    paddingBottom: 140,
  },
});

export default SeedList;
