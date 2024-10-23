const db = require('../db/create_database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

exports.registerUser = (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    stmt.run(username, hashedPassword);

    res.status(201).json({ 'message': 'User created' });
}


exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
            if (err || !user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).send('Invalid credentials');
            }
            const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).send({ 'msg': 'Login successful' });
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
}

exports.getUsers = (req, res, next) => {
    db.all('select * from users;', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ 'message': 'Server error' })
        } else {
            res.status(200).json({ 'tasks': rows })
        }
    });
}


// Auth Middleware
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, 'secret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

exports.getProfile = (req, res, next) => {
    res.status(200).send(`Welcome User ${req.user.id}`);
}