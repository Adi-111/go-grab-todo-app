import * as SQLite from 'expo-sqlite/legacy';

// Open or create a SQLite database
const db = SQLite.openDatabase('app.db');

// Initialize the database
export const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS groups (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                icon TEXT
            );`
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                groupId INTEGER,
                title TEXT NOT NULL,
                description TEXT,
                completed BOOLEAN DEFAULT 0,
                FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
            );`
        );
    });

    console.log("Database initialized");
};

// Insert a new group
export const insertGroup = (name: string, icon: string) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO groups (name, icon) VALUES (?, ?)`,
            [name, icon],
            () => console.log('Group added successfully'),
            (_, error) => {
                console.error('Error adding group:', error);
                return false;
            }
        );
    });
};

// Update an existing group
export const updateGroup = (id: number, name: string, icon: string) => {
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE groups SET name = ?, icon = ? WHERE id = ?`,
            [name, icon, id],
            () => console.log('Group updated successfully'),
            (_, error) => {
                console.error('Error updating group:', error);
                return false;
            }
        );
    });
};

// Delete a group
export const deleteGroup = (id: number) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM groups WHERE id = ?`,
            [id],
            () => console.log('Group deleted successfully'),
            (_, error) => {
                console.error('Error deleting group:', error);
                return false;
            }
        );
    });
};

// Fetch all groups
export const getGroups = (callback: (groups: Array<{ id: number, name: string, icon: string }>) => void) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM groups',
            [],
            (_, { rows: { _array } }) => callback(_array),
            (_, error) => {
                console.error('Error fetching groups:', error);
                return false;
            }
        );
    });
};

// Fetch todos for a specific group

export const getTodos = (groupId: number, callback: (todos: Array<{ id: number, title: string, description: string, completed: boolean }>) => void) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM todos WHERE groupId = ?',
            [groupId],
            (_, { rows: { _array } }) => callback(_array),
            (_, error) => {
                console.error('Error fetching todos:', error);
                return false;
            }
        );
    });
};


// Insert a new todo
export const insertTodo = (groupId: number, title: string, description: string) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO todos (groupId, title, description, completed) VALUES (?, ?, ?, 0)`,
            [groupId, title, description],
            () => console.log('Todo added successfully'),
            (_, error) => {
                console.error('Error adding todo:', error);
                return false;
            }
        );
    });
};

// Update an existing todo
export const updateTodo = (id: number, title: string, description: string, completed: boolean) => {
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?`,
            [title, description, completed ? 1 : 0, id],
            () => console.log('Todo updated successfully'),
            (_, error) => {
                console.error('Error updating todo:', error);
                return false;
            }
        );
    });
};
//toggle todo 
export const updateTodoToggle = (id: number, completed: boolean) => {
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE todos SET  completed = ? WHERE id = ?`,
            [completed ? 1 : 0, id],
            () => console.log('Todo updated successfully'),
            (_, error) => {
                console.error('Error updating todo:', error);
                return false;
            }
        );
    });
};

// Delete a todo
export const deleteTodo = (id: number) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM todos WHERE id = ?`,
            [id],
            () => console.log('Todo deleted successfully'),
            (_, error) => {
                console.error('Error deleting todo:', error);
                return false;
            }
        );
    });
};

// Drop all tables
export const dropAllTables = () => {
    db.transaction(tx => {
        tx.executeSql(
            `DROP TABLE IF EXISTS groups;`,
            [],
            () => console.log('Groups table dropped successfully'),
            (_, error) => {
                console.error('Error dropping groups table:', error);
                return false;
            }
        );
        tx.executeSql(
            `DROP TABLE IF EXISTS todos;`,
            [],
            () => console.log('Todos table dropped successfully'),
            (_, error) => {
                console.error('Error dropping todos table:', error);
                return false;
            }
        );
    });
};

