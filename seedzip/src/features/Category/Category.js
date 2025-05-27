import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import AllCategory from './AllCategory';
import FolderSection from './FolderSection';
import EditCategoryModal from './EditCategoryModal';
import EmptyBookmark from '../../assets/icons/emptyBookmark.png';
import EmptyMyCategory from '../../assets/icons/emptyMyCategory.png';
import BookmarkMinusIcon from '../../assets/icons/bookmarkMinus.png';
import BookmarkPlusIcon from '../../assets/icons/bookmarkPlus.png';
import EditIcon from '../../assets/icons/edit.png';
import TrashIcon from '../../assets/icons/trash.png';
import { Ionicons } from '@expo/vector-icons';
import {
  postCategory,
  getCategory,
  postBookmark,
  getBookmark,
  patchCategory,
} from '../../api/CategoryApi';

const Category = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [myCategories, setMyCategories] = useState([]);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [renameTarget, setRenameTarget] = useState(null);

  const [fullParams, setFullParams] = useState(null);

  const handleShowFull = (params) => {
    setFullParams({
      ...params,
      isFullView: true,
      hideViewAll: true,
    });
  };

  const handleCloseFull = () => {
    setFullParams(null);
  };

  const fetchMyCategory = async () => {
    const resCategory = await getCategory();
    const categoryData = resCategory.map((cat) => ({
      id: cat.categoryId,
      name: cat.name,
    }));
    setMyCategories(categoryData);
  };

  const fetchBookmark = async () => {
    const resBookmark = await getBookmark();
    const bookmarkData = resBookmark.map((cat) => ({
      bookmarkId: cat.bookmarkId,
      id: cat.categoryId,
      name: cat.name,
    }));
    setBookmarks(bookmarkData);
  };

  useEffect(() => {
    fetchMyCategory();
    fetchBookmark();
  }, []);

  const handleAddCategory = async (inputName) => {
    const count = myCategories.filter((cat) =>
      cat.name.startsWith('새 카테고리'),
    ).length;
    const newCategory = inputName.trim() || `새 카테고리${count + 1}`;

    // setMyCategories((prev) => {
    //   const [first, ...rest] = prev; // first: 미분류
    //   return [first, newCategory, ...rest];
    // });

    await postCategory(newCategory, true);
    await fetchMyCategory(); // 카테고리 생성 후, 바로 조회
  };

  const handleEditCategory = async (newName) => {
    if (!renameTarget) return;
    await patchCategory(newName, renameTarget.id);
    setOpenEditModal(false);
    setRenameTarget(null);

    await fetchMyCategory();
    await fetchBookmark();
  };

  const actionBtnsBookmark = (item) => [
    {
      icon: <Image source={BookmarkMinusIcon} style={styles.iconSize} />,
      label: '북마크에서 제거',
      onPress: () => {},
    },
    {
      icon: <Image source={EditIcon} style={styles.iconSize} />,
      label: '이름 변경',
      onPress: () => {
        setRenameTarget(item);
        setOpenEditModal(true);
      },
    },
    {
      icon: <Image source={TrashIcon} style={styles.iconSize} />,
      label: '카테고리 삭제',
      onPress: () => {},
    },
  ];

  const actionBtnsMyCategory = (item) => [
    {
      icon: <Image source={BookmarkPlusIcon} style={styles.iconSize} />,
      label: '북마크에 추가',
      onPress: async () => {
        await postBookmark(item.id);
        await fetchBookmark();
      },
    },
    {
      icon: <Image source={EditIcon} style={styles.iconSize} />,
      label: '이름 변경',
      onPress: () => {
        setRenameTarget(item);
        setOpenEditModal(true);
      },
    },
    {
      icon: <Image source={TrashIcon} style={styles.iconSize} />,
      label: '카테고리 삭제',
      onPress: () => {
        /* 삭제 로직 */
      },
    },
  ];

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
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.fullTitle}>{fullParams.title}</Text>
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

      <EditCategoryModal
        visible={openEditModal}
        initialName={renameTarget?.name || ''}
        onCancel={() => {
          setOpenEditModal(false);
          setRenameTarget(null);
        }}
        onEdit={handleEditCategory}
      />
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
  fullContainer: { flex: 1 },
  fullHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  fullTitle: { marginLeft: 12, fontSize: 18, fontWeight: '600' },
});
