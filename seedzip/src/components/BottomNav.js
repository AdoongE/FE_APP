import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  useNavigation,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';
import ActionModal from './ActionModal';

const screenWidth = Dimensions.get('window').width;

export default function BottomNav({
  addSeedModalVisible,
  setAddSeedModalVisible,
}) {
  const navigation = useNavigation();
  const route = useRoute();
  const navigationState = useNavigationState((state) => state);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (navigationState) {
      const currentRoute = navigationState.routes[navigationState.index];
      const routeName = currentRoute.name.toLowerCase();

      if (routeName.includes('home')) {
        setActiveTab('home');
      } else if (routeName.includes('category')) {
        setActiveTab('category');
      } else if (
        routeName.includes('favorite') ||
        (routeName.includes('seedlist') && route.params?.mode === 'favorite')
      ) {
        setActiveTab('favorite');
      } else if (routeName.includes('mypage')) {
        setActiveTab('mypage');
      }
    }
  }, [navigationState, route.params]);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  const addSeedActions = [
    {
      icon: <Ionicons name="link-outline" size={20} />,
      label: '링크 저장하기',
      onPress: () => {
        setAddSeedModalVisible(false);
        navigation.navigate('addLink');
      },
    },
    {
      icon: <Ionicons name="image-outline" size={20} />,
      label: '이미지 저장하기',
      onPress: () => {
        setAddSeedModalVisible(false);
        navigation.navigate('imageupload');
      },
    },
  ];

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleTabPress('home')}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home-sharp' : 'home-outline'}
          size={26}
          color={activeTab === 'home' ? '#41C3AB' : '#9F9F9F'}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'home' ? '#41C3AB' : '#9F9F9F' },
          ]}
        >
          홈
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleTabPress('category')}
      >
        <Ionicons
          name={activeTab === 'category' ? 'folder' : 'folder-outline'}
          size={26}
          color={activeTab === 'category' ? '#41C3AB' : '#9F9F9F'}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'category' ? '#41C3AB' : '#9F9F9F' },
          ]}
        >
          카테고리
        </Text>
      </TouchableOpacity>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddSeedModalVisible(true)}
        >
          <Ionicons name="add-outline" size={36} color="white" />
        </TouchableOpacity>
        <Text style={styles.addButtonText}>씨드 추가</Text>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          setActiveTab('favorite');
          navigation.navigate('seedList', { mode: 'favorite' });
        }}
      >
        <Ionicons
          name={activeTab === 'favorite' ? 'star' : 'star-outline'}
          size={26}
          color={activeTab === 'favorite' ? '#41C3AB' : '#9F9F9F'}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'favorite' ? '#41C3AB' : '#9F9F9F' },
          ]}
        >
          즐겨찾기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleTabPress('mypage')}
      >
        <Ionicons
          name={activeTab === 'mypage' ? 'person' : 'person-outline'}
          size={26}
          color={activeTab === 'mypage' ? '#41C3AB' : '#9F9F9F'}
        />
        <Text
          style={[
            styles.navText,
            { color: activeTab === 'mypage' ? '#41C3AB' : '#9F9F9F' },
          ]}
        >
          마이
        </Text>
      </TouchableOpacity>

      <ActionModal
        visible={addSeedModalVisible}
        onClose={() => setAddSeedModalVisible(false)}
        title="저장 형식을 선택해주세요"
        actions={addSeedActions}
      />
    </View>
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
    width: screenWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 31,
    paddingTop: 16,
    paddingBottom: 4,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  navButton: {
    alignItems: 'center',
  },
  addButtonContainer: {
    alignItems: 'center',
  },
  addButton: {
    width: 68,
    height: 68,
    borderRadius: 50,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  addButtonText: {
    fontSize: 12,
    color: '#9F9F9F',
    marginTop: 12,
  },
});
