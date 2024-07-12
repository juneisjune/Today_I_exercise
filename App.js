import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './src/screens/ProfileScreen';
import ApiTestScreen from './src/screens/ApiTestScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import FeedScreen from './src/api/FeedScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="API Test" component={ApiTestScreen} />
        <Tab.Screen name="Sign Up" component={SignUpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


{/* <NavigationContainer>
<Tab.Navigator>
  <Tab.Screen name="Feed" component={FeedScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
  <Tab.Screen name="API Test" component={ApiTestScreen} />
  <Tab.Screen name="Sign Up" component={SignUpScreen} />
</Tab.Navigator>
</NavigationContainer> */}