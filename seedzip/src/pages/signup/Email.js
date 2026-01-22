import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ProgressBar from '../../components/signup/ProgressBar';

const Email = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [focusedField, setFocusedField] = useState(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const passwordRegex = useMemo(
    () => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    [],
  );

  const emailError = useMemo(() => {
    if (!touched.email) return null;
    if (email.trim() === '') return 'empty';
    if (!emailRegex.test(email.trim())) return 'invalid';
    return null;
  }, [email, touched.email, emailRegex]);

  const passwordError = useMemo(() => {
    if (!touched.password) return null;
    if (password.trim() === '') return 'empty';
    if (!passwordRegex.test(password)) return 'invalid';
    return null;
  }, [password, touched.password, passwordRegex]);

  const canGoNext =
    emailError === null &&
    passwordError === null &&
    email.trim() !== '' &&
    password.trim() !== '';

  const borderColor = (field, hasError) => {
    if (focusedField === field) return '#41C3AB';
    if (hasError) return '#FF0000';
    return '#9F9F9F';
  };

  const onPressNext = () => {
    navigation.navigate('nickname', { email: email.trim(), password });
  };

  return (
    <View style={styles.container}>
      <ProgressBar step={1} />

      <Text style={styles.title}>이메일과 비밀번호를 입력해주세요</Text>
      <Text style={styles.short}>가입에 필요한 기본 정보를 입력해 주세요.</Text>

      <Text style={styles.label}>이메일</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="이메일"
        placeholderTextColor="#9F9F9F"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.input,
          { borderBottomColor: borderColor('email', !!emailError) },
        ]}
        onFocus={() => {
          setFocusedField('email');
          setTouched((prev) => ({ ...prev, email: true }));
        }}
        onBlur={() => setFocusedField(null)}
      />
      {emailError === 'empty' && (
        <Text style={styles.error}>이메일을 입력해주세요.</Text>
      )}
      {emailError === 'invalid' && (
        <Text style={styles.error}>이메일 형식이 올바르지 않습니다.</Text>
      )}

      <Text style={[styles.label, { marginTop: 18 }]}>비밀번호</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="영문+숫자 포함 8~20자"
        placeholderTextColor="#9F9F9F"
        secureTextEntry
        style={[
          styles.input,
          { borderBottomColor: borderColor('password', !!passwordError) },
        ]}
        onFocus={() => {
          setFocusedField('password');
          setTouched((prev) => ({ ...prev, password: true }));
        }}
        onBlur={() => setFocusedField(null)}
      />
      {passwordError === 'empty' && (
        <Text style={styles.error}>비밀번호를 입력해주세요.</Text>
      )}
      {passwordError === 'invalid' && (
        <Text style={styles.error}>
          비밀번호는 영문자와 숫자를 포함한 8~20자여야 합니다.
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, !canGoNext && styles.buttonDisabled]}
        disabled={!canGoNext}
        onPress={onPressNext}
        activeOpacity={0.85}
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
  title: { marginTop: 29.96, fontSize: 24, fontWeight: '600', marginBottom: 4 },
  short: {
    color: '#898989',
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    paddingBottom: 12,
    paddingTop: 6,
    color: '#222',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 'auto',
  },
  buttonDisabled: {
    backgroundColor: '#CFEDE8',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  error: {
    color: '#FF0000',
    fontWeight: '400',
    fontSize: 12,
    marginTop: 8,
  },
});

export default Email;
