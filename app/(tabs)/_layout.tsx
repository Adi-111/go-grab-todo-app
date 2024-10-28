import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (

        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',

                    tabBarIcon: (props) => <TabBarIcon name="home" className='' />,

                }}
            />
            <Tabs.Screen
                name="todo-list"
                options={{
                    title: 'Recent List',

                    tabBarIcon: (props) => <TabBarIcon name="list" className='' />,

                }}
            />


        </Tabs>
    );
}
