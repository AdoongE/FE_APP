// 단축어: rnfe

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

const Nickname = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [nickname, setNickname] = React.useState('');
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  const nicknameRegex = /^[a-zA-Z0-9가-힣\s]{1,10}$/;

  const handleChange = (text) => {
    setNickname(text);

    if (text.trim() === '') {
      setError('empty');
    } else if (!nicknameRegex.test(text)) {
      setError('invalid');
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    console.log('nickname: ', nickname);
  }, [nickname]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임을 입력해주세요</Text>
      <Text style={styles.short}>
        한글, 영문, 숫자 공백 포함 10자 이내로 입력해주세요
      </Text>
      <TextInput
        value={nickname}
        onChangeText={handleChange}
        placeholder="닉네임"
        style={[
          styles.input,
          {
            borderBottomColor: isFocused
              ? '#41C3AB'
              : error
                ? '#FF0000'
                : '#9F9F9F',
          },
        ]}
        onFocus={() => {
          setIsFocused(true), setTouched(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
      {error === 'empty' && (
        <Text style={styles.error}>닉네임을 입력하지 않았어요</Text>
      )}
      {error === 'invalid' && (
        <Text style={styles.error}>닉네임을 형식에 맞춰 입력해주세요</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        disabled={!touched || error !== false || nickname.trim() === ''}
        onPress={() => navigation.navigate('birthday')}
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
  input: {
    borderBottomWidth: 1,
    fontSize: 20,
    paddingBottom: 13,
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
});

export default Nickname;
