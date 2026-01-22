import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { EditMyInfo, GetMyInfo } from '../../../api/SignUpApi';

function FieldRow({ label, value, onPress }) {
  return (
    <>
      <Text style={s.label}>{label}</Text>
      <Pressable onPress={onPress}>
        <View style={s.row}>
          <Text style={s.value}>{value}</Text>
          <Ionicons name="chevron-forward" size={18} color="#9F9F9F" />
        </View>
      </Pressable>
      <View style={s.divider} />
    </>
  );
}

export default function EditMypage() {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [job, setJob] = useState('');
  const [field, setField] = useState('');
  const [consent, setConsent] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [nickTouched, setNickTouched] = useState(false);
  const [nickError, setNickError] = useState(false);
  const nicknameRegex = /^[a-zA-Z0-9가-힣\s]{1,10}$/;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const result = await GetMyInfo();
        setNickname(result?.nickname ?? '');
        setBirthday(result?.birthday ?? '');
        setGender(result?.gender ?? '');
        setJob(result?.occupation ?? '');
        setField(result?.field ?? '');
        setConsent(!!result?.consentToMarketingAndAds);
      } catch (e) {
        Alert.alert('오류', '내 정보를 불러오지 못했습니다.');
      }
    };
    fetchInfo();
  }, []);

  const onChangeNickname = (text) => {
    setNickname(text);
    if (text.trim() === '') setNickError('empty');
    else if (!nicknameRegex.test(text)) setNickError('invalid');
    else setNickError(false);
  };

  const saveDisabled =
    nickError !== false || nickname.trim() === '' || !nickTouched;

  const handleEditMypage = async () => {
    const trimmed = nickname.trim();
    if (trimmed === '' || !nicknameRegex.test(trimmed)) {
      setNickTouched(true);
      setNickError(trimmed === '' ? 'empty' : 'invalid');
      return;
    }

    const formData = {
      nickname: trimmed,
      birthday,
      gender,
      job,
      field,
      consentToMarketingAndAds: consent,
    };

    try {
      await EditMyInfo(formData);
      Alert.alert('완료', '회원정보가 저장되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      const msg =
        error?.response?.data?.status?.message ||
        error?.message ||
        '알 수 없는 오류';
      Alert.alert('실패', `회원정보 수정 실패: ${msg}`);
    }
  };

  const genderLabel =
    gender === 'FEMALE' ? '여성' : gender === 'MALE' ? '남성' : '';

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

      <View style={s.contentWrapper}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text style={s.label}>닉네임*</Text>
          <TextInput
            value={nickname}
            onChangeText={onChangeNickname}
            placeholder="닉네임을 입력하세요"
            placeholderTextColor="#b7b7b7"
            style={[
              s.input,
              {
                borderBottomColor: isFocused
                  ? '#41C3AB'
                  : nickError
                  ? '#FF0000'
                  : '#DCDADA',
              },
            ]}
            onFocus={() => {
              setIsFocused(true);
              setNickTouched(true);
            }}
            onBlur={() => setIsFocused(false)}
          />
          {nickError === 'empty' && (
            <Text style={s.error}>닉네임을 입력하지 않았어요</Text>
          )}
          {nickError === 'invalid' && (
            <Text style={s.error}>닉네임을 형식에 맞춰 입력해주세요</Text>
          )}

          <FieldRow
            label="생년월일*"
            value={birthday}
            onPress={() =>
              navigation.navigate('editBirthday', { birthday, setBirthday })
            }
          />

          <FieldRow
            label="성별"
            value={genderLabel}
            onPress={() =>
              navigation.navigate('editGender', { gender, setGender })
            }
          />

          <FieldRow
            label="직업"
            value={job}
            onPress={() => navigation.navigate('editJob', { job, setJob })}
          />

          <FieldRow
            label="분야"
            value={field}
            onPress={() =>
              navigation.navigate('editField', { field, setField })
            }
          />

          <Text style={[s.smallLabel, { marginVertical: 8 }]}>
            선택약관 동의 여부
          </Text>
          <Pressable onPress={() => setConsent((v) => !v)} style={s.consentRow}>
            <View style={[s.checkbox, consent && s.checkboxChecked]}>
              {consent ? <Feather name="check" size={16} color="#fff" /> : null}
            </View>
            <Text style={s.value}>(선택) 마케팅 활용 및 정보성 수신 동의</Text>
          </Pressable>
        </ScrollView>

        <Pressable
          style={[s.saveBtn, saveDisabled && { opacity: 0.5 }]}
          onPress={handleEditMypage}
          disabled={saveDisabled}
        >
          <Text style={s.saveText}>내 정보 저장</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  error: { color: '#FF0000', fontSize: 12, marginTop: 4, marginBottom: 8 },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  scroll: { paddingHorizontal: 16 },
  label: { marginTop: 16, fontSize: 12, color: '#9F9F9F' },
  smallLabel: { fontSize: 12, color: '#9F9F9F' },
  input: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DCDADA',
    fontSize: 16,
    marginBottom: 5,
  },
  row: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: { fontSize: 16 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DCDADA',
    marginBottom: 15,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#22c1a7', borderColor: '#22c1a7' },
  saveBtn: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#22c1a7',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});
