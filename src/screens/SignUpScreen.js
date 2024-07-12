import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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

    },
    label: {
        fontSize: 16,
        marginBottom: 8,

    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 100,
    },
});

export default SignUpScreen;
