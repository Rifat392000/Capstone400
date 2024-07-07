const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 5760;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'fire',
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
    }
});

app.post('/login', (req, res) => {
    const { user, pass } = req.body;

    const sql = `
        SELECT 

        userId,
        userLevel,
        userName
            
        FROM 
            UserInfo
        
        WHERE 
            userId = ?
            AND userPassword = ?;
    `;

    connection.query(sql, [user, pass], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, error: 'Internal Server Error' });
            return;
        }

        if (result.length === 1) {
            const userInformation = result[0];
            res.json({ success: true, user: userInformation });
        } else {
            res.json({ success: false, error: 'Invalid username or password' });
        }
    });
});




app.get('/employees', (req, res) => {
   
    const sqlQuery = `
   SELECT 
userId,
Tid,
Accuracy,
result
 
 FROM
 Trainee;

    `;

    // Execute the SQL query
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});





app.use((req, res) => {
    const filePath = path.join(__dirname, 'public', '404.html');
    res.status(404).sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
