import {open} from 'react-native-quick-sqlite';

export const db = open({name: 'db.sqlite'});

export const createCommentsTable = () => {
  db.execute(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER DEFAULT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );`);
};
