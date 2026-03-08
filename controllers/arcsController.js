const pool = require("../db/pool");

module.exports = {
  index: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM arc");
    res.render("arcs/index", { arcs: rows });
  }

  
};