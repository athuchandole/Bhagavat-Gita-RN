import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../Theme/ThemeContext';
import Colors from '../Theme/colors';

const SettingCard = ({ icon, name, description, type = 'toggle', value, onChange, options = [] }) => {
    const { themeMode } = useTheme();
    const theme = Colors[themeMode];

    const renderControl = () => {
        switch (type) {
            case 'toggle':
                return (
                    <Switch
                        value={value}
                        onValueChange={onChange}
                        trackColor={{ false: theme.border, true: theme.primary }}
                        thumbColor={value ? '#ffffff' : '#f4f3f4'}
                    />
                );
            case 'select':
                return (
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={[styles.picker, { color: theme.text }]}
                        dropdownIconColor={theme.icon}
                    >
                        {options.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                );
            default:
                return null;
        }
    };

    return (
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name={icon} size={24} color={theme.icon} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
                <Text style={[styles.description, { color: theme.mutedText }]}>{description}</Text>
            </View>
            <View style={styles.controlContainer}>
                {renderControl()}
            </View>
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
    controlContainer: {
        marginLeft: 10,
    },
    picker: {
        width: 130,
        height: 50,
    },
});

export default SettingCard;
