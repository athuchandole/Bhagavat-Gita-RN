import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

const Header = ({ title }) => {
    const { themeMode } = useTheme();
    const themeColors = Colors[themeMode];

    return (
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border, paddingTop: STATUS_BAR_HEIGHT }]}>
            <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>
            <View style={styles.toggleContainer} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60 + STATUS_BAR_HEIGHT, borderBottomWidth: 1 },
    title: { fontSize: 25, fontWeight: 'bold' },
    toggleContainer: { flexDirection: 'row', alignItems: 'center' },
});

export default Header;
