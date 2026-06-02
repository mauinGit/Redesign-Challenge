const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
    if (err) {
        console.log('Koneksi gagal:', err)
        return
    }
    console.log('Koneksi berhasil!')
});

connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) throw err
    console.log('Database berhasil dibuat!')
});

connection.query(`USE ${process.env.DB_NAME}`, (err) => {
    if (err) throw err
});

connection.query(`
    CREATE TABLE IF NOT EXISTS game (
        id INT AUTO_INCREMENT PRIMARY KEY,
        game_code VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        rating FLOAT NOT NULL,
        year INT NOT NULL
    )
`, (err) => {
    if (err) throw err
    console.log('Tabel game berhasil dibuat!')
    connection.end()
});