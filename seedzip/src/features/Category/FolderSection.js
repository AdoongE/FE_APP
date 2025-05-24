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
  emptySubtitle,
  onPressAll, // 전체보기
  hideViewAll = false,
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

      {data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptySubtitle}</Text>
          <Image source={emptyImg} style={styles.emptyImage} />
        </View>
      ) : (
        <>
          <FlatList
            data={data}
            numColumns={3}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Folder
                  name={item.name}
                  onPressMorevert={() => handleFolderPress(item)}
                />
              </View>
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
  item: {
    marginHorizontal: 8,
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
});
