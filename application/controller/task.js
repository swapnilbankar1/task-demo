const express = require("express");
const crypto = require('crypto');
const db = require('../db/create_database');

const uuid = crypto.randomUUID();

exports.createTask = (req, res, next) => {
    const taskInfo = {
        name: req.body.name,
        status: req.body.name,
        details: req.body.name,
    };
    const stmt = db.prepare('INSERT INTO task (id, name, status, start_time, details) VALUES (?,?,?,?,?)');

    stmt.run(crypto.randomUUID(), taskInfo.name, taskInfo.status, Date.now(), taskInfo.details);

    res.status(201).json({ 'message': 'Task created' })
}

exports.getTasks = (req, res, next) => {
    db.all('select * from task;', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ 'message': 'Server error' })
        } else {
            console.log(rows);
            res.status(200).json({ 'tasks': rows })
        }
    });
}