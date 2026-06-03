const db = require('../database/db');

const getAllGames = (callback) => {
    const sql = "SELECT * FROM game"
    db.query(sql, callback)
}

const getGameById = (id, callback) => {
    const sql = `SELECT * FROM game WHERE id = ?`
    db.query(sql, [parseInt(id)], (err, fields) => {
        callback(err, fields)
    })
}

const createGame = (data, callback) => {
    const { gameCode, name, rating, year } = data
    const sql = `INSERT INTO game (game_code, name, rating, year) VALUES (?, ?, ?, ?)`
    db.query(sql, [gameCode, name, rating, year], callback)
}

const updateGame = (data, callback) => {
    const { gameCode, name, rating, year } = data
    const sql = `UPDATE game SET name = ?, rating = ?, year = ? WHERE game_code = ?`
    db.query(sql, [name, rating, year, gameCode], callback)
}

const deleteGame = (data, callback) => {
    const { gameCode } = data
    const sql = `DELETE FROM game WHERE game_code = ?`
    db.query(sql, [gameCode], callback)
}

module.exports = { getAllGames, getGameById, createGame, updateGame, deleteGame }