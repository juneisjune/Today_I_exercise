import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getProfile } from '../api/authApi'; // getProfile 함수를 올바르게 임포트했는지 확인

const ProfileScreen = ({ navigation }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData.result);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();



    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>내 정보</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
                    <Icon name="settings-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            {profile && (
                <>
                    <View style={styles.profileContainer}>
                        <Image source={profile.image ? { uri: profile.profileImagePath } : require('../../assets/images/profile-placeholder.png')} style={styles.profileImage} />
                        <Text style={styles.name}>{profile.nickName}</Text>
                        <Text style={styles.description}>{profile.introduce}</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoNumber}>{profile.feedCount}</Text>
                                <Text style={styles.infoText}>게시글</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoNumber}>{profile.followingCount}</Text>
                                <Text style={styles.infoText}>팔로워</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoNumber}>{profile.followingCount}</Text>
                                <Text style={styles.infoText}>팔로우</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <Text style={styles.menuItem}>이벤트</Text>
                        <Text style={styles.menuItem}>공지사항</Text>
                        <Text style={styles.menuItem}>앱건의</Text>
                        <Text style={styles.menuItem}>1:1문의</Text>
                        <Text style={styles.menuItem}>FAQ</Text>
                        <Text style={styles.menuItem}>이용약관</Text>
                    </View>
                </>
            )}
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
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        color: 'gray',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    infoBox: {
        alignItems: 'center',
    },
    infoNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoText: {
        color: 'gray',
    },
    menuContainer: {
        padding: 20,
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ProfileScreen;


{/**import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getProfile } from '../api/userApi'; // getProfile 함수를 올바르게 임포트했는지 확인


 */}