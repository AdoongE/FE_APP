import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { patchSeed } from '../../api/SeedApi';
import ImageSave from '../Add/ImageSave';

const EditSeed = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { seed } = route.params;

  const [title, setTitle] = useState(seed.seedName || '');
  const [memo, setMemo] = useState(seed.seedDetail || '');
  const [categories, setCategories] = useState(seed.categoryName || []);
  const [tags, setTags] = useState(seed.tagName || []);
  const [dDay, setDDay] = useState(seed.dDay || '');

  const [pickerDate, setPickerDate] = useState(
    seed.dDay && seed.dDay !== '' ? new Date(seed.dDay) : new Date(),
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (route.params?.updatedCategories) {
      setCategories(route.params.updatedCategories);
    }
  }, [route.params?.updatedCategories]);

  useEffect(() => {
    if (route.params?.updatedTags) {
      setTags(route.params.updatedTags);
    }
  }, [route.params?.updatedTags]);

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDDay(formattedDate);
    setPickerDate(selectedDate);
    setOpen(false);
  };

  const handleUpdateSeed = async () => {
    const patchData = {
      seedType: seed.seedType,
      seedName: title,
      categoryName: categories,
      tagName: tags,
      dDay: dDay,
      seedDetail: memo,
    };

    await patchSeed(seed.seedId, patchData);
    navigation.navigate('view', { seedId: seed.seedId, isOpen: false });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>수정할 씨드 정보를{'\n'}확인하세요</Text>

      <TextInput
        style={styles.input}
        placeholder="제목 입력하기"
        maxLength={30}
        value={title}
        onChangeText={setTitle}
      />

      {seed.seedType === 'LINK' && (
        <View style={styles.linkBox}>
          <View style={styles.circle}>
            <Ionicons name="link-outline" color="white" />
          </View>
          <Text style={styles.linkText}>{seed.seedLink}</Text>
        </View>
      )}
      {seed.seedType === 'IMAGE' && (
        <ImageSave
          route={{
            params: {
              selectedImages: seed.fileLinks,
              thumbnailIndex: seed.thumbnailImage,
            },
          }}
        />
      )}

      <View>
        <View style={[styles.contentDiv, { marginTop: 20 }]}>
          <View style={styles.contentName}>
            <Text style={styles.name}>카테고리</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('editCategory', {
                  categories,
                  seed,
                })
              }
            >
              <Feather name="edit-3" size={16} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            {categories.map((category, index) => (
              <View key={index} style={styles.textWrapper}>
                <Text key={index} style={styles.divText}>
                  {category}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.contentDiv]}>
          <View style={styles.contentName}>
            <Text style={styles.name}>태그</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('editTag', {
                  tags,
                  seed,
                })
              }
            >
              <Feather name="edit-3" size={16} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.textWrapper}>
                <Text key={index} style={styles.divText}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <View style={[styles.contentDiv, { marginTop: 18 }]}>
            <Text style={styles.name}>디데이</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            디데이를 설정하고 알림을 받아보세요.
          </Text>
          <TouchableOpacity
            style={styles.ddayContent}
            onPress={() => setOpen(true)}
          >
            <Ionicons
              name="calendar-clear-outline"
              size={12}
              color="#9f9f9f"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.divText}>{dDay || 'YYYY/MM/DD'}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={pickerDate}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setOpen(false)}
          />
        </View>

        <View style={styles.memo}>
          <Text style={styles.name}>메모</Text>
          <View style={styles.memoDiv}>
            <TextInput
              style={styles.detail}
              placeholder="여기를 눌러 메모를 입력하세요"
              maxLength={1500}
              value={memo}
              onChangeText={setMemo}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleUpdateSeed}>
        <Text style={styles.nextButtonText}>수정완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#9f9f9f',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    paddingBottom: 10,
  },
  linkBox: {
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 5,
    marginBottom: 12,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 9,
    width: 'auto',
  },
  linkText: {
    fontSize: 12,
    color: '#4f4f4f',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 40,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentDiv: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  contentName: {
    width: 95,
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  sectionSubtitle: {
    fontSize: 10,
    color: '#9f9f9f',
    paddingTop: 7,
  },
  ddayContent: {
    borderWidth: 1,
    borderColor: '#dcdada',
    borderRadius: 5,
    width: 126,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    marginTop: 8,
  },
  textWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    height: 22,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  divText: {
    fontSize: 12,
    color: '#4f4f4f',
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
  detail: {
    height: '100%',
  },
  nextButton: {
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pencil: {
    marginLeft: 8,
  },
});

export default EditSeed;
