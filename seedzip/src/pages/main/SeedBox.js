import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SeedViewModal from './SeedViewModal';

export default function SeedBox({ title, contentId, thumbnail, type }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.seedCard}>
          {/* 썸네일 이미지 */}
          {thumbnail ? (
            <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
          ) : (
            <View style={styles.noThumbnail}>
              <Text style={styles.noThumbnailText}>이미지 없음</Text>
            </View>
          )}
          {/* 옵션 아이콘 */}
          <Ionicons name="ellipsis-vertical" size={16} color="black" style={styles.icon} />
        </View>
      </TouchableOpacity>

      <View style={styles.seedBottom}>
        {/* 데이터 타입 동그라미 + 아이콘 */}
        <View style={styles.circle}>
          {getTypeIcon(type)}
        </View>
        <Text style={styles.seedName} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>

      {/* 모달 컴포넌트 */}
      <SeedViewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        contentId={contentId}
      />
    </View>
  );
}

// 데이터 타입에 따른 아이콘 반환
const getTypeIcon = (type) => {
  switch (type) {
    case 'IMAGE':
      return <Ionicons name="image" size={12} color="white" />;
    case 'LINK':
      return <MaterialIcons name="link" size={12} color="white" />;
    case 'PDF':
      return <Ionicons name="document" size={12} color="white" />;
    default:
      return <Ionicons name="help" size={12} color="white" />;
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 8,
  },
  seedCard: {
    width: 167,
    height: 151,
    backgroundColor: '#DCDADA',
    borderRadius: 8,
    overflow: 'hidden', // 이미지가 넘치지 않도록
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  noThumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    width: '100%',
    height: '100%',
  },
  noThumbnailText: {
    fontSize: 12,
    color: '#999',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  seedBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  seedName: {
    fontSize: 14,
    color: '#000',
    maxWidth: 145,
  },
});