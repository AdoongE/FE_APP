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
import Home from '../features/Home/Home';
import Search from '../features/Home/Search';
import View from '../features/View/ViewSeed';
import AddLink from '../features/Add/AddLink';
import AddCategory from '../features/Add/AddCategory';
import AddTag from '../features/Add/AddTag';
import ImageUpload from '../features/Add/ImageUpload';
import ImageSave from '../features/Add/ImageSave';
import Add from '../features/Add/AddSeed';
import Save from '../features/Add/SaveSeed';
import Category from '../features/Category/Category';
import SeedList from '../features/Seed/SeedList';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MypageMenu from '../pages/mypage/MypageMenu';
import EditMypage from '../pages/mypage/edit/EditMypage';
import EditBirthday from '../pages/mypage/edit/EditBirthday';
import EditGender from '../pages/mypage/edit/EditGender';
import EditJob from '../pages/mypage/edit/EditJob';
import EditField from '../pages/mypage/edit/EditField';
import TermsPage from '../pages/mypage/ask/TermsPage';
import InfoPage from '../pages/mypage/ask/InfoPage';
import InfoDetailPage from '../pages/mypage/ask/InfoDetailPage';
import QuestionPage from '../pages/mypage/ask/QuestionPage';
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
      <Stack.Screen
        name="mypage"
        component={MypageMenu}
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
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="category" component={Category} />
      <Stack.Screen name="seedList" component={SeedList} />
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
      <Stack.Screen
        name="editMypage"
        component={EditMypage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editBirthday"
        component={EditBirthday}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editGender"
        component={EditGender}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editJob"
        component={EditJob}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editField"
        component={EditField}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="terms"
        component={TermsPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="info"
        component={InfoPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="info_detail"
        component={InfoDetailPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="question"
        component={QuestionPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Router;
