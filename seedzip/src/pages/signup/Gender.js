import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Gender = ({ route }) => {
  const navigation = useNavigation();
  const { nickname, birthday } = route.params;
  const [gender, setGender] = useState('');

  const handleNext = () => {
    navigation.navigate('field', { nickname, birthday, gender });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>성별을 선택해주세요</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, gender === 'MALE' && styles.selectedButton]}
          onPress={() => setGender('MALE')}
        >
          <Text style={[styles.buttonText, gender !== 'MALE' && styles.unselectedButtonText]}>남성</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, gender === 'FEMALE' && styles.selectedButton]}
          onPress={() => setGender('FEMALE')}
        >
          <Text style={[styles.buttonText, gender !== 'FEMALE' && styles.unselectedButtonText]}>여성</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.nextButton, !gender && styles.disabledButton]}
        onPress={handleNext}
        disabled={!gender}
      >
        <Text style={styles.nextButtonText}>다음</Text>
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
    marginTop: 29.96,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    gap: 16,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#DCDADA',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
  },
  selectedButton: {
    backgroundColor: '#41C3AB',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  unselectedButtonText: {
    color: '#9f9f9f',
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
  disabledButton: {
    backgroundColor: '#DCDADA',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Gender;