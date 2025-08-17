import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import AllCategory from './AllCategory';
import FolderSection from './FolderSection';
import EmptyBookmark from '../../assets/icons/emptyBookmark.png';
import EmptyMyCategory from '../../assets/icons/emptyMyCategory.png';
import { Ionicons } from '@expo/vector-icons';
import { postCategory, getCategory, getBookmark } from '../../api/CategoryApi';
import useCategoryActions from '../../hooks/useCategoryActions';

const Category = ({ route }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [myCategories, setMyCategories] = useState([]);
  const [fullParams, setFullParams] = useState(null);
  const navigation = useNavigation();

  const { actionBtnsBookmark, actionBtnsMyCategory, ActionModalAlert } =
    useCategoryActions({
      fetchBookmark,
      fetchMyCategory,
      setBookmarks,
      handleShowFull,
      bookmarks,
    });

  useLayoutEffect(() => {
    if (fullParams) {
      navigation.setOptions({
        headerShown: false,
      });
    } else {
      navigation.setOptions({
        headerShown: true,
      });
    }
  }, [navigation, fullParams]);

  useEffect(() => {
    // 홈 화면에서 '카테고리 더보기' 타고 들어옴
    if (route?.params?.showBookmarkFull) {
      handleShowFull({
        title: '북마크 전체보기',
        iconName: 'bookmark-outline',
        data: bookmarks,
        actionBtns: actionBtnsBookmark,
        emptyTitle: '아직 북마크한 카테고리가 없어요',
        emptySubtitle: '자주 보는 카테고리를 북마크 해보세요!',
      });
    }
  }, [route?.params?.showBookmarkFull, bookmarks]);

  function handleShowFull(params) {
    setFullParams({
      ...params,
      isFullView: true,
      hideViewAll: true,
    });
  }

  const handleCloseFull = () => {
    if (route?.params?.showBookmarkFull) {
      navigation.goBack();
    } else {
      setFullParams(null);
    }
  };

  async function fetchMyCategory() {
    const resCategory = await getCategory();
    const categoryData = resCategory.map((cat) => ({
      id: cat.categoryId,
      name: cat.name,
    }));
    setMyCategories(categoryData);
  }

  async function fetchBookmark() {
    const resBookmark = await getBookmark();
    const bookmarkData = resBookmark.map((cat) => ({
      bookmarkId: cat.bookmarkId,
      id: cat.categoryId,
      name: cat.name,
    }));
    setBookmarks(bookmarkData);
  }

  useEffect(() => {
    fetchMyCategory();
    fetchBookmark();
  }, []);

  const handleAddCategory = async (inputName, isPublic) => {
    const count = myCategories.filter((cat) =>
      cat.name.startsWith('새 카테고리'),
    ).length;
    const newCategory = inputName.trim() || `새 카테고리${count + 1}`;

    await postCategory(newCategory, isPublic);
    await fetchMyCategory();
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <AllCategory onAddCategory={handleAddCategory} />
        <View style={styles.categoryWrapper}>
          <FolderSection
            title="북마크"
            iconName="bookmark-outline"
            data={bookmarks.slice(0, 6)}
            actionBtns={actionBtnsBookmark}
            emptySubtitle="자주 보는 카테고리를 북마크하세요"
            emptyImg={EmptyBookmark}
            onPressAll={() => {
              handleShowFull({
                title: '북마크 전체보기',
                iconName: 'bookmark-outline',
                data: bookmarks,
                actionBtns: actionBtnsBookmark,
                emptyTitle: '아직 북마크한 카테고리가 없어요',
                emptySubtitle: '자주 보는 카테고리를 북마크 해보세요!',
              });
            }}
          />
          <FolderSection
            title="내 카테고리"
            iconName="grid-outline"
            data={myCategories.slice(0, 6)}
            actionBtns={actionBtnsMyCategory}
            emptySubtitle="새로운 카테고리를 생성해보세요"
            emptyImg={EmptyMyCategory}
            onPressAll={() => {
              handleShowFull({
                title: '내 카테고리 전체보기',
                iconName: 'grid-outline',
                data: myCategories,
                actionBtns: actionBtnsMyCategory,
                emptyTitle: '아직 내 카테고리가 없어요',
                emptySubtitle: '필요한 씨드로 카테고리를 생성해보세요!',
              });
            }}
          />
        </View>
      </ScrollView>

      {fullParams && (
        <View style={styles.fullOverlay}>
          <SafeAreaView style={styles.fullContainer}>
            {/* 뒤로가기 */}
            <View style={styles.fullHeader}>
              <TouchableOpacity onPress={handleCloseFull}>
                <Ionicons name="chevron-back-outline" size={20}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.fullTitle}>
                {fullParams.title.replace(' 전체보기', '')}
              </Text>
            </View>
            <FolderSection
              {...fullParams}
              data={
                fullParams.title === '북마크 전체보기'
                  ? bookmarks
                  : myCategories
              }
            />
          </SafeAreaView>
        </View>
      )}

      <ActionModalAlert />
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  categoryWrapper: {
    marginHorizontal: 20,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  fullOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  fullContainer: { flex: 1, margin: 20 },
  fullHeader: {
    flexDirection: 'row',
  },
  fullTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});
