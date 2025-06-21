import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';
import Feather from '@expo/vector-icons/Feather';

const VerseCard = ({ verseNumber, onPress }) => {
    const { themeMode } = useTheme();
    const color = Colors[themeMode];

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: color.surface,
                    shadowColor: color.text,
                },
            ]}
            onPress={onPress}
        >
            {/* Left: Icon + Verse number */}
            <View style={styles.left}>
                <Feather name="feather" size={18} color={color.icon} style={styles.leftIcon} />
                <Text style={[styles.title, { color: color.text }]}>Verse {verseNumber}</Text>
            </View>

            {/* Right: Bookmark + Check-circle */}
            <View style={styles.right}>
                <Feather name="bookmark" size={20} color={color.icon} />
                <Feather name="check-circle" size={20} color={themeMode === 'dark' ? '#34D399' : '#10B981'} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftIcon: {
        marginRight: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 'auto',
    },
});

export default VerseCard;
