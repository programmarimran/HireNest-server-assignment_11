require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const uri = process.env.CONNECT_MONGODB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//****************************** connect to DB and assign collection*********************************** */
let servicesCollection;
let serviceBookingsCollection;

async function run() {
  try {
    const database = client.db("hireNestDB");
    servicesCollection = database.collection("services");
    serviceBookingsCollection = database.collection("serviceBookings");

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//****************************** routing is start******************************************* */

app.get("/", (req, res) => {
  res.send("HireNest server is Running!.....");
});

app.get("/services", async (req, res) => {
  const cursor = servicesCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});
app.get("/search/services", async (req, res) => {
  const search = req.query.search;
  // console.log("Search query received:", search);
  const query = {
    $or: [
      { serviceName: { $regex: search, $options: "i" } },
      { "provider.email": { $regex: search, $options: "i" } },
      { "provider.name": { $regex: search, $options: "i" } },
      { serviceArea: { $regex: search, $options: "i" } },
    ],
  };
  const result = await servicesCollection.find(query).toArray();
  // console.log(search)
  res.send(result);
});
app.get("/services/home", async (req, res) => {
  const cursor = servicesCollection.find().limit(6);
  const result = await cursor.toArray();
  res.send(result);
});
app.get("/services/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await servicesCollection.findOne(query);
  res.send(result);
});
app.post("/services", async (req, res) => {
  const doc = req?.body;
  const result = await servicesCollection.insertOne(doc);
  res.send(result);
});
app.put("/services/:id", async (req, res) => {
  const updatedData = req.body;
  const id = req.params.id;
  const options = { upsert: true };
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: updatedData,
  };
  const result = await servicesCollection.updateOne(filter, updateDoc, options);
  res.send(result);
});

///users/services specific user services related api
app.get("/users/services", async (req, res) => {
  const email = req.query.email;
  const query = { "provider.email": email };
  const result = await servicesCollection.find(query).toArray();
  res.send(result);
});
app.delete("/services/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await servicesCollection.deleteOne(query);
  res.send(result);
});
//serviceBookings Related API
app.get("/users/booked/services", async (req, res) => {
  const email = req.query.email;
  const query = { userEmail: email };
  const result = await serviceBookingsCollection.find(query).toArray();
  res.send(result);
});
app.get("/provider/booked-services", async (req, res) => {
  const email = req.query.email;
  const query = { providerEmail: email };
  const result = await serviceBookingsCollection.find(query).toArray();
  res.send(result);
});
app.post("/book-service", async (req, res) => {
  const doc = req.body;
  const result = await serviceBookingsCollection.insertOne(doc);
  res.send(result);
});
app.patch("/book-service/:id", async (req, res) => {
  const id = req.params.id;
  const { serviceStatus } = req.body;

  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { serviceStatus: serviceStatus },
  };
  const result = await serviceBookingsCollection.updateOne(filter, updateDoc);
  res.send(result);
});
app.delete("/book-service/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await serviceBookingsCollection.deleteOne(query);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
