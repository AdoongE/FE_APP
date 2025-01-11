import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Check from '../../assets/icons/check.png';

const Success = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={Check} />
        <Text style={styles.title}>
          회원가입 완료!{'\n'}씨드집에 오신 것을 환영해요.
        </Text>
        <Text style={styles.short}>
          seedzip에서 나만의 씨앗들을 저장해보세요.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('birthday')}
      >
        <Text style={styles.buttonText}>홈으로 가기</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 4,
    textAlign: 'center',
  },
  short: {
    color: '#898989',
    fontWeight: 400,
    fontSize: 16,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default Success;