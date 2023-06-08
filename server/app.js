const express = require("express");
const bodyParser = require("body-parser");
const client = require("./db");

const _ = require("lodash");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/card/fetchCard", (req, res) => {
  client.query("SELECT * FROM public.card", (error, results) => {
    if (error) throw error;

    let rowDetail = _.uniqBy(results.rows, "row_id").map((r) => {
      return {
        row_id: r.container,
        prev_id: r.prev_container,
      };
    });

    res.status(200).json({
      rowDetail: rowDetail,
      data: results.rows.map((r) => {
        return { id: r.card_id, name: r.name, row: r.container };
      }),
    });
  });
});

app.post("/api/card/saveCards", (req, res) => {
  // let query = `
  //   INSERT INTO public.card
  //   ("name", container, prev_container)
  //   VALUES('', '', '');
  // `;

  console.log(req.body);

  res.status(200).send("OK");
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
