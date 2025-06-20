import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Dynamically get status bar height
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

const Header = ({ title }) => {
    const navigation = useNavigation();

    const handleMenuToggle = () => {
        console.log('Menu button pressed');
        // Handle drawer open or something else
    };

    const handleSettingsPress = () => {
        navigation.navigate('Settings'); // Ensure 'Settings' is a valid route
    };

    return (
        <View style={[styles.header, { paddingTop: STATUS_BAR_HEIGHT }]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.toggleContainer}>
                {/* <TouchableOpacity onPress={handleMenuToggle} style={styles.iconButton}>
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handleSettingsPress} style={styles.iconButton}>
                    <Ionicons name="settings" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60 + STATUS_BAR_HEIGHT,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
    },
});

export default Header;
