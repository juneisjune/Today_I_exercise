import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getToken, logout } from '../api/authApi';

const MainScreen = ({ navigation }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getToken();
            setToken(storedToken);
        };
        fetchToken();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Main Screen</Text>
            {token && <Text style={styles.token}>Token: {token}</Text>}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 32,
        marginBottom: 32,
    },
    token: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default MainScreen;
