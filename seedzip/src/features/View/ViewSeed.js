import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import ThumbnailModal from './ThumbnailModal';
import { getSeed } from '../../api/SeedApi';
import useSeedActions from '../../hooks/useSeedActions';

function ViewSeed({ route }) {
  const navigation = useNavigation();
  const { seedId, isOpen } = route.params;

  const { openDeleteModal, SeedActionModals } = useSeedActions({ navigation });

  const [seedInfo, setSeedInfo] = useState({
    seedId: seedId || 0,
    seedType: '',
    seedName: '',
    seedLink: '',
    fileLinks: [],
    thumbnailImage: 0,
    categoryName: [],
    tagName: [],
    dDay: '',
    seedDetail: '',
  });
  const [remainingDays, setRemainingDays] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = (file) => setSelectedFile(file);
  const closeModal = () => setSelectedFile(null);

  useEffect(() => {
    handleViewSeed();
  }, [seedId]);

  useEffect(() => {
    if (seedInfo.dDay) {
      calRemainingDays(seedInfo.dDay);
    }
  }, [seedInfo.dDay]);

  const calRemainingDays = () => {
    const currentDate = new Date();
    const dDayDate = new Date(seedInfo.dDay);
    const timeDiff = dDayDate - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setRemainingDays(dayDiff);
  };

  useEffect(() => {
    // seed item 클릭 시, 해당 링크로 이동
    if (seedInfo && seedInfo.seedType && isOpen) {
      if (seedInfo.seedType === 'LINK' && seedInfo.seedLink) {
        handleLinkClick(seedInfo.seedLink);
      } else if (seedInfo.seedType !== 'LINK') {
        openModal('justOpenThumbnailModal');
      }
    }
  }, [seedInfo, isOpen, navigation]);

  const handleViewSeed = async () => {
    const resSeed = await getSeed(seedId);
    const seedData = resSeed[0];
    setSeedInfo({
      seedId: seedData.seedId,
      seedType: seedData.seedType,
      seedName: seedData.seedName,
      seedLink: seedData.seedLink,
      fileLinks: seedData.fileLinks,
      thumbnailImage: seedData.thumbnailImage,
      tagName: seedData.tagName,
      categoryName: seedData.categoryName,
      dDay: seedData.dDay,
      seedDetail: seedData.seedDetail,
      filename: seedData.title,
    });
  };

  const handleLinkClick = (url) => {
    Linking.openURL(url);
  };

  const handleCopyLink = (url) => {
    Clipboard.setString(url);
    alert('링크가 복사되었습니다.');
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu
          contentStyle={{
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingVertical: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.01,
            shadowRadius: 8,
          }}
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity
              onPress={openMenu}
              style={{ position: 'relative' }}
            >
              <MaterialIcons name="more-vert" size={20} color="#000" />
            </TouchableOpacity>
          }
          style={{
            position: 'absolute',
            top: 105,
          }}
        >
          {seedInfo.seedType !== 'PDF' && (
            <TouchableOpacity
              onPress={() => {
                closeMenu();
                alert('씨드 수정하기');
              }}
            >
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>씨드 수정하기</Text>
                <Feather name="edit-3" size={16} color="#000" />
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.menuDivider} />
          <TouchableOpacity
            onPress={() => {
              closeMenu();
              openDeleteModal(seedInfo);
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>씨드 삭제하기</Text>
              <Feather name="trash-2" size={16} color="black" />
            </View>
          </TouchableOpacity>
        </Menu>
      ),
    });
  }, [navigation, menuVisible]);

  return (
    <Provider>
      <View style={styles.contentPage}>
        <View style={styles.contents}>
          <Text style={styles.titleDiv}>{seedInfo.seedName}</Text>
          <View
            style={[
              styles.upperDiv,
              {
                flexDirection:
                  seedInfo.seedType === 'PDF' || seedInfo.seedType === 'IMAGE'
                    ? 'column'
                    : 'row',
              },
            ]}
          >
            {seedInfo.seedType === 'LINK' && (
              <TouchableOpacity
                onPress={() => handleLinkClick(seedInfo.seedLink)}
              >
                <View style={styles.linkBox}>
                  <Text
                    style={[{ fontSize: 12, color: '#4f4f4f', paddingTop: 4 }]}
                  >
                    {seedInfo.seedLink}
                  </Text>
                  <View
                    style={[
                      {
                        backgroundColor: '#41c3ab',
                        padding: 5,
                        borderRadius: 4,
                        width: 51,
                        height: 20,
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => handleCopyLink(seedInfo.seedLink)}
                    >
                      <Text style={[{ fontSize: 10, color: '#fff' }]}>
                        링크복사
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}

            {seedInfo.seedType !== 'LINK' && (
              <ScrollView horizontal style={styles.imagesWrapper}>
                {seedInfo.fileLinks.map((image, index) => (
                  <View key={image} style={styles.imageContainer}>
                    <TouchableOpacity onPress={() => openModal(image)}>
                      {index === seedInfo.thumbnailImage && (
                        <View style={styles.represenDiv}>
                          <Text style={styles.represenLabel}>대표</Text>
                        </View>
                      )}
                      <View style={styles.imageDiv}>
                        <Image
                          source={{ uri: image }}
                          style={styles.imagePreview}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            {selectedFile && (
              <ThumbnailModal
                file={selectedFile}
                files={
                  seedInfo.seedType === 'PDF'
                    ? seedInfo.fileLinks
                    : seedInfo.fileLinks
                }
                onClose={closeModal}
                seedType={seedInfo.seedType}
              />
            )}
          </View>
          <View style={styles.grayBox}></View>
          <View style={styles.infoDiv}>
            <Text style={[{ fontSize: 20, fontWeight: '600' }]}>상세정보</Text>
            <View style={styles.contentDiv}>
              <Text style={styles.name}>카테고리</Text>
              <View style={styles.categoryContainer}>
                {seedInfo.categoryName.map((category) => (
                  <View key={category} style={styles.textWrapper}>
                    <Text style={styles.divText}>{category}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.contentDiv}>
              <Text style={styles.name}>태그</Text>
              <View style={styles.tagNameContainer}>
                {seedInfo.tagName.map((tag) => (
                  <View key={tag} style={styles.textWrapper}>
                    <Text style={styles.divText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>

            {seedInfo.dDay && (
              <View style={styles.contentDiv}>
                <Text style={styles.name}>디데이</Text>
                <View style={styles.dDayDiv}>
                  {remainingDays !== null && (
                    <View
                      style={[
                        styles.textWrapper,
                        { backgroundColor: '#def3f1' },
                      ]}
                    >
                      <Text style={styles.divText}>
                        {`D${
                          remainingDays >= 0
                            ? `-${remainingDays}`
                            : `+${Math.abs(remainingDays)}`
                        }`}
                      </Text>
                    </View>
                  )}
                  <View style={styles.textWrapper}>
                    <Text style={styles.divText}>{seedInfo.dDay}</Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.memo}>
              <Text style={styles.name}>메모</Text>
              <View style={styles.memoDiv}>
                <Text style={styles.detail}>{seedInfo.seedDetail}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <SeedActionModals />
    </Provider>
  );
}

const styles = StyleSheet.create({
  contentPage: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  contents: {
    marginBottom: 20,
  },
  titleDiv: {
    fontSize: 20,
    fontWeight: '600',
  },
  grayBox: {
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    height: 14,
    marginLeft: -20,
    marginRight: -20,
  },
  infoDiv: {
    marginTop: 20,
  },
  upperDiv: {
    marginTop: 20,
  },
  contentDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: 'semibold',
    width: 75,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 287,
  },
  textWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    width: 'auto',
    height: 22,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginRight: 8,
  },
  divText: {
    fontSize: 12,
    color: '#4f4f4f',
  },
  tagNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: 287,
  },
  tagWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 16,
    color: '#000',
  },
  linkBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#9f9f9f',
    paddingBottom: 8,
    width: 350,
    gap: 7,
  },
  imagesWrapper: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingTop: 3,
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  imageDiv: {
    width: 100,
    height: 100,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 3,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  fileName: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 10,
  },
  represenDiv: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 26,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  represenLabel: {
    color: '#4f4f4f',
    fontWeight: 'medium',
    fontSize: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dDayDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memo: {
    marginTop: 20,
  },
  memoDiv: {
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 5,
    padding: 10,
    marginTop: 8,
    height: 174,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: 159,
    backgroundColor: 'white',
  },
  menuText: {
    fontSize: 12,
    color: '#000',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default ViewSeed;
