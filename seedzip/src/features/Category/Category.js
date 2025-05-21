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

const bookmarkData = Array.from({ length: 10 }).map((_, i) => ({
  id: `bm${i}`,
  name: `카테고리명 ${i + 1}`,
}));
const myData = Array.from({ length: 8 }).map((_, i) => ({
  id: `my${i + 1}`,
  name: `카테고리명 ${i + 1}`,
}));

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <AllCategory />
      <View style={styles.categoryWrapper}>
        <FolderSection
          title="북마크"
          iconName="bookmark-outline"
          data={bookmarkData.slice(0, 6)}
          emptyImg={EmptyBookmark}
          actionBtns={actionBtnsBookmark}
          onPressAll={() => {
            navigation.navigate('fullcategory', {
              title: '북마크 전체보기',
              iconName: 'bookmark-outline',
              data: bookmarkData,
              emptyTitle: '아직 북마크한 카테고리가 없어요',
              emptySubtitle: '자주 보는 카테고리를 북마크 해보세요!',
            });
          }}
        />
        <FolderSection
          title="내 카테고리"
          iconName="grid-outline"
          data={myData.slice(0, 6)}
          emptyImg={EmptyMyCategory}
          actionBtns={actionBtnsMyCategory}
          onPressAll={() => {
            navigation.navigate('fullcategory', {
              title: '내 카테고리 전체보기',
              iconName: 'grid-outline',
              data: myData,
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
