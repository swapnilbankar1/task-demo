// const crypto = require('crypto');
const db = require('../db/create_database');

exports.updateTask = function (taskInfo) {
    try {
        const stmt = db.prepare('UPDATE task SET status = ?, details= ? WHERE id = ?');
        const info = stmt.run(taskInfo.status, taskInfo.details, taskInfo.id);
        console.log(`Row(s) updated: ${info.changes}`);
        return true;
    } catch (error) {
        console.error('Error updating data:', error);
        return false;
    }

}