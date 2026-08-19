const {
  getRelationship,
} = require("../repositories/relationship.repository.js");

const requireRelationship = async (req, res, next) => {
  try {
    const relationship = await getRelationship(req.user.id);
    if (!relationship) {
      return res.status(404).json({ message: "You are not in a relationship" });
    }
    req.relationship = relationship;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = requireRelationship;
