import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { signUp } from '../api/authApi';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const passwordRef = useRef(null);
    const nicknameRef = useRef(null);
    const phoneNumberRef = useRef(null);

    const handleSignUp = async () => {
        try {
            const result = await signUp(email, password, nickname, phoneNumber);
            if (result.success) {
                Alert.alert('Success', 'Account created successfully!');
            } else {
                Alert.alert('Error', 'Failed to create account');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to create account');
            console.error('Error signing up:', error.response ? error.response.data : error.message);
        }
    };

    const navigateToLogin = () => {
        navigation.replace('Login'); // LoginScreen으로 이동
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={navigateToLogin}>
                <Image source={require('../../assets/images/BackButton.png')} style={styles.backButtonImage} />
            </TouchableOpacity>
            <Image source={require('../../assets/images/logo/StartLogo.png')} style={styles.logo} />
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current.focus()}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                ref={passwordRef}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => nicknameRef.current.focus()}
            />
            <Text style={styles.label}>Nickname:</Text>
            <TextInput
                ref={nicknameRef}
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => phoneNumberRef.current.focus()}
            />
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                ref={phoneNumberRef}
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                returnKeyType="done"
                onSubmitEditing={handleSignUp}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backButtonImage: {
        width: 30,
        height: 30,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 8,
    },
});

export default SignUpScreen;
