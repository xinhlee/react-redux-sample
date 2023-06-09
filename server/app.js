const express = require("express");
const bodyParser = require("body-parser");
const { client, pgp } = require("./db");

const _ = require("lodash");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/card/fetchCard", (req, res) => {
  client
    .tx((t) => {
      let fetchRow = t.query("SELECT * FROM public.row");
      let fetchCard = t.query("SELECT * FROM public.card");

      return t.batch([fetchRow, fetchCard]);
    })
    .then((result) => {
      let rowDetail = result[0].map((r) => {
        return {
          row_id: r.row_id,
          prev: r.prev,
          next: r.next,
        };
      });

      function rearrangeArray(arr) {
        const result = [];
        let current = arr.find((obj) => !obj.prev);
        while (current) {
          result.push(current);
          current = arr.find((obj) => obj.prev === current.row_id);
        }
        return result;
      }

      rowDetail = rearrangeArray(rowDetail);

      console.log(rowDetail);

      let cardDetail = result[1].map((c) => {
        return { id: c.card_id, name: c.name, row: c.row };
      });

      res.status(200).json({
        rowDetail: rowDetail,
        cardDetail: cardDetail,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
});

app.post("/api/card/saveCards", (req, res) => {
  const removedRow = req.body.removedRow;

  const removedCard = req.body.removedCard;

  const newCard = req.body.changedCard
    .filter((c) => c.isNew)
    .map((card) => {
      return {
        name: card.name,
        row: card.row,
      };
    });

  const changedCard = req.body.changedCard
    .filter((c) => c.hasChanged)
    .map((card) => {
      return {
        card_id: card.id,
        name: card.name,
        row: card.row,
      };
    });

  // changed the "next" property of last row to empty
  if (req.body.changedRow.length > 0)
    req.body.changedRow[req.body.changedRow.length - 1].next = undefined;

  const newRow = req.body.changedRow
    .filter((r) => r.isNew)
    .map((row) => {
      return {
        row_id: row.id,
        prev: row.prev,
        next: row.next,
      };
    });

  const changedRow = req.body.changedRow
    .filter((r) => r.hasChanged)
    .map((row) => {
      return {
        row_id: row.id,
        prev: row.prev,
        next: row.next,
      };
    });

  let removeRowQuery;
  if (removedRow.length > 0) {
    let idArray = removedRow.map((v) => `'${v}'`).join(", ");
    removeRowQuery = `delete from row where row_id in (select * from unnest(array[${idArray}]))`;
  }

  let removeCardQuery;
  if (removedCard.length > 0) {
    let idArray = removedCard.join(", ");
    removeCardQuery = `delete from card where card_id in (select * from unnest(array[${idArray}]))`;
  }

  let insertCardQuery;
  if (newCard.length > 0) {
    insertCardQuery = pgp.helpers.insert(newCard, ["name", "row"], "card");
  }

  let updateCardQuery;
  if (changedCard.length > 0) {
    updateCardQuery =
      pgp.helpers.update(changedCard, ["?card_id", "name", "row"], "card") +
      "WHERE v.card_id = t.card_id";
  }

  let insertRowQuery;
  if (newRow.length > 0) {
    insertRowQuery = pgp.helpers.insert(
      newRow,
      ["row_id", "prev", "next"],
      "row"
    );
  }

  let updateRowQuery;
  if (changedRow.length > 0) {
    updateRowQuery =
      pgp.helpers.update(changedRow, ["?row_id", "prev", "next"], "row") +
      "WHERE v.row_id = t.row_id";
  }

  client
    .tx((t) => {
      let queries = [];

      if (removeRowQuery) queries.push(t.none(removeRowQuery));
      if (removeCardQuery) queries.push(t.none(removeCardQuery));
      if (insertCardQuery) queries.push(t.none(insertCardQuery));
      if (updateCardQuery) queries.push(t.none(updateCardQuery));
      if (insertRowQuery) queries.push(t.none(insertRowQuery));
      if (updateRowQuery) queries.push(t.none(updateRowQuery));

      return t.batch(queries);
    })
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
