import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor'; // Ensure this hook returns the correct color for background

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedView({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return (
        <View
            className='flex-1'
            style={[{ backgroundColor }, style]} // Tailwind classes will be applied directly
            {...otherProps}
        />
    );
}
