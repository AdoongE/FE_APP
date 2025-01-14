import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SeedBox from './SeedBox';
import BottomNav from './BottomNav';

export default function MainPage() {
  const seeds = [
    { id: '1', name: '콘텐츠명' },
    { id: '2', name: '콘텐츠명' },
    { id: '3', name: '콘텐츠명' },
    { id: '4', name: '콘텐츠명' },
    { id: '5', name: '콘텐츠명' },
    { id: '6', name: '콘텐츠명' },
    { id: '7', name: '콘텐츠명' },
    { id: '8', name: '콘텐츠명' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>seedzip</Text>
      <Text style={styles.title}>나의 씨드</Text>
      <FlatList
        data={seeds}
        renderItem={({ item }) => <SeedBox name={item.name} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#41C3AB',
    marginBottom: 18.2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 80, // BottomNav 공간 확보
  },
});