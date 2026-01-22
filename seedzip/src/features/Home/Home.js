import React, { useMemo, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import homeImg from '../../assets/icons/home-img.png';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';
import FolderSection from '../Category/FolderSection';
import { getAllSeeds } from '../../api/SeedApi';
import { getUserSeedInfo, getBookmark } from '../../api/CategoryApi';
import useCategoryActions from '../../hooks/useCategoryActions';
import SeedItem from '../Seed/SeedItem';
import Spinner from '../../components/Spinner';

export default function Home({ navigation }) {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSeedInfo, setUserSeedInfo] = useState({
    localDate: '',
    userName: '',
    todaySeedCount: 0,
    totalCategory: 0,
    totalSeed: 0,
    popular: 0,
    unread: 0,
  });
  const [bookmarks, setBookmarks] = useState([]);
  const [addSeedModalVisible, setAddSeedModalVisible] = useState(false);

  const fetchBookmark = useCallback(async () => {
    const resBookmark = await getBookmark();
    const list = Array.isArray(resBookmark) ? resBookmark : [];
    const bookmarkData = list.map((cat) => ({
      bookmarkId: cat.bookmarkId,
      id: cat.categoryId,
      name: cat.name,
    }));
    setBookmarks(bookmarkData);
  }, []);

  const { actionBtnsBookmark, ActionModalAlert } = useCategoryActions({
    fetchBookmark,
    setBookmarks,
  });

  const stats = useMemo(
    () => [
      {
        key: 'total',
        label: '전체 씨드',
        value: userSeedInfo.totalSeed ?? 0,
        onPress: () => navigation.navigate('seedList', { mode: 'all' }),
      },
      {
        key: 'most',
        label: '많이 찾는 씨드',
        value: userSeedInfo.popular ?? 0,
        onPress: () => navigation.navigate('seedList', { mode: 'popular' }),
      },
      {
        key: 'unread',
        label: '읽지 않은 씨드',
        value: userSeedInfo.unread ?? 0,
        onPress: () => navigation.navigate('seedList', { mode: 'unread' }),
      },
    ],
    [userSeedInfo, navigation],
  );

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const fetchSeeds = async () => {
        try {
          const resAllSeeds = await getAllSeeds();
          const first = Array.isArray(resAllSeeds) ? resAllSeeds[0] : null;
          const list = Array.isArray(first?.seedInfoList)
            ? first.seedInfoList
            : [];
          const seedData = list.map((item) => ({
            seedId: item.seedId,
            seedName: item.seedName,
            categoryName: item.categoryName,
            seedType: item.seedType,
            thumbnailImage: item.thumbnailImage,
            tagName: item.tagName,
            isFavorite: item.isSaved,
          }));
          if (mounted) setSeeds(seedData);
        } catch (e) {
          console.log(
            '[HOME][SEEDS]',
            e?.response?.status,
            e?.response?.data || e?.message || '',
          );
          if (mounted) setSeeds([]);
        }
      };

      const fetchUserInfo = async () => {
        try {
          const resSeedInfo = await getUserSeedInfo();
          const list = Array.isArray(resSeedInfo) ? resSeedInfo : [];
          const info = list[0] ?? {};
          const localDateRaw = info.localDate ?? '';
          const localDate =
            typeof localDateRaw === 'string'
              ? localDateRaw.replace(/-/g, '.')
              : '';

          if (!mounted) return;

          setUserSeedInfo({
            localDate,
            userName: info.userName ?? '',
            todaySeedCount: info.todaySeedCount ?? 0,
            totalCategory: info.totalCategoryCount ?? 0,
            totalSeed: info.totalSeedCount ?? 0,
            popular: info.mostReadSeedCount ?? 0,
            unread: info.neverReadSeedCount ?? 0,
          });
        } catch (e) {
          console.log(
            '[HOME][STATISTICS]',
            e?.response?.status,
            e?.response?.data || e?.message || '',
          );
          if (mounted) {
            setUserSeedInfo({
              localDate: '',
              userName: '',
              todaySeedCount: 0,
              totalCategory: 0,
              totalSeed: 0,
              popular: 0,
              unread: 0,
            });
          }
        }
      };

      const run = async () => {
        setLoading(true);
        await Promise.all([fetchSeeds(), fetchUserInfo(), fetchBookmark()]);
        if (mounted) setLoading(false);
      };

      run();

      return () => {
        mounted = false;
      };
    }, [fetchBookmark]),
  );

  if (loading) return <Spinner />;

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>seedzip</Text>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('search')}>
            <Ionicons name="search-outline" size={22} color="#ffffff" />
          </TouchableOpacity>
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
                  <TouchableOpacity
                    key={s.key}
                    style={styles.statBox}
                    onPress={s.onPress}
                  >
                    <Text style={styles.statLabel}>{s.label}</Text>
                    <Text style={styles.statValue}>
                      {s.key === 'unread' ? `${s.value}+` : s.value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>북마크한 카테고리</Text>
            <Pressable
              hitSlop={8}
              onPress={() =>
                navigation?.navigate?.('category', { showBookmarkFull: true })
              }
            >
              <View style={styles.headerRow}>
                <Text style={styles.moreCategory}>카테고리 더보기</Text>
                <Ionicons name="chevron-forward" size={12} color="#9f9f9f" />
              </View>
            </Pressable>
          </View>
        </View>

        {bookmarks.length > 0 ? (
          <FolderSection
            title="북마크한 카테고리"
            iconName="bookmark-outline"
            data={bookmarks}
            actionBtns={actionBtnsBookmark}
            onPressAll={() =>
              navigation.navigate('category', { showBookmarkFull: true })
            }
            isHome={true}
          />
        ) : (
          <View style={styles.emptyBookmarkContainer}>
            <Text style={styles.emptyBookmarkText}>
              자주 보는 카테고리를 북마크하세요!
            </Text>
          </View>
        )}

        <Text
          style={[
            styles.sectionTitle,
            { marginTop: 36, paddingHorizontal: 20 },
          ]}
        >
          최근 추가한 씨드
        </Text>

        <View style={{ paddingHorizontal: 16 }}>
          {seeds.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                아직 저장한 씨드가 없어요{'\n'}나중에 다시 볼 링크와 사진을
                저장해보세요!
              </Text>
              <TouchableOpacity
                onPress={() => setAddSeedModalVisible(true)}
                style={styles.addSeedBtn}
              >
                <Text style={styles.addSeedText}>씨드 추가하러 가기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            seeds.slice(0, 5).map((seed) => (
              <SeedItem
                key={seed.seedId}
                seed={seed}
                onPress={() =>
                  navigation.navigate('view', {
                    seedId: seed.seedId,
                    isOpen: true,
                  })
                }
                onDeleteSuccess={(deletedId) => {
                  setSeeds((prev) =>
                    prev.filter((s) => s.seedId !== deletedId),
                  );
                }}
              />
            ))
          )}
        </View>
      </ScrollView>

      <BottomNav
        addSeedModalVisible={addSeedModalVisible}
        setAddSeedModalVisible={setAddSeedModalVisible}
      />
      <ActionModalAlert />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: {
    height: 56,
    backgroundColor: '#41C3AB',
    paddingHorizontal: 20,
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
  contentContainer: { flex: 1, position: 'relative' },
  headerCard: {
    paddingBottom: 65,
    backgroundColor: '#41C3AB',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  dateText: { color: '#fff', fontSize: 12, marginBottom: 10 },
  hello: { color: '#fff', fontSize: 24, fontWeight: '600' },
  helloSub: { color: '#fff', fontSize: 18, fontWeight: '500', marginTop: 4 },
  headerImg: { width: 126, height: 124 },
  statRowContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '140',
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
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 15 },
  moreCategory: { fontSize: 12, color: '#9f9f9f', marginRight: 2 },
  emptyBookmarkContainer: {
    backgroundColor: '#f8fbfb',
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 111,
  },
  emptyBookmarkText: {
    color: '#4f4f4f',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  emptyBox: {
    backgroundColor: '#f8fbfb',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 111,
  },
  emptyText: {
    color: '#4f4f4f',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 17,
  },
  addSeedBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#41C3AB',
  },
  addSeedText: { color: '#41C3AB', fontSize: 14, fontWeight: '500' },
});
