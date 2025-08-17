import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SeedItem = ({ seed, onPress }) => {
  return (
    <Pressable key={seed.seedId} style={styles.seedRow} onPress={onPress}>
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
          <Text style={styles.seedTitle} numberOfLines={1}>
            {seed.seedName}
          </Text>
          <Ionicons name="ellipsis-vertical" size={16} color="#4f4f4f" />
        </View>

        <Text style={styles.seedCategory} numberOfLines={1}>
          {seed.categoryName}
        </Text>

        <View style={styles.tagRow}>
          {seed.tagName?.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
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
  seedTitle: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  seedCategory: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9f9f9f',
    marginTop: 4,
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
