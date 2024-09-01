import { RouteProp, useRoute } from '@react-navigation/native';
import { ThemedView } from '@/components/themed-view';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getTodos, insertTodo, deleteTodo, updateTodoToggle, } from '@/hooks/useDb'; // Import `updateTodoToggle`
import AddTodoModal from '@/components/add-todo-model';
import UpdateTodoModal from '@/components/update-todo-modal'; // Import the new component
import Ionicons from '@expo/vector-icons/Ionicons';
import { RouteParams } from 'expo-router';

type TodoListScreenRouteProp = RouteProp<{
    params: { groupId: number; groupName: string }
}, 'params'>;

export default function TodoListScreen() {
    const route = useRoute<TodoListScreenRouteProp>();
    const { groupId, groupName } = route.params || {};
    // Fallback to empty object if route.params is undefined

    // Check if groupId and groupName are available
    if (typeof groupId === 'undefined' || typeof groupName === 'undefined') {
        return (
            <ThemedView className="flex-1 justify-center bg-white items-center">
                <Text className="text-lg">No Recent Group</Text>
            </ThemedView>
        );
    }

    const [todos, setTodos] = useState<{ id: number; title: string; description: string; completed: boolean }[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<{ id: number; title: string; description: string } | null>(null);

    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');

    useEffect(() => {
        if (groupId) {
            getTodos(groupId, setTodos); // Fetch todos for the given groupId
        }

    }, [groupId]);

    const handleAddTodo = (title: string, description: string) => {
        insertTodo(groupId, title, description); // Add the new todo to the database
        getTodos(groupId, setTodos); // Refresh the todos list
    };

    const handleToggleCompletion = (todoId: number) => {
        const updatedTodos = todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        updateTodoToggle(todoId, !todos.find(todo => todo.id === todoId)!.completed); // Update the todo in the database
    };

    const handleDeleteTodo = (todoId: number) => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        deleteTodo(todoId);
                        setTodos(todos.filter(todo => todo.id !== todoId)); // Remove the deleted todo from state
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const handleUpdateTodo = () => {
        if (selectedTodo) {
            // Update the selected todo
            // You may want to replace the following line with the actual update logic
            insertTodo(groupId, todoTitle, todoDescription);
            setUpdateModalVisible(false);
            getTodos(groupId, setTodos); // Refresh the todos list
        }
    };

    const handleLongPress = (todo: { id: number; title: string; description: string }) => {
        setSelectedTodo(todo);
        setUpdateModalVisible(true);
    };

    return (
        <ThemedView className="bg-lime-50 items-center">

            <View className='h-12 bg-black w-full' />
            <Text className="text-black mt-3 font-extrabold text-4xl">{groupName} : Todo's</Text>
            <TouchableOpacity className='my-2' onPress={() => setModalVisible(true)}>
                <View className='p-2 bg-gray-100 rounded-full items-center justify-center'>
                    <Ionicons name="add" size={32} />
                </View>
            </TouchableOpacity>
            <AddTodoModal visible={isModalVisible} onClose={() => setModalVisible(false)} onAddTodo={handleAddTodo} />

            <ScrollView className='w-[88%]'>
                {todos.map(todo => (
                    <TouchableOpacity
                        key={todo.id}
                        onLongPress={() => handleLongPress(todo)}
                        onPress={() => handleToggleCompletion(todo.id)}
                    >
                        <View className={`bg-white w-full flex-row items-center p-4 mt-4 rounded-3xl relative ${todo.completed ? 'bg-gray-200' : ''}`}>
                            <View className={`w-4 h-4 border-2 rounded-full ${todo.completed ? 'bg-green-500' : 'bg-white'}`} />
                            <Text className={`text-black font-extrabold text-xl ml-2 ${todo.completed ? 'line-through' : ''}`}>
                                {todo.title}
                            </Text>
                            <Text className="text-gray-600 text-sm ml-2">{todo.description}</Text>
                            <View className="absolute right-4">
                                <Ionicons name="checkmark-circle" size={24} color={todo.completed ? 'green' : 'gray'} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedTodo && (
                <UpdateTodoModal
                    visible={isUpdateModalVisible}
                    onClose={() => setUpdateModalVisible(false)}
                    onUpdate={handleUpdateTodo}
                    initialTitle={todoTitle}
                    initialDescription={todoDescription}
                    onDelete={() => {
                        if (selectedTodo) {
                            handleDeleteTodo(selectedTodo.id);
                            setUpdateModalVisible(false);
                        }
                    }}
                />
            )}
        </ThemedView>
    );
}
