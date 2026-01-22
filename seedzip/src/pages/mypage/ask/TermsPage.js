import React from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

function Row({ label, onPress, accessibilityLabel }) {
  return (
    <>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || label}
      >
        <View style={s.row}>
          <Text style={s.rowText}>{label}</Text>
          <Ionicons name="chevron-forward" size={18} color="#9F9F9F" />
        </View>
      </Pressable>
      <View style={s.divider} />
    </>
  );
}

export default function TermsPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Ionicons
          name="chevron-back"
          size={22}
          color="#111"
          onPress={() => navigation.goBack()}
        />
        <Text style={s.title}>이용약관</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={s.container}>
        <View style={s.divider} />
        <Row
          label="서비스 이용 약관"
          onPress={() =>
            Linking.openURL(
              'https://jychloe-92.notion.site/254378ee2b4e80119647d2061c07ab81?source=copy_link',
            )
          }
        />
        <Row
          label="개인정보처리방침"
          onPress={() =>
            Linking.openURL(
              'https://jychloe-92.notion.site/254378ee2b4e8045beade184ab416d2e?source=copy_link',
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 16, fontWeight: '700', color: '#111' },
  container: { flex: 1, backgroundColor: '#fff' },
  row: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  rowText: { fontSize: 15, color: '#111' },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E6E6EA',
    marginLeft: 16,
  },
});
