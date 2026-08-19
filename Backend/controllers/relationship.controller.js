const {
  findUserByRelationshipCode,
  findUserByEmail,
  findUserById,
} = require("../repositories/user.repository.js");
const {
  getRelationship,
  createRelationshipDocument,
  updateRelationshipDocument,
} = require("../repositories/relationship.repository.js");
const { getProfileById } = require("../repositories/profile.repository.js");

async function createRelation(req, res, next) {
  const { relationshipCode } = req.body;
  try {
    const userB = await findUserByRelationshipCode(relationshipCode);
    if (!userB) {
      return res.status(400).json({ message: "Invalid relationship code" });
    }
    const userA = await findUserByEmail(req.user.email);
    if (userA._id.equals(userB._id)) {
      return res
        .status(400)
        .json({ message: "You cannot connect with yourself" });
    }
    const ConnectionA = await getRelationship(userA._id);
    if (ConnectionA) {
      return res
        .status(400)
        .json({ message: "You are already in a relationship" });
    }
    const ConnectionB = await getRelationship(userB._id);
    if (ConnectionB) {
      return res
        .status(400)
        .json({ message: "This user is already in a relationship" });
    }
    await createRelationshipDocument(userA._id, userB._id);
    return res
      .status(201)
      .json({ message: "You’re now connected on Memory Atlas ❤️" });
  } catch (err) {
    next(err);
  }
}

const getRelation = async (req, res, next) => {
  const currentUser = req.user;

  try {
    const currentUserData = await findUserByEmail(currentUser.email);
    const relationship = await getRelationship(currentUserData._id.toString());
    if (!relationship) {
      return res.status(404).json({ message: "You are not in a relationship" });
    }

    const { userAId, userBId } = relationship;

    const partnerId = currentUserData._id.equals(userAId)
      ? userBId.toString()
      : userAId.toString();

    const partner = await findUserById(partnerId);
    const partnerProfile = await getProfileById(partnerId);

    return res.status(200).json({
      relationship,
      partner: {
        id: partner._id,
        username: partner.username,
        email: partner.email,
        profile: partnerProfile,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateRelation = async (req, res, next) => {
  const currentUserEmail = req.user.email;
  const {
    relationshipStartDate,
    coupleNickname,
    relationshipDescription,
    coverPhoto,
  } = req.body;
  const updateData = {};

  if (relationshipStartDate !== undefined)
    updateData.relationshipStartDate = relationshipStartDate;

  if (coupleNickname !== undefined) updateData.coupleNickname = coupleNickname;

  if (relationshipDescription !== undefined)
    updateData.relationshipDescription = relationshipDescription;

  if (coverPhoto !== undefined) updateData.coverPhoto = coverPhoto;
  try {
    const currentUser = await findUserByEmail(currentUserEmail);
    const relation = await getRelationship(currentUser._id);
    if (!relation) {
      return res.status(404).json({
        message: "You are not in a relationship",
      });
    }
    const isUpdated = await updateRelationshipDocument(
      updateData,
      relation._id,
    );
    return res.status(200).send(isUpdated);
  } catch (err) {
    next(err);
  }
};

module.exports = { createRelation, getRelation, updateRelation };
