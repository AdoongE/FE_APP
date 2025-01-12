import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
// import Clipboard from '@react-native-clipboard/clipboard';
// import { Icon } from 'react-native-vector-icons/Ionicons';
// import { axiosInstance } from './api/axios-instance';
import ThumbnailModal from './ThumbnailModal';

function ViewContent() {
  const navigation = useNavigation();
  const route = useRoute();
  const [contentInfo, setContentInfo] = useState({
    contentId: '',
    contentDataType: '',
    contentName: '',
    contentLink: '',
    contentImage: [],
    contentDoc: [],
    thumbnailImage: 0,
    boardCategory: [],
    tags: [],
    dday: '',
    contentDetail: '',
  });
  const [remainingDays, setRemainingDays] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = (file) => setSelectedFile(file);
  const closeModal = () => setSelectedFile(null);

  useEffect(() => {
    setContentInfo({
        contentId: 5,
        contentDataType: 'IMAGE',
        contentName: '제목입니다~~',
        contentLink: 'https://www.naver.com',
        contentImage: ['https://content-img.s3.ap-northeast-2.amazonaws.com/1736524061934_1736101988625_%E1%84%82%E1%85%A9%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B7%E1%84%80%E1%85%A9%E1%86%B71.png', 'https://content-img.s3.ap-northeast-2.amazonaws.com/1736089813040_chiikawa.png'],
        contentDoc: [''],
        thumbnailImage: 0,
        boardCategory: ['네이버', '구글', '곰돌이'],
        tags: ['태그1', '태그2', '곰곰'],
        dday: '2025-1-15',
        contentDetail: '이것은 메모장입니다. 그걸 잘 고려하시기 바랍니다.',
        filename: ['농담곰.png', '치.png'],
        });
  }, []);

  useEffect(() => {
    // handleViewContent();
    if (contentInfo.dday) {
      calRemainingDays(contentInfo.dday);
    }
  }, [contentInfo.dday]);

  const calRemainingDays = () => {
    const currentDate = new Date();
    const ddayDate = new Date(contentInfo.dday);
    const timeDiff = ddayDate - currentDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setRemainingDays(dayDiff);
  };

//   const handleViewContent = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `/api/v1/content/all/${route.params.contentId}`,
//       );
//       const results = response.data.results[0];
//       setContentInfo({
//         contentId: results.contentId,
//         contentDataType: results.contentDataType,
//         contentName: results.contentName,
//         contentLink: results.contentLink,
//         contentImage: results.contentImage,
//         contentDoc: results.contentDoc,
//         thumbnailImage: results.thumbnailImage,
//         boardCategory: results.boardCategory,
//         tags: results.tags,
//         dday: results.dday,
//         contentDetail: results.contentDetail,
//         filename: results.title,
//       });
//     } catch (error) {
//       console.error('Error fetching content:', error);
//     }
//   };

  const handleLinkClick = (url) => {
    Linking.openURL(url);
    console.log('링크 클릭');
  };

  const handleCopyLink = (url) => {
    Clipboard.setString(url);
    alert('링크가 복사되었습니다.');
  };

  return (
    <View style={styles.contentPage}>
      <View style={styles.contents}>
        <Text style={styles.titleDiv}>{contentInfo.contentName}</Text>

        <View
          style={[
            styles.contentDiv,
            {
              flexDirection:
                contentInfo.contentDataType === 'PDF' || contentInfo.contentDataType === 'IMAGE'
                  ? 'column'
                  : 'row',
            },
          ]}
        >
          {contentInfo.contentDataType === 'LINK' && (
            <TouchableOpacity onPress={() => handleLinkClick(contentInfo.contentLink)}>
              <View style={styles.linkBox}>
                <Text style={[{ fontSize: 12, color: '#4f4f4f', paddingTop: 4, }]}>{contentInfo.contentLink}</Text>
                <View style={[{ backgroundColor: '#41c3ab', padding: 5, borderRadius: 4, width: 51, height: 20, alignItems: 'center' }]}>
                    <TouchableOpacity onPress={() => handleCopyLink(contentInfo.contentLink)}>
                      <Text style={[{ fontSize: 10, color: '#fff', }]}>링크복사</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {contentInfo.contentDataType === 'IMAGE' && (
            <ScrollView horizontal style={styles.imagesWrapper}>
              {contentInfo.contentImage.map((image, index) => (
                <View key={image} style={styles.imageContainer}>
                  <TouchableOpacity onPress={() => openModal(image)}>
                    {index === contentInfo.thumbnailImage && (
                      <View style={styles.represenDiv}>
                        <Text style={styles.represenLabel}>대표</Text>
                      </View>
                    )}
                    <View style={styles.imageDiv}>
                      <Image source={{ uri: image }} style={styles.imagePreview} />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          {contentInfo.contentDataType === 'PDF' && (
            <View style={styles.filesWrapper}>
              {contentInfo.contentDoc.map((file, index) => (
                <View key={file} style={styles.fileContainer}>
                  <TouchableOpacity onPress={() => openModal(file)}>
                    {index === contentInfo.thumbnailImage &0(
                      <Text style={styles.representativeLabel}>대표</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {selectedFile && (
            <ThumbnailModal
              file={selectedFile}
              files={
                contentInfo.contentDataType === 'PDF'
                  ? contentInfo.contentDoc
                  : contentInfo.contentImage
              }
              onClose={closeModal}
              contentDataType={contentInfo.contentDataType}
            />
          )}
        </View>
        <View style={styles.grayBox}></View>
        <View style={styles.infoDiv}>
            <Text style={[{ fontSize: 20, fontWeight: 'bold', }]}>상세정보</Text>
            <View style={styles.contentDiv}>
                <Text style={styles.name}>카테고리</Text>
                <View style={styles.categoryContainer}>
                    {contentInfo.boardCategory.map((category) => (
                    <View key={category} style={styles.textWrapper}>
                        <Text style={styles.divText}>{category}</Text>
                    </View>
                    ))}
                </View>
            </View>


            <View style={styles.contentDiv}>
                <Text style={styles.name}>태그</Text>
                <View style={styles.tagsContainer}>
                    {contentInfo.tags.map((tag) => (
                    <View key={tag} style={styles.textWrapper}>
                        <Text style={styles.divText}>{tag}</Text>
                    </View>
                    ))}
                </View>
            </View>

            <View style={styles.contentDiv}>
                <Text style={styles.name}>디데이</Text>
                <View style={styles.ddayDiv}>
                    {remainingDays !== null && (
                    <View style={[styles.textWrapper, { backgroundColor: '#def3f1' }]}>
                        <Text style={styles.divText}>
                        {`D${remainingDays >= 0 ? `-${remainingDays}` : `+${Math.abs(remainingDays)}`}`}
                        </Text>
                    </View>
                    )}
                    <View style={styles.textWrapper}>
                    <Text style={styles.divText}>
                        {remainingDays ? contentInfo.dday : 'yyyy-mm-dd'}
                    </Text>
                    </View>
                </View>
            </View>

            <View style={styles.memo}>
            <Text style={styles.name}>메모</Text>
                <View style={styles.memoDiv}>
                    <Text style={styles.detail}>{contentInfo.contentDetail}</Text>
                </View>
            </View>
        </View>
    </View>

    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
  },
grayBox: {
  marginTop: 15,
  backgroundColor: '#f2f2f2',
  height: 14,
  marginLeft: -20,
  marginRight: -20,
  },
  infoDiv: {
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
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    shadowOpacity: 0.25,
    shadowRadius: 3,
    marginBottom: 5,
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
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 10,
    width: 26,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  represenLabel: {
    color: '#4f4f4f',
    fontWeight: 'medium',
    fontSize: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ddayDiv: {
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
});

export default ViewContent;