// EditJob.jsx
import React, { useMemo, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditJob() {
  const navigation = useNavigation();
  const route = useRoute();

  const initialJob = route?.params?.job ?? '';
  const setJobParent = route?.params?.setJob;

  const [open, setOpen] = useState(false);

  const [job, setJob] = useState(initialJob);

  const [customJob, setCustomJob] = useState('');

  const jobs = useMemo(
    () => [
      '직장인',
      '프리랜서',
      '학생',
      '무직',
      '아르바이트',
      '기타(직접입력)',
    ],
    [],
  );

  const items = useMemo(
    () => jobs.map((j) => ({ label: j, value: j })),
    [jobs],
  );

  useEffect(() => {
    if (route?.params?.job !== undefined) {
      setJob(route.params.job);
    }
  }, [route?.params?.job]);

  const disabled =
    !job || (job === '기타(직접입력)' && customJob.trim() === '');

  const onSave = () => {
    const finalValue = job === '기타(직접입력)' ? customJob.trim() : job;
    if (setJobParent) setJobParent(finalValue);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Ionicons
          name="chevron-back"
          size={22}
          color="#111"
          onPress={() => navigation.goBack()}
        />
        <Text style={s.headerTitle}>회원정보 수정</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={s.body}>
        <View style={s.content}>
          <Text style={s.guide}>수정할 직업을 선택해주세요</Text>

          <View style={{ zIndex: 30, elevation: 30 }}>
            <DropDownPicker
              open={open}
              value={job || null}
              items={items}
              setOpen={(o) => setOpen(o)}
              setValue={setJob}
              placeholder="직업 선택하기"
              style={s.ddInput}
              dropDownContainerStyle={s.ddMenu}
              textStyle={s.ddText}
              listItemContainerStyle={s.ddItem}
              listMode="FLATLIST"
              flatListProps={{ nestedScrollEnabled: true }}
              ArrowDownIconComponent={() => (
                <Ionicons name="chevron-down" size={18} color="#111" />
              )}
              ArrowUpIconComponent={() => (
                <Ionicons name="chevron-up" size={18} color="#111" />
              )}
            />
          </View>

          {job === '기타(직접입력)' && (
            <TextInput
              value={customJob}
              onChangeText={setCustomJob}
              placeholder="직업을 입력하세요"
              placeholderTextColor="#BDBDBD"
              style={s.input}
            />
          )}
        </View>

        <Pressable
          onPress={onSave}
          disabled={disabled}
          style={[s.saveBtn, disabled && s.saveBtnDisabled]}
        >
          <Text style={s.saveText}>저장</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111' },

  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  guide: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#111',
  },

  ddInput: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
  },
  ddMenu: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    maxHeight: 240,
  },
  ddItem: { minHeight: 48 },
  ddText: { fontSize: 18, color: '#111' },

  input: {
    marginTop: 12,
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    fontSize: 16,
    color: '#111',
  },

  saveBtn: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#41C3AB',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
