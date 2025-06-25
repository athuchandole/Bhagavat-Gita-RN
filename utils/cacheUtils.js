import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('✅ AsyncStorage cleared successfully');
    } catch (e) {
        console.error('❌ Failed to clear AsyncStorage:', e);
    }
};
