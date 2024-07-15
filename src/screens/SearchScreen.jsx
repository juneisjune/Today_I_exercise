import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const SearchScreen = () => {
    const [keyword, setKeyword] = useState('');
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}></SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchScreen;
