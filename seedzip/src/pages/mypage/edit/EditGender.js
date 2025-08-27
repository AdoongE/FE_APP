import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditGender() {
  const navigation = useNavigation();
  const route = useRoute();

  const [gender, setGender] = useState(route.params?.gender ?? '');

  useEffect(() => {
    if (route.params?.gender) setGender(route.params.gender);
  }, [route.params?.gender]);

  const onSave = () => {
    route.params?.setGender?.(gender);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Ionicons
          name="chevron-back"
          size={22}
          color="#111"
          onPress={() => navigation.goBack()}
        />
        <Text style={s.headerTitle}>회원정보 수정</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={s.body}>
        <View style={s.content}>
          <Text style={s.guide}>수정할 성별을 선택해주세요</Text>

          <View style={s.buttonRow}>
            <Pressable
              onPress={() => setGender('MALE')}
              style={[
                s.genderBtn,
                gender === 'MALE' ? s.genderBtnActive : s.genderBtnInactive,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: gender === 'MALE' }}
            >
              <Text
                style={[
                  s.genderText,
                  gender !== 'MALE' && s.genderTextInactive,
                ]}
              >
                남성
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setGender('FEMALE')}
              style={[
                s.genderBtn,
                gender === 'FEMALE' ? s.genderBtnActive : s.genderBtnInactive,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: gender === 'FEMALE' }}
            >
              <Text
                style={[
                  s.genderText,
                  gender !== 'FEMALE' && s.genderTextInactive,
                ]}
              >
                여성
              </Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={onSave}
          disabled={!gender}
          style={[s.saveBtn, !gender && s.saveBtnDisabled]}
        >
          <Text style={s.saveText}>저장</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111' },

  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  guide: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#111',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 18,
  },
  genderBtn: {
    flex: 1,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderBtnActive: {
    backgroundColor: '#41C3AB',
  },
  genderBtnInactive: {
    backgroundColor: '#DCDADA',
  },
  genderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  genderTextInactive: {
    color: '#9F9F9F',
    fontWeight: '600',
  },

  saveBtn: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#41C3AB',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
