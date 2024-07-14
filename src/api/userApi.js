import axiosInstance from './axiosInstance';

// 회원 정보 수정 API
export const updateProfile = async (nickname, name, introduction) => {
    try {
        const response = await axiosInstance.patch('/accounts', {
            nickname: { value: nickname },
            name,
            introduce: introduction,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 프로필 사진 변경 API
export const updateProfileImage = async (imageUri) => {
    const formData = new FormData();
    formData.append('image', {
        uri: imageUri,
        name: 'profile.jpg',
        type: 'image/jpeg',
    });

    try {
        const response = await axiosInstance.patch('/accounts/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile image:', error.response ? error.response.data : error.message);
        throw error;
    }
};
