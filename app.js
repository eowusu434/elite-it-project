const mysql = require('mysql2');

// Create a new MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Zzzxxx123!', // <-- Type your real MySQL password here
    database: 'elite_it_consulting_technology_services_llc'
});

// Connect to the MySQL database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
    }
    
    // Close the connection after testing
    connection.end();
});
