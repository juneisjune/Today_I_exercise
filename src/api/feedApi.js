import axiosInstance from './axiosInstance';

export const getFeeds = async (page = 0, pageSize = 10) => {
    try {
        const response = await axiosInstance.get('/feed', {
            params: { page, pageSize }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching feeds:', error);
        throw error;
    }
};

export const getFeedDetail = async (feedId) => {
    try {
        const response = await axiosInstance.get(`/feed/${feedId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feed detail:', error);
        throw error;
    }
};

export const createFeed = async (content, tags, images) => {
    const formData = new FormData();
    formData.append('feedRequest', JSON.stringify({ content, tags }));
    images.forEach((image, index) => {
        formData.append(`image`, {
            uri: image.uri,
            type: 'image/jpeg',
            name: `image${index}.jpg`
        });
    });

    try {
        const response = await axiosInstance.post('/feed', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating feed:', error);
        throw error;
    }
};