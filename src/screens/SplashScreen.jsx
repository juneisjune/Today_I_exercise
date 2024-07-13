import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { getToken } from '../api/authApi';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                navigation.replace('Main');
            } else {

                navigation.replace('Login');
            }
        };
        checkToken();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../assets/images/logo/StartLogo.png')} style={styles.logo} />
            </View>
            <Text style={styles.text}>Today I Exercise</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
    },
    text: {
        marginTop: 20,
        fontSize: 24,
        color: '#000',
    },
});

export default SplashScreen;
