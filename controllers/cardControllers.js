const pool = require("../db/pool");

module.exports = {
  index: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM card_type");
    res.render("card-types/index", { cardTypes: rows });
  },

  show: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM card_type WHERE id = $1", [req.params.id]);
    res.render("card-types/show", { cardType: rows[0] });
  },

  newCardType: async (req, res) => {
    res.render("card-types/form");
  },

  create: async (req, res) => {
    await pool.query("INSERT INTO card_type (name, description) VALUES ($1, $2)", [req.body.name, req.body.description]);
    res.redirect("/card-types");
  },

  edit: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM card_type WHERE id = $1", [req.params.id]);
    res.render("card-types/form", { cardType: rows[0] });
  },

  update: async (req, res) => {
    await pool.query("UPDATE card_type SET name = $1, description = $2 WHERE id = $3", [req.body.name, req.body.description, req.params.id]);
    res.redirect("/card-types");
  },

  destroy: async (req, res) => {
    await pool.query("DELETE FROM card_type WHERE id = $1", [req.params.id]);
    res.redirect("/card-types");
  }
};