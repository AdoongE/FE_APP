import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MyTag} from '../../api/MyTagApi';
import tagImage from '../../assets/icons/tag.png';
import tagButton from '../../assets/icons/tagEnter.png';
import {MyContext} from '../../../App';
import close from '../../assets/icons/close.png';

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

function OriginalTagScreen() {
  const [selectedTags, setSelectedTags] = useState([]);
  const {totalTags, setTotalTags} = useContext(MyContext);

  const handleSelectTag = tag => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag],
    );
  };

  useEffect(() => {
    setTotalTags(prev => {
      const updatedTags = [...new Set([...prev, ...selectedTags])];
      if (JSON.stringify(prev) !== JSON.stringify(updatedTags)) {
        return updatedTags;
      }
      return prev;
    });
  }, [selectedTags, setTotalTags]);

  useEffect(() => {
    setSelectedTags(prevSelected =>
      prevSelected.filter(tag => totalTags.includes(tag)),
    );
  }, [totalTags]);

  useEffect(() => {
    console.log('선택된 기본 태그: ', selectedTags);
  }, [selectedTags]);

  return (
    <View style={styles.screen}>
      <View style={styles.TagContainer}>
        {TagOption.map((tag, index) => (
          <TouchableOpacity
            style={[
              styles.TagButton,
              selectedTags.includes(tag) && styles.selectedTagButton,
            ]}
            key={index}
            onPress={() => handleSelectTag(tag)}
            $isSelected={selectedTags.includes(tag)}>
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

function MyTagScreen() {
  const [mySelectedTags, setMySelectedTags] = useState([]);
  const {totalTags, setTotalTags} = useContext(MyContext);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const myTags = await MyTag();
      if (Array.isArray(myTags)) {
        console.log('가져온 내 태그:', myTags);
        setTags(myTags);
      } else {
        console.log('태그 데이터를 가져오지 못했습니다.');
        setTags([]);
      }
    };
    fetchTags();
  }, []);

  const handleSelectTag = tag => {
    setMySelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag],
    );
  };

  useEffect(() => {
    setTotalTags(prev => {
      const updatedTags = [...new Set([...prev, ...mySelectedTags])];
      if (JSON.stringify(prev) !== JSON.stringify(updatedTags)) {
        return updatedTags;
      }
      return prev;
    });
  }, [mySelectedTags, setTotalTags]);

  useEffect(() => {
    setMySelectedTags(prevSelected =>
      prevSelected.filter(tag => totalTags.includes(tag)),
    );
  }, [totalTags]);

  useEffect(() => {
    console.log('선택된 나의 태그: ', mySelectedTags);
  }, [mySelectedTags]);

  return (
    <View style={styles.screen}>
      {Array.isArray(tags) && tags.length > 0 ? (
        <View style={styles.TagContainer}>
          {tags.map((tag, index) => (
            <TouchableOpacity
              style={[
                styles.TagButton,
                mySelectedTags.includes(tag) && styles.selectedTagButton,
              ]}
              key={index}
              onPress={() => handleSelectTag(tag)}
              $isSelected={mySelectedTags.includes(tag)}>
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

function NewTagScreen() {
  const [newTag, setNewTag] = useState('');
  const {setTotalTags} = useContext(MyContext);

  const handleChange = text => {
    setNewTag(text.trim());
  };

  useEffect(() => {
    console.log('입력한 태그: ', newTag);
  }, [newTag]);

  const handleSubmit = () => {
    if (newTag !== '') {
      setTotalTags(prev => [...prev, newTag]);
      setNewTag('');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="태그 입력하기"
          style={styles.inputBox}
          onChangeText={handleChange}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Image source={tagButton} style={{marginTop: '10'}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
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

function AddTag({navigation}) {
  const {tags, setTags, totalTags, setTotalTags} = useContext(MyContext);

  useEffect(() => {
    console.log('최종 태그: ', totalTags);
  }, [tags, totalTags]);

  const handleClick = () => {
    console.log('제출 태그: ', totalTags);
    setTags(totalTags);
    navigation.navigate('add');
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: '20'}}>
        <Text style={styles.title}>태그를 입력해주세요</Text>
        <Text style={styles.short}>태그는 2개 이상 필수로 입력해야 해요 </Text>
        <ScrollView
          style={styles.input}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {totalTags.map((tag, idx) => (
            <TouchableOpacity style={styles.chip} key={idx}>
              <Text style={styles.tagP}>{tag}</Text>
              <TouchableOpacity
                onPress={() => {
                  const updatedTags = totalTags.filter(item => item !== tag);
                  setTotalTags(updatedTags);
                }}>
                <Image source={close} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.line} />

      <MyTabs />

      <TouchableOpacity
        style={styles.button}
        disabled={totalTags.length < 2}
        onPress={handleClick}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#41c3ab',
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    columnGap: 4,
    marginRight: 5,
  },
  tagP: {
    fontSize: 12,
    fontWeight: 500,
    color: 'white',
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
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  noText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 25.2,
    color: '#4F4F4F',
  },
  noTag: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TagContainer: {
    marginVertical: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 4,
    alignContent: 'flex-start',
    marginRight: 20,
  },
  TagButton: {
    height: 30,
    alignSelf: 'flex-start',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#9F9F9F',
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 24,
  },
  title: {marginTop: 29.96, fontSize: 24, fontWeight: 600, marginBottom: 4},
  short: {
    color: '#898989',
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 28,
  },
  button: {
    width: 350,
    height: 51,
    border: 0,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 'auto',
    marginHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },
  input: {
    width: 350,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DCDADA',
    marginBottom: 36,
    paddingHorizontal: 8,
    paddingVertical: 7,
    flexDirection: 'row',
    overflow: 'scroll',
  },
  line: {
    height: 14,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
});

export default AddTag;
