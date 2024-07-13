import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { login } from '../api/authApi';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const result = await login(email, password);
            if (result.success) {
                Alert.alert('Success', 'Logged in successfully!');
                navigation.replace('Main'); // 메인 화면으로 이동
            } else {
                Alert.alert('Error', 'Failed to log in');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to log in');
            console.error('Error logging in:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo/StartLogo.png')} style={styles.logo} />
            <Text style={styles.title}>Today I Exercise</Text>
            <TextInput
                style={styles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="로그인" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUp}>회원가입</Text>
            </TouchableOpacity>
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
    logo: {
        width: 150,
        height: 150,
        marginBottom: 50,
    },
    title: {
        fontSize: 32,
        marginBottom: 32,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
    },
    signUp: {
        marginTop: 16,
        color: 'blue',
    },
});

export default LoginScreen;
