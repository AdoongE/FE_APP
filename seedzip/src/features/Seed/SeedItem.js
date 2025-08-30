import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import ActionModal from '../../components/ActionModal';
import useSeedActions from '../../hooks/useSeedActions';
import { postFavoriteSeed } from '../../api/SeedApi';

const SeedItem = ({
  seed,
  onPress,
  onDeleteSuccess,
  deleteMode = false,
  isSelected = false,
  onCheckSelect,
  searchKeyword = '',
}) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(seed.isFavorite || false);
  const { seedActions, SeedActionModals } = useSeedActions({
    onDeleteSuccess: () => {
      onDeleteSuccess(seed.seedId);
    },
    navigation,
  });

  // 검색어가 포함된 단어 추출
  const highlightText = (text, keyword) => {
    if (!keyword || !text)
      return (
        <Text style={styles.seedDetail} numberOfLines={1}>
          {text}
        </Text>
      );

    const lowerText = text.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    const keywordIndex = lowerText.indexOf(lowerKeyword);

    const startIndex = Math.max(0, keywordIndex - 15);
    const endIndex = Math.min(text.length, keywordIndex + keyword.length + 15);
    let contextText = text.substring(startIndex, endIndex);

    if (startIndex > 0) contextText = '...' + contextText;
    if (endIndex < text.length) contextText = contextText + '...';

    const parts = contextText.split(new RegExp(`(${keyword})`, 'gi'));

    return (
      <Text style={styles.seedDetail} numberOfLines={2}>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <Text key={i} style={styles.highlight}>
              {part}
            </Text>
          ) : (
            part
          ),
        )}
      </Text>
    );
  };

  const onFavorite = async () => {
    await postFavoriteSeed(seed.seedId);
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    setIsFavorite(seed.isFavorite);
  }, [seed.isFavorite]);

  return (
    <>
      <Pressable
        key={seed.seedId}
        style={styles.seedRow}
        onPress={deleteMode ? () => onCheckSelect(seed.seedId) : onPress}
      >
        {deleteMode && (
          <TouchableOpacity
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            onPress={() => onCheckSelect(seed.seedId)}
          >
            <Feather name="check" size={16} color="white" />
          </TouchableOpacity>
        )}
        <View style={styles.seedThumb}>
          {seed.seedType !== 'LINK' ? (
            <Image
              source={{ uri: seed.thumbnailImage }}
              style={styles.seedImage}
            />
          ) : (
            <Ionicons name="link-outline" size={30} color="#41C3AB" />
          )}
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.seedTitle} numberOfLines={1}>
                {seed.seedName}
              </Text>
              <TouchableOpacity onPress={onFavorite}>
                <Ionicons
                  name={isFavorite ? 'star' : 'star-outline'}
                  size={12}
                  color={isFavorite ? '#41C3AB' : '#4f4f4f'}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                deleteMode ? onCheckSelect(seed.seedId) : setModalVisible(true)
              }
              hitSlop={10}
            >
              <Ionicons name="ellipsis-vertical" size={16} color="#4f4f4f" />
            </TouchableOpacity>
          </View>

          <Text style={styles.seedCategory} numberOfLines={1}>
            {seed.categoryName}
          </Text>

          {/* 메모 강조 표시 */}
          {searchKeyword && seed.seedDetail && (
            <View style={styles.detailContainer}>
              {highlightText(seed.seedDetail, searchKeyword)}
            </View>
          )}

          <View style={styles.tagRow}>
            {seed.tagName?.map((tag, index) => (
              <Text key={index} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </Pressable>
      <ActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        actions={seedActions(seed)}
      />
      <SeedActionModals />
    </>
  );
};

export default SeedItem;

const CARD = {
  radius: 16,
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
  },
};

const styles = StyleSheet.create({
  seedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    ...CARD.shadow,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#41C3AB',
  },
  seedThumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#DEF3F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  seedImage: { width: '100%', height: '100%' },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    maxWidth: 220,
  },
  seedTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  seedCategory: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9f9f9f',
    marginTop: 4,
  },
  detailContainer: {
    marginTop: 8,
  },
  seedDetail: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9f9f9f',
  },
  highlight: {
    color: '#41C3AB',
    fontWeight: '500',
  },
  tagRow: { flexDirection: 'row', gap: 4, marginTop: 28, flexWrap: 'wrap' },
  tag: {
    fontSize: 8,
    fontWeight: '500',
    color: '#9f9f9f',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 10,
  },
});
