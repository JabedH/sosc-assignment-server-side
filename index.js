const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://sosc-assignment:mgNDoAXwcnPsfNgY@cluster0.beisjei.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// CRUD
async function run() {
  try {
    await client.connect();
    app.post("/saveUser", async, (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server-side is working fine");
});

app.listen(port, () => {
  console.log("server is running", port);
});
