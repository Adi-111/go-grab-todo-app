// components/add-todo-modal.tsx
import React, { useState } from 'react';
import { Modal, TextInput, View, Text, Button, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AddTodoModalProps {
    visible: boolean;
    onClose: () => void;
    onAddTodo: (title: string, description: string) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ visible, onClose, onAddTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTodo = () => {
        if (title) {
            onAddTodo(title, description);
            setTitle('');
            setDescription('');
            onClose();
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-4 rounded-lg w-80">
                    <Text className="text-xl font-bold mb-4">Add Todo</Text>
                    <TextInput
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        className="border-b border-gray-300 mb-4 p-2"
                    />
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        className="border-b border-gray-300 mb-4 p-2"
                    />
                    <View className="flex-row justify-between">
                        <Button title="Cancel" onPress={onClose} />
                        <Button title="Add Todo" onPress={handleAddTodo} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddTodoModal;
