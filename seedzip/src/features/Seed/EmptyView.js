import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import emptySeed from '../../assets/icons/empty-seed.png';
import emptyFavorite from '../../assets/icons/empty-favorite.png';
import emptyPopular from '../../assets/icons/empty-popular.png';
import emptyUnread from '../../assets/icons/empty-unread.png';
import emptySearch from '../../assets/icons/empty-search.png';

const EmptyView = ({ mode, isEmpty }) => {
  let image, message;

  if (isEmpty) {
    image = emptySearch;
    message = '해당 조건에 맞는\n씨드가 없어요';
  } else {
    switch (mode) {
      case 'popular':
        image = emptyPopular;
        message = '아직 3번 이상 찾아본\n씨드가 없어요';
        break;
      case 'unread':
        image = emptyUnread;
        message = '저장한 씨드를\n모두 읽었어요!';
        break;
      case 'favorite':
        image = emptyFavorite;
        message = '별표를 눌러 관심 있는\n씨드를 모아보세요!';
        break;
      default:
        image = emptySeed;
        message = '씨드를 저장해주세요!';
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 250,
  },
  image: {
    height: 110,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9f9f9f',
    textAlign: 'center',
  },
});

export default EmptyView;
