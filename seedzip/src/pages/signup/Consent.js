import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Pressable, Linking } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import ProgressBar from '../../components/signup/ProgressBar';
import { postSignup } from '../../api/AuthApi';

const Consent = ({ navigation, route }) => {
  const { email, password, nickname, birthday, gender, occupation, field } =
    route.params;

  const [checked, setChecked] = useState([false, false, false]);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange1 = (value) => {
    setChecked([value, value, value]);
    setTouched(true);
  };

  const handleChange2 = (value) => {
    setChecked([value, checked[1], checked[2]]);
    setTouched(true);
  };

  const handleChange3 = (value) => {
    setChecked([checked[0], value, checked[2]]);
    setTouched(true);
  };

  const handleChange4 = (value) => {
    setChecked([checked[0], checked[1], value]);
    setTouched(true);
  };

  const error = touched && (!checked[0] || !checked[1]);

  const handleNext = async () => {
    if (error || !touched) return;

    const payload = {
      email,
      password,
      nickname,
      birthday,
      gender,
      occupation,
      field,
      consentToTermsOfService: checked[0],
      consentToPersonalInformation: checked[1],
      consentToMarketingAndAds: checked[2],
    };

    try {
      setLoading(true);

      const data = await postSignup(payload);

      if (data?.status?.code === 200) {
        navigation.navigate('success');
      } else {
        Alert.alert(
          '회원가입 실패',
          data?.status?.message || '회원가입에 실패했습니다.',
        );
      }
    } catch (e) {
      const msg =
        e?.response?.data?.status?.message || '회원가입에 실패했습니다.';
      Alert.alert('회원가입 실패', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar step={6} />
      <Text style={styles.title}>
        seedzip 회원가입을 위한 {'\n'}약관에 동의해주세요
      </Text>

      {!error || !touched ? (
        <Text style={styles.short}>
          여기저기 흩어진 링크와 사진을 seedzip에 모아요!
        </Text>
      ) : (
        <Text style={[styles.short, { color: 'red' }]}>
          필수 약관에 모두 동의해주세요
        </Text>
      )}

      <View style={styles.check}>
        <Text style={styles.all}>전체 동의</Text>
        <Checkbox
          style={styles.checkbox}
          value={checked[0] && checked[1] && checked[2]}
          onValueChange={handleChange1}
          color={checked[0] && checked[1] && checked[2] ? '#41C3AB' : '#9F9F9F'}
        />
      </View>

      <View style={styles.line} />

      <View style={styles.check}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            Linking.openURL(
              'https://jychloe-92.notion.site/254378ee2b4e80119647d2061c07ab81?source=copy_link',
            )
          }
        >
          <Text style={styles.option}>
            <Text style={{ color: 'red' }}>(필수)</Text> 서비스 이용 약관 {'>'}
          </Text>
        </Pressable>
        <Checkbox
          style={styles.checkbox}
          value={checked[0]}
          onValueChange={handleChange2}
          color={checked[0] ? '#41C3AB' : '#9F9F9F'}
        />
      </View>

      <View style={styles.check}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            Linking.openURL(
              'https://jychloe-92.notion.site/254378ee2b4e8045beade184ab416d2e?source=copy_link',
            )
          }
        >
          <Text style={styles.option}>
            <Text style={{ color: 'red' }}>(필수)</Text> 개인정보 수집 및
            이용동의 {'>'}
          </Text>
        </Pressable>
        <Checkbox
          style={styles.checkbox}
          value={checked[1]}
          onValueChange={handleChange3}
          color={checked[1] ? '#41C3AB' : '#9F9F9F'}
        />
      </View>

      <View style={styles.check}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            Linking.openURL(
              'https://jychloe-92.notion.site/254378ee2b4e80ed9cfdcbdf8c0581cd?source=copy_link',
            )
          }
        >
          <Text style={styles.option}>
            (선택) 마케팅 활용 및 광고성 정보 수신 동의 {'>'}
          </Text>
        </Pressable>

        <Checkbox
          style={styles.checkbox}
          value={checked[2]}
          onValueChange={handleChange4}
          color={checked[2] ? '#41C3AB' : '#9F9F9F'}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (error || !touched || loading) && { opacity: 0.6 },
        ]}
        disabled={error || !touched || loading}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>{loading ? '처리 중...' : '다음'}</Text>
      </TouchableOpacity>
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
  title: { marginTop: 29.96, fontSize: 24, fontWeight: 600, marginBottom: 4 },
  short: {
    color: '#898989',
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 28,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 'auto',
  },
  buttonText: { color: 'white', fontWeight: 600, fontSize: 16 },
  check: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  line: {
    height: 1,
    backgroundColor: '#DCDADA',
    marginTop: 4,
    marginBottom: 16,
  },
  all: { color: '#4F4F4F', fontWeight: 600, fontSize: 18 },
  option: { fontWeight: 400, fontSize: 16, color: '#4F4F4F' },
  checkbox: { width: 16, height: 16 },
});

export default Consent;
