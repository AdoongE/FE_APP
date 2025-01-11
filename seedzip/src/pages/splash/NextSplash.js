import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import seedzip from '../../assets/icons/seedzip.png';
import newLogo from '../../assets/icons/whiteLogo.png';
import naver from '../../assets/icons/naver.png';
import google from '../../assets/icons/google.png';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { login } from '@react-native-kakao/user';

const NextSplash = () => {
  useEffect(() => {
    initializeKakaoSDK('de24704ac7ce4ee11e1afa9ee4f443e7');
  });
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#41C3AB', '#82E9D6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.new}>
            <View style={styles.images}>
              <Image source={newLogo} style={styles.newLogo} />
              <Image source={seedzip} style={styles.seedzip} />
            </View>
            <View style={{ transform: [{ translateX: 20 }] }}>
              <Text style={styles.title}>한 곳에 모으는 인사이트!</Text>
            </View>
          </View>
          <View style={styles.logins}>
            <TouchableOpacity
              type="kakao"
              style={[styles.button, { backgroundColor: '#FEE500' }]}
            >
              <MaterialCommunityIcons
                name="chat"
                size={12}
                color="black"
                onPress={() => {
                  login().then(console.log);
                }}
              />
              <Text style={{ color: 'black' }}>카카오톡으로 로그인하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              type="naver"
              style={[styles.button, { backgroundColor: '#03C75A' }]}
            >
              <Image source={naver} />
              <Text style={{ color: 'white' }}>네이버로 로그인하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              type="google"
              style={[styles.button, { backgroundColor: 'white' }]}
            >
              <Image source={google} />
              <Text style={{ color: '#4F4F4F' }}>구글로 로그인하기</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 9,
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
  },
  logins: {
    rowGap: 20,
    flex: 'auto',
    position: 'absolute',
    bottom: 85,
  },
  button: {
    border: 0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 46,
    flexDirection: 'row',
    columnGap: 4,
    fontSize: 14,
    fontWeight: 'medium',
  },
  new: {
    position: 'absolute',
    top: 262.92,
    justifyContent: 'center',
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // transform: [{ translateX: 10 }],
    columnGap: 6,
  },
  newLogo: {
    width: 36,
    height: 36,
  },
  seedzip: {
    width: 155,
    height: 36,
  },
});

export default NextSplash;