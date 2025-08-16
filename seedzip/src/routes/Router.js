import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Nickname from '../pages/signup/Nickname';
import Birthday from '../pages/signup/Birthday';
import Gender from '../pages/signup/Gender';
import Field from '../pages/signup/Field';
import Consent from '../pages/signup/Consent';
import Success from '../pages/signup/Success';
import SplashPage from '../pages/splash/SplashPage';
import NextSplash from '../pages/splash/NextSplash';
import Home from '../features/Home/HomeScreen';
import View from '../features/View/ViewSeed';
import AddLink from '../pages/contentAdd/AddLink';
import AddCategory from '../pages/contentAdd/AddCategory';
import AddTag from '../pages/contentAdd/AddTag';
import ImageUpload from '../pages/add/ImageUpload';
import ImageSave from '../pages/add/ImageSave';
import Add from '../pages/add/AddSeedPage';
import Save from '../pages/add/SaveSeedPage';
import Category from '../features/Category/Category';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

function Router() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: '#000',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="splash"
        component={SplashPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="nextSplash"
        component={NextSplash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="nickname" component={Nickname} />
      <Stack.Screen name="birthday" component={Birthday} />
      <Stack.Screen name="gender" component={Gender} />
      <Stack.Screen name="field" component={Field} />
      <Stack.Screen name="consent" component={Consent} />
      <Stack.Screen
        name="success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="category" component={Category} />
      <Stack.Screen
        name="view"
        component={View}
        options={{
          headerTitle: '씨드 상세보기',
        }}
      />
      <Stack.Screen name="addLink" component={AddLink} />
      <Stack.Screen name="addCategory" component={AddCategory} />
      <Stack.Screen name="addTag" component={AddTag} />
      <Stack.Screen
        name="imageupload"
        component={ImageUpload}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="imagesave" component={ImageSave} />
      <Stack.Screen name="add" component={Add} />
      <Stack.Screen name="save" component={Save} />
    </Stack.Navigator>
  );
}

export default Router;
