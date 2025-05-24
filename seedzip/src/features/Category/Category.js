import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AllCategory from './AllCategory';
import FolderSection from './FolderSection';
import EmptyBookmark from '../../assets/icons/emptyBookmark.png';
import EmptyMyCategory from '../../assets/icons/emptyMyCategory.png';
import BookmarkMinusIcon from '../../assets/icons/bookmarkMinus.png';
import BookmarkPlusIcon from '../../assets/icons/bookmarkPlus.png';
import EditIcon from '../../assets/icons/edit.png';
import TrashIcon from '../../assets/icons/trash.png';
import { postCategory, getCategory, getBookmark } from '../../api/CategoryApi';

const Category = () => {
  const navigation = useNavigation();

  const actionBtnsBookmark = [
    {
      icon: <Image source={BookmarkMinusIcon} style={styles.iconSize} />,
      label: '북마크에서 제거',
      onPress: () => {},
    },
    {
      icon: <Image source={EditIcon} style={styles.iconSize} />,
      label: '이름 변경',
      onPress: () => {},
    },
    {
      icon: <Image source={TrashIcon} style={styles.iconSize} />,
      label: '카테고리 삭제',
      onPress: () => {},
    },
  ];

  const actionBtnsMyCategory = [
    {
      icon: <Image source={BookmarkPlusIcon} style={styles.iconSize} />,
      label: '북마크에 추가',
      onPress: () => {},
    },
    {
      icon: <Image source={EditIcon} style={styles.iconSize} />,
      label: '이름 변경',
      onPress: () => {},
    },
    {
      icon: <Image source={TrashIcon} style={styles.iconSize} />,
      label: '카테고리 삭제',
      onPress: () => {},
    },
  ];

  const [bookmarks, setBookmarks] = useState([]);
  const [myCategories, setMyCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resCategory = await getCategory();
      const categoryData = resCategory.map((cat) => ({
        id: cat.categoryId,
        name: cat.name,
      }));
      setMyCategories(categoryData);

      const resBookmark = await getBookmark();
      const bookmarkData = resBookmark.map((cat) => ({
        id: cat.bookmarkId,
        categoryId: cat.categoryId,
        name: cat.name,
      }));
      setBookmarks(bookmarkData);
    };
    fetchData();
  }, []);

  const handleAddCategory = async (inputName) => {
    const count = myCategories.filter((cat) =>
      cat.name.startsWith('새 카테고리'),
    ).length;
    const newCategory = inputName.trim() || `새 카테고리${count + 1}`;
    setMyCategories([newCategory, ...myCategories]);

    await postCategory(newCategory, true);
  };

  return (
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
          emptyImg={EmptyBookmark}
          actionBtns={actionBtnsBookmark}
          emptySubtitle="자주 보는 카테고리를 북마크하세요."
          onPressAll={() => {
            navigation.navigate('fullcategory', {
              title: '북마크 전체보기',
              iconName: 'bookmark-outline',
              data: bookmarks,
              emptyTitle: '아직 북마크한 카테고리가 없어요',
              emptySubtitle: '자주 보는 카테고리를 북마크 해보세요!',
            });
          }}
        />
        <FolderSection
          title="내 카테고리"
          iconName="grid-outline"
          data={myCategories.slice(0, 6)}
          emptyImg={EmptyMyCategory}
          actionBtns={actionBtnsMyCategory}
          emptySubtitle="새로운 카테고리를 생성해보세요"
          onPressAll={() => {
            navigation.navigate('fullcategory', {
              title: '내 카테고리 전체보기',
              iconName: 'grid-outline',
              data: myCategories,
              emptyTitle: '아직 내 카테고리가 없어요',
              emptySubtitle: '필요한 씨드로 카테고리를 생성해보세요!',
            });
          }}
        />
      </View>
    </ScrollView>
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
});
