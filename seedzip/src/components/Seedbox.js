import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import ClearStarIcon from '../../assets/icons/clear_star.png';
import StarIcon       from '../../assets/icons/star.png';

export default function Seed({ item, onToggleBookmark, onPressMenu }) {
  const [bookmarked, setBookmarked] = useState(item.bookmarked);

  const handleBookmark = useCallback(() => {
    const next = !bookmarked;
    setBookmarked(next);
    onToggleBookmark?.(item.id, next);
  }, [bookmarked, item.id, onToggleBookmark]);

  return (
    <View style={styles.card}>
      {/* 썸네일 */}
      <Image source={{ uri: item.thumbnailUrl }} style={styles.thumb} />

      {/* 본문 */}
      <View style={styles.body}>
        {/* 제목 + 북마크 */}
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={handleBookmark} hitSlop={8}>
            <Image
              source={bookmarked ? StarIcon : ClearStarIcon}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.category}>{item.category}</Text>

        {/* 태그 */}
        <View style={styles.tags}>
          {item.tags.map((t, i) => (
            <View key={i} style={styles.tagBox}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 케밥 메뉴 */}
      <TouchableOpacity style={styles.menuBtn} onPress={() => onPressMenu?.(item)}>
        <Text style={styles.menuTxt}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignItems: 'flex-start',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#E3E3E3',
    marginRight: 12,
  },
  body: {
    flex: 1,
    paddingTop: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginRight: 4,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginTop: 1,
  },
  category: {
    fontSize: 13,
    color: '#888',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginTop: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  menuBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  menuTxt: {
    fontSize: 18,
    color: '#444',
  },
});