import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import ProgressBar from '../../components/signup/ProgressBar';

const Field = ({ navigation, route }) => {
  const params = route?.params ?? {};

  const email = params.email;
  const password = params.password;
  const nickname = params.nickname;
  const birthday = params.birthday;
  const gender = params.gender;

  const [open, setOpen] = useState(false);
  const [fieldOpen, setFieldOpen] = useState(false);

  const [occupation, setOccupation] = useState('');
  const [field, setField] = useState('');

  const [customOccupation, setCustomOccupation] = useState('');
  const [customField, setCustomField] = useState('');

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

  const fields = useMemo(
    () => [
      'CEO/사업',
      '기획/전략',
      '마케팅/광고/홍보',
      '회계/세무/재무',
      '인사/HR',
      '총무/법무/사무',
      'IT 개발/데이터',
      '디자인',
      '영업/무역',
      '생산/물류/자재',
      '상품기획/MD',
      '건설/건축',
      '의료',
      'R&D/연구',
      '교육',
      '금융/보험',
      '공공/복지',
      '기타(직접입력)',
    ],
    [],
  );

  const dropdownJobs = useMemo(
    () => jobs.map((job) => ({ label: job, value: job })),
    [jobs],
  );

  const dropdownFields = useMemo(
    () => fields.map((f) => ({ label: f, value: f })),
    [fields],
  );

  const [jobItem, setJobItem] = useState(dropdownJobs);
  const [fieldItem, setFieldItem] = useState(dropdownFields);

  const finalOccupation =
    occupation === '기타(직접입력)' ? customOccupation.trim() : occupation;
  const finalField = field === '기타(직접입력)' ? customField.trim() : field;

  const goConsent = () => {
    const payload = {
      ...params,
      email,
      password,
      nickname,
      birthday,
      gender,
      occupation: finalOccupation,
      field: finalField,
    };

    console.log('[field] to consent payload:', {
      ...payload,
      password: payload.password ? '(exists)' : undefined,
    });

    navigation.navigate('consent', payload);
  };

  return (
    <View style={styles.container}>
      <ProgressBar step={5} />
      <Text style={styles.title}>
        평소 관심있는 {'\n'}직업과 분야를 선택해주세요(선택)
      </Text>

      <View style={{ rowGap: 20 }}>
        <DropDownPicker
          placeholder="직업 선택하기"
          open={open}
          value={occupation}
          items={jobItem}
          setOpen={setOpen}
          setValue={setOccupation}
          setItems={setJobItem}
          style={{ borderColor: '#DCDADA' }}
          dropDownContainerStyle={{ borderColor: '#DCDADA' }}
          zIndex={3000}
          zIndexInverse={1000}
          textStyle={{ fontSize: 20, fontWeight: 400 }}
          placeholderStyle={{ color: '#DCDADA' }}
        />

        {occupation === '기타(직접입력)' && (
          <TextInput
            value={customOccupation}
            onChangeText={setCustomOccupation}
            placeholder="직업을 입력하세요"
            style={styles.blank}
            placeholderTextColor="#DCDADA"
          />
        )}

        <DropDownPicker
          placeholder="분야 선택하기"
          open={fieldOpen}
          value={field}
          items={fieldItem}
          setOpen={setFieldOpen}
          setValue={setField}
          setItems={setFieldItem}
          style={{ borderColor: '#DCDADA' }}
          dropDownContainerStyle={{ borderColor: '#DCDADA' }}
          zIndex={2000}
          zIndexInverse={2000}
          textStyle={{ fontSize: 20, fontWeight: 400 }}
          placeholderStyle={{ color: '#DCDADA' }}
        />

        {field === '기타(직접입력)' && (
          <TextInput
            value={customField}
            onChangeText={setCustomField}
            placeholder="분야를 입력하세요"
            style={styles.blank}
            placeholderTextColor="#DCDADA"
          />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={goConsent}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={goConsent}>
          <Text style={styles.skipButtonText}>건너뛰기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: { marginTop: 29.96, fontSize: 24, fontWeight: 600, marginBottom: 20 },
  footer: { marginTop: 'auto', gap: 12 },
  button: {
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: { color: 'white', fontWeight: 600, fontSize: 16 },
  blank: {
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 400,
  },
  skipButton: {
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  skipButtonText: { color: '#9F9F9F', fontWeight: '600', fontSize: 16 },
});

export default Field;
