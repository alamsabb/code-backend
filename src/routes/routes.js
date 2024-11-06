const express = require("express");
const Router = express.Router();
const firebaseapp = require("../db/firebaseAuth");
const userRole = require("../modals/user");
const Resource = require("../modals/resource");
const { verify, adminverify } = require("../middleware/verify");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} = require("firebase/auth");
const auth = getAuth(firebaseapp);
const { admin } = require("../db/adminFirebase");

Router.get("/health", (req, res) => {
  res.status(200).send("Server is up and running firebase");
});

Router.post("/loginPhone", async (req, res) => {
  const { number, role } = req.body;
  try {
    const user = await admin.auth().createUser({ phoneNumber: number });
    console.log(user.uid);
    await userRole.create({ user: number, uid: user.uid, role: role });

    res.status(200).send("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error creating user");
  }
  console.log(req.body);
});

Router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const emailVerification = await sendEmailVerification(user.user);
    console.log(user.user.uid);
    await userRole.create({ user: email, uid: user.user.uid, role: role });
    res.status(200).send("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error creating user");
  }
});
Router.get("/getResourse", verify, async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).send(resources);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error getting resources");
  }
});

Router.post("/addResource", verify, adminverify, async (req, res) => {
  const { title, description } = req.body;
  try {
    const resource = await Resource.create({ title, description });
    res.status(200).send(resource);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error adding resource");
  }
});
Router.delete("/deleteResource", verify, adminverify, async (req, res) => {
  const { id } = req.body;
  try {
    const resource = await Resource.findByIdAndDelete(id);
    res.status(200).send(resource);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error deleting resource");
  }
});
Router.put("/updateResource", verify, adminverify, async (req, res) => {
  const { id, title, description } = req.body;
  try {
    const resource = await Resource.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.status(200).send(resource);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error updating resource");
  }
});

module.exports = Router;
