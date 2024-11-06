const userSchema = require("../modals/user");

exports.verify = async (req, res, next) => {
  const { uid } = req.body;
  try {
    const user = await userSchema.findOne({ uid });
    if (!user) {
      return res.status(400).send("User not found");
    }
    req.uid = uid;
    req.role = user.role;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error finding user");
  }
};
exports.adminverify = async (req, res, next) => {
  try {
    const { role } = req;
    if (role !== "admin") {
      return res.status(401).send("Unauthorized access");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error finding user");
  }
};
