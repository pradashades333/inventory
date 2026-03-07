const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const arcsRouter = require("./routes/arcs");
const cardTypesRouter = require("./routes/cardTypes");
const cardsRouter = require("./routes/cards");

app.use("/arcs", arcsRouter);
app.use("/card-types", cardTypesRouter);
app.use("/cards", cardsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));