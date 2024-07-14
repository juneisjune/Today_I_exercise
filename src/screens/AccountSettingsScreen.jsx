import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateProfile, updateProfileImage } from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosInstance'; // 추가

const AccountSettingsScreen = ({ navigation }) => {
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    const response = await axiosInstance.get('/accounts/info', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setNickname(response.data.result.nickName);
                    setName(response.data.result.name);
                    setIntroduce(response.data.result.introduce);
                    setProfileImage(response.data.result.profileImagePath);
                }
            } catch (error) {
                console.error('Error loading profile data:', error);
            }
        };
        loadProfileData();
    }, []);

    const handleSave = async () => {
        const profileData = {
            nickname: { value: nickname },
            name,
            introduce
        };

        try {
            const result = await updateProfile(profileData);
            if (result.success) {
                Alert.alert('Success', 'Profile updated successfully!');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to update profile');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.uri);
            try {
                await updateProfileImage(result.uri);
                Alert.alert('Success', 'Profile image updated successfully!');
            } catch (error) {
                Alert.alert('Error', 'Failed to update profile image');
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>계정 설정</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveButton}>저장</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={profileImage ? { uri: profileImage } : require('../../assets/images/profile-placeholder.png')} style={styles.profileImage} />
                    <Text style={styles.changeImageText}>사진 변경하기</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="닉네임"
                    value={nickname}
                    onChangeText={setNickname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="이름"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="소개"
                    value={introduce}
                    onChangeText={setIntroduce}
                />
            </View>
            <View style={styles.logoutContainer}>
                <Button title="로그아웃" onPress={() => {/* 로그아웃 기능 구현 */ }} />
                <Button title="회원탈퇴" onPress={() => {/* 회원탈퇴 기능 구현 */ }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    saveButton: {
        fontSize: 16,
        color: 'blue',
    },
    profileContainer: {
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    changeImageText: {
        color: 'blue',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 100,
    },
    logoutContainer: {
        padding: 20,
    },
});

export default AccountSettingsScreen;
