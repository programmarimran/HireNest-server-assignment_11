require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
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

async function run() {
  try {
    const database = client.db("hireNestDB");
    servicesCollection = database.collection("services");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
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
app.post("/services",async(req,res)=>{
  const doc=req.body;
  // const result = await movies.insertOne(doc);
  const result=await servicesCollection.insertOne(doc)
  res.send(result)
  // console.log(doc)
})
app.get("/services",async(req,res)=>{
  const cursor=servicesCollection.find();
  const result=await cursor.toArray()
  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
