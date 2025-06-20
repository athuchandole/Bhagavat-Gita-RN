import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Screen({ children, style }) {
    const insets = useSafeAreaInsets();

    const statusBarHeight = Constants.statusBarHeight;
    const bottomNavHeight = insets.bottom;

    return (
        <SafeAreaView style={[styles.screen, { paddingBottom: bottomNavHeight }, style]}>
            <View style={[styles.view]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    view: {
        flex: 1,
    },
});

export default Screen;