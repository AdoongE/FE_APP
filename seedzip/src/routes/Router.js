import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Nickname from '../pages/signup/Nickname';
import Birthday from '../pages/signup/Birthday';
import Field from '../pages/signup/Field';
import Consent from '../pages/signup/Consent';
import Success from '../pages/signup/Success';
import SplashPage from '../pages/splash/SplashPage';
import NextSplash from '../pages/splash/NextSplash';
import Home from '../pages/Home';
import View from '../pages/view/ViewSeed';

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
      <Stack.Screen name="field" component={Field} />
      <Stack.Screen name="consent" component={Consent} />
      <Stack.Screen
        name="success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="main" component={Home} />
      <Stack.Screen name="view" component={View} />
    </Stack.Navigator>
  );
}

export default Router;