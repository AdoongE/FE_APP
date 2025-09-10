import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Modal,
  Animated,
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
import EmptyView from './EmptyView';
import Spinner from '../../components/Spinner';
import { MyTabs } from '../../components/tag/TagScreens';
import { MyContext } from '../../../App';
import { useDragClose } from '../../utils/useDragClose';

const SeedList = ({ navigation, route }) => {
  const { totalTags, setTotalTags } = useContext(MyContext);
  const mode = route?.params?.mode || 'all';
  const categoryId = route?.params?.categoryId;
  const categoryName = route?.params?.categoryName;
  const searchKeyword = route?.params?.searchKeyword || '';

  const [loading, setLoading] = useState(true);
  const [addSeedModalVisible, setAddSeedModalVisible] = useState(false);
  const [seeds, setSeeds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  // 저장형식, 정렬 필터링
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  // 읽지 않은 씨드, 삭제 모드
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedSeedIds, setSelectedSeedIds] = useState([]);
  const [visible, setVisible] = useState(false);

  const { panHandlers, translateY } = useDragClose({
    onCancel: () => setVisible(false),
    visible,
  });

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
    navigation.setOptions({
      headerTitle: title,
      ...(title === '즐겨찾기' && { headerLeft: null }),
    });
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
  }, [mode]);

  const fetchSeeds = async () => {
    setLoading(true);
    let response;
    try {
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
          response = await searchSeeds(
            selectedTags,
            searchKeyword,
            selectedType,
            selectedSort,
          );
          break;
        case 'categorySearch':
          response = await searchCategorySeeds(
            categoryId,
            selectedTags,
            searchKeyword,
            selectedType,
            selectedSort,
          );
          break;
        case 'favoriteSearch':
          response = await searchFavoriteSeeds(searchKeyword);
          break;
        default:
          response = await getAllSeeds();
          break;
      }

      if (response === '씨드가 존재하지 않습니다.') {
        setSeeds([]);
        return;
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const applyFilters = (newType, newSort) => {
    setSelectedType(newType);
    setSelectedSort(newSort);
    setFilterModalVisible(false);

    let newMode = mode;

    if (mode === 'all') {
      newMode = 'search';
      navigation.setParams({ mode: 'search' });
    } else if (mode === 'category') {
      newMode = 'categorySearch';
      navigation.setParams({ mode: 'categorySearch' });
    }
  };

  useEffect(() => {
    // appltFilters 업데이트 될때
    if (mode === 'search' || mode === 'categorySearch') {
      fetchSeeds();
    }
  }, [selectedType, selectedSort, selectedTags, mode]);

  const isEmpty = seeds.length === 0;

  if (loading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: 20 }}>
        {!isEmpty && (
          <>
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
                      <TouchableOpacity
                        onPress={() => {
                          setTotalTags(selectedTags);
                          setVisible(true);
                        }}
                        activeOpacity={0.8}
                        style={styles.rowContainer}
                      >
                        <Feather
                          name="tag"
                          size={14}
                          color="#4f4f4f"
                          style={{ marginTop: 2 }}
                        />
                        <Text style={styles.sectionTitle}>태그 선택</Text>
                      </TouchableOpacity>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
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
                                <Ionicons
                                  name="close"
                                  size={12}
                                  color="#4f4f4f"
                                />
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                    <View style={styles.line} />
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
                        <Ionicons
                          name="chevron-down"
                          size={14}
                          color="#4f4f4f"
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
          </>
        )}

        <FlatList
          data={seeds}
          keyExtractor={(item) => item.seedId.toString()}
          renderItem={({ item }) => (
            <SeedItem
              seed={item}
              onPress={() =>
                navigation.navigate('view', {
                  seedId: item.seedId,
                  isOpen: true,
                })
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
          ListEmptyComponent={() => (
            <EmptyView
              mode={mode}
              isEmpty={
                mode === 'search' ||
                mode === 'categorySearch' ||
                mode === 'favoriteSearch'
              }
            />
          )}
          contentContainerStyle={[
            styles.listContainer,
            isEmpty && styles.emptyListContainer,
          ]}
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

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.bottomSheet, { transform: [{ translateY }] }]}
            {...panHandlers}
          >
            <View style={styles.dragHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>태그를 선택하세요</Text>
              <Text style={styles.sheetSub}>
                태그를 통해 원하는 씨드를 찾아요
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <MyTabs />
            </View>

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => {
                setSelectedTags(totalTags);
                setVisible(false);
                if (mode === 'all') {
                  navigation.setParams({ mode: 'search' });
                } else if (mode === 'category') {
                  navigation.setParams({ mode: 'categorySearch' });
                }
              }}
            >
              <Text style={styles.applyText}>적용완료</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
    alignItems: 'center',
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
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    height: '85%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  dragHandle: {
    width: 29,
    height: 4,
    backgroundColor: '#dcdada',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 12,
  },
  sheetHeader: { paddingTop: 28, paddingBottom: 8 },
  sheetTitle: { fontSize: 20, fontWeight: '600' },
  sheetSub: { marginTop: 6, fontSize: 12, color: '#9F9F9F' },

  applyBtn: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 25,
  },
  applyText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default SeedList;
