import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import homeImg from '../../assets/icons/home-img.png';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from './BottomNav';
import { getAllSeeds } from '../../api/HomeApi';
import { getUserSeedInfo } from '../../api/CategoryApi';

export default function MainPage({ navigation }) {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSeedInfo, setUserSeedInfo] = useState([]);

  const [bookmarkedCats] = useState([
    { id: '1', name: '카테고리 이름' },
    { id: '2', name: '카테고리 이름' },
    { id: '3', name: '카테고리 이름' },
    { id: '4', name: '카테고리 이름' },
  ]);

  const stats = useMemo(
    () => [
      { key: 'total', label: '전체 씨드', value: userSeedInfo.totalSeed },
      { key: 'most', label: '많이 찾는 씨드', value: userSeedInfo.popular },
      { key: 'unread', label: '읽지 않은 씨드', value: userSeedInfo.unread },
    ],
    [seeds.length],
  );

  useEffect(() => {
    const fetchSeeds = async () => {
      const resAllSeeds = await getAllSeeds();
      const seedData = resAllSeeds.map((item) => ({
        contentId: item.contentId,
        title: item.contentName || '콘텐츠명',
        thumbnail: item.thumbnailImage || null,
        type: item.contentDateType || '타입 없음',
      }));
      setSeeds(seedData);
      setLoading(false);
    };

    const fetchUserSeedInfo = async () => {
      const resSeedInfo = await getUserSeedInfo();
      setUserSeedInfo({
        localDate: resSeedInfo[0].localDate.replace(/-/g, '.'),
        userName: resSeedInfo[0].userName,
        todaySeedCount: resSeedInfo[0].todaySeedCount,
        totalCategory: resSeedInfo[0].totalCategoryCount,
        totalSeed: resSeedInfo[0].totalSeedCount,
        popular: resSeedInfo[0].mostReadSeedCount,
        unread: resSeedInfo[0].neverReadSeedCount,
      });
      setUserSeedInfo(seedInfoData);
    };

    fetchSeeds();
    fetchUserSeedInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" color="#41C3AB" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>seedzip</Text>
        <View style={styles.topIcons}>
          <Ionicons name="search-outline" size={22} color="#ffffff" />
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#ffffff"
            style={{ marginLeft: 12 }}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.contentContainer}>
          {/* 헤더 카드 */}
          <View style={styles.headerCard}>
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.dateText}>{userSeedInfo.localDate}</Text>
                <Text style={styles.hello}>{userSeedInfo.userName}님은</Text>
                <Text style={styles.helloSub}>
                  오늘 {userSeedInfo.todaySeedCount}개의 씨드를 저장했어요
                </Text>
              </View>
              <Image source={homeImg} style={styles.headerImg} />
            </View>

            <View style={styles.statRowContainer}>
              <View style={styles.statRow}>
                {stats.map((s) => (
                  <View key={s.key} style={styles.statBox}>
                    <Text style={styles.statLabel}>{s.label}</Text>
                    <Text style={styles.statValue}>
                      {s.key === 'unread' ? `${s.value}+` : s.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* 북마크한 카테고리 */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>북마크한 카테고리</Text>
            <Pressable
              hitSlop={8}
              onPress={() =>
                navigation?.navigate?.('category', { showBookmarkFull: true })
              }
            >
              <Text style={styles.moreCategory}>카테고리 더보기 &gt;</Text>
            </Pressable>
          </View>
        </View>

        <FlatList
          data={bookmarkedCats}
          keyExtractor={(it) => it.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <Pressable style={styles.catCard}>
              <View style={styles.catThumb}>
                <Ionicons name="link-outline" size={22} color="#9ADFCC" />
              </View>
              <Text style={styles.catName} numberOfLines={1}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />

        {/* 최근 추가한 씨드 */}
        <Text
          style={[
            styles.sectionTitle,
            { marginTop: 18, paddingHorizontal: 16 },
          ]}
        >
          최근 추가한 씨드
        </Text>

        <View style={{ paddingHorizontal: 16 }}>
          {seeds.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>아직 저장한 씨드가 없어요</Text>
            </View>
          ) : (
            seeds.slice(0, 10).map((seed) => (
              <Pressable
                key={seed.contentId}
                style={styles.seedRow}
                onPress={() =>
                  navigation?.navigate?.('view', { id: seed.contentId })
                }
              >
                <View style={styles.seedThumb}>
                  {seed.thumbnail ? (
                    <Image
                      source={{ uri: seed.thumbnail }}
                      style={styles.seedImage}
                    />
                  ) : (
                    <Ionicons name="link-outline" size={24} color="#41C3AB" />
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.seedTitle} numberOfLines={1}>
                    {seed.title}
                  </Text>
                  <Text style={styles.seedSubtitle} numberOfLines={1}>
                    카테고리명
                  </Text>
                  <View style={styles.tagRow}>
                    <Text style={styles.tag}>태그1</Text>
                    <Text style={styles.tag}>태그2</Text>
                    <Text style={styles.tag}>태그3</Text>
                    <Text style={styles.tag}>태그4</Text>
                  </View>
                </View>

                <Ionicons name="ellipsis-vertical" size={16} color="#BDBDBD" />
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const CARD = {
  radius: 16,
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 56,
    backgroundColor: '#41C3AB',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.4,
  },
  topIcons: { flexDirection: 'row', alignItems: 'center' },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  headerCard: {
    paddingBottom: 67,
    backgroundColor: '#41C3AB',
    paddingVertical: 18,
    paddingHorizontal: 20,
    ...CARD.shadow,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: { color: '#fff', fontSize: 12, marginBottom: 10 },
  hello: { color: '#fff', fontSize: 24, fontWeight: '600' },
  helloSub: { color: '#fff', fontSize: 18, fontWeight: '500', marginTop: 4 },
  headerImg: {
    width: 126,
    height: 124,
  },

  statRowContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '160',
    zIndex: 10,
    paddingHorizontal: 20,
  },

  statRow: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: {
    color: '#4f4f4f',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14,
  },
  statValue: { color: '#41C3AB', fontSize: 20, fontWeight: '600' },

  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 75,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  moreCategory: { fontSize: 12, color: '#9f9f9f' },

  // 카테고리 카드
  catCard: {
    width: 120,
    marginRight: 12,
  },
  catThumb: {
    height: 90,
    borderRadius: 14,
    backgroundColor: '#F0FAF7',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D5F2EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catName: {
    marginTop: 8,
    fontSize: 12,
    color: '#444',
  },

  // 최근 씨드 행
  seedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...CARD.shadow,
  },
  seedThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F6FFFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  seedImage: { width: '100%', height: '100%' },
  seedTitle: { fontSize: 14, fontWeight: '700', color: '#222' },
  seedSubtitle: { fontSize: 12, color: '#9E9E9E', marginTop: 2 },
  tagRow: { flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  tag: {
    fontSize: 10,
    color: '#7A7A7A',
    backgroundColor: '#F4F7F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
});
