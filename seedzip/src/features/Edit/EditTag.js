import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import close from '../../assets/icons/close.png';
import { MyTabs } from '../../components/tag/TagScreens';
import { MyContext } from '../../../App';

function EditTag() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tags: initialTags, seed } = route.params;
  const { totalTags, setTotalTags } = useContext(MyContext);

  useEffect(() => {
    if (initialTags) {
      setTotalTags(initialTags);
    }

    return () => {
      setTotalTags([]);
    };
  }, [initialTags, setTotalTags]);

  const handleComplete = () => {
    navigation.navigate('editSeed', { seed: seed, updatedTags: totalTags });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.title}>태그를 수정해주세요</Text>
        <Text style={styles.short}>태그는 2개 이상 필수로 입력해야 해요 </Text>
        <ScrollView
          style={styles.input}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {totalTags.map((tag, idx) => (
            <TouchableOpacity style={styles.chip} key={idx}>
              <Text style={styles.tagP}>{tag}</Text>
              <TouchableOpacity
                onPress={() => {
                  const updatedTags = totalTags.filter((item) => item !== tag);
                  setTotalTags(updatedTags);
                }}
              >
                <Image source={close} style={{ width: 12, height: 12 }} />
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
        onPress={handleComplete}
      >
        <Text style={styles.buttonText}>완료</Text>
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
    fontWeight: '500',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 24,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 4 },
  short: {
    color: '#898989',
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 28,
  },
  button: {
    width: 350,
    height: 51,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 'auto',
    marginHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DCDADA',
    marginBottom: 36,
    paddingHorizontal: 8,
    paddingVertical: 7,
    flexDirection: 'row',
  },
  line: {
    height: 14,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
});

export default EditTag;
