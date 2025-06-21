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

            <View style={styles.left}>
                <Feather name="feather" size={18} color={color.text} style={styles.leftIcon} />
                <Text style={[styles.title, { color: color.text }]}>Verse {verseNumber}</Text>
            </View>

            <View style={styles.right}>
                <Feather name="bookmark" size={20} color={color.text} />
                <Feather name="check-circle" size={20} color="#10B981" />
            </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftIcon: {
        marginRight: 15,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10, // or use marginRight if `gap` doesn’t work in older versions
        marginLeft: 'auto', // pushes right content to end
    },
    card: {
        flexDirection: 'row', // <== ADD THIS
        justifyContent: 'space-between', // optional
        alignItems: 'center',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default VerseCard;
