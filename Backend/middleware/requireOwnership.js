const requireOwnership = (fetchById) => {
  return async (req, res, next) => {
    const { id } = req.params;
    try {
      const resource = await fetchById(id);
      if (!resource) {
        return res.status(404).json({ message: "Not found" });
      }
      if (!req.relationship._id.equals(resource.relationshipId)) {
        return res.status(403).json({
          message: "You do not have access to this",
        });
      }
      req.resource = resource;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = requireOwnership;
