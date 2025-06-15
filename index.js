require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
const SECRET = process.env.JWT_SECRET;
const uri = process.env.CONNECT_MONGODB;
//************Token Verify midleware*************** */
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token)
  if (!token) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    // console.log(decoded)
    if (err) {
      return res
        .status(403)
        .send({ message: "Forbidden: Invalid or expired token" });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};
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
// Login with jwt token create  and set cookie related api
app.post("/jwt", async (req, res) => {
  const { email } = req.body;
  // console.log("jwt token first email", email);
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  const token = jwt.sign({ email }, SECRET, { expiresIn: "1d" });
  // console.log(token)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  }); //production e status auto true hobe
  res.send({ status: true, message: "LogIn successful" });
});
// Logout with jwt token create and set cookie related api
app.post("/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.send({ status: true, message: "Logout successful" });
});
// server running test korar jonno api
app.get("/", (req, res) => {
  res.send("HireNest server is Running!.....");
});
//all services page er jonno api
app.get("/services", async (req, res) => {
  const cursor = servicesCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});
//search related api
app.get("/search/services", async (req, res) => {
  const search = req.query.search;
  const query = {
    $or: [
      { serviceName: { $regex: search, $options: "i" } },
      { "provider.email": { $regex: search, $options: "i" } },
      { "provider.name": { $regex: search, $options: "i" } },
      { serviceArea: { $regex: search, $options: "i" } },
    ],
  };
  const result = await servicesCollection.find(query).toArray();
  res.send(result);
});
//home page er jonno api
app.get("/services/home", async (req, res) => {
  const cursor = servicesCollection.find().limit(6);
  const result = await cursor.toArray();
  res.send(result);
});
//details page er jonno api
app.get("/services/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await servicesCollection.findOne(query);
  res.send(result);
});
// add service er jonno api
app.post("/services", verifyToken, async (req, res) => {
  const doc = req?.body;
  if (req?.decoded?.email !== doc?.provider?.email) {
    return res.status(403).send("Forbidden: Email mismatch.");
  }
  const result = await servicesCollection.insertOne(doc);
  res.send(result);
});
//manage service er update related api
app.put("/services/:id", verifyToken, async (req, res) => {
  const updatedData = req.body;
  if (updatedData.userEmail !== req.decoded.email) {
    return res.status(403).send("Forbidden: Email mismatch.");
  }
  const id = req.params.id;
  const options = { upsert: true };
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: updatedData,
  };
  const result = await servicesCollection.updateOne(filter, updateDoc, options);
  res.send(result);
});
//manage service page er joono sokol document er api
app.get("/users/services", verifyToken, async (req, res) => {
  const email = req.query.email;
  if (email !== req.decoded.email) {
    return res.status(403).send("Forbidden: Email mismatch.");
  }
  const query = { "provider.email": email };
  const result = await servicesCollection.find(query).toArray();
  res.send(result);
});
//manage service delete related api
app.delete("/services/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await servicesCollection.deleteOne(query);
  res.send(result);
});
//booked-service page er jonno api
app.get("/users/booked/services", verifyToken, async (req, res) => {
  const email = req.query.email;
  if (email !== req.decoded.email) {
    return res.status(403).send("Forbidden: Email mismatch.");
  }
  const query = { userEmail: email };
  const result = await serviceBookingsCollection.find(query).toArray();
  res.send(result);
});
//serviceToDo page er jonno documents related api
app.get("/provider/booked-services", verifyToken, async (req, res) => {
  const email = req.query.email;
  if (email !== req.decoded.email) {
    return res.status(403).send("Forbidden: Email mismatch.");
  }
  const query = { providerEmail: email };
  const result = await serviceBookingsCollection.find(query).toArray();
  res.send(result);
});
// details page theke service book kora related api
app.post("/book-service", verifyToken, async (req, res) => {
  const doc = req.body;
  if (doc.userEmail !== req.decoded.email) {
    return res.status(403).send("Forbidden: Email mismatch.");
  }
  const result = await serviceBookingsCollection.insertOne(doc);
  res.send(result);
});
// serviceToDo page theke provider kortik status change related api
app.patch("/book-service/:id", verifyToken, async (req, res) => {
  const email = req.body.providerEmail;
  if (email !== req.decoded.email) {
    return res.status(403).send("Forbidden: Email mismatch.");
  }
  const id = req.params.id;
  const { serviceStatus } = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { serviceStatus: serviceStatus },
  };
  const result = await serviceBookingsCollection.updateOne(filter, updateDoc);
  res.send(result);
});
// book kora user OR service provide kora provicer kortik booked service delete kora related api
app.delete("/book-service/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await serviceBookingsCollection.deleteOne(query);
  res.send(result);
});
//Port test related status
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
