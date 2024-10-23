const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');


// Create a new SQLite database file (or open it if it already exists)
const db = new sqlite3.Database('tasks.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const sqlFile = fs.readFileSync('./db/task.sql', 'utf8');
console.log(sqlFile)
// Create a new table in the database
db.run(sqlFile, (result, err) => {
    console.log(result);
    
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table "task" created or already exists.');
    }
});

module.exports = db;