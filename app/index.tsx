import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router"; // Import useRouter
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { initializeDatabase } from "@/hooks/useDb";

export default function Index() {
    const router = useRouter(); // Call useRouter inside the component
    const [loading, setLoading] = useState(true); // State to track loading


    useEffect(() => {


        // First, initialize the database
        initializeDatabase();

        // Simulate a loading delay if needed
        const timer = setTimeout(() => {
            setLoading(false);
            router.replace("/(tabs)/home"); // Replace to prevent navigation back to this screen
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, [router]);





    if (loading) {

        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return null; // Render nothing after navigation happens
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});
