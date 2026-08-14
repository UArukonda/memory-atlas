const { findUserByEmail } = require("../models/user.model.js");
const { getProfileById } = require("../models/profile.model.js");

const getUser = async (req, res, next) => {
  const user = req.user;
  const existingUser = await findUserByEmail(user.email);

  const userProfile = await getProfileById(existingUser._id.toString());

  return res.status(200).send({
    username: existingUser.username,
    email: existingUser.email,
    displayName: userProfile?.displayName,
    bio: userProfile?.bio,
    avatar: userProfile?.avatar,
  });
};

module.exports = { getUser };
