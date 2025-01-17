import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Nickname from '../pages/signup/Nickname';
import Birthday from '../pages/signup/Birthday';
import Gender from '../pages/signup/Gender';
import Field from '../pages/signup/Field';
import Consent from '../pages/signup/Consent';
import Success from '../pages/signup/Success';
import SplashPage from '../pages/splash/SplashPage';
import NextSplash from '../pages/splash/NextSplash';
import Main from '../pages/main/Main';
import View from '../pages/view/ViewSeed';
import AddLink from '../pages/contentAdd/AddLink';
import AddCategory from '../pages/contentAdd/AddCategory';
import AddTag from '../pages/contentAdd/AddTag';
import ImageUpload from '../pages/add/ImageUpload';
import ImageSave from '../pages/add/ImageSave';
import Add from '../pages/add/AddSeedPage';
import Save from '../pages/add/SaveSeedPage';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackTitle: '',
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerTintColor: '#000',
      }}>
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
        name="main"
        component={Main}
        options={{
          headerShown: false, // 메인화면에서 헤더 숨김
        }}
      />
      <Stack.Screen name="view" component={View} />

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
        <Stack.Screen
          name="imagesave"
          component={ImageSave}
        />
      <Stack.Screen name="add" component={Add} />
      <Stack.Screen name="save" component={Save} />
    </Stack.Navigator>
  );
}

export default Router;
