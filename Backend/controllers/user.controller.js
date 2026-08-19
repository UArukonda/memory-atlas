const {
  findUserByEmail,
  deleteUserByEmail,
} = require("../repositories/user.repository.js");
const { getProfileById } = require("../repositories/profile.repository.js");

const getUser = async (req, res, next) => {
  const user = req.user;
  try {
    const existingUser = await findUserByEmail(user.email);

    if (!existingUser) {
      res.clearCookie("token", {
        path: "/",
        httpOnly: true,
      });
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = await getProfileById(existingUser._id.toString());

    return res.status(200).send({
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      relationshipCode: existingUser.relationshipCode,
      profile: {
        displayName: userProfile?.displayName,
        bio: userProfile?.bio,
        avatar: userProfile?.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await deleteUserByEmail(req.user.email);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser, deleteUser };
