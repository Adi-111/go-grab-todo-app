import React, { useState, useEffect } from 'react';
import { Modal, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';

interface UpdateGroupModalProps {
    visible: boolean;
    onClose: () => void;
    onUpdate: (name: string, icon: string) => void;
    onDelete: () => void;
    initialName: string;
    initialIcon: string;
}

const UpdateGroupModal: React.FC<UpdateGroupModalProps> = ({
    visible,
    onClose,
    onUpdate,
    onDelete,
    initialName,
    initialIcon
}) => {
    const [name, setName] = useState(initialName);
    const [icon, setIcon] = useState(initialIcon);

    useEffect(() => {
        setName(initialName);
        setIcon(initialIcon);
    }, [initialName, initialIcon]);

    return (
        <Modal
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <ThemedView className="flex-1 justify-center items-center bg-black bg-opacity-50 p-4">
                <View className="bg-white p-6 rounded-lg w-full max-w-md">
                    <Text className="text-lg font-bold mb-4">Update Group</Text>
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        className="border p-2 mb-4 rounded"
                    />
                    <TextInput
                        placeholder="Icon"
                        value={icon}
                        onChangeText={setIcon}
                        className="border p-2 mb-4 rounded"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            onUpdate(name, icon);
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

export default UpdateGroupModal;
