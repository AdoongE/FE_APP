import React from 'react';
import { View, StyleSheet } from 'react-native';
import FolderSection from './FolderSection';
import { useRoute } from '@react-navigation/native';

const FullFolderSection = () => {
  const { title, iconName, data } = useRoute().params;
  const bookmarkData = Array.from({ length: 10 }).map((_, i) => ({
    id: `bm${i}`,
    name: `카테고리명 ${i + 1}`,
  }));

  return (
    <View style={styles.container}>
      <FolderSection
        title={title}
        iconName={iconName}
        data={data}
        hideViewAll={true}
      />
    </View>
  );
};

export default FullFolderSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 12.5,
  },
});
