import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors'; // Color palette

const SettingCard = ({ icon, name, description, value, onToggle }) => {
    const { themeMode } = useTheme(); // 'light' or 'dark'
    const theme = Colors[themeMode];

    return (
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name={icon} size={24} color={theme.icon} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
                <Text style={[styles.description, { color: theme.mutedText }]}>{description}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor={value ? '#ffffff' : '#f4f3f4'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 13,
        marginTop: 4,
    },
});

export default SettingCard;
