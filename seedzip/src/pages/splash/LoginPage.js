import React, { useState } from 'react';
import logo from '../../assets/icons/logo.png';
import blackLogo from '../../assets/icons/blackLogo.png';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { postLogin } from '../../api/AuthApi';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const onLogin = async () => {
    if (!email.trim() || !pw) {
      Alert.alert('안내', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const data = await postLogin(email.trim(), pw);

      if (data?.status?.code === 200) {
        navigation.navigate('home');
      } else {
        Alert.alert(
          '로그인 실패',
          data?.status?.message || '로그인에 실패했습니다.',
        );
      }
    } catch (e) {
      const msg =
        e?.response?.data?.status?.message || '로그인에 실패했습니다.';
      Alert.alert('로그인 실패', msg);
    }
  };

  const onSignup = () => {
    navigation.navigate('email');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.brand}>
          <Image source={logo} style={styles.logoIcon} />
          <Image source={blackLogo} style={styles.logoWord} />
        </View>

        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="이메일"
            placeholderTextColor="#9F9F9F"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            value={pw}
            onChangeText={setPw}
            placeholder="비밀번호"
            placeholderTextColor="#9F9F9F"
            style={styles.input}
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>로그인하기</Text>
          </Pressable>

          <Pressable style={styles.signButton} onPress={onSignup}>
            <Text style={styles.signText}>회원가입</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>한 곳에 모으는 인사이트!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F6F6' },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 22 },
  brand: {
    marginTop: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoIcon: {
    width: 34,
    height: 36,
    marginBottom: 8,
    resizeMode: 'contain',
    transform: [{ translateX: -7 }],
  },

  logoWord: {
    width: 165,
    height: 44,
    resizeMode: 'contain',
  },
  word: { fontSize: 46, fontWeight: '800', color: '#222' },

  form: { width: '100%', marginTop: 34, gap: 10 },
  input: {
    height: 43,
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    fontSize: 16,
  },

  keepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxOn: { borderColor: '#56C7B1' },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#56C7B1',
  },
  keepText: { color: '#7A7A7A', fontSize: 14 },

  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  signButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signText: { color: '#4F4F4F', fontSize: 16, fontWeight: '600' },

  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  footer: { marginTop: 200, color: '#fff', fontSize: 18, fontWeight: '600' },
});
