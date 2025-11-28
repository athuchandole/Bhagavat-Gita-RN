import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = 'BOOKMARKS';

/**
 * Get all bookmarked verses
 * @returns {Promise<string[]>}
 */
export async function getBookmarks() {
    try {
        const json = await AsyncStorage.getItem(BOOKMARK_KEY);
        return json ? JSON.parse(json) : [];
    } catch (error) {
        console.error('Error fetching bookmarks', error);
        return [];
    }
}

/**
 * Add a new bookmark
 * @param {string} key Format: verse_chapterId_verseId
 */
export async function addBookmark(key) {
    try {
        const bookmarks = await getBookmarks();
        if (!bookmarks.includes(key)) {
            bookmarks.push(key);
            await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
        }
    } catch (error) {
        console.error('Error adding bookmark', error);
    }
}

/**
 * Remove a bookmark
 * @param {string} key
 */
export async function removeBookmark(key) {
    try {
        const bookmarks = await getBookmarks();
        const updated = bookmarks.filter(item => item !== key);
        await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error removing bookmark', error);
    }
}

/**
 * Check if a verse is bookmarked
 * @param {string} key
 * @returns {Promise<boolean>}
 */
export async function isBookmarked(key) {
    try {
        const bookmarks = await getBookmarks();
        return bookmarks.includes(key);
    } catch (error) {
        console.error('Error checking bookmark', error);
        return false;
    }
}
