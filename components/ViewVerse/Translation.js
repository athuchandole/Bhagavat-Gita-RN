import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Translation({ translation, color }) {
    return (
        <>
            <Text style={[styles.label, { color: color.h1 }]}>🔍 Translation</Text>
            <Text style={[styles.content, {
                color: color.text,
                backgroundColor: color.surface,
                shadowColor: color.text,
            }]}>
                {translation || 'No translation available.'}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 6,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        padding: 12,
        borderRadius: 8,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
});
