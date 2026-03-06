const pool = require("../db/pool");

module.exports = {
    index: async (req, res) => {
        const {rows} = await pool.query("SELECT * FROM card_type")
        res.render("cardTypes/index", {cardTypes:rows})
    }
}