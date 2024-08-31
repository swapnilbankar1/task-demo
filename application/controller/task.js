const express = require("express");
const crypto = require('crypto');
const db = require('../db/create_database');

const uuid = crypto.randomUUID();

exports.createTask = (req, res, next) => {
    console.log(req.body);
    console.log(db);
    
    const taskInfo = {
        name: req.body.name,
        status: req.body.name,
        details: req.body.name,
    };
    const stmt = db.prepare('INSERT INTO task (id, name, status, start_time, details) VALUES (?,?,?,?,?)');

    stmt.run(crypto.randomUUID(), taskInfo.name, taskInfo.status, Date.now(), taskInfo.details);

    res.status(201).json({'message':'Task created'})
}