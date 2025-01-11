import { View, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../../assets/icons/logo.png';
import seedzip from '../../assets/icons/seedzip.png';
import newLogo from '../../assets/icons/whiteLogo.png';

const SplashPage = ({ navigation }) => {
  const animaion = useRef(new Animated.Value(1)).current;
  const moveAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const backgroundAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animaion, {
        toValue: 1.5,
        duration: 400,
        delay: 1,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animaion, {
        toValue: 1,
        duration: 300,
        delay: 1,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animaion, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(backgroundAnimation, {
          toValue: 1,
          duration: 650,
          delay: 1,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(moveAnimation, {
          toValue: -105,
          duration: 650,
          delay: 1,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 650,
          delay: 1,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        navigation.navigate('nextSplash');
      }, 800);
    });
  }, []);

  const color1 = backgroundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#41C3AB'],
  });

  const color2 = backgroundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#82E9D6'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { backgroundColor: color1, color2 }]}
      >
        <LinearGradient
          colors={[color1, color2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <Animated.Image
            source={logo}
            style={[
              styles.logo,
              {
                transform: [{ scale: animaion }],
                opacity: animaion,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.images,
              {
                opacity: fadeAnimation,
              },
            ]}
          >
            <Animated.Image
              source={newLogo}
              style={[
                styles.newLogo,
                {
                  transform: [{ translateX: moveAnimation }],
                },
              ]}
            />
            <Animated.Image
              source={seedzip}
              style={[
                styles.seedzip,
                {
                  opacity: fadeAnimation,
                },
              ]}
            />
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 36,
    height: 36,
    position: 'absolute',
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    transform: [{ translateX: 10 }],
  },
  newLogo: {
    width: 36,
    height: 36,
    position: 'absolute',
  },
  seedzip: {
    width: 155,
    height: 36,
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashPage;