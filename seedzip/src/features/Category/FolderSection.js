import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Folder from '../../components/Folder';
import ActionModal from '../../components/ActionModal';

const FolderSection = ({
  title,
  iconName,
  data,
  emptyImg,
  actionBtns,
  emptyTitle,
  emptySubtitle,
  onPressAll, // 전체보기
  hideViewAll = false,
  isFullView = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFolderPress = (item) => {
    setModalVisible(true);
    setSelectedItem(item);
  };

  const actions = selectedItem && actionBtns ? actionBtns(selectedItem) : [];

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name={iconName} size={20} color="#000" />
          <Text style={styles.title}>{title}</Text>
        </View>
        {!hideViewAll && (
          <TouchableOpacity style={styles.viewAllBtn} onPress={onPressAll}>
            <Text style={styles.viewAllText}>전체보기</Text>
            <Ionicons name="chevron-forward" size={16} color="#9f9f9f" />
          </TouchableOpacity>
        )}
      </View>

      {(data.length === 0 && title.split(' ')[0] === '북마크') ||
      (data.length === 1 && title.split(' ')[0] === '내') ? (
        isFullView ? (
          <View style={styles.emptyContainerFull}>
            <Text style={styles.emptyTitleFull}>{emptyTitle}</Text>
            <Text style={styles.emptySubtitleFull}>{emptySubtitle}</Text>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{emptySubtitle}</Text>
            <View style={styles.rowContainer}>
              {title.split(' ')[0] === '내' && (
                <View style={styles.item}>
                  <Folder
                    name={data[0].name}
                    onPressMorevert={() => handleFolderPress(data[0])}
                  />
                </View>
              )}
              <Image source={emptyImg} style={styles.emptyImage} />
            </View>
          </View>
        )
      ) : (
        <>
          <FlatList
            data={data}
            numColumns={3}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.folderRow}
            renderItem={({ item }) => (
              <Folder
                name={item.name}
                onPressMorevert={() => handleFolderPress(item)}
              />
            )}
            scrollEnabled={false}
          />
        </>
      )}
      <ActionModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedItem(null);
        }}
        title={selectedItem?.name}
        actions={actions}
      />
    </View>
  );
};

export default FolderSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 40,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 4,
    fontSize: 18,
    fontWeight: 600,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 12,
    color: '#9f9f9f',
    marginRight: 2,
  },
  listContent: {
    gap: 20,
  },
  folderRow: {
    gap: 20,
  },
  emptyContainer: {
    marginTop: -5,
    gap: 16,
  },
  emptyText: {
    fontSize: 12,
    color: '#9f9f9f',
  },
  emptyImage: {
    width: 100,
    height: 84,
  },
  emptyContainerFull: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitleFull: {
    fontSize: 16,
    color: '#4f4f4f',
    fontWeight: 500,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitleFull: {
    fontSize: 12,
    color: '#4f4f4f',
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 16,
  },
});
