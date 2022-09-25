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
    const userCollection = client.db("userData").collection("users");

    app.put("/saveUser/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);

      res.send({ result });
    });
    app.get("/allUsers", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const booking = await userCollection.find(query).toArray();
      res.send(booking);
    });
    // update all user
    app.patch("/alluser/:email", verifyJWT, async (req, res) => {
      const email = req.query.email;
      const info = req.body;
      console.log(info);
      const filter = { email: email };
      const allCollection = await userCollection.updateOne(info, filter);
      res.send(allCollection);
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
