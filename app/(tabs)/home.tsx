import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { getGroups, deleteGroup, updateGroup } from '@/hooks/useDb';
import AddGroupModal from '@/components/add-group-modal';
import UpdateGroupModal from '@/components/update-group-modal'; // Import the new component

import { useNavigation } from 'expo-router';
import { ThemedView } from '@/components/themed-view';



export default function Index() {
  const [groups, setGroups] = useState<Array<{ id: number, name: string, icon: string }>>([]);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{ id: number; name: string; icon: string } | null>(null);
  useEffect(() => {
    getGroups(setGroups);
  }, [isAddModalVisible, isUpdateModalVisible]);

  const navigation = useNavigation();

  const handleLongPress = (groupId: number) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const handleDeleteGroups = () => {
    Alert.alert(
      "Delete Groups",
      "Are you sure you want to delete the selected groups?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            selectedGroups.forEach(groupId => deleteGroup(groupId));
            setSelectedGroups([]);
            getGroups(setGroups); // Refresh the groups list
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleUpdateGroup = (name: string, icon: string) => {
    if (selectedGroup) {
      updateGroup(selectedGroup.id, name, icon); // Update the group in the database
      setUpdateModalVisible(false);
      getGroups(setGroups);
    }
  };

  return (
    <ThemedView className="bg-lime-50 items-center">
      <View className='h-12 bg-black w-full' />
      <Text className="text-black mt-3 font-extrabold text-4xl">Groups</Text>
      <TouchableOpacity className='my-2' onPress={() => setAddModalVisible(true)}>
        <View className='p-2 bg-gray-100 rounded-full items-center justify-center'>
          <Ionicons name="add" size={32} />
        </View>
      </TouchableOpacity>
      <AddGroupModal visible={isAddModalVisible} onClose={() => setAddModalVisible(false)} />

      {selectedGroups.length > 0 && (
        <TouchableOpacity onPress={handleDeleteGroups}>
          <View className="p-2 bg-red-500 rounded-full items-center justify-center my-2">
            <Text className="text-white font-extrabold">Delete Selected Groups</Text>
          </View>
        </TouchableOpacity>
      )}

      <ScrollView className='w-[88%]'>
        {groups.map((group) => (
          <TouchableOpacity
            key={group.id}
            onLongPress={() => {
              setSelectedGroup(group);
              setUpdateModalVisible(true);
            }}
            onPress={() => {
              navigation.navigate(`todo-list`, { groupId: group.id, groupName: group.name });
            }}
            className={selectedGroups.includes(group.id) ? "border border-red-500" : ""}
          >
            <View className="bg-white w-full flex-row items-center p-4 mt-4 rounded-3xl relative">
              <Text className="text-2xl mr-3">{group.icon}</Text>
              <Text className="text-black mt-3 font-extrabold text-4xl capitalize">{group.name}</Text>
              <View className="p-2 bg-gray-100 rounded-full items-center justify-center absolute right-4">
                <Ionicons name="arrow-forward" size={32} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedGroup && (
        <UpdateGroupModal
          visible={isUpdateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          onUpdate={handleUpdateGroup}
          onDelete={() => {
            if (selectedGroup) {
              deleteGroup(selectedGroup.id);
              setUpdateModalVisible(false);
              getGroups(setGroups);
            }
          }}
          initialName={selectedGroup.name}
          initialIcon={selectedGroup.icon}
        />
      )}
    </ThemedView>
  );
}
