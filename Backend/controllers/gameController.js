const response = require('../response/response');
const { getAllGames, getGameById, createGame, updateGame, deleteGame } = require('../queries/game');

const getAllGamesController = (req, res) => {
    getAllGames((err, fields) => {
        if (err) return response(404, 'Not Found', 'Data Game tidak ditemukan', res)
        response(200, fields, 'Data Semua Game', res)
    })
}

const getGameByIdController = (req, res) => {
    const id = req.params.id
    getGameById(id, (err, fields) => {
        if (err) return response(404, 'Not Found', 'Data Game tidak ditemukan', res)
        if (fields.length === 0) return response(404, 'Not Found', `Data Game ${id} tidak ditemukan`, res)
        response(200, fields, `Data Game ${id}`, res)
    })
}

const createGameController = (req, res) => {
    const {gameCode, name, rating, year} = req.body
    createGame({gameCode, name, rating, year}, (err, fields) => {
        if (err) return response(500, 'Invalid', 'Data gagal ditambahkan', res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
                gameCode, name, rating, year
            }
            response(200, data, 'Data berhasil ditambahkan', res)
        }
    })
}

const updateGameController = (req, res) => {
    const {gameCode, name, rating, year} = req.body
    updateGame({gameCode, name, rating, year}, (err, fields) => {
        if (err) return response(500, 'Invalid', 'Data gagal diupdate', res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message,
                gameCode, name, rating, year
            }
            response(200, data, 'Data berhasil diupdate', res)
        } else {
            response(404, 'Not Found', 'Data Game tidak ditemukan', res)
        }
    })
}

const deleteGameController = (req, res) => {
    const {gameCode} = req.body
    deleteGame({gameCode}, (err, fields) => {
        if (err) return response(500, 'Invalid', 'Data gagal dihapus', res)
        if (fields?.affectedRows) {
            const data = { isDeleted: fields.affectedRows }
            response(200, data, 'Data berhasil dihapus', res)
        } else {
            response(404, 'Not Found', 'Data Game tidak ditemukan', res)
        }
    })
}

module.exports = {getAllGamesController, getGameByIdController, createGameController, updateGameController, deleteGameController}