const express = require("express");
const sql = require("mssql/msnodesqlv8");
const bodyParser = require("body-parser");

const port = 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config = {
  user: "admin",
  password: "foo",
  server: "DESKTOP-KTCIOBC\\SQLEXPRESS",
  database: "mapittesting",
  options: {
    trustedConnection: true,
  },
};

app.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    res.send("DB Connected!");
    pool.close();
  } catch (error) {
    res.send("Error while connecting DB! :(");
  }
});
// Get all the items
app.get("/items", async (_, res) => {
  try {
    const pool = await sql.connect(config);
    const response = await pool.query("SELECT * FROM ItemMaster");
    res.json({ message: response.recordsets[0], status: 1 });
    pool.close();
  } catch (error) {
    res.json({ message: error, status: 0 });
  }
});

// Create Items
app.post("/items", async (req, res) => {
  const {
    itemCode,
    description,
    active,
    customerDescription,
    salesItem,
    stockItem,
    purchasedItem,
    barcode,
    manageItemBy,
    minimumInventory,
    maximumInventory,
    remarks,
    imagePath,
  } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.query(`INSERT INTO ItemMaster VALUES(
      '${itemCode}',
      '${description}',
      ${active},
      '${customerDescription}',
      ${salesItem},
      ${stockItem},
      ${purchasedItem},
      '${barcode}',
      ${manageItemBy},
      ${minimumInventory},
      ${maximumInventory},
      '${remarks}',
      '${imagePath}'
    )`);
    res.json({ message: "success!", status: 1 });
    pool.close();
  } catch (error) {
    res.json({ message: error, status: 0 });
  }
});

// Edit Item
app.post("/items/:itemCode", async (req, res) => {
  const { itemCode } = req.params;
  const {
    description,
    active,
    customerDescription,
    salesItem,
    stockItem,
    purchasedItem,
    barcode,
    manageItemBy,
    minimumInventory,
    maximumInventory,
    remarks,
    imagePath,
  } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.query(`UPDATE ItemMaster SET
      description ='${description}',
      active = ${active},
      customerDescription = '${customerDescription}',
      salesItem = ${salesItem},
      stockItem = ${stockItem},
      purchasedItem = ${purchasedItem},
      barcode = '${barcode}',
      manageItemBy = ${manageItemBy},
      minimumInventory = ${minimumInventory},
      maximumInventory = ${maximumInventory},
      remarks = '${remarks}',
      imagePath = '${imagePath}'
      WHERE itemCode = '${itemCode}'
    `);
    res.json({ message: "success!", status: 1 });
    pool.close();
  } catch (error) {
    res.json({ message: error, status: 0 });
  }
});

app.delete("/items/:itemCode", async (req, res) => {
  const { itemCode } = req.params;
  try {
    const pool = await sql.connect(config);
    await pool.query(`DELETE FROM ItemMaster WHERE itemCode = '${itemCode}'`);
    res.json({ message: "success!", status: 1 });
    pool.close();
  } catch (error) {
    res.json({ message: error, status: 0 });
  }
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
