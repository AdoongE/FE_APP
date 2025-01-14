import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SeedBox({ name }) {
  return (
    <View style={styles.container}>
      <View style={styles.seedCard}>
        <Ionicons name="ellipsis-vertical" size={16} color="black" style={styles.icon} />
      </View>

      <View style={styles.seedBottom}>
        <View style={styles.circle} />
        <Text style={styles.seedName}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  seedCard: {
    width: 167,
    height: 151,
    backgroundColor: '#DCDADA',
    borderRadius: 8,
    alignItems: 'flex-end',
    padding: 10,
  },
  icon: {
    marginTop: 5,
  },
  seedBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#41C3AB',
    marginRight: 5,
  },
  seedName: {
    fontSize: 14,
    color: '#000',
  }
});