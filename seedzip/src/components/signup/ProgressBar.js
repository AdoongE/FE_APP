import React from 'react';
import {View, StyleSheet} from 'react-native';

const ProgressBar = ({step, totalSteps = 5}) => {
  const progress = step / totalSteps;

  return (
    <View style={styles.container}>
      <View style={[styles.progress, {flex: progress}]} />
      <View style={[styles.remaining, {flex: 1 - progress}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    backgroundColor: '#1AC29A',
  },
  remaining: {
    backgroundColor: 'transparent',
  },
});

export default ProgressBar;
