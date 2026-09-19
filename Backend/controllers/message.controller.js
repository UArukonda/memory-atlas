const {
  getMessagesCollection,
} = require("../repositories/message.repository.js");

const fetchMessages = async (req, res, next) => {
  try {
    const messages = await getMessagesCollection(req.relationship._id);
    return res.status(200).send({ messages: messages.reverse() });
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchMessages };
