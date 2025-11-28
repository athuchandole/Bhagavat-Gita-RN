import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Screen({ children, style, contentContainerStyle }) {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView
            style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }, style]}
        >
            <SafeAreaView style={[styles.content, contentContainerStyle]}>
                {children}
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#fff" },
    content: { flex: 1 },
});

export default Screen;
