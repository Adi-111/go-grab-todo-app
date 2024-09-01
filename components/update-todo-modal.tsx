import React, { useState, useEffect } from 'react';
import { Modal, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';

interface UpdateTodoModalProps {
    visible: boolean;
    onClose: () => void;
    onUpdate: (title: string, description: string) => void;
    onDelete: () => void;
    initialTitle: string;
    initialDescription: string;
}

const UpdateTodoModal: React.FC<UpdateTodoModalProps> = ({
    visible,
    onClose,
    onUpdate,
    onDelete,
    initialTitle,
    initialDescription
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
    }, [initialTitle, initialDescription]);

    return (
        <Modal
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <ThemedView className="flex-1 justify-center items-center bg-black bg-opacity-50 p-4">
                <View className="bg-white p-6 rounded-lg w-full max-w-md">
                    <Text className="text-lg font-bold mb-4">Update Todo</Text>
                    <TextInput
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        className="border p-2 mb-4 rounded"
                    />
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        className="border p-2 mb-4 rounded"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            onUpdate(title, description);
                            onClose();
                        }}
                        className="bg-blue-500 p-2 rounded"
                    >
                        <Text className="text-white text-center">Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onDelete();
                            onClose();
                        }}
                        className="bg-red-500 p-2 rounded mt-2"
                    >
                        <Text className="text-white text-center">Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onClose}
                        className="mt-2"
                    >
                        <Text className="text-blue-500 text-center">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </Modal>
    );
};

export default UpdateTodoModal;
