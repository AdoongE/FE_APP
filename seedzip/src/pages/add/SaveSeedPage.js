import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import saveImage from '../../assets/icons/save.png';

const SaveSeedPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={saveImage} style={[{ width: 120, height: 120, }]}></Image>
      <Text style={[{ fontSize: 24, fontWeight: 600, lineHeight: 30, paddingBottom: 50 }]}>  씨드 저장이{'\n'}완료되었어요!</Text>
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('main')}>
        <Text style={styles.nextButtonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 18,
    lineHeight: 30,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SaveSeedPage;