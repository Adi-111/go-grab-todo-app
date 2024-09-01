import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button } from 'react-native';
import { getGroups, insertGroup } from '@/hooks/useDb'; // Import your database insert function

type AddGroupModalProps = {
    visible: boolean;
    onClose: () => void;
};

const AddGroupModal = ({ visible, onClose }: AddGroupModalProps) => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');

    const handleAddGroup = () => {
        if (name && icon) {
            insertGroup(name, icon);
            setName('');
            setIcon('');
            onClose();
        }
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white p-6 rounded-lg w-80">
                    <Text className="text-lg font-bold mb-4">Add New Group</Text>
                    <TextInput
                        className="border p-2 mb-4"
                        placeholder="Group Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        className="border p-2 mb-4"
                        placeholder="Group Icon (e.g., 📁)"
                        value={icon}
                        onChangeText={setIcon}
                    />
                    <View className='my-2'><Button title="Add Group" onPress={handleAddGroup} /></View>
                    <Button title="Cancel" onPress={onClose} color="red" />
                </View>
            </View>
        </Modal>
    );
};

export default AddGroupModal;
