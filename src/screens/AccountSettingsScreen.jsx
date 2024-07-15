import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { updateProfile, getProfile, logout, deleteUser } from '../api/authApi'; // deleteUser 추가
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const AccountSettingsScreen = ({ navigation }) => {
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const result = await getProfile();
            setNickname(result.result.nickName);
            setName(result.result.name);
            setIntroduce(result.result.introduce);
            setProfileImage(result.result.profileImagePath);
        } catch (error) {
            console.error('Error loading profile:', error.message);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const result = await updateProfile(nickname, name, introduce);
            if (result.success) {
                Alert.alert('Success', 'Profile updated successfully!');
                navigation.goBack(); // 프로필 페이지로 돌아가기
            } else {
                Alert.alert('Error', 'Failed to update profile');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            Alert.alert('Logged Out', 'You have been logged out successfully.');
            navigation.replace('Login'); // 로그인 화면으로 이동
        } catch (error) {
            Alert.alert('Error', 'Failed to log out');
            console.error('Error logging out:', error.message);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "회원 탈퇴",
            "정말로 탈퇴하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "탈퇴",
                    onPress: async () => {
                        try {
                            await deleteUser();
                            Alert.alert('Account Deleted', 'Your account has been deleted.');
                            navigation.replace('SignUp'); // 회원가입 화면으로 이동
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete account');
                            console.error('Error deleting account:', error.message);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <Image source={profileImage ? { uri: profileImagePath } : require('../../assets/images/profile-placeholder.png')} style={styles.profileImage} />
                <Text style={styles.changePhotoText}>사진 변경하기</Text>
            </TouchableOpacity>
            <Text style={styles.label}>닉네임</Text>
            <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
            />
            <Text style={styles.label}>이름</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>소개</Text>
            <TextInput
                style={styles.input}
                value={introduce}
                onChangeText={setIntroduce}
                multiline
            />
            <Button title="저장" onPress={handleUpdateProfile} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.buttonText}>로그아웃</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>회원탈퇴</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    imagePicker: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    changePhotoText: {
        color: '#007bff',
        marginBottom: 16,
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: '#ff6f61',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AccountSettingsScreen;
