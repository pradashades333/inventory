const pool = require("./pool");

async function seed() {
  await pool.query("DELETE FROM card");
  await pool.query("DELETE FROM card_type");
  await pool.query("DELETE FROM arc");

  const arcs = await pool.query(`
    INSERT INTO arc (name, description) VALUES
    ('East Blue', 'Where Luffy begins his journey and assembles his first crew'),
    ('Alabasta', 'The desert kingdom arc featuring Crocodile and the Baroque Works'),
    ('Enies Lobby', 'The arc to rescue Robin from the World Government'),
    ('Marineford', 'The great war arc to save Portgas D. Ace'),
    ('Wano', 'The samurai country arc featuring the battle against Kaido'),
    ('Dressrosa', 'The arc featuring Donquixote Doflamingo and the Colosseum'),
    ('Whole Cake Island', 'The arc featuring Big Mom and the wedding'),
    ('Egghead', 'The futuristic island arc featuring Dr. Vegapunk')
    RETURNING id, name
  `);

  const cardTypes = await pool.query(`
    INSERT INTO card_type (name, description) VALUES
    ('Leader', 'The main leader card of your deck'),
    ('Character', 'Character cards you play during battle'),
    ('Event', 'One time effect cards'),
    ('Stage', 'Location cards that provide passive effects')
    RETURNING id, name
  `);

  const getId = (arr, name) => arr.rows.find(r => r.name === name).id;

  const wano = getId(arcs, 'Wano');
  const marineford = getId(arcs, 'Marineford');
  const eastBlue = getId(arcs, 'East Blue');
  const enies = getId(arcs, 'Enies Lobby');
  const dressrosa = getId(arcs, 'Dressrosa');
  const wci = getId(arcs, 'Whole Cake Island');
  const egghead = getId(arcs, 'Egghead');

  const leader = getId(cardTypes, 'Leader');
  const character = getId(cardTypes, 'Character');
  const event = getId(cardTypes, 'Event');
  const stage = getId(cardTypes, 'Stage');

  for (const [name, card_number, description, price, stock, rarity, arc_id, card_type_id] of [
    ['Monkey D. Luffy', 'OP01-001', 'Captain of the Straw Hat Pirates', 25.99, 10, 'Secret Rare', wano, leader],
    ['Roronoa Zoro', 'OP01-002', 'Swordsman of the Straw Hat Pirates', 12.99, 15, 'Super Rare', eastBlue, character],
    ['Portgas D. Ace', 'OP02-001', 'Second division commander of the Whitebeard Pirates', 19.99, 8, 'Super Rare', marineford, character],
    ['Whitebeard', 'OP02-002', 'The strongest man in the world', 29.99, 5, 'Secret Rare', marineford, leader],
    ['Nico Robin', 'OP03-001', 'Archaeologist of the Straw Hat Pirates', 15.99, 12, 'Super Rare', enies, character],
    ['Donquixote Doflamingo', 'OP04-001', 'Former Warlord and king of Dressrosa', 18.99, 7, 'Super Rare', dressrosa, leader],
    ['Kaido', 'OP05-001', 'King of the Beasts and strongest creature', 39.99, 4, 'Secret Rare', wano, leader],
    ['Gear 5 Luffy', 'OP05-002', 'Luffys awakened devil fruit form', 49.99, 3, 'Secret Rare', wano, leader],
    ['Big Mom', 'OP06-001', 'Captain of the Big Mom Pirates', 34.99, 6, 'Secret Rare', wci, leader],
    ['Vegapunk', 'OP07-001', 'The worlds greatest scientist', 22.99, 9, 'Super Rare', egghead, character],
    ['Gum Gum Finale', 'OP05-010', 'Luffys finishing move', 8.99, 20, 'Rare', wano, event],
    ['Wano Country', 'OP05-020', 'The land of samurai and shogun', 6.99, 25, 'Uncommon', wano, stage],
  ]) {
    await pool.query(
      `INSERT INTO card (name, card_number, description, price, stock, rarity, arc_id, card_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, card_number, description, price, stock, rarity, arc_id, card_type_id]
    );
  }

  console.log("Seeded!");
  await pool.end();
}

seed().catch(console.error);