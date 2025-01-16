import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SeedSaveModal from './SeedSaveModal';

// 화면 너비
const screenWidth = Dimensions.get('window').width;

export default function BottomNav() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="home-sharp" size={24} color="#41C3AB" />
        <Text style={styles.rightText}>홈</Text>
      </TouchableOpacity>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)} // 모달 열기
        >
          <Ionicons name="add-outline" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.addButtonText}>씨드 추가</Text>
      </View>

      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="person-outline" size={24} color="gray" />
        <Text style={styles.leftText}>마이</Text>
      </TouchableOpacity>
    </View>

    <SeedSaveModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: screenWidth, // 화면 전체 너비 설정
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 70,
  },
  rightText: {
    fontSize: 12,
    color: '#41C3AB',
    marginTop: 8,
  },
  navButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  leftText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 8,
  },
  addButtonContainer: {
    alignItems: 'center', // 플러스 버튼과 텍스트를 중앙 정렬
  },
  addButton: {
    width: 68,
    height: 68,
    borderRadius: 50,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 10,
  },
  addButtonText: {
    fontSize: 12,
    color: 'gray',
  },
});