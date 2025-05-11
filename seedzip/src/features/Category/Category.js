import { ScrollView, StyleSheet, View } from 'react-native';
import AllCategory from './AllCategory';
import FolderSection from './FolderSection';

const bookmarkData = Array.from({ length: 6 }).map((_, i) => ({
  id: `bm${i}`,
  name: '카테고리명(N)',
}));
const myData = Array.from({ length: 5 }).map((_, i) => ({
  id: `my${i + 1}`,
  name: '카테고리명(N)',
}));

const Category = () => {
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
          data={bookmarkData}
          onPressMore={() => {
            /* 북마크 전체보기 */
          }}
        />
        <FolderSection
          title="내 카테고리"
          iconName="grid-outline"
          data={myData}
          onPressMore={() => {
            /* 내 카테고리 전체보기 */
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
});
