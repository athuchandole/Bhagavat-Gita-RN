import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

const Header = ({ title }) => {
    const navigation = useNavigation();
    const { themeMode } = useTheme();
    const themeColors = Colors[themeMode];

    const handleSettingsPress = () => {
        navigation.navigate('Settings');
    };

    return (
        <View style={[styles.header, {
            backgroundColor: themeColors.surface,
            borderBottomColor: themeColors.border,
            paddingTop: STATUS_BAR_HEIGHT
        }]}>
            <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>
            <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={handleSettingsPress} style={styles.iconButton}>
                    <Ionicons name="settings" size={24} color={themeColors.icon} />
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
        borderBottomWidth: 1,
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
