// // 📁 src/storage/database.js
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const STORAGE_KEYS = {
//     CHAPTERS: 'chapters_data',
//     VERSES: (chapterId) => `verses_data_${chapterId}`,
//     VERSE: (chapterId, verseId) => `verse_data_${chapterId}_${verseId}`,
// };

// export const saveData = async (key, data) => {
//     try {
//         await AsyncStorage.setItem(key, JSON.stringify(data));
//     } catch (error) {
//         console.error('Error saving to storage:', error);
//     }
// };

// export const loadData = async (key) => {
//     try {
//         const value = await AsyncStorage.getItem(key);
//         return value ? JSON.parse(value) : null;
//     } catch (error) {
//         console.error('Error loading from storage:', error);
//         return null;
//     }
// };

// export default STORAGE_KEYS;
