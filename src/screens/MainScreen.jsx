import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// 각 스크린 임포트
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ title: '통합검색' }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ title: '채팅' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '내정보' }} />
        </Tab.Navigator>
    );
};

export default MainScreen;
