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
    database: 'leavemanagement',
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
            E.empId, 
            E.empName, 
            E.designationId,
            D.designationName AS employeeDesignation,
            E.supervisorId,
            S.empName AS supervisorName
        FROM 
            Employee AS E
        INNER JOIN 
            Designation AS D ON E.designationId = D.designationId
        LEFT JOIN 
            Employee AS S ON E.supervisorId = S.designationId
        WHERE 
            E.empId = ?
            AND E.empPassword = ?;
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
    E.empId, 
    E.empName, 
    D.designationName AS employeeDesignation,
    S.empName AS supervisorName
FROM 
    Employee AS E
INNER JOIN 
    Designation AS D ON E.designationId = D.designationId
LEFT JOIN 
    Employee AS S ON E.supervisorId = S.empId;
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
