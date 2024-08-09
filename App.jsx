import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import About from './src/pages/About';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 2000);
  }, []);

  if (!isAppLoaded) {
    return (
      <View className="flex-1 w-full justify-center items-center bg-transparent">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator> */}
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'lightgray',
            },
            tabBarActiveTintColor: 'black',
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
