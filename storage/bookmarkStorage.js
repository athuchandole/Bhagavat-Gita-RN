// src/storage/bookmarkStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = 'BOOKMARKS';

export async function getBookmarks() {
    const json = await AsyncStorage.getItem(BOOKMARK_KEY);
    return json ? JSON.parse(json) : [];
}

export async function addBookmark(key) {
    const bookmarks = await getBookmarks();
    if (!bookmarks.includes(key)) {
        bookmarks.push(key);
        await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    }
}

export async function removeBookmark(key) {
    const bookmarks = await getBookmarks();
    const updated = bookmarks.filter(item => item !== key);
    await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
}

export async function isBookmarked(key) {
    const bookmarks = await getBookmarks();
    return bookmarks.includes(key);
}
