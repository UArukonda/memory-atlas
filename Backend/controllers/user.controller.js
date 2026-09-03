const {
  findUserByEmail,
  deleteUserByEmail,
} = require("../repositories/user.repository.js");
const { getProfileById } = require("../repositories/profile.repository.js");
const { getPartnerData } = require("../utils/getPartnerData.js");
const {
  getRelationship,
} = require("../repositories/relationship.repository.js");

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
    const relationship = await getRelationship(existingUser._id);
    const partnerData = relationship
      ? await getPartnerData(relationship, existingUser._id)
      : null;

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
      relationship,
      partner: partnerData
        ? {
            id: partnerData.partner._id,
            username: partnerData.partner.username,
            email: partnerData.partner.email,
            profile: partnerData.partnerProfile,
          }
        : null,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const existingUser = await findUserByEmail(req.user.email);
    const relationship = await getRelationship(existingUser._id);
    if (relationship) {
      relationship.status = "ended";
      await relationship.save();
    }
    await deleteUserByEmail(req.user.email);
    res.clearCookie("token", { path: "/", httpOnly: true });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUser, deleteUser };
