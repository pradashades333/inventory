const pool = require("./pool");

async function seed() {
  await pool.query("DELETE FROM card");
  await pool.query("DELETE FROM card_type");
  await pool.query("DELETE FROM arc");

  const arcs = await pool.query(`
    INSERT INTO arc (name, description) VALUES
    ('Wano', 'The samurai country arc featuring Kaido')
    RETURNING id
  `);

  const cardTypes = await pool.query(`
    INSERT INTO card_type (name, description) VALUES
    ('Leader', 'The main leader card of your deck')
    RETURNING id
  `);

  const arcId = arcs.rows[0].id;
  const cardTypeId = cardTypes.rows[0].id;

  await pool.query(`
    INSERT INTO card (name, card_number, description, price, stock, rarity, arc_id, card_type_id) VALUES
    ('Monkey D. Luffy', 'OP01-001', 'Captain of the Straw Hat Pirates', 25.99, 10, 'Secret Rare', $1, $2)
  `, [arcId, cardTypeId]);

  console.log("Seeded!");
  await pool.end();
}

seed().catch(consol