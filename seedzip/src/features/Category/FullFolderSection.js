import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FolderSection from './FolderSection';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FullFolderSection = () => {
  const { title, iconName, data, actionBtns, emptyTitle, emptySubtitle } =
    useRoute().params;

  return (
    <>
      <View style={styles.container}>
        {data.length === 0 ? (
          <>
            <View style={styles.headerRow}>
              <Ionicons name={iconName} size={24} color="#000" />
              <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View style={styles.emptyContainer}>
              <Text style={styles.emtTitle}>{emptyTitle}</Text>
              <Text style={styles.emtSubtitle}>{emptySubtitle}</Text>
            </View>
          </>
        ) : (
          <FolderSection
            title={title}
            iconName={iconName}
            data={data}
            hideViewAll={true}
            actionBtns={actionBtns}
          />
        )}
      </View>
    </>
  );
};

export default FullFolderSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    marginTop: 40,
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emtTitle: {
    fontSize: 16,
    color: '#4f4f4f',
    marginBottom: 8,
    textAlign: 'center',
  },
  emtSubtitle: {
    fontSize: 12,
    color: '#4f4f4f',
    textAlign: 'center',
  },
});
