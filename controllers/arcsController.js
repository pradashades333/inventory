const pool = require("../db/pool");

module.exports = {
  index: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM arc");
    res.render("arcs/index", { arcs: rows });
  }
  ,

  show: async (req,res) => {
    const { rows } = await pool.query("SELECT * FROM arc WHERE id = $1", [req.params.id]);
    res.render("arcs/show", { arc: rows[0] });
  }

};