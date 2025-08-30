import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {MyContext} from '../../../App';
import close from '../../assets/icons/close.png';
import {MyTabs} from '../../components/tag/TagScreens';

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
