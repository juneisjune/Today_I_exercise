import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { signUp } from '../api/authApi';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text style={styles.label}>Nickname:</Text>
            <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
            />
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
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
    logo: {
        width: 150,
        height: 150,
        marginBottom: 100,
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
