const pool = require("../db/pool");

module.exports = {
  index: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM card");
    res.render("cards/index", { cards: rows });
  },

  show: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM card WHERE id = $1", [req.params.id]);
    res.render("cards/show", { card: rows[0] });
  },

  newCard: async (req, res) => {
    res.render("cards/form");
  },

  create: async (req, res) => {
    await pool.query(
      "INSERT INTO card (name, card_number, description, price, stock, rarity, image_url, arc_id, card_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [req.body.name, req.body.card_number, req.body.description, req.body.price, req.body.stock, req.body.rarity, req.body.image_url, req.body.arc_id, req.body.card_type_id]
    );
    res.redirect("/cards");
  },

  edit: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM card WHERE id = $1", [req.params.id]);
    res.render("cards/form", { card: rows[0] });
  },

  update: async (req, res) => {
    await pool.query(
      "UPDATE card SET name = $1, card_number = $2, description = $3, price = $4, stock = $5, rarity = $6, image_url = $7, arc_id = $8, card_type_id = $9 WHERE id = $10",
      [req.body.name, req.body.card_number, req.body.description, req.body.price, req.body.stock, req.body.rarity, req.body.image_url, req.body.arc_id, req.body.card_type_id, req.params.id]
    );
    res.redirect("/cards");
  },

  destroy: async (req, res) => {
    await pool.query("DELETE FROM card WHERE id = $1", [req.params.id]);
    res.redirect("/cards");
  }
};