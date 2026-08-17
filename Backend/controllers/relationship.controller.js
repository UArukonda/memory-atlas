const {
  findUserByRelationshipCode,
  findUserByEmail,
} = require("../repositories/user.repository.js");
const {
  getRelationship,
  createRelationshipDocument,
} = require("../repositories/relationship.repository.js");

async function createRelation(req, res, next) {
  const { relationshipCode } = req.body;

  try {
    const userB = await findUserByRelationshipCode(relationshipCode);
    if (!userB) {
      return res.status(400).json({ message: "Invalid relationship code" });
    }
    const userA = await findUserByEmail(req.user.email);
    // console.log(userA, userB);
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
    console.log(err.message);
    next(err);
  }
}

module.exports = { createRelation };
