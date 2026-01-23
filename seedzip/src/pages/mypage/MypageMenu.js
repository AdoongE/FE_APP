import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav';
import WithdrawModal from './ask/WithdrawModal';
import { postWithdraw } from '../../api/MyPageApi';
import { GetMyInfo } from '../../api/SignUpApi';

function Row({ label, right, onPress, accessibilityLabel }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
    >
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowRight}>{right ?? '›'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function MypageMenu({ appVersion = '1.0.0' }) {
  const navigation = useNavigation();
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [addSeedModalVisible, setAddSeedModalVisible] = useState(false);

  const [userName, setUserName] = useState('씨드집');
  const [loadingName, setLoadingName] = useState(false);

  const fetchName = useCallback(async () => {
    try {
      setLoadingName(true);
      const info = await GetMyInfo();
      const nickname = info?.nickname?.trim();
      if (nickname) setUserName(nickname);
    } catch (e) {
      console.error(
        '마이페이지 닉네임 조회 실패:',
        e?.response?.data || e?.message || e,
      );
    } finally {
      setLoadingName(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchName();
    }, [fetchName]),
  );

  const onPressLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      Alert.alert('로그아웃 되었습니다');
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await postWithdraw(); // 실패면 throw로 catch로 감

      await AsyncStorage.removeItem('jwtToken');
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });

      return res;
    } catch (e) {
      console.log(
        '[WITHDRAW_UI] error:',
        e?.response?.status,
        e?.response?.data || e?.message || e,
      );
      Alert.alert('탈퇴 실패', '잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>마이페이지</Text>

        <View style={styles.nameBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {loadingName ? <ActivityIndicator /> : null}
            <Text style={styles.nameText}>{userName} 님</Text>
          </View>

          <TouchableOpacity
            style={styles.nameEdit}
            onPress={() => navigation.navigate('editMypage')}
            accessibilityRole="button"
            accessibilityLabel="이름 수정"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <SimpleLineIcons name="pencil" size={13} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Row label="공지사항" onPress={() => navigation.navigate('info')} />
        <View style={styles.divider} />
        <Row label="이용약관" onPress={() => navigation.navigate('terms')} />
        <View style={styles.divider} />
        <Row label="FAQ" onPress={() => navigation.navigate('question')} />
        <View style={styles.divider} />
        <View style={[styles.row, styles.versionRow]}>
          <Text style={styles.rowLabel}>
            버전 정보 <Text style={styles.versionNum}>V {appVersion}</Text>
          </Text>
          <Text style={styles.versionRight}>최신 버전입니다.</Text>
        </View>

        <View style={styles.separator} />

        <TouchableOpacity onPress={onPressLogout} activeOpacity={0.7}>
          <View style={styles.logoutBox}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          onPress={() => setWithdrawModalVisible(true)}
          activeOpacity={0.7}
          style={styles.withdrawBtn}
        >
          <Text style={styles.withdrawText}>회원탈퇴</Text>
        </TouchableOpacity>
      </ScrollView>

      <WithdrawModal
        visible={withdrawModalVisible}
        onCancel={() => setWithdrawModalVisible(false)}
        onDelete={handleWithdraw}
      />

      <BottomNav
        addSeedModalVisible={addSeedModalVisible}
        setAddSeedModalVisible={setAddSeedModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingBottom: 32 },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 20,
  },
  nameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  nameText: { fontSize: 16, fontWeight: '500' },
  nameEdit: { marginLeft: 8 },
  separator: { height: 6, backgroundColor: '#F2F2F2' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  rowLabel: { fontSize: 16, fontWeight: '400' },
  rowRight: { fontSize: 20, color: '#9F9F9F' },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e6e6ea',
    marginHorizontal: 20,
  },
  versionRow: { height: 56 },
  versionNum: { fontSize: 12, fontWeight: '600', color: '#9F9F9F' },
  versionRight: { fontSize: 13, color: '#9a9a9a' },
  logoutBox: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoutText: { fontSize: 16, color: '#111' },
  withdrawBtn: { paddingHorizontal: 20, paddingVertical: 8 },
  withdrawText: {
    fontSize: 14,
    color: '#111',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
