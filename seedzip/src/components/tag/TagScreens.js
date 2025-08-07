import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MyTag} from '../../api/MyTagApi';
import {MyContext} from '../../../App';
import tagImage from '../../assets/icons/tag.png';
import tagButton from '../../assets/icons/tagEnter.png';

const TagOption = [
  '기획/아이디어',
  '여행',
  '글로벌',
  '맛집',
  '철학',
  '음식/요리',
  '운동',
  '건강',
  '스포츠',
  '영화/드라마',
  '뮤지컬/연극',
  '연예',
  '음악',
  '뷰티',
  '패션',
  '디자인',
  'UI/UX',
  '인테리어',
  '사진',
  '영상',
  'SNS',
  'IT',
  '비지니스',
  '자기계발',
  '생산성',
  '생활',
  '반려동물',
  '책/글쓰기',
  '취미',
  '게임',
  '공부',
  '금융/재테크',
  '부동산',
  '예술',
  '환경',
  '역사',
  '과학',
  '심리학',
  '교육',
  '정치',
];

export function OriginalTagScreen() {
  const [selectedTags, setSelectedTags] = useState([]);
  const {totalTags, setTotalTags} = useContext(MyContext);

  const handleSelectTag = tag => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  useEffect(() => {
    setTotalTags(prev => {
      const updated = [...new Set([...prev, ...selectedTags])];
      return JSON.stringify(prev) !== JSON.stringify(updated) ? updated : prev;
    });
  }, [selectedTags]);

  useEffect(() => {
    setSelectedTags(prev => prev.filter(tag => totalTags.includes(tag)));
  }, [totalTags]);

  return (
    <View style={styles.screen}>
      <View style={styles.TagContainer}>
        {TagOption.map((tag, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.TagButton,
              selectedTags.includes(tag) && styles.selectedTagButton,
            ]}
            onPress={() => handleSelectTag(tag)}>
            <Text
              style={[
                styles.TagText,
                selectedTags.includes(tag) && styles.selectedTagText,
              ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function MyTagScreen() {
  const [tags, setTags] = useState([]);
  const [mySelectedTags, setMySelectedTags] = useState([]);
  const {totalTags, setTotalTags} = useContext(MyContext);

  useEffect(() => {
    const fetchTags = async () => {
      const myTags = await MyTag();
      const names = Array.isArray(myTags) ? myTags.map(t => t.name) : [];
      setTags(names);
    };
    fetchTags();
  }, []);

  const handleSelectTag = tag => {
    setMySelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  useEffect(() => {
    setTotalTags(prev => {
      const updated = [...new Set([...prev, ...mySelectedTags])];
      return JSON.stringify(prev) !== JSON.stringify(updated) ? updated : prev;
    });
  }, [mySelectedTags]);

  useEffect(() => {
    setMySelectedTags(prev => prev.filter(tag => totalTags.includes(tag)));
  }, [totalTags]);

  return (
    <View style={styles.screen}>
      {tags.length ? (
        <View style={styles.TagContainer}>
          {tags.map((tag, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.TagButton,
                mySelectedTags.includes(tag) && styles.selectedTagButton,
              ]}
              onPress={() => handleSelectTag(tag)}>
              <Text
                style={[
                  styles.TagText,
                  mySelectedTags.includes(tag) && styles.selectedTagText,
                ]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.noTag}>
          <Image source={tagImage} />
          <Text style={styles.noText}>
            ‘직접 입력’에서{'\n'}나만의 태그를 만들고 저장하세요!
          </Text>
        </View>
      )}
    </View>
  );
}

export function NewTagScreen() {
  const [newTag, setNewTag] = useState('');
  const {setTotalTags} = useContext(MyContext);

  const handleSubmit = () => {
    if (newTag.trim()) {
      setTotalTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="태그 입력하기"
          value={newTag}
          onChangeText={setNewTag}
          style={styles.inputBox}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Image source={tagButton} style={{marginTop: 10}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: {backgroundColor: '#41C3AB', height: 3},
      }}>
      <Tab.Screen name="기본 태그" component={OriginalTagScreen} />
      <Tab.Screen name="나의 태그" component={MyTagScreen} />
      <Tab.Screen name="직접 입력" component={NewTagScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: 'white', paddingHorizontal: 20},
  TagContainer: {
    marginVertical: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 4,
    alignContent: 'flex-start',
  },
  TagButton: {
    height: 30,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#9F9F9F',
    marginBottom: 10,
  },
  selectedTagButton: {
    backgroundColor: '#41C3AB',
    borderWidth: 0,
  },
  TagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9F9F9F',
  },
  selectedTagText: {
    color: 'white',
  },
  noText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 25.2,
    color: '#4F4F4F',
  },
  noTag: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 350,
    height: 53,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DCDADA',
    marginTop: 24,
    flexDirection: 'row',
    paddingHorizontal: 16,
    columnGap: 5,
  },
  inputBox: {
    width: 290,
    height: 35,
    fontSize: 16,
    marginTop: 8,
  },
});
