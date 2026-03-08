const pool = require("../db/pool");

module.exports = {
  index: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM arc");
    res.render("arcs/index", { arcs: rows });
  },

  show: async (req,res) => {
    const { rows } = await pool.query("SELECT * FROM arc WHERE id = $1", [req.params.id]);
    res.render("arcs/show", { arc: rows[0] });
  },

  newArc:async (req, res) => {
    res.render("arcs/form")
  },

  create: async (req,res) => {
    const { rows } = await pool.query("INSERT INTO arc (name,description) VALUES ($1,$2)", [req.body.name, req.body.description]);
    res.redirect("/arcs")
  }

};