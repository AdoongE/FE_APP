import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';

const Consent = ({ navigation, route }) => {
  const { nickname, birthday, occupation, field } = route.params;
  const [checked, setChecked] = useState([false, false, false]);
  const [touched, setTouched] = useState(false);

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
  };

  const error = touched && (!checked[0] || !checked[1]);

  const handleNext = () => {
    navigation.navigate('success', {
      nickname,
      birthday,
      occupation,
      field,
      consentToTermsOfService: checked[0],
      consentToPersonalInformation: checked[1],
      consentToMarketingAndAds: checked[2],
    });
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.option}>
          <Text style={{ color: 'red' }}>(필수)</Text> 서비스 이용 약관 {'>'}
        </Text>
        <Checkbox
          style={styles.checkbox}
          value={checked[0]}
          onValueChange={handleChange2}
          color={checked[0] ? '#41C3AB' : '#9F9F9F'}
        />
      </View>
      <View style={styles.check}>
        <Text style={styles.option}>
          <Text style={{ color: 'red' }}>(필수)</Text> 개인정보 수집 및 이용동의{' '}
          {'>'}
        </Text>
        <Checkbox
          style={styles.checkbox}
          value={checked[1]}
          onValueChange={handleChange3}
          color={checked[1] ? '#41C3AB' : '#9F9F9F'}
        />
      </View>
      <View style={styles.check}>
        <Text style={styles.option}>
          (선택) 마케팅 활용 및 광고성 정보 수신 동의 {'>'}
        </Text>
        <Checkbox
          style={styles.checkbox}
          value={checked[2]}
          onValueChange={handleChange4}
          color={checked[2] ? '#41C3AB' : '#9F9F9F'}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        disabled={error || !touched}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>다음</Text>
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
    border: 0,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },
  error: {
    color: '#FF0000',
    fontWeight: 400,
    fontSize: 12,
    marginTop: 8,
  },
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
  all: {
    color: '#4F4F4F',
    fontWeight: 600,
    fontSize: 18,
  },
  option: {
    fontWeight: 400,
    fontSize: 16,
    color: '#4F4F4F',
  },
  checkbox: {
    width: 16,
    height: 16,
    border: 1,
  },
});

export default Consent;