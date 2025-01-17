import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Router from './src/routes/Router';
import React, {createContext, useState} from 'react';

export const MyContext = createContext();

export default function App() {
  const [link, setLink] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState([]);
  const [totalTags, setTotalTags] = useState(tags);

  return (
    <NavigationContainer>
      <MyContext.Provider
        value={{
          link,
          setLink,
          tags,
          setTags,
          title,
          setTitle,
          summary,
          setSummary,
          category,
          setCategory,
          totalTags,
          setTotalTags,
        }}>
        <SafeAreaView style={styles.safeArea}>
          <Router />
          <StatusBar style="auto" />
        </SafeAreaView>
      </MyContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
