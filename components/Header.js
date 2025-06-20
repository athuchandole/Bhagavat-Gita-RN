import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or use another icon library

// Dynamically get status bar height
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

const Header = ({ title }) => {
    const handleToggle = () => {
        // Implement your toggle logic here (e.g. open drawer, switch theme)
        console.log('Toggle button pressed');
    };

    return (
        <View style={[styles.header, { paddingTop: STATUS_BAR_HEIGHT }]}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={handleToggle} style={styles.toggle}>
                <Ionicons name="ios-menu" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60 + STATUS_BAR_HEIGHT, // total height including status bar
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    toggle: {
        padding: 8,
    },
});

export default Header;
