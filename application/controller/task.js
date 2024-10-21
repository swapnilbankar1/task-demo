const crypto = require('crypto');
const db = require('../db/create_database');
const taskUtils = require('../utils/task.util');
const broadcastMessage = require('../utils/messageSender');

exports.createTask = (req, res, next) => {
    const taskInfo = {
        name: req.body.name,
        status: 'RUNNING',
        message: 'Task created.',
        details: req.body.details
    };
    const stmt = db.prepare('INSERT INTO task (id, name, status, start_time, details) VALUES (?,?,?,?,?)');
    const uuid = crypto.randomUUID();
    stmt.run(uuid, taskInfo.name, taskInfo.status, Date.now(), taskInfo.details);

    res.status(201).json({ 'message': 'Task created' });

    broadcastMessage(JSON.stringify(taskInfo));

    setTimeout(() => {
        const taskInfo = {
            id: uuid,
            status: 'SUCCESS',
            message: 'Task completed successfully',
            details: req.body.details
        };
        taskUtils.updateTask(taskInfo);
        broadcastMessage(JSON.stringify(taskInfo));
    }, 4000);
}

exports.getTasks = (req, res, next) => {
    db.all('select * from task;', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ 'message': 'Server error' })
        } else {
            res.status(200).json({ 'tasks': rows })
        }
    });
}

