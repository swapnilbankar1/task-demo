const db = require('../db/create_database');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const QRCode = require('qrcode');
const speakeasy = require('speakeasy');

exports.registerUser = (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const uuid = crypto.randomUUID();

    const stmt = db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
    stmt.run(uuid, username, hashedPassword);

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
            if (user.totpSecret) {
                speakeasy.totp.verify({
                    secret: user.totpSecret,
                    encoding: 'base32',
                    token: totpCode
                }, (err, verified) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).json({ message: 'Invalid TOTP code' });
                    }

                    if (!verified) {
                        return res.status(401).json({ message: 'Invalid TOTP code' });
                    }

                    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
                    res.json({ token });
                });
            } else {
                const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
                res.json({ token });
            }
            console.log(user)
            const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
            // res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ token, userId: user.id });
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
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ')
    let token = bearer[1];
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
    db.all('select * from users;', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ 'message': 'Failed to fetch user information' })
        } else {
            console.log(rows)
            const currentUser = rows.find(user => user.id === req.user.id);
            delete currentUser.password;
            res.status(200).send({ userInfo: currentUser });
        }
    });
}

exports.enableTotpConfig = (req, res, next) => {

    const username = req.body.username;
    console.log(username);

    try {
        const query = `SELECT * FROM users WHERE username = ${username}`;
        console.log(query);

        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            console.log(row)
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Server error' });
            }

            if (!row) {
                return res.status(401).json({ message: 'User not found' });
            }

            if (row.totpSecret) {
                return res.status(400).json({ message: 'TOTP already enabled' });
            }

            const secret = speakeasy.generateSecret({ length: 20 });
            console.log(secret);

            db.run(`UPDATE users SET totpSecret = ? WHERE username = ?`, [secret.base32, username], (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: 'Error enabling TOTP' });
                }

                const otpauthURL = secret.otpauth_url;
                // res.json({ otpauthURL });

                // Generate 10 backup codes
                const backupCodes = [];
                // for (let i = 0; i < 10; i++) {
                //     backupCodes.push(speakeasy.generateRandomKey({ length: 6 }).base32);
                // }

                db.run(`
                UPDATE users 
                SET totpSecret = ?, backupCodes = ? 
                WHERE username = ?`,
                    [secret.base32, JSON.stringify(backupCodes), username],
                    (err) => {
                        if (err) {
                            console.error(err.message);
                            return res.status(500).json({ message: 'Error enabling TOTP' });
                        }

                        // Generate QR Code 
                        QRCode.toDataURL(otpauthURL, (err, url) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ message: 'Error generating QR Code' });
                            }

                            res.json({ otpauthURL, qrCode: url, backupCodes });
                        });
                    }
                )
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.disableTotpConfig = (req, res, next) => {
    const { username } = req.body;

    try {
        db.run(`UPDATE users SET totpSecret = NULL WHERE username = ?`, [username], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Error disabling TOTP' });
            }

            res.json({ message: 'TOTP disabled' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
